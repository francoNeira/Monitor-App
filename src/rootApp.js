const express = require('express');
const rootApp = express();
const manual_monitor = require('./routes/ManualMonitor');
const automatic_monitor = require('./routes/AutomaticMonitor');

const bodyParser = require('body-parser');
rootApp.use(bodyParser.urlencoded({ extended: true }));
rootApp.use(bodyParser.json());

const ApiError = require('./exceptions/api/apiError');
function handlerE(err, req, res, next) {
  console.error(err);
  if (err.type === 'entity.parse.failed') {
    // body-parser error para JSON invalido
    res.status(err.status);
    res.json({ status: err.status, errorCode: 'BAD_REQUEST' });
  } else if (err instanceof ApiError) {
    // error del modelo
    res.status(err.status);
    res.json(err);
  } else {
    res.status(500);
    res.json({
      status: 500,
      errorCode: 'INTERNAL_SERVER_ERROR',
    });
  }
}

rootApp.use('/api', manual_monitor, automatic_monitor);
rootApp.use(handlerE);
rootApp.use(function (req, res, next) {
  res.status(404);
  res.json({
    status: 404,
    errorCode: 'RESOURCE_NOT_FOUND',
  });
});
rootApp.listen(7000, () => {
  console.log('listening on port 7000');
});
