import { compareSync } from "bcryptjs";
import { GraphQLError } from "graphql";

import { CreateUserInput } from "../dto/inputs";
import { UpdateUserInput } from "../dto/inputs/user/update-user";
import {
	GetUserProps,
	UserRepository as _UserRepository,
} from "../repositories/UserRepository";
import { ServerContextData } from "../server";
import { SignInInput } from "../dto/inputs/user/sign-in";
import { Role, AccessToken, RefreshToken } from "@prisma/client";
import { ValidateToken, validateToken } from "../validators/token";
import { Department } from "../dto/models";

export interface UserInSession {
	name: string;
	email: string;
	password: string;
	profileImage: string;
	roles: Role[];
	id: number;
	department: Department[];
}

export interface SessionData {
	user: UserInSession;
	accessToken: AccessToken;
	refreshToken: RefreshToken;
}

export class UserService {
	UserRepository;

	constructor() {
		this.UserRepository = new _UserRepository();
	}

	async getAllUsers(context: ServerContextData) {

		return this.UserRepository.getAllUsers(context);
	}

	async createUser(user: CreateUserInput, context: ServerContextData) {
		return this.UserRepository.createUser(user, context);
	}

	async getUserById(
		{
			id,
			includeAccessToken = false,
			includeRefreshToken = false,
		}: GetUserProps,
		context: ServerContextData
	) {
		return this.UserRepository.getUserById(
			{
				id,
				includeAccessToken,
				includeRefreshToken,
			},
			context
		);
	}

	async getUserByAccessToken(
		{ accessToken }: GetUserProps,
		context: ServerContextData
	) {
		const { prisma } = context;
		const _accessToken = await prisma.accessToken.findFirst({
			where: {
				token: accessToken,
			},
		});

		const user = this.UserRepository.getUserById(
			{
				id: _accessToken?.userId,
			},
			context
		);

		return user;
	}

	async updateUser(user: UpdateUserInput, context: ServerContextData) {
		const { accessToken, refreshToken } = context;

		const { isValid, invalidToken } = await validateToken({
			accessToken: accessToken || "",
			refreshToken: refreshToken || "",
		});

		if (!isValid) {
			throw new GraphQLError(`${invalidToken} expired`);
		}

		return this.UserRepository.updateUser(user, context);
	}

	async deleteUser(id: number, context: ServerContextData) {
		const { accessToken: _accessToken, refreshToken: _refreshToken } =
			context;

		const { isValid, invalidToken } = await validateToken({
			accessToken: _accessToken || "",
			refreshToken: _refreshToken || "",
		});

		if (!isValid) {
			throw new GraphQLError(`${invalidToken} expired`);
		}

		const { prisma } = context;

		const accessToken = await prisma.accessToken.findFirst({
			where: {
				userId: id,
			},
		});

		const refreshToken = await prisma.refreshToken.findFirst({
			where: {
				userId: id,
			},
		});

		if (accessToken) {
			await prisma.accessToken.delete({
				where: {
					userId: id,
				},
			});
		}

		if (refreshToken) {
			await prisma.refreshToken.delete({
				where: {
					userId: id,
				},
			});
		}

		return this.UserRepository.deleteUser(id, context);
	}

	async login(user: SignInInput, context: ServerContextData) {
		const { email, password } = user;
		const dbUser = await this.UserRepository.getUserByEmail(
			{ email },
			context
		);

		if (!dbUser) {
			throw new GraphQLError("User not found");
		}

		const isValid = compareSync(password, dbUser.password);

		if (!isValid) {
			throw new GraphQLError("Invalid credentials");
		}

		const { accessToken, refreshToken } = await makeTokens({
			id: dbUser.id,
			context,
			repository: this.UserRepository,
		});

		const data: SessionData = {
			user: {
				name: dbUser.name,
				email: dbUser.email,
				password: dbUser.password,
				profileImage: dbUser.profileImage,
				roles: dbUser.roles,
				id: dbUser.id,
				department: dbUser.department,
			},
			accessToken,
			refreshToken,
		};
		return data;
	}
}

async function makeTokens({
	id,
	context,
	repository,
}: {
	id: number;
	context: ServerContextData;
	repository: _UserRepository;
}) {
	const accessToken = await repository.createAccessToken(id, context);
	const refreshToken = await repository.createRefreshToken(id, context);

	interface returType {
		accessToken: string;
		refreshToken: string;
	}

	const res = {
		accessToken: accessToken,
		refreshToken: refreshToken,
	};

	return res;
}
