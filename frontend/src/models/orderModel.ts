import { ItemModel } from "./ItemModel";
import { AnalysisModel } from "./analysisModel";
import { OrderStatus } from "./enum";
import { UserModel } from "./userModel";

export type OrderModel = {
  code: string;
  createdAt: Date;
  updatedAt: Date;
  requester: UserModel;
  id: number;
  item: ItemModel;
  status: OrderStatus;
  analysis: AnalysisModel | null;
}