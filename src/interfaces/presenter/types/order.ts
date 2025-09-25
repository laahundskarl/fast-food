import { IOrder } from '#/domain/entities/order.entity';
import { OrderPresenterOutput, OrderWithDetailsPresenterOutput } from '#/interfaces/presenter/order.presenter';

export interface IOrderPresenter {
    createOrderPresenter(order: IOrder): OrderPresenterOutput;
    findOrdersPresenter(orders: IOrder[]): OrderPresenterOutput[];
    getOrderPresenter(order: IOrder): OrderWithDetailsPresenterOutput;
}
