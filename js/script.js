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
const mainPage = document.querySelector('.page')
const studentList = document.querySelector('.student-list');
const linkList = document.querySelector('.link-list');
const header = document.querySelector('header');
const li = linkList.children;
var htmlPage = "";
var pageButton = "";
let start = 0;
let end = 8;
let nameArray = [];
let objArray = [];
let notFound;


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

function removeActive() {
   for(let i = 0; i < li.length; i++) {
      li[i].children[0].className = ""; // remove all class names in the button
   }
}

function retrieveData() {
   for(let i = 0; i < data.length; i++) {
      let name = "";
      name = data[i].name.first + " " + data[i].name.last;
      nameArray.push(name);
      objArray.push(data[i]);
   }
}

function showNotFound() {
   const div = document.createElement('div');
   const h2 = document.createElement('h2');
   h2.innerHTML = 'No user found! :(';
   h2.className = 'not-found';
   div.appendChild(h2);
   mainPage.appendChild(div);
   studentList.style.display = 'none';
   linkList.style.display = 'none';
}

function showCard() {
   studentList.style.display = '';
      linkList.style.display = 'block';
      if(notFound !== null) {
         document.querySelector('.not-found').style.display = 'none';
      }
      if(objArray.length < 9){
         start = 0;
         end = objArray.length - 1
      } else {
         start = 0;
         end = 8;
      }
}

/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/

function showPage() {
   htmlPage = ""; // reset html code in every function calls
   for(let i = start; i <= end; i++){
      generateHTML(objArray[i]); // populate html code with the data
   }
   studentList.innerHTML = htmlPage;
}

/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/
function addPagination() {
   let numberOfPage = Math.ceil(objArray.length / 9); // figuring how many number of page necessary
   linkList.innerHTML = ""; // clear list inside studentList
   pageButton = "";
   for(let i = 0; i < numberOfPage; i++){ // generate page numbers based on the numberOfPage
      pageButton += `
      <li>
         <button type="button">${i + 1}</button> 
      </li>
      `
   }
   linkList.innerHTML = pageButton;
   linkList.firstElementChild.children[0].className = 'active';
   showPage();
}

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
   notFound = document.querySelector('.not-found');
   objArray = [];
   for(let i = 0; i < nameArray.length; i++) {
      if(nameArray[i].toLowerCase().includes(search.value.toLowerCase())) {
         objArray.push(data[i]); // if the search is true, push the object to the new array
      }
   }
   if(objArray.length === 0) { // check if no results were found
      if(notFound === null) { // if notFound class doesn't exist
         showNotFound(); // create the div and the h2
      } else {
         document.querySelector('.not-found').style.display = 'block'; 
         studentList.style.display = 'none';
         linkList.style.display = 'none';
      }
      
   } else {
      showCard();
      removeActive();
      addPagination();
   }
   
   
}


// Call functions ON LOAD
retrieveData(); // move data to the new array
addPagination(); // calling function to populate page numbers on load
addSearch(); // calling function to populate search bar on load

const search = document.querySelector('#search');
const studentCard = document.querySelectorAll('.student-item');


// EVENT LISTENER

linkList.addEventListener('click', (e) => {
   const target = e.target;
   if( target.tagName === 'BUTTON' && target !== linkList.lastElementChild.children[0]) {
      end = parseInt(target.innerText) * 8;
      start = end - 8;
      removeActive();
      showPage();
      target.className = 'active';
   } else if (target.tagName === 'BUTTON'){
      end = objArray.length - 1;
      start = parseInt(target.innerText) * 9 - 9;
      showPage();
      removeActive();
      target.className = 'active';
   }
});

search.addEventListener('keyup', searchFeature);

