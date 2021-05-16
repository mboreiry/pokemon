
## Title

Pokemon Api

## Table of contents
* [General info](#general-info)
* [Components](#Components)
* [Services](#Services)
* [Technologies](#technologies)
* [Setup](#setup)

## General info

This app displays a Pokedex of all existing Pokemon, using the PokeAPI (https://pokeapi.co/), a list can be the result of a user search(As the user search process is ignored so the project starts from the results screen).
You can see pokemon detail and its evolution by clicking on each pokemon.

## Components
"List.tsx" : In this component the list of pokemons shows, by changing the page number(in bottom of the page) you can move to other pages.

"Profile.tsx" : This component shows pokemon profile (containing its name and image).

"ProfileImage.tsx" : This component is responsible to load pokemon image profile
It consists of three state:
- image is OK: show pokemon image
- image is loading : shows skeleton
- image is not found : shows default image

"Detail.tsx" : This component is responsible to show pokemon detail and its evolution.

"Evolutions.tsx" : This component is responsible to load pokemon evolutions.

"Loading.tsx" : A page to show during service calling.

## Services
"PokeService.ts" : All services at the app will be written in PokeService.js file.

"executer": Is a function which is responsible for executing and managing request errors.

"DefaultValue" : Is the parameter which tells the executor in a case of error what we expect to see. eg: [], {}, null

"onError function" : which is responsible for error handling, eg : log somewhere, show special error, call another func.


## Technologies
Project is created with:
```
	- react 17.0.2
	- typescript 4.2.4
	- sass 1.32.12
	- material-ui/core 4.11.4
	- material-ui/lab 4.0.0-alpha.58
	- enzyme 3.11.0
	- enzyme-adapter-react-16 1.15.6
```
	
## Setup
To run this project, install it locally using npm:

```
$ cd ../pokemon
$ npm install
$ npm start
```


