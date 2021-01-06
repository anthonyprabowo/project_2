/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/

/*
   variables
*/
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('header');
var htmlPage = "";
var pageButton = "";
let start = 0;
let end = 9;

/*
   Helper Functions
*/

function generateHTML(obj) {
   htmlPage += `
      <li class="student-item cf">
         <div class="student-details">
            <img class="avatar" src=${obj.picture.thumbnail} alt="Profile Picture">
            <h3>${obj.name.first} ${obj.name.last}</h3>
            <span class="email">${obj.email}</span>
         </div>
         <div class="joined-details">
            <span class="date">Joined ${obj.registered.date}</span>
         </div>
      </li>
   `;
}

function removeActive(arr) {
   for(let i = 0; i < arr.length; i++) {
      page[i].className = ""; // remove all class names in the button
   }
}


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage() {
   htmlPage = ""; // reset html code in every function calls
   for(let i = start; i < end; i++){
      generateHTML(data[i]); // populate html code with the data
   }
   studentList.innerHTML = htmlPage;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination() {
   let numberOfPage = Math.ceil(data.length / 9); // figuring how many number of page necessary
   for(let i = 0; i < numberOfPage; i++){ // generate page numbers based on the numberOfPage
      pageButton += `
      <li>
         <button class="page-button" type="button">${i + 1}</button> 
      </li>
      `
   }
   linkList.innerHTML = pageButton;
}


/* 
<label for="search" class="student-search">
            <input id="search" placeholder="Search by name...">
            <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
</label>
*/

// SEARCH FUNCTION
function addSearch() {
   // create element
   let input = document.createElement('input'); 
   let button = document.createElement('button');
   let img = document.createElement('img');
   let label = document.createElement('label');

   // setting attribute
   img.setAttribute('src', "img/icn-search.svg")
   img.setAttribute('alt', "Search icon")

   input.setAttribute('id', 'search');
   input.setAttribute('placeholder', "Search by name...")
   
   button.appendChild(img);
   button.setAttribute('type', "button");
   
   label.setAttribute('for', 'search');
   label.setAttribute('class', 'student-search');

   // append child
   label.appendChild(input);
   label.appendChild(button);

   header.appendChild(label);
}

// SEARCH FEATURE
function searchFeature() {
   for(let i = 0; i < h3s.length; i++) {
      if(h3s[i].innerText.toLowerCase().includes(search.value.toLowerCase())) {
         studentCard[i].style.display = 'flex';
      } else {
         studentCard[i].style.display = 'none';
      }
   }
}


// Call functions ON LOAD

showPage(); // calling function to populate on load
addPagination(); // calling function to populate page numbers on load
addSearch(); // calling function to populate search bar on load

const page = document.querySelectorAll('.page-button');
const h3s = document.querySelectorAll('h3');
const search = document.querySelector('#search');
const studentCard = document.querySelectorAll('.student-item');
page[0].className = 'active';


// EVENT LISTENER
for(let i = 0; i < page.length; i++){
   page[i].addEventListener('click', () => {
      if(i === page.length - 1) {
         end = data.length - 1; // getting the last index of the array
         start = ((i + 1) * 9) - 9; // using the same formula as below to get the start index
         showPage(); // call showPage function to get the new HTML
         
      } else {
         end = (i+1) * 9; // adding 1 to i and multiple it to get the end index
         start = end - 9; // removing 9 from end to get the start index
         showPage(); // call showPage function to get the new HTML
      }
      removeActive(page);
      page[i].className = 'active';
   });
};

search.addEventListener('keyup', searchFeature);

