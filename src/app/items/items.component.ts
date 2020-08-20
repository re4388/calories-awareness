import { Component, OnInit } from '@angular/core';
import { ItemServiceService } from '../services/item-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css'],
})
export class ItemsComponent implements OnInit {
  constructor(public itemService: ItemServiceService) {}

  itemForm = new FormGroup({
    customerName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
    ]),
    orderNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(1),
      Validators.pattern('[0-9]*'),
    ]),
    coffeeOrder: new FormControl(''),
    completed: new FormControl(false),
  });

  get customerName() {
    return this.itemForm.get('customerName');
  }

  get orderNumber() {
    return this.itemForm.get('orderNumber');
  }

  coffees = [
    'Americano',
    'Flat White',
    'Cappuccino',
    'Latte',
    'Espresso',
    'Machiato',
    'Mocha',
    'Hot Chocolate',
    'Tea',
  ];

  coffeeOrder = [];

  addCoffee(coffee) {
    this.coffeeOrder.push(coffee);
  }

  removeCoffee(coffee) {
    const index = this.coffeeOrder.indexOf(coffee);
    if (index > -1) {
      this.coffeeOrder.splice(index, 1);
    }
  }

  onSubmit() {
    // gather orders in memory to form
    this.itemForm.value.coffeeOrder = this.coffeeOrder;
    // get from value
    const data = this.itemForm.value;

    this.itemService.createCoffeeOrder(data).then((res) => {
      console.log(res);
      console.log('Order Submit to db');
      // clear order
      this.coffeeOrder = [];
    });
  }

  ngOnInit(): void {}
}
