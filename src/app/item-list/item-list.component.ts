import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from '../services/item-service.service';
import { DocumentChangeAction } from '@angular/fire/firestore';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css'],
})
export class ItemListComponent implements OnInit {
  coffeeOrders: DocumentChangeAction<any>[];

  constructor(private itemService: ItemServiceService) {}

  getCoffeeOrders(): void {
    this.itemService
      .getCoffeeOrders()
      .subscribe((res) => (this.coffeeOrders = res));
  }

  deleteOrder(data) {
    this.itemService.deleteCoffeeOrder(data);
  }

  markCompleted(data) {
    this.itemService.updateCoffeeOrder(data);
  }

  ngOnInit() {
    this.getCoffeeOrders();
  }
}
