import { CreateCategoryInput } from "../dto/inputs";
import { UpdateCategoryInput } from "../dto/inputs/category/update";
import { CategoryRepository as _CategoryRepository } from "../repositories/CategoryRepository";
import { ServerContextData } from "../server";

export class CategoryService {
	CategoryRepository;

	constructor() {
		this.CategoryRepository = new _CategoryRepository();
	}

	async getAllCategories(context: ServerContextData) {
		return this.CategoryRepository.getAllCategories(context);
	}

	async getCategory(code: string, context: ServerContextData) {
		return this.CategoryRepository.getCategory(code, context);
	}

	async createCategory(
		category: CreateCategoryInput,
		context: ServerContextData
	) {
		return this.CategoryRepository.createCategory(category, context);
	}

	async editCategory(
		category: UpdateCategoryInput,
		context: ServerContextData
	) {
		return this.CategoryRepository.updateCategory(category, context);
	}
}
