import { AngularFireAuth } from "../../../node_modules/angularfire2/auth";
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { Injectable } from "@angular/core";

// import models
import { Order } from '../../models/order/order.model';

// name every new provider in app module
@Injectable()
export class BasketService {
   public ItemSelection = [];
   public BasketStateColor;
   public QRRestaurantId:number;
   public QRTischNr:number;

   // Initialize order and its attributes
   order: Order = {
    ItemId: undefined,
    Quantity: undefined,
    UserId: undefined,
    OrderState: undefined,
    Name: undefined,
    Price: undefined,
    TableId: undefined,
    RestaurantId: undefined,
    TimeStamp: undefined,
    Size: undefined,
    Variant: undefined,
    Annotations: undefined,
    OurOrderId: undefined
  }

  constructor( public FirebaseService: FirebaseService, private fire: AngularFireAuth) {
  }

  // check whether there is an item in the basket -> change color of basket icon
  checkBasketContent() {
    if (this.ItemSelection.length > 0) {
      this.BasketStateColor = "#0094d2"; //blue
    } else {
      this.BasketStateColor = "#ffffff"; //white
    }
  }

  addToArray(ItemId, ItemName, ItemPrice) {
    this.ItemSelection.push({
      ItemId: ItemId,
      Quantity: 1,
      Name: ItemName,
      Price: ItemPrice}
    );
  }

  // remove single basket item
  removeFromArray(GivenIndex) {
      (this.ItemSelection).splice(GivenIndex,1);
  }

  // clear basket array
  removeAll() {
    this.ItemSelection = [];
  }

  createOrder(ItemSelection){
    for (var idIteration in ItemSelection) {
      // all order attributes need to be declarated here
      this.order.ItemId = ItemSelection[idIteration].ItemId;
      this.order.Quantity = ItemSelection[idIteration].Quantity;
      this.order.Name = ItemSelection[idIteration].Name;
      this.order.Price = ItemSelection[idIteration].Price;
      this.order.Size = ItemSelection[idIteration].Size;
      this.order.Variant = ItemSelection[idIteration].Variant;
      this.order.Annotations = ItemSelection[idIteration].Annotations;
      this.order.TableId = ItemSelection[idIteration].TableId;
      this.order.RestaurantId = ItemSelection[idIteration].RestaurantId;
      this.order.TimeStamp = ItemSelection[idIteration].TimeStamp;
      this.order.UserId = ItemSelection[idIteration].UserId;
      this.order.OrderState = ItemSelection[idIteration].OrderState;
      this.order.OurOrderId = ItemSelection[idIteration].OurOrderId;
      this.FirebaseService.addCustomerOrder(this.order);
    }
  }

}
