import { DepartmentModel } from "./departmentModel";
import { Role } from "./enum";

export type UserModel = {
  id: number;
  name: string;
  email: string;
  password: string;
  profileImagePath: string;
  roles: Role[];
  department: DepartmentModel[];
}