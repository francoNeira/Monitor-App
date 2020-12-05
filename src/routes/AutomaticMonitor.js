const express = require('express');
const automatic_monitor = express.Router();
const AutomaticMonitorController = require('../controllers/AutomaticMonitorController');

const controller = new AutomaticMonitorController();

automatic_monitor.route('/monitorize').post((req, res, next) => {
  controller.monitorize(req, res, next);
});

module.exports = automatic_monitor;
