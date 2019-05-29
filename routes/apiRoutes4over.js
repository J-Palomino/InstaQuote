var db = require("../models");
var axios = require("axios");

var baseURL = "https://sandbox-api.4over.com/";
var apiKey = "?apikey=onlinedigitalmediallc";
var apiSignature =
  "&signature=63751b502346140aa0fc15c448d592f8346e5ae1a7aea41e683917eaa0f35809";

module.exports = function(app) {
  //Get Categories
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
  //Get Business Cards
  app.get("/api/4over/businesscards/", function(req, res) {
    var searchString =
      "printproducts/categories/08a9625a-4152-40cf-9007-b2bbb349efec/products";
    var queryString =
      baseURL + searchString + apiKey + apiSignature + "&max=300";
    axios
      .get(queryString)
      .then(response => {
        console.log(response.data.entities.length);
        var resLength = response.data.entities.length;
        var prodDesc = [];
        for (i = 0; i < resLength; i++) {
          prodDesc.push(response.data.entities[i].product_description);
        }
        res.json(prodDesc);
      })
      .catch(error => {
        console.log(error);
      });
  });

  //Get Business Card Options
  app.get("/api/4over/businesscards/options", function(req, res) {
    var searchString =
      "printproducts/products/e786abb3-1dcd-4771-85bb-6c27d578b825/optiongroups";
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

  //Get All Products
  app.get("/api/4over/products", function(req, res) {
    var searchString = "printproducts/productsfeed";
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
};
