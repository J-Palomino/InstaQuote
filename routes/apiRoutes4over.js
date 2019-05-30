var db = require("../models");
const axios = require("axios");

var baseURL = "https://sandbox-api.4over.com/";
var apiKey = "?apikey=onlinedigitalmediallc";
var apiSignature =
  "&signature=63751b502346140aa0fc15c448d592f8346e5ae1a7aea41e683917eaa0f35809";

module.exports = function(app) {
  //Get Categories - Developer Utility
  app.get("/api/4over/categories", function(req, res) {
    var searchString = "printproducts/categories";
    var queryString = baseURL + searchString + apiKey + apiSignature;
    axios
      .get(queryString)
      .then(response => {
        res.json(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });

  //Get Business Cards - Developer Utility
  app.get("/api/4over/businesscards/:categoryUUID", function(req, res) {
    var searchString =
      "printproducts/categories/" + req.params.categoryUUID + "/products";
    var queryString =
      baseURL + searchString + apiKey + apiSignature + "&max=300";
    axios
      .get(queryString)
      .then(response => {
        console.log(response.data.entities.length);
        var resLength = response.data.entities.length;
        var prodDesc = [];
        for (i = 0; i < resLength; i++) {
          var description = response.data.entities[i].product_description;
          if (
            description.indexOf('2" X 3.5') > -1 ||
            description.indexOf('2" x 3.5') > -1
          ) {
            prodDesc.push(response.data.entities[i]);
          }
        }
        res.json(prodDesc);
      })
      .catch(error => {
        console.log(error);
      });
  });

  //Get Product Options
  app.get("/api/4over/options/:productUUID", function(req, res) {
    console.log(req.params.productUUID);
    var searchString = "printproducts/products/" + req.params.productUUID;
    var queryString = baseURL + searchString + apiKey + apiSignature;
    console.log(queryString);
    axios
      .get(queryString)
      .then(response => {
        var rd = response.data;
        var rdOut = {};
        var rdOptions = [];
        rdOut.product_uuid = rd.product_uuid;
        rdOut.product_description = rd.product_description;
        for (i = 0; i < rd.product_option_groups.length; i++) {
          var dupCheck = [];
          var rdOptionGroup = [];
          var rdOptionGroupOut = {};
          if (rd.product_option_groups[i].options.length > 1) {
            for (j = 0; j < rd.product_option_groups[i].options.length; j++) {
              console.log(rd.product_option_groups[i].options[j].option_uuid);
              if (
                dupCheck.indexOf(
                  rd.product_option_groups[i].options[j].option_uuid
                ) < 0
              ) {
                rdOptionGroup.push(rd.product_option_groups[i].options[j]);
                console.log(
                  Object.keys(rd.product_option_groups[i].options[j]).length
                );
                dupCheck.push(
                  rd.product_option_groups[i].options[j].option_uuid
                );
              }
              rdOptionGroupOut.product_option_group_uuid =
                rd.product_option_groups[i].product_option_group_uuid;
              rdOptionGroupOut.product_option_group_name =
                rd.product_option_groups[i].product_option_group_name;
              rdOptionGroupOut.options = rdOptionGroup;
            }
            rdOptions.push(rdOptionGroupOut);
            //rdOptions.push(rd.product_option_groups[i]);
            console.log(rd.product_option_groups[i].product_option_group_name);
          }
          rdOut.product_option_groups = rdOptions;
        }
        res.json(rdOut);
      })
      .catch(error => {
        console.log(error);
      });
  });

  //Build Quote - Store in database and return to front end
  //Need user id along with all relevant product options
  app.post("/api/4over/quote", function(req, res) {});
};
