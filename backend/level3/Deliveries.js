"use strict";
const Delivery = require("./Delivery.js");

function getDeliveries(inputData) {
  this.sortByPackageId = function(deliveries) {
    return deliveries.sort((a, b) => a.package_id - b.package_id);
  };

  let deliveries = [];

  inputData.carriers.forEach(carrier => {
    inputData.packages.forEach(pack => {
      if (carrier.code === pack.carrier) {
        let delivery = new Delivery(
          carrier,
          pack,
          inputData.country_distance
        ).getDelivery();
        deliveries.push(delivery);
      }
    });
  });
  return { deliveries: this.sortByPackageId(deliveries) };
}
module.exports = getDeliveries;
