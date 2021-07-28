/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

const header = document.querySelector('header');
const studentList = document.querySelector('ul.student-list');
const linkList = document.querySelector('ul.link-list');
const studentsPerPage = 9;
let studentData = data;
// initial load on page 1
let currentPage = 1;

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
   const startIdx = (page * studentsPerPage) - studentsPerPage;
   const endIdx = page * studentsPerPage;
   studentList.innerHTML = '';
   let html = '';
   // display message if zero search results
   if (list.length === 0) {
      html += `<h2 style="text-align: center">Sorry, no matching results</h2>`;
   } else {
      for (let i = startIdx; i < list.length; i++) {
         let student = list[i];
         if (i >= startIdx && i < endIdx) {
            html += `  
               <li class="student-item cf">
                  <div class="student-details">
                     <img class="avatar" src="${student.picture.large}" alt="Profile Picture">
                     <h3>${student.name.first} ${student.name.last}</h3>
                     <span class="email">${student.email}</span>
                  </div>
                  <div class="joined-details">
                     <span class="date">Joined ${student.registered.date}</span>
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

// Call functions
addSearchBar();
showPage(data, currentPage);
addPagination(data);

const searchFld = document.getElementById('search');
const searchBtn = searchFld.nextElementSibling;

searchBtn.addEventListener('click', () => {
   const searchTerm = searchFld.value.toUpperCase();
   searchFld.value = '';
   // if search field is empty, show all data
   studentData = searchTerm !== '' ? data.filter(student => student.name.first.toUpperCase() === searchTerm) : data;
   currentPage = 1;
   showPage(studentData, currentPage);
   addPagination(studentData);
});

linkList.addEventListener('click', (e) => {
   const button = e.target;
   // set current page to selected button value
   currentPage = button.innerText;
   // remove active class from previous
   document.querySelector('button.active').className = '';
   showPage(studentData, currentPage);
   // set active class on current target
   button.className = 'active';
});
