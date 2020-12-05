const Monitor = require('../services/MonitorService');

class Controller {
  constructor() {
    this._monitor = new Monitor();
  }
}

module.exports = Controller;
