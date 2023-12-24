import {
	Arg,
	Ctx,
	Field,
	FieldResolver,
	Mutation,
	Query,
	Resolver,
	Root,
} from "type-graphql";
import { Category, Item } from "../dto/models";
import { CategoryService as _CategoryService } from "../services/CategoryService";
import { ServerContextData } from "../server";
import { CreateCategoryInput } from "../dto/inputs";
import { IsString } from "class-validator";
import { UpdateCategoryInput } from "../dto/inputs/category/update";

// export type OrderModelWithTypename = {
// 	__typename?: string;
// 	item: ItemModelWithTypename;
// 	updatedAt: string;
// 	analysis: AnalysisModelWithTypename;
// } & Omit<OrderModel, "requestedAt" | "analysis">;

type ItemWithoutCategory = Omit<Item, "categories">;

@Resolver(() => Category)
export class CategoryResolver {
	CategoryService;

	constructor() {
		this.CategoryService = new _CategoryService();
	}

	@Query(() => [Category])
	async categories(@Ctx() context: ServerContextData) {
		return this.CategoryService.getAllCategories(context);
	}

	@Query(() => Category)
	async getCategory(
		@Arg("code") code: string,
		@Ctx() context: ServerContextData
	) {
		return this.CategoryService.getCategory(code, context);
	}

	@Mutation(() => Category)
	async createCategory(
		@Arg("data") data: CreateCategoryInput,
		@Ctx() context: ServerContextData
	) {
		return this.CategoryService.createCategory(data, context);
	}

	@Mutation(() => Category)
	async editCategory(
		@Arg("data") data: UpdateCategoryInput,
		@Ctx() context: ServerContextData
	) {
		return this.CategoryService.editCategory(data, context);
	}

	@FieldResolver(() => [Item])
	async items(@Root() category: Category, @Ctx() context: ServerContextData) {
		// tive que fazer uma filtragem manual. Por algum motivo minha tentativa de usar o proprio Prisma deu errado
		const { prisma } = context;
		const items = await prisma.item.findMany({
			where: {
				categories: {
					some: {
						code: category.code,
					},
				},
			},

			include: {
				order: true,
				delivery: true,
				storage: true,
				categories: true,
			},
		});

		const res = items.filter((i) => {
			const categories = i.categories;

			if (categories.length == 0) return false;

			const flag = categories.some((cat) => {
				return cat.code == category.code;
			});

			return flag;
		});

		return items;
		return res;
	}
}
