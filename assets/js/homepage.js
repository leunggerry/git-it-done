/** Global Variables
 ******************************************************************************/
var userFormEl = document.querySelector("#user-form");
var nameInputEl = document.querySelector("#username");

var repoContinerEl = document.querySelector("#repos-container");
var repoSearchTermEl = document.querySelector("#repo-search-term");

/** Function Definitions
 *****************************************************************************/
/**
 * @name getUserRepos
 * @description
 *
 * @param {*} user
 */
var getUserRepos = function (user) {
  //format the git hub api url
  var apiUrl = "https://api.github.com/users/" + user + "/repos";

  //make the request to the url
  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          displayRepos(data, user);
        });
      } else {
        alert("Error: GitHub user Not Found");
      }
      // console.log("inside");
    })
    .catch(function (error) {
      // this .catch() is chained on the end of the .then() method
      alert("unable to connect to github");
    });
  //console.log("outside");
};

/**
 *
 * @param {*} event
 */
var formSubmitHandler = function (event) {
  // prefents broswer form sending the form's input data to a url
  event.preventDefault();

  //get value form unput element
  var username = nameInputEl.value.trim();

  if (username) {
    getUserRepos(username);
    nameInputEl.value = "";
  } else {
    alert("Please enter a GitHub username");
  }
};

var displayRepos = function (repos, searchTerm) {
  //   console.log(repos);
  //   console.log(searchTerm);

  // check if api returned any repos
  if (repos.length === 0) {
    repoContinerEl.textContent = "No Repositories found.";
    return;
  }
  // clear old content
  repoContinerEl.textContent = "";
  repoSearchTermEl.textContent = searchTerm;

  //loop over repos
  for (r of repos) {
    //format repo name
    var repoName = r.owner.login + "/" + r.name;

    //create a container for each repo
    var repoEl = document.createElement("div");
    repoEl.classList = "list-item flex-row justify-space-between align-center";

    // create a span element to hold repo name
    var titleEl = document.createElement("span");
    titleEl.textContent = repoName;

    // append to container
    repoEl.appendChild(titleEl);

    //create status element
    var statusEl = document.createElement("span");
    statusEl.classList = "flex-row align-center";

    //check if current repo has issues or not
    if (r.open_issues_count > 0) {
      statusEl.innerHTML =
        "<i class='fas fa-times status-icon icon-danger'></i>" + r.open_issues_count + " issue(s)";
    } else {
      statusEl.innerHTML = "<i class='fas fa-check-square status-icon icon-success'></i>";
    }

    //append to container
    repoEl.appendChild(statusEl);

    //append container to the dom
    repoContinerEl.appendChild(repoEl);
  }
};
/** Main Program
 ******************************************************************************/
userFormEl.addEventListener("submit", formSubmitHandler);
