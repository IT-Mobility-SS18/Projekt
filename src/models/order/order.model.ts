export interface Order {
    UserId: string;
    Name: string;
    Price: number;
    Quantity: number;
    Picture;
    DeliveryCosts;
    OrderState;
    TimeStamp;
    RestaurantId;
    PayStatus;
    Annotations;
    TableId;
}