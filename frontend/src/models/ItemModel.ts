import { CategoryModel } from "./categoryModel";

export type ItemModel = {
  name: string;
  description: string;
  value: number;
  id: number;
  imagePath: string;
  categories?: CategoryModel;
}