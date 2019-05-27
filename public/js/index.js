//This is commenting out the variables used inside of the starter files that I am not using

// // Get references to page elements
// var $exampleText = $("#example-text");
// var $exampleDescription = $("#example-description");
// var $submitBtn = $("#submit");
// var $exampleList = $("#example-list");

function productSelect() {
  //productBuild;
}
productSelect();

function newUser(name, password) {
  $.post(
    "/api/user",
    {
      userName: name,
      password: password
    },
    function() {
      console.log("Welcome New User %s", name);
    }
  );
}

function loginUser(name, password) {
  $.get("/api/users/" + name).then(function(data) {
    if (password === data.password) {
      location.replace("/user/home"), console.log("Welcome back %s!", data);
      // $(".optionSelection").hide();
    } else {
      console.log("failure");
    }
  });
}

$(document).ready(function() {
  $(".optionSelection").hide();
});

$(".choice").click(function() {
  var productBuild = $("this").data("id");
  $(".page").empty();
  $(".optionSelection").show();
  return productBuild;
});
//
$(".register").click(function(event) {
  event.preventDefault();
  var name = $("#registerEmail").val();
  var password = $("#confirmPassword").val();
  newUser(name, password);
});

$("#login").click(function(event) {
  event.preventDefault();
  console.log("hey");
  var name = $("#inputEmail").val();
  var password = $("#inputPassword").val();
  loginUser(name, password);
});

//I've commented out everything the starter file gave that I'm not using

//I left it in just in case I made a mistake

//This is a prototype and rough skeleton of whats to come

//$(".start").hide();
// The API object contains methods for each kind of request we'll make
// var API = {
//   saveExample: function(example) {
//     return $.ajax({
//       headers: {
//         "Content-Type": "application/json"
//       },
//       type: "POST",
//       url: "api/examples",
//       data: JSON.stringify(example)
//     });
//   },
//   getExamples: function() {
//     return $.ajax({
//       url: "api/examples",
//       type: "GET"
//     });
//   },
//   deleteExample: function(id) {
//     return $.ajax({
//       url: "api/examples/" + id,
//       type: "DELETE"
//     });
//   }
// };

// // refreshExamples gets new examples from the db and repopulates the list
// var refreshExamples = function() {
//   API.getExamples().then(function(data) {
//     var $examples = data.map(function(example) {
//       var $a = $("<a>")
//         .text(example.text)
//         .attr("href", "/example/" + example.id);

//       var $li = $("<li>")
//         .attr({
//           class: "list-group-item",
//           "data-id": example.id
//         })
//         .append($a);

//       var $button = $("<button>")
//         .addClass("btn btn-danger float-right delete")
//         .text("ｘ");

//       $li.append($button);

//       return $li;
//     });

//     $exampleList.empty();
//     $exampleList.append($examples);
//   });
// };

// // handleFormSubmit is called whenever we submit a new example
// // Save the new example to the db and refresh the list
// var handleFormSubmit = function(event) {
//   event.preventDefault();

//   var example = {
//     text: $exampleText.val().trim(),
//     description: $exampleDescription.val().trim()
//   };

//   if (!(example.text && example.description)) {
//     alert("You must enter an example text and description!");
//     return;
//   }

//   API.saveExample(example).then(function() {
//     // refreshExamples();
//     location.reload();
//   });

//   $exampleText.val("");
//   $exampleDescription.val("");
// };

// // handleDeleteBtnClick is called when an example's delete button is clicked
// // Remove the example from the db and refresh the list
// var handleDeleteBtnClick = function() {
//   var idToDelete = $(this)
//     .parent()
//     .attr("data-id");

//   API.deleteExample(idToDelete).then(function() {
//     refreshExamples();
//   });
// };

// // Add event listeners to the submit and delete buttons
// $submitBtn.on("click", handleFormSubmit);
// $exampleList.on("click", ".delete", handleDeleteBtnClick);
