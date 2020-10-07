# CaloriesIntake

## TODO

- [] gradually adopt TS strict mode 20201007

## Demo site (hosted in Firebase)

[firebase hosting](https://code-train-2ba48.web.app)

## How to use

- if you want to use this repo as your own one, you will need to add your own environment.ts file, something like below format.
  ```js
  export const environment = {
    production: false,
    firebaseConfig: {
      apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
      authDomain: "XXXXXXXXXXXXXXXXX.firebaseapp.com",
      databaseURL: "https://XXXXXXXXXXXX.firebaseio.com",
      projectId: "XXXXXXXXXXXXXXXXX",
      storageBucket: "XXXXXXXXXXXXXXXXX.appspot.com",
      messagingSenderId: "XXXXXX",
      appId: "1:XXXX:web:XXXX",
    },
  };
  ```

## Below is the readme for typical Angular 10 APP on CLI instruction

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
