/* eslint-disable camelcase */
//var db = require("../models");
const axios = require("axios");

const markup = 2.0;
const taxRate = 0.086;

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
            // eslint-disable-next-line quotes
            description.indexOf('2" X 3.5') > -1 ||
            // eslint-disable-next-line quotes
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
  app.post("/api/4over/quote", function(req, res) {
    var rb = req.body;
    var searchString = "printproducts/productquote";
    var productString = "&product_uuid=" + rb.product_uuid;
    //productString += "&orientation_uuid" + rb.orientation_uuid;
    productString += "&colorspec_uuid=" + rb.colorspec_uuid;
    productString += "&runsize_uuid=" + rb.runsize_uuid;
    //productString += "&options[]=" + rb.option_uuid;
    productString += "&turnaroundtime_uuid=" + rb.turnaroundtime_uuid;

     if (rb.option_uuid.length > 0) {
       for (i = 0; i < rb.option_uuid.length; i++) {
         productString += "&options[]=";
         productString += rb.option_uuid[i];
       }
     }
    var queryString =
      baseURL + searchString + apiKey + apiSignature + productString;
    console.log(queryString);
    axios
      .get(queryString)
      .then(response => {
        var rd = response.data;
        console.log("ODG Cost: $" + parseFloat(rd.total_price).toFixed(2));
        var quote = (parseFloat(rd.total_price) * markup * taxRate).toFixed(2);
        console.log("Customer Quote: $" + quote);
        var customerMarkup = Math.round(
          parseFloat(rd.total_price) * markup
        ).toFixed(2);
        var customerTax = Math.round(
          parseFloat(customerMarkup) * taxRate
        ).toFixed(2);
        rd.customer_price = customerMarkup;
        rd.customer_tax = customerTax;
        rd.customer_total = Math.round(
          parseFloat(customerMarkup) + parseFloat(customerTax)
        ).toFixed(2);
        res.json(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  });
};
