import { OrderRepository as _OrderRepository } from "../repositories/OrderRepository";
import { ServerContextData } from "../server";

export class OrderService {
  OrderRepository;

  constructor() {
    this.OrderRepository = new _OrderRepository();
  }
  
  async getOrderByCode(code: string, context: ServerContextData) {
    return this.OrderRepository.getOrderByCode(code, context);
  }

  async getAllOrders(context: ServerContextData) {
    return this.OrderRepository.getAllOrders(context);
  }
}
