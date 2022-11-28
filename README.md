# credit-card-validation-app

## App Requirements

    Build a front-end application that allows admins to submit a bunch of credit card numbers for validation:

| App Requirements                                                                         | Status  |
| ---------------------------------------------------------------------------------------- | ------- |
| Allow the user to submit credit card details, including the country that it is from.     | &check; |
| Check the specified country to make sure it doesn't exist in a list of banned countries. | &check; |
| Make the list of banned countries configurable.                                          | &check; |
| If the card is valid - store it somewhere for the session.                               | &check; |
| Display all the credit cards that have been captured during the session.                 | &check; |
| Don't capture the same card twice.                                                       | &check; |

## Gif of App

![Credit Card Verification](https://user-images.githubusercontent.com/33910776/204276534-852fe5b0-fad7-4003-a3f1-0d3b793d2d2e.gif)

## How to run the app

    npm run dev

## How to run Vitest

    npm run test

## How to run Cypress tests

    npm run cypress:open
    npm run cypress:run

## About Build

For my app I used HeadlessUI for my modal, which I styled and added functionality to. I chose to build everything else from scratch as a learning opportunity.
The validation on the forms was rather tricky and I now have a new found appreciation for Formik!

## Gif of Cypress Tests

![Cypress Tests](https://user-images.githubusercontent.com/33910776/204277123-c126fa04-fd65-4fb8-9c7c-6cff09489efa.gif)

