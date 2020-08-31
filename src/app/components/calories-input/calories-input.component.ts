import { Component, OnInit } from '@angular/core';
import { CaloriesService0 } from '../../services/calories-service0.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-calories-input',
  templateUrl: './calories-input.component.html',
  styleUrls: ['./calories-input.component.css'],
})
export class CaloriesInputComponent implements OnInit {
  data: any = {
    caloriesIntake: '',
    mealType: '',
    dateSelected: new Date(),
  };
  itemForm: FormGroup;

  constructor(
    public caloriesService: CaloriesService0,
    private fb: FormBuilder
  ) {}

  // date = new FormControl(new Date());
  // serializedDate = new FormControl(new Date().toISOString());

  ngOnInit(): void {
    this.itemForm = this.fb.group({
      caloriesIntake: this.fb.control('', {
        validators: [
          Validators.required,
          Validators.pattern('^[0-9]*$'),
          Validators.maxLength(5),
        ],
      }),
      mealType: this.fb.control('', {
        validators: [
          Validators.required ],
      }),
      dateSelected: this.fb.control('', {
        validators: [
          Validators.required ],
      }),

    });

    this.itemForm.setValue(this.data);
  }

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

  onSubmit(): void {
    switch (this.itemForm.status) {
      case 'VALID':
        const data = this.itemForm.value;
        console.log('before send', data);

        // add to firebase store
        this.caloriesService.addtoCalories(data).then((response) => {
          console.log(`addRow response`, response);
          console.log('Order Submit to db');
        });
        this.itemForm.reset(this.data);
        break;
      case 'INVALID':
        alert(' 表單驗證失敗，無法送出表單！');
        break;
      case 'PENDING':
        alert(' 表單驗證進行中，請稍後再試...');
        break;
      case 'DISABLED':
        break;
    }
    this.itemForm.reset();
  }
}
