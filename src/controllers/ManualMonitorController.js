const Controller = require('./Controller.js');
const BadRequest = require('../exceptions/api/BadRequest');
const ResourceNotFound = require('../exceptions/api/ResourceNotFound');
const NotFoundError = require('../exceptions/service/NotFoundError');

class ManualMonitorController extends Controller {
  async getServicesStatus(req, res, next) {
    let { service } = req.query;
    try {
      service
        ? this._getStatus(service, res, next)
        : this._getAllStatus(res, next);
    } catch (error) {
      next(error);
    }
  }

  async _getStatus(service, res, next) {
    if (typeof service === 'string') {
      try {
        let monitor = this._monitor;
        let status = await monitor.getServiceStatus(service.toLowerCase());
        let response = {
          status,
        };
        res.status(200).json(response);
      } catch (error) {
        if (error instanceof NotFoundError) next(new ResourceNotFound());
        else next(error);
      }
    } else next(new BadRequest());
  }

  async _getAllStatus(res, next) {
    try {
      let monitor = this._monitor;
      let servicesStatus = await monitor.getAllServicesStatus();
      res.status(200).json(servicesStatus);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = ManualMonitorController;
