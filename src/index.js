import React from 'react';
import './index.css';
import App from './App';
import { createRoot } from 'react-dom/client';

// FIRST PART OF THE TEST WORK

// React 18 Render API 

const container = document.getElementById('app');
const root = createRoot(container);
root.render(<App tab="home" />);

// SECOND PART OF TEST WORK

// 1. Визначити загальну кількість елементів у DOM-дереві.
let dom_list = document.getElementsByTagName("*");
console.log(dom_list.length);



// 2. Сгрупувати елементи за назвою тегу, визначити кількість елементів для кожного тегу.
let uniqueTagNameSet = new Set(Array.prototype.slice.call(dom_list).map(i=>i.tagName)); //get all unique tag names used in app
let uniqueTagNameArr = Array.from(uniqueTagNameSet).map(i => i.toLowerCase()); // convert Set to map and put tag names to lower case
let groupedByTagName = []; // initialize "store" for grouped elements by tag name
const getElement = (tag_name) => {
   return Array.prototype.slice.call(document.getElementsByTagName(tag_name)) 
} // create func to automate getting elements by tag name

for(let i = 0; i < uniqueTagNameArr.length; i++) {
    groupedByTagName.push(getElement(uniqueTagNameArr[i]))
} // get and group elements by tag name

console.log(groupedByTagName); // show grouped elements
for (let i of groupedByTagName) {
    console.log(i, i.length)
 } // show the number of items for each tag



// 3. Сгрупувати елементи за кількістю символів у назві тегу, визначити кількість елементів
const getTagLength = (dom_arr, length) => {
    return Array.prototype.slice.call(dom_arr).map(i=>i.tagName).filter(i=> i.length === length)
} // create func to get all elements up to max length tag in app
const maxLengthOfTagName = Math.max.apply(null, Array.prototype.slice.call(dom_list).map(i=>i.tagName.length)); // get element with max name length

let groupedByCharsQuantity = []; // initialize "store" for grouped elements by name length

for(let i = 0; i <= maxLengthOfTagName; i++ ) {
    groupedByCharsQuantity.push(getTagLength(dom_list, i))
} // get and group elements by name length

console.log(groupedByCharsQuantity.filter(i=>i.length>0), groupedByCharsQuantity.length) // show results
