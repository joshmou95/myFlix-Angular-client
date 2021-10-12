# MyFlixAngularClient

![angular-app](https://user-images.githubusercontent.com/80426764/136888094-70ae00f9-0715-4ef3-a53a-6ce14445c515.gif)

Build a client-side for an application called myFlix based on the existing server-side code REST API and database movie-api. 

A single page, responsive movie app built with Angular with routing and several interface views. 

Users will be able to user the app whenever they want to read information about different movies or update their user information.

## User Stories
● As a user, I want to be able to receive information on movies, directors, and genres so that I can learn more about movies I’ve watched or am interested in.
● As a user, I want to be able to create a profile so I can save data about my favorite movies.

## Key Features
● App displays a welcome view where users are able to either log in or register an account.
● Once authenticated, the user will now view all movies.
● On the movie card, there are links to the movie genre, director, and movie synopsis, as well as one that adds the movie to their favorites. 
● When a user clicks on any of these links, a dialog opens that displays more details.
● There is user profile component that allows users to view/edit their profile.
● Angular's router is used to implement a route for the welcome view and user profile view.
● Angular Material is used to create a responsive simple UI design.

## Technical Requirements
● The application must be written in Angular (version 9 or later)
● The application requires the latest version of Node.js and npm package
● The application must contain user registration and login forms
● The application must be designed using Angular Material
● The application's codebase must contain comments using Typedoc
● The project must contain technical documentation using JSDoc
● The project must be hosted on GitHub Pages

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
