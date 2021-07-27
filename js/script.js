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
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
*/
const showPage = (list, page) => {
   const startIdx = (page * 9) - 9;
   const endIdx = page * 9;
   const studentList = document.querySelector('ul.student-list');
   studentList.innerHTML = '';
   let html = '';
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
   studentList.innerHTML = html;
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
*/

const addPagination = (list) => {
   const pages = Math.ceil(list.length / 9);
   const linkList = document.querySelector('ul.link-list');
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

const pageBtns = document.getElementsByTagName('button');
// initial load on page 1
let currentPage = 1;

// Call functions
showPage(data, currentPage);
addPagination(data);

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
   })
}