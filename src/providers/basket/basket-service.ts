import { Injectable } from "@angular/core";
//jeden neuen Provider als Provider in app module eintragen
@Injectable()
export class BasketService {
   public ItemSelection = [];
   public BasketStateColor;

   checkBasketContent() {
    if (this.ItemSelection.length > 0) {
      this.BasketStateColor = "#0094d2"; //blau
    } else {
      this.BasketStateColor = "#99cc33"; //grün 
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

  
}