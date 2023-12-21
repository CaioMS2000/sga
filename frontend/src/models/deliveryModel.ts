import { ItemModel } from "./ItemModel";
import { Status } from "./enum";
import { UserModel } from "./userModel";

export type DeliveryModel = {
    code: string;
    status: Status;
    attender: UserModel;
    attenderId: number;
    item: ItemModel;
}