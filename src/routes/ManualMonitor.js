const express = require('express');
const manual_monitor = express.Router();
const ManualMonitorController = require('../controllers/ManualMonitorController');

const controller = new ManualMonitorController();

manual_monitor.route('/services').get((req, res, next) => {
  controller.getServicesStatus(req, res, next);
});

module.exports = manual_monitor;
