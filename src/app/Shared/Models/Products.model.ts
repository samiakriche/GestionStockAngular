import { Category } from "./Category.model";

export class Product{
	  id?:number;
	  name :String;
	  description: String;
	  price :number;
	  createDate? : Date;
	  updateDate? : Date;
	  image : String;
	  quantityStock :number;
	  category :Category;
}