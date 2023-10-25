import { UserModel } from "./userModel";

export type AnalysisModel = {
  id: number;
  createdAt: Date;
  updatedAt: Date;
  isApproved: boolean;
  analyst: UserModel;
}