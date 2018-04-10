'use strict';

const ui = require('./ui');


let activeCustomer = {
  id: null
}

module.exports.setActiveCustomer = (id) => {
      activeCustomer.id = id;
      ui.displayWelcome();
}

module.exports.getActiveCustomer = () => activeCustomer;
