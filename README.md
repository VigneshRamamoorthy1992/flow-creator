# Flow Creator
## About app

DEMO [flow-creator](https://flow-creator-amex.herokuapp.com/)

## Gettig started

```
git clone https://github.com/VigneshRamamoorthy1992/flow-json.git
npm install
npm start
```

on error, run <br/>
`npm audit fix`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

running test cases <br/>
`npm test`
 
# Approach

## Problem Statement

Applcation should be able to download a formatted json based on user definition of page flow using business entities

- User can create a sequential flow of business entities
- Business entities are pre-defined
- All entities consist of string fields as additional information
- Flow creation should be done through drag and drop

## Problem Approach

- Create a single page application which consist of a canvas area and asset library from which user can drag and drop business entities
- User should be add / remove business entites to canvas
- User should be able to edit the attribute corresponds to the business entity
- User should have the provision to save / cancel user entered values
- User should be able to reset the canvas
- User should be able to add and remove entities at any node

## UX Approach

- As per problem statement, User creates a sequential flow of business entities and no branching involved use html drag and drop (no library required)
- Initial state user should be able to drop entity to any part of the canvas
- After initial addition user should have an option to add before (drop area) / after (drop area) / between entity (arrow - drop area)
- Clicking should select / deselect 
- On entity selection, User should be shown with corresponding attributes to selected business entity
- On Save / Cancel selection should be removed
- Reset button to reset the canvas
- Download button to download created flow json (minimum of 1 should be added to canvas)

## Scalability

- Applcation should have a state management
- Business entities are configurable through data.tsx will be configured through an api (TBD)
- Update data.tsx to add / remove business entities and its associated fields
- Redux-thunk set up of api requests through state management
- Axios has been added for http requests
- Routing has been added of exting the app to more than one page

# Architecture

High level architecture of the application.

![image](https://user-images.githubusercontent.com/31540363/129479465-24f4887c-c5aa-4a2f-a669-969112c2ddc3.png)

The application state is managed through [Redux](https://redux.js.org/introduction/getting-started) and the app has one feature moudule
which includes a home page which in turn has `flow canvas` and `flow asset`. All the business entities are added to `configuration`

# User Interface

User Interface is segrigated into `assets area` and `canvas area`

![image](https://user-images.githubusercontent.com/31540363/129479742-0a9cbe62-2cc6-4347-83f1-6240d01ca372.png)

`assets area` includes draggable `business entities` `reset` `download json` on asset selection `user input fields` 
`canvas area` includes droppable  `work space`

# Libraries
- react
- redux
- react-scripts
- typescript
- redux-devtools-extension

## Libraries for future use case
- redux-thunk
- react-router-dom
- axios


