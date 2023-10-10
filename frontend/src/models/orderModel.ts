import { ItemModel } from "./ItemModel";
import { AnalysisModel } from "./analysisModel";
import { OrderStatus } from "./enum";

export type OrderModel = {
  code: string;
  requestedAt: Date;
  requesterId: number;
  id: number;
  item: ItemModel;
  status: OrderStatus;
  analysis: AnalysisModel | null;
}