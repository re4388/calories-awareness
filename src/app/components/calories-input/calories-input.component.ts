import { Component, OnInit } from '@angular/core';
import { CaloriesService0 } from '../../services/calories-service0.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calories-input',
  templateUrl: './calories-input.component.html',
  styleUrls: ['./calories-input.component.css'],
})
export class CaloriesInputComponent implements OnInit {
  constructor(public caloriesService: CaloriesService0) {}

  // date = new FormControl(new Date());
  // serializedDate = new FormControl(new Date().toISOString());

  itemForm = new FormGroup({
    caloriesIntake: new FormControl('', [
      Validators.required,
      Validators.pattern('^[0-9]*$'),
      Validators.maxLength(5),
    ]),
    mealType: new FormControl('', [Validators.required]),
    dateSelected: new FormControl(new Date(), [Validators.required]),
  });

  getOptionError(): string | null {
    if (this.mealType.hasError('required')) {
      return 'You must selection an option';
    }
  }

  getDateError(): string | null {
    if (this.mealType.hasError('required')) {
      return 'You must select a date';
    }
  }

  getCaloriesError(): string | null {
    if (this.caloriesIntake.hasError('maxlength')) {
      return 'The character must be less than 6';
    }

    if (this.caloriesIntake.hasError('required')) {
      return 'You must enter a value';
    }

    return this.caloriesIntake.hasError('pattern') ? 'number only' : '';
  }

  get caloriesIntake() {
    return this.itemForm.get('caloriesIntake');
  }

  get mealType() {
    return this.itemForm.get('mealType');
  }

  get dateSelected() {
    return this.itemForm.get('dateSelected');
  }

  onSubmit() {
    if (this.itemForm.valid) {
      // get from value
      const data = this.itemForm.value;
      console.log('before send', data);
      // add to firebase store

      this.caloriesService.addtoCalories(data).then((response) => {
        console.log(`addRow response`, response);
        console.log('Order Submit to db');
      });
    }
    // console.log(this.itemForm);

    this.itemForm.reset();
  }

  ngOnInit(): void {}
}
