/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const header = document.querySelector('header');
const linkList = document.querySelector('ul.link-list');

const addSearchBar = () => {
   let searchBar = document.createElement('div');
   searchBar.innerHTML = `
      <label for="search" class="student-search">
         <span>Search by name</span>
         <input id="search" placeholder="Search by name...">
         <button type="button"><img src="img/icn-search.svg" alt="Search icon"></button>
      </label>
   `;
   header.append(searchBar);
};

const showPage = (list, page) => {
   const startIdx = (page * 9) - 9;
   const endIdx = page * 9;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   let html = '';
   // display message if zero search results
   if (list.length === 0) {
      html += `<h2 style="text-align: center">Sorry, no matching results</h2>`;
   } else {
      for (let i = startIdx; i < list.length; i++) {
         if (i >= startIdx && i < endIdx) {
            html += `  
               <li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src="${list[i].picture.large}" alt="Profile Picture">
                     <h3>${list[i].name.first} ${list[i].name.last}</h3>
                     <span class="email">${list[i].email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${list[i].registered.date}</span>
                  </div>
               </li>`;
         }
      }
   }
   studentList.innerHTML = html;
}

// adds the page selection buttons to bottom of page
const addPagination = (list) => {
   const pages = Math.ceil(list.length / 9);
   linkList.innerHTML = '';
   let html = '';
   for (let i = 1; i <= pages; i++) {
      html += `
         <li>
            <button type='button' class=${i === currentPage ? 'active' : ''}>${i}</button>
         </li>
      `;
   }
   linkList.innerHTML = html;
};

// initial load on page 1
let currentPage = 1;

// Call functions
addSearchBar();
showPage(data, currentPage);
addPagination(data);

const pageBtns = linkList.querySelectorAll('li button');
const searchFld = document.getElementById('search');
const searchBtn = searchFld.nextElementSibling;

searchBtn.addEventListener('click', () => {
   const searchTerm = searchFld.value.toUpperCase();
   searchFld.value = '';
   // if search field is empty, show all data
   let filterData = searchTerm !== '' ? data.filter(student => student.name.first.toUpperCase() === searchTerm) : data;

   showPage(filterData, 1);
   addPagination(filterData);
});

// attach event handler to each page button
for (let i = 0; i < pageBtns.length; i++) {
   pageBtns[i].addEventListener('click', (e) => {
      const button = e.target;
      // set current page to selected button value
      currentPage = button.innerText;
      // remove active class from previous
      document.querySelector('button.active').className = '';
      showPage(data, currentPage);
      // set active class on current target
      button.className = 'active';
   });
}