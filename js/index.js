document.addEventListener("DOMContentLoaded", function(){
    // Define variables to store HTML elements
const searchForm = document.getElementById('github-form');
const userList = document.getElementById('user-list');
const reposList = document.getElementById('repos-list');

// Define function to search for users
async function searchUsers(event) {
  // Prevent the form from submitting
  event.preventDefault();

  // Get the user search query from the form input
  const searchInput = document.getElementById('search');
  const query = searchInput.value;

  // Make a GET request to the User Search Endpoint using the Fetch API
  const response = await fetch(`https://api.github.com/search/users?q=${query}`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  const data = await response.json();

  // Display information about the users to the page
  displayUsers(data.items);
}

// Define function to display information about the users to the page
function displayUsers(users) {
  // Clear any existing user and repo information from the page
  userList.innerHTML = '';
  reposList.innerHTML = '';

  // Loop through the list of users and create an HTML element for each user
  for (let user of users) {
    const userElement = document.createElement('li');
    userElement.classList.add('card', 'user-card');
    userElement.innerHTML = `
    <div class="card-content">
      <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
      <a href="${user.html_url}" target="_blank">${user.login}</a>
      </div>
    `;
    userList.appendChild(userElement);

    // Add event listener to the user element to search for the user's repos when clicked
    userElement.addEventListener('click', () => {
      searchRepos(user.login);
    });
  }
}

// Define function to search for repos for a given user
async function searchRepos(username) {
  // Make a GET request to the User Repos Endpoint using the Fetch API
  const response = await fetch(`https://api.github.com/users/${username}/repos`, {
    headers: {
      'Accept': 'application/vnd.github.v3+json'
    }
  });
  const data = await response.json();

  // Display all the repositories for the user on the page
  displayRepos(data);
}

// Define function to display all the repositories for a user on the page
function displayRepos(repos) {
  // Clear any existing repo information from the page
  reposList.innerHTML = '';

  // Loop through the list of repos and create an HTML element for each repo
  for (let repo of repos) {
    const repoElement = document.createElement('li');
    repoElement.classList.add('card', 'repo-card');
    repoElement.innerHTML = `
    <div class="card-content">
      <a href="${repo.html_url}" target="_blank">${repo.name}</a>
      </div>
    `;
    reposList.appendChild(repoElement);
  }
}

// Add event listener to the form to search for users when submitted
searchForm.addEventListener('submit', searchUsers);


});