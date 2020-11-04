---
# IdeaBox
###### Have great ideas? Save them here!
---
## Table of Contents
* [Introduction](#introduction)
* [Features](#features)
* [Technologies](#technologies)
* [Deployment](#deployment)
* [Authors](#authors)
* [Contributors](#contributors)

## Introduction
The primary goal of [IdeaBox](https://github.com/richardltyler/ideabox-boilerplate) is for users to be able to save and favorite ideas that come across their mind right away so that they won't forget about it. ([Project Specs](https://frontend.turing.io/projects/module-1/ideabox-group.html)).

## Motivation
The motivation behind this project's creation was to build an application to help the users save ideas that come into their mind on the spot if they do not have a pencil or paper around to write it down, while we focused on writing DRY JS and solidifying good habits in git workflow.
---

## Features
* [Create Your Ideas](#Create-Your-Ideas)
* [Search Ideas](#Search-Ideas)
* [Favorite Ideas](#Favorite-Ideas)
* [Delete Ideas](#Delete-Ideas)
* [Continuous Improvement/Future Improvements](#Continuous-Improvement/Future-Improvements)

#### Create Your Ideas
Got an idea? Enter in a title and your idea in the body area. Once everything is entered, click on the saved button, and your idea will show up right below the input area.
<p align = "center">
<img src="https://media.giphy.com/media/2OLnbrlVMtIplb5PWj/giphy.gif">
</p>
  <details>
    <summary>**Under the Hood**</summary>
    Using querySelector and `.value`, we take the user inputs we created and a function and interpolate the HTML to create the card with the users inputs from both the title field and body field. User must input text into both fields before the button will be clickable.
  </details>

#### Search Ideas
Have so many ideas? Need to find a specific one? Here, a user can type in a keyword or even a letter, and below, the search bar cards will begin to appear with that word or chain of letters that matches.
<p align = "center">
<img src="https://media.giphy.com/media/wLqHY54ouAi2GmeOGy/giphy.gif">
</p>
    <details>
      <summary>**Under the Hood**</summary>
      First a querySelector is used to access the search bar from HTML. Next by using `.value`, we can now take user input. Then by using a for loop, JS will go through our array, and using the method of `include`, we can search for any cards that include what the user input has typed in and add it to our new array of `matchIdea` to populate all matching cards.
    </details>

#### Favorite Ideas
Have ideas that you love? Users can favorite their ideas by clicking on the star. If the star is filled in with a red color, their Idea is now favorited. If it is white, then the idea is not favorited. Users are able to see all their favorite ideas when the `Show Starred Ideas` is clicked. Users are then able to click on that button again which will then read `Show All Ideas`.
<p align = "center">
<img src="https://media.giphy.com/media/tJcd1EsG3GUGBID5Gd/giphy.gif">
</p>
  <details>
    <summary>**Under the Hood**</summary>
    Using an event listener on the star, when it is clicked, our function  `favoriteCard` is invoked and within this function we are using event delegation to change the image source of the star as well as the className and changing our star value from our idea class from false to true and vice versa for unfavoriting a star.
  </details>

#### Delete Ideas
Realized your idea wasn't the best idea you had? Users can delete their idea by clicking on the `x` button. A user will know that they are able to delete the card when the mouse is hovered over the `x` and the color changes to red.
<p align = "center">
<img src="https://media.giphy.com/media/o6J9c88dLv96QZRuru/giphy.gif">
</p>
  <details>
    <summary>**Under the Hood**</summary>
     Using an event listener on the `x`, when it is clicked on, our function `deleteCard` is invoked, and within this function we are using event delegation to target the card's unique id. We are saying if that unique id is strictly equal to one another we are going to remove it from our array. After we remove it from our array, we are updating our local storage to show the updated array.
  </details>

#### Continuous Improvement/Future Improvements
 In the next iteration we hope to add:
  * Add a comment class and section
  * Ability for user to rearrange their cards
---

## Technologies
JS, HTML, & CSS
## Deployment
### https://richardltyler.github.io/ideabox-boilerplate/
## Authors
<table>
    <tr>
        <td> Thao Ma <a href="https://github.com/thaomonster">GH</td>
        <td> Richard Tyler <a href="https://github.com/richardltyler">GH</td>
        <td> Eric Campbell <a href="https://github.com/mainlyetcetera">GH</td>
    </tr>
<td><img src="https://avatars3.githubusercontent.com/u/67611512?s=400&u=ef3bac38d4f7d6d8a899d26ce1f0eb169f11bb9b&v=4" alt="Ms. Turtle"
 width="150" height="auto" /></td>
 <td><img src="https://avatars3.githubusercontent.com/u/70095063?s=460&u=39c274f1a2fbb88cc013de61aa8307596a988255&v=4" alt="Mr. Tyler"
 width="150" height="auto" /></td>
 <td><img src="https://avatars0.githubusercontent.com/u/70294115?s=460&u=b24fae5febb30e7d1c9507c51ee760dba5e396e5&v=4" alt="Mr. Campbell"
 width="150" height="auto" /></td>
</table>

## Contributors
    Thank you for your contributions!
For his help and direction as a reviewer: <a href="https://github.com/Corbinj22">Justin Corbin</a>
