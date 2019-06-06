/* eslint-disable prettier/prettier */
//This is commenting out the variables used inside of the starter files that I am not using

//user registration function upon click that runs the validation for the new user
var orderSent = false;

$(".register").click(function(event) {
  event.preventDefault();
  var name = $("#registerEmail").val();
  var password1 = $("#registerPassword").val();
  var password2 = $("#confirmPassword").val();
  validateRegister(password1, password2);
  if (!check) {
    validate();
  } else if (check) {
    newUser(name, password2);
  }
});

//login logic that runs validation and allows the user to proceed
$("#login").click(function(event) {
  event.preventDefault();
  console.log("hey");
  var name = $("#inputEmail").val();
  var password = $("#inputPassword").val();
  userExists(name, password);
});

//Takes in two arguments to create a user entry using the user model, and
//changing the webpage to the website homepage
function newUser(name, password) {
  $.post(
    "/api/user",
    {
      userName: name,
      password: password
    },
    function(result) {
      console.log(result);
      console.log("Welcome New User %s", name);
      alert("Welcome %s!", name);
      location.replace("user/home");
    }
  );
}

//Runs a get request on the route using the user name, passed in as an argument,
//runs a validation function on the password and the returning data
//used for a user logging in
function loginUser(name, password) {
  $.get("/api/users/" + name).then(function(data) {
    validPassword(password, data);
  });
}

//Runs a get request using the username passed in for the route, runs validation
//for user registration, to see if the requesting username for registration
//is already being used
function userExists(name, password) {
  $.get("/api/users/" + name).then(function(data) {
    if (data === null) {
      alert("USER DOES NOT EXIST");
      return;
    } else {
      loginUser(name, password);
    }
  });
}

//Validation to check if the user password entered matching the corresponding
//password in the database
function validPassword(password, data) {
  if (password === data.password) {
    location.replace("/user/home"), console.log("Welcome back %s!", data);
    // $(".optionSelection").hide();
  } else {
    alert("INCORRECT PASSWORD");
  }
}

//validation checking if the use registering has entered the same two
//passwords
function validateRegister(first, second) {
  check = false;
  if (first === second) {
    return (check = true);
  } else {
    alert("Passwords do not match!");
    return;
  }
}


function pageReload(){
  location.reload();
}




//Creates a card on the main page after completing an order, containing the order
//and product information
function addOrder(order) {

  console.log(order.product);
  $(".page").empty();

  function yes () {
    $("#yes").text("okayt");
  }
  yes();

  $("#order-header").append($("<h1>").text("YESYESYESYESYESYE"));
  


  var orderCard = $("<div>").attr("class", "card");
  $("<img>")
    .attr("src", "/img/BusinessCard.jpg")
    .attr("id", "orderImg")
    //.attr("class", "card-img-top")
    .css("width", "150px")
    .css("height", "150px")
    .css("float", "left")
    .appendTo(orderCard);
  $("<div>")
    .attr("class", "card-body")
    .attr("id", "orderBody")
    .appendTo("#orderImg");
  $("<h1>")
    .text(order.product)
    .wrap("#orderBody");

    
  //orderCard.text("YES");
  $("#order-header").append(orderCard);
}

//creates the set of dropdowns to choose the additional options
//pertaining to the previously selected product
function dropdowns(id, data) {
  var form = $("<div />");
  form.attr("class", "form-group");
  var submit = $("<button>");
  submit
    .attr("class", "btn btn-primary")
    .attr("id", "submit")
    .attr("href", "user/home");
  submit.text("Submit");
  submit.css("float", "right");
  var orderQuery = [id];

  //Loops through each of the options for the product and creates a dropdown
  for (var i = 0; i < data.product_option_groups.length; i++) {
    $(".modal-body").empty();
    $(".modal-footer").empty();
    var dropdown = $("<select />");
    dropdown.attr("class", "custom-select");
    dropdown.attr("id", i);
    form.append(dropdown);
    // var label = $("<label>");
    // label.attr("for", "custom-select");
    // label.text(data.product_option_groups[i].product_option_group_name);
    var title = $("<h2>");
    title.text(data.product_option_groups[i].product_option_group_name);
    //console.log(data.product_option_groups[i].product_option_group_name);
    dropdown.prepend(title);
    dropdown.append(
      "UUU" + data.product_option_groups[i].product_option_group_name
    );

    //Loops through the option choices within the different categories and inserts
    //them into the appropriate dropdown
    function diut(i) {
      for (var v = 0; v < data.product_option_groups[i].options.length; v++) {
        var option = $("<option>").appendTo(dropdown);
        option.attr(
          "values",
          data.product_option_groups[i].options[v].option_uuid
        );
        option.append(
          data.product_option_groups[i].options[v].option_description
        );
      }
    }
    diut(i);
  }
  $(".modal-body").append(form);
  $(".modal-body").append(submit);

  console.log(orderQuery);

  //Upon clicking the submit button on this dynamimcally changed modal,
  //creates an array holding the details for the order
  $("#submit").click(function(event) {
    event.preventDefault();
    
    for (var j = 0; j < data.product_option_groups.length; j++) {
      orderQuery.push($("#" + j + " option:selected").attr("values"));
    }
    $(".orderList").empty();
    quoteGrab(orderQuery);
  });
}

//creates a post request to the 4over api with the details of the order
//and passing the final quote information and product details into
//the function that puts it into a card on the main page
function quoteGrab(orderQuery) {
  $.post("/api/4over/quote/", {
    //user_id: 82,
    product_uuid: orderQuery[0],
    orientation_uuid: orderQuery[1],
    colorspec_uuid: orderQuery[2],
    runsize_uuid: orderQuery[3],
    option_uuid: orderQuery[4],
    turnaroundtime_uuid: orderQuery[5]
  }).then(function(response) {
    order = {
      product: response.product_description,
      basePrice: response.base_price,
      customerPrice: response.customer_price,
      customerTax: response.customer_tax,
      customerTotal: response.customer_total
    };
    console.log(JSON.stringify(response.product_description));
    console.log("before page change");
    //location.href = "/user/home";
    console.log("Page redirected");
    //$(window).load(function(order){

    console.log("Page reloaded after redirect");
    $("#busCardModal").modal("hide");
    addOrder(order);
    //});
    
    console.log(JSON.stringify(response));
  });
}

//get request to the 4over api to retrieve the options for the chosen product
function conditions(id) {
  $.get("/api/4over/options/" + id).then(function(data) {
    $("#busCardModal").modal("show");
    dropdowns(id, data);
  });
}

//waits for the page to load so the jquery doesnt run into issues
$(document).ready(function() {
  $(".optionSelection").hide();
});

//switch case on the category page to display a modal appropriate to chosen
//product type
$(".choice").click(function() {
  var orderBuild = $(this).data("id");

  console.log(orderBuild);
  switch (orderBuild) {
  case "digPrint":
    console.log("yes");
    break;

  case "stickers":
    console.log("stickers");
    break;

  case "cutVinyl":
    console.log("yes");
    break;

  case "banners":
    console.log("yes");
    break;

  case "brochures":
    console.log("yes");
    break;

  case "businessCards":
    $("#busCardModal").modal("show");
    //grabs values from the specific type of the chosen product
    //and prompts the user with a confirmation
    $(".custom-select").click(function() {
      var id = $("option:selected", this).attr("values");
      console.log($(this).val());
      console.log(id);
      if (id !== undefined) {
        //conditions(id);
        console.log($(this).val());
        $(".orderModalContent").empty();
        $("#busImg").remove();
        var chosen = $("<h1>");
        chosen.html("You've chosen: <br>" + $(this).val());
        var confirm = $("<br><h2>");
        confirm.text("Is this correct?");
        chosen.append(confirm);
        $("#exampleModalLongTitle").append(chosen);
        //sends you to a new modal to choose the second stage of details
        //after confirmation
        $(".save").click(function() {
          console.log("clicked");
          $("#busCardModal").modal("hide");
          conditions(id);
          $("#exampleModalLongTitle").text("Please select the options");
        });
      }
    });
    console.log("yes");
    break;

  case "posters":
    console.log("yes");
    break;

  case "canPrints":
    console.log("yes");
    break;

  case "flyers":
    console.log("yes");
    break;

  default:
    console.log("wrong");
  }
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
