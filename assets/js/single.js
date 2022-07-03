/** Global Variables
 ******************************************************************************/
var issueContainerEl = document.querySelector("#issues-container");
var limitWarningEl = document.querySelector("#limit-warning");
/** Functions
 ******************************************************************************/
var getRepoIssues = function (repo) {
  var apiUrl = "https://api.github.com/repos/" + repo + "/issues?direction=asc";

  fetch(apiUrl).then(function (response) {
    //check if response is successfull
    if (response.ok) {
      response.json().then(function (data) {
        // pass response data to dom function
        displayIssues(data);

        //check if api has paginated issues
        if (response.headers.get("Link")) {
          displayWarning(repo);
        }
      });
    } else {
      alert("There was a problem with the request");
    }
  });
};

var displayIssues = function (issues) {
  // chekc if issues were there
  if (issues.length === 0) {
    issueContainerEl.textContent = "This repo has no open issues";
    return;
  }

  for (var issue of issues) {
    //create link element to take users to the issue on github
    var issueEl = document.createElement("a");

    issueEl.classList = "list-item flex-row justify-space-between align-center";
    issueEl.setAttribute("href", issue.html_url);
    issueEl.setAttribute("target", "_blank");

    //create span to hold issue title
    var titleEl = document.createElement("span");
    titleEl.textContent = issue.title;

    //append to continaer
    issueEl.appendChild(titleEl);

    //create a type element
    var typeEl = document.createElement("span");

    //check if issue is actuall issue or a pull request
    if (issue.pull_request) {
      typeEl.textContent = "(Pull request)";
    } else {
      typeEl.textContent + "(Issue)";
    }
    issueEl.appendChild(typeEl);

    //append issueEl to container
    issueContainerEl.appendChild(issueEl);
  }
};

var displayWarning = function (repo) {
  //add text to warning container
  limitWarningEl.textContent = "To see more than 30 issues, visit ";

  var linkEl = document.createElement("a");
  linkEl.textContent = "See More Issues on GitHub.com";
  linkEl.setAttribute("href", "https://github.com/" + repo + "/issues");
  linkEl.setAttribute("target", "_blank");

  // append to warning container
  limitWarningEl.appendChild(linkEl);
};
/** Main Program
 ******************************************************************************/
getRepoIssues("facebook/react");
