# Services Monitor

## Set-up del proyecto

### Instalación de dependencias

#### Luego de clonarse el repositorio se deben instalar las dependencias necesarias para el proyecto mediante el comando: _npm install_

### Edición de credenciales

#### Debe editarse el archivo _discordCreds.json_ ubicado en el directorio _resources_ e indicar una url válida correspondiente a un canal de discord.

### Selección de servicios a monitorear

#### Debe editarse el archivo _services.json_ ubicado en el directorio _resources_ e indicar servicio y url de acceso para monitoreo.

## Comandos rest disponibles

### Consultar estado de los servicios

#### GET /api/services

### Consultar estado de un servicio en particular

#### GET /api/services

#### Agregar como _query param_ el indicador _service_ y como valor uno de los servicios indicados en el archivo _services.json_.

### Activar/desactivar monitoreo periódico de los servicios

#### POST /api/monitorize
