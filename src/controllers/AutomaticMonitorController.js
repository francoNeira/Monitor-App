const Controller = require('./Controller.js');

class AutomaticMonitorController extends Controller {
  async monitorize(_req, res, next) {
    try {
      let monitor = this._monitor;
      await monitor.monitorize();
      let response = {
        monitoring: monitor.getAutomaticMonitorStatus(),
      };
      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AutomaticMonitorController;
