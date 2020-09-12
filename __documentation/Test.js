//here is an idea on how to get the pagination to work

//data will be stored in state and is our full items array. In this case, it's an array full of numbers representing our 349 items.
let data = [];

for (i = 0; i < 349; i++) {
  data.push(i);
}

const numberOfItems = data.length; //outputs 349

//Items per page is a variable for now. It could be something that is changed from the user and could be stored in state.

let itemsPerPage = 20;

const pages = Math.ceil(numberOfItems / itemsPerPage);

//Current Page is a react state that starts at 1 and changes when the user selects the page

let currentPage = 1;

const NumOneOfSlice = (currentPage - 1) * itemsPerPage;

const NumTwoOfSlice = NumOneOfSlice + itemsPerPage;

let ArrayToMapOver = data.slice(NumOneOfSlice, NumTwoOfSlice);

console.log(ArrayToMapOver);
