import { ItemModel } from "./ItemModel";
import { UserModel } from "./userModel";

export type StorageModel = {
    code: string;
    storekeeper: UserModel;
    storekeeperId: number;
    item: ItemModel;
}