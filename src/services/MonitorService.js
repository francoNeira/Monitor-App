const axios = require('axios').default;
const services = require('../../resources/services.json').services;
const discordConnection = require('../../resources/discordCreds.json').url;
const NotFoundError = require('../exceptions/service/NotFoundError');

class Monitor {
  constructor() {
    this._services = services;
    this._automaticMonitor = false;
    this._monitoringId = null;
    this._servicesStatus = null;
  }

  getAutomaticMonitorStatus() {
    return this._automaticMonitor ? 'activated' : 'disabled';
  }

  async monitorize() {
    this._automaticMonitor = !this._automaticMonitor;
    if (!this._automaticMonitor) {
      this._monitoringId = clearInterval(this._monitoringId);
      this._monitoringId = null;
      this._servicesStatus = null;
    } else {
      try {
        this._servicesStatus = await this.getAllServicesStatus();
        this._monitoringId = setInterval(async () => {
          let servicesStatus = await this.getAllServicesStatus();
          if (this._statusHasChanged(servicesStatus)) {
            await this._notify(servicesStatus);
          }
          this._servicesStatus = servicesStatus;
        }, 5000);
      } catch (error) {
        throw error;
      }
    }
  }

  async getServiceStatus(service) {
    if (!this._isAvailableService(service)) {
      throw new NotFoundError(
        `El servicio '${service}' no existe o no se encuentra disponible en este momento.`
      );
    }
    try {
      return await this._getStatus(service);
    } catch (error) {
      throw error;
    }
  }

  async getAllServicesStatus() {
    try {
      let responses = {};
      for (let current of this._services) {
        let service = current.service;
        responses[service] = await this._getStatus(service);
      }
      return responses;
    } catch (error) {
      throw error;
    }
  }

  async _notify(servicesStatus) {
    let changedServices = this._getChangedServices(servicesStatus);
    try {
      let body = {
        username: 'Services Status Monitor',
      };
      for (let service of changedServices.activated) {
        body.content = `[${new Date().toLocaleString()}] El servicio ${service} ha vuelto a la normalidad.`;
        await axios.post(discordConnection, body);
      }
      for (let service of changedServices.disabled) {
        body.content = `[${new Date().toLocaleString()}] El servicio ${service} ha dejado de funcionar.`;
        await axios.post(discordConnection, body);
      }
    } catch (error) {
      throw error;
    }
  }

  _getChangedServices(servicesStatus) {
    let changedServices = { activated: [], disabled: [] };
    Object.keys(servicesStatus).forEach(service => {
      let currentStatus = servicesStatus[service];
      if (currentStatus !== this._servicesStatus[service])
        currentStatus === 'active'
          ? changedServices.activated.push(service)
          : changedServices.disabled.push(service);
    });
    return changedServices;
  }

  _statusHasChanged(servicesStatus) {
    try {
      return Object.keys(servicesStatus).some(
        service => servicesStatus[service] !== this._servicesStatus[service]
      );
    } catch (error) {}
  }

  _isAvailableService(service) {
    return this._services.map(current => current.service).includes(service);
  }

  async _getStatus(service) {
    try {
      let hostPort = this._services.find(current => current.service === service)
        .url;
      await axios.get(`http://${hostPort}/api/ping`);
      return 'active';
    } catch (error) {
      if (error.code !== 'ECONNREFUSED') throw error;
      return 'inactive';
    }
  }
}

module.exports = Monitor;
