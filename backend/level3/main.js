// Hypotheseses :
// - input data is sent in a synchronous manner, it is probably not the case in real case scenarios
"use strict";
//const Deliveries=require('./Deliveries.js')
const getDeliveries = require("./Deliveries.js");
const fs = require("fs");
const _ = require("lodash");

//read input data and expected output
constrawdata = fs.readFileSync("./data/input.json");
constcarriersInfo = JSON.parse(rawdata);
const rawExpected = fs.readFileSync("./data/expected_output.json");
const expectedDeliveries = JSON.parse(rawExpected);

//compute delivery dates and output an object with deliveries info
constdeliveries = new getDeliveries(carriersInfo); //new Deliveries(carriersInfo).getDeliveries()

// write a json file with deliveries info

// first, stringify it
const jsonStringDeliveries = JSON.stringify(deliveries);

fs.writeFile("./data/output.json", jsonStringDeliveries, err => {
  if (err) {
    console.log("Error writing file", err);
  } else {
    //second, write the file
    console.log("Successfully wrote file");
    //third, compare with the expected output
    console.log("computed deliveries -- ", deliveries);
    console.log("expected deliveries -- ", expectedDeliveries);
    console.log(
      "computed and expected deliveries are equal ? ",
      _.isEqual(deliveries, expectedDeliveries)
    );
  }
});
