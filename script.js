var form = document.getElementById("myform");
var currentPage = 1;

// Function to be performed after clicking the form
form.addEventListener("submit", function (e) {
  e.preventDefault();
  var search = document.getElementById("search").value;
  var fullname = search.split("").join("");
  var postperpage = document.getElementById("perPage").value;
  console.log(postperpage);

  // Calling function to display loader before making Api Call
  showloader();

  // Api call to fetch information of user
  fetch("https://api.github.com/users/" + fullname)
    .then((result) => {
      if (!result.ok) {
        alert("User Not found");
        throw new Error("Network response was not ok");
      }
      hideloader();
      return result.json();
    })
    .then((data) => {
      console.log(data);
      document.getElementById("imagediv").innerHTML = `
      
     <img src= "${data.avatar_url} class = "image">
     
     `;

      document.getElementById("details").innerHTML = `
     <h3> ${data.name}</h3>
     <h6> Bio:  ${data.bio}</h6>
     
    <h6> <i class="fa fa-location-arrow" aria-hidden="true"></i>  ${data.location}</h6>
 
     <h6> twitter: ${data.twitter_username} </h6>
     <i class="fa fa-link" aria-hidden="true"></i> <a href="${data.url}"> Github-link </a>
     `;

      // Function call to fetch repository of user
      fetchRepos();
    })
    .catch((error) => {
      console.error("Error:", error);
      window.location.reload();
    });
});

function fetchRepos() {
  var search = document.getElementById("search").value;
  const fullname = search.split("").join("");
  var postperpage = document.getElementById("perPage").value;
  console.log(postperpage);
  const paginatedURL = `https://api.github.com/users/${fullname}/repos?per_page=${postperpage}&page=${currentPage}`;

  fetch(paginatedURL, {
    headers: {
      Accept: "application/vnd.github.v3+json",
    },
  })
    .then((result) => result.json())
    .then((data) => {
      console.log(data);
      let data1 = "";

      data.map((values) => {
        data1 += `<div class="card">
          <h6 class="title">${values.name}</h6>
          <p class = "card-des"> Description: ${values.description}</p>
          <div class="skills">
          <p > Skills: ${values.language}</p>
          </div>
        </div>`;

        // Inserting load button to display other results
        document.getElementById(
          "load"
        ).innerHTML = `<button class="btn btn-block btn-danger">Load more</button>`;
      });

      document.getElementById("cards").innerHTML = data1;
    });
}

load.addEventListener("click", () => {
  currentPage++;
  fetchRepos();
});

function showloader() {
  $("#loader").fadeIn();
}

function hideloader() {
  $("#loader").fadeOut();
}
