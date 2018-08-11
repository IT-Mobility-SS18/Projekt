import { Injectable } from "@angular/core";
import { Order } from '../../models/order/order.model';
import { FirebaseService } from '../../providers/firebase/firebase-service';
import { AngularFireAuth } from "../../../node_modules/angularfire2/auth";


//jeden neuen Provider als Provider in app module eintragen
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

   checkBasketContent() {

    console.log('this.ItemSelection.length',this.ItemSelection.length);

    if (this.ItemSelection.length > 0) {
      this.BasketStateColor = "#0094d2"; //blau
    } else {
      //this.BasketStateColor = "#99cc33"; //grün
      this.BasketStateColor = "#ffffff"; //weiß

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

removeFromArray(GivenIndex) {
    (this.ItemSelection).splice(GivenIndex,1);
}

removeAll() {
  this.ItemSelection = [];
}

createOrder(ItemSelection){
  for (var idIteration in ItemSelection) {
    //hier müssen alle order bestandteile rein!! später auch die oben hardgecodeden
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
    console.log('aktuelle Menge: ' + this.order.Quantity);
    this.FirebaseService.addCustomerOrder(this.order);
  }
}


}
