# Flow Creator

Flow Creator is a React application to generate a sequential work flow based on pre-defined business entities. A business user with no technical background will be able to use the given graphical user interface to create/update the workflows with ease. 

## Demo

[flow-creator](https://flow-creator-amex.herokuapp.com/)

## Development

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
 
# What has been done?

## Problem Statement

Applcation should be able to download a formatted json based on user definition of page flow using business entities

- User can create a sequential flow of business entities
- Business entities are pre-defined
- All entities consist of string fields as additional information
- Flow creation should be done through drag and drop

## Approach

The idea is to avoid any external third-party libraries and use the native features as much as possible. In this Project, HTML's [Drap and Drop API](https://developer.mozilla.org/en-US/docs/Web/API/HTML_Drag_and_Drop_API) is used extensively to provide the intended drag and drop functionality. The application is developed with three main components, Home, FlowCanvas & Flow Assets

- `FlowAsset` A React component to show list of pre-defined business entitites. They would be draggable and can be dropped into the `FlowCanvas` 
- `FlowCanvas` is the main area where the workflow is presented in sequential manner
- `Home` is the wrapper component that orchestrates both `FlowAsset` & `FlowCanvas`

The application is very much scallable and already have skeletons for routing and state management. We can extend them with ease whenever required. 

## Limitations
- The application is designed only to be used in regular screens. Touch screen access is not supported (YET!). 
- Business entities are configurable through data.tsx will be configured through an api (TBD)


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


