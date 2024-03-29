import { UserModel } from "./userModel";

export type DepartmentModel = {
    id: number;
    employees: number;
    code: string;
    createdAt: Date;
    updatedAt: Date;
    name: string;
    description: string;
    users: UserModel[];
}