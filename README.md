#ContactsBook
##Angular, ngrx/store example application

###Task: 
Create a simple contact management application using Angular (9.1.x) and ngrx/store (9.0.0). Track your progress using git commits. Please provide us access to your finished project (e.g. via Github link) when you’re done.

###Use case: 
The contact management application should consist out of three parts:  

• A form to add new contact details  
• A table displaying a simplified list of all recorded contacts  
• A contact detail view displaying the full  contact details of the currently selected contact  

A registered contact should include the following information:  
• First name (string)  
• Last name (string)  
• Phone (string)  
• Email (string)  
• Address (string)  

###Add new contact form:
Should allow to add new contact details to the system, e.g. via a set of text boxes and a “Add”-button.

###Contact list:
Should be a simple table only displaying first- and last name of all registered contacts. Clicking an entry should select it. The selected entry should be highlighted.

###Contact detail view:
Should display the full contact information of the currently selected (last clicked on) entry from the contact list.  

###Add karma/jasmine unit tests to check your applications behavior.


###Notes:
• Application state should be managed through ngrx/store.  
• Input validation at the “Add new contact”-form is NOT necessary.  
• Functionality to remove or edit registered contacts is NOT necessary.  
• Consider performance at component design.  
• Try to keep commits organized so that we can understand how you made progress in development.

# ContactsBook

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.12.

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
