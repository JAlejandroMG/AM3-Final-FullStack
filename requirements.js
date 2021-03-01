//!----------------------------- PROYECTO FINAL -----------------------------¡//


//{------------------- PARTE1 - API REST - MÓDULO BACKEND -------------------}//
//+Objetivo
//*Crear un servidor de autenticación JWT, incluir validaciones, agregar seguridad con helmet y agregar la dependencia de CORS.
//+CONFIGURACION
//*1. Babel npm install @babel/core @babel/node @babel/cli @babel/preset-env --save-dev
//*2. Express npm install express
//*3. Cors npm install cors
//*4. Express JWT npm install express-jwt
//*5. Sequelize npm install squelize pg pg-hstore
//*6. Morgan npm install morgan
//*7. Helmet npm install helmet
//*8. Nodemon npm install morgan –save-dev
//*9. Dotenv npm install dotenv
//*10. Json Web Token npm install jsonwebtoken
//*11. Bcrypt npm install bcrypt
//+Babel y Sequelize
//*1. Iniciar un repositorio de git.
//*2. Ignorar el directorio node_modules, el archivo .env y dist.
//*3. Crear el archivo .env, .env.example y carga las variables de entorno que utilizarás.
//*4. Configurar el proyecto con babel.
//*5. Iniciar el proyecto para Sequelize.
//*6. Colocar todos los directorios de sequelize dentro de src
//*7. Cambiar la extensión de config.json a config.js
//*8. Cambiar la extensión dentro del archivo models/index
//*9. Enlazar las credenciales de tu base de datos con el archivo config/config.js
//+Sequelize Modelos y Migraciones
//*Users
//*Roles
//*UserRoles
//*ResetTokens
//+MIDDLEWARES
   //*1.Agregar
      //*a.CORS https://www.npmjs.com/package/cors
      //*b.Helmet https://www.npmjs.com/package/helmet
      //*c.Morgan https://www.npmjs.com/package/morgan
      //*d.Express.json()
      //*e.Express JWT https://www.npmjs.com/package/express-jwt
   //*2.Crear los directorios de routes, controllers y middlewares
//+RUTAS
//*1.api/v1/login – Inicio de sesión y generar token de autorización JWT
//*2.api/v1/signup – Registrar un usuario y guardar el registro del usuario con sucontraseña encriptada
//*3.api/v1/reset-password – Creará un nuevo “token” UUID en la tabla ResetTokens
//*4.api/v1/update-password – Actualizar un usuario basado en el token UUID
//*5.api/v1/users – Obtener todos los usuarios de la base de datos (protegida)
//*6.api/v1/roles – Agregar un nuevo rol
//*7.api/v1/users/:userId/roles/:rolesId


//{------------------- PARTE2 - API REST - MÓDULO BACKEND -------------------}//
//+Objetivo
//{Agregar la documentación para los endpoints creados en la primera parte del proyecto con Swagger usando OpenAPI 3.0, validar los datos enviados a través de las peticiones POST y PUT, usar nodemailer para enviar un correo de restablecimiento de contraseña.
//+CONFIGURACION
//*1. Swagger Ui Express https://www.npmjs.com/package/swagger-ui-express
//*2. Instalar la extensión para vscode https://marketplace.visualstudio.com/items?itemName=42Crunch.vscode-openapi
//*3. UUID para crear el UUID v4 https://www.npmjs.com/package/uuid
//*4. Joi (validaciones) https://www.npmjs.com/package/joi
//+Swagger
//*1. Crear el archivo swagger.json para escribir la documentación de la API REST
//*2. Tomar de referencia la siguiente imagen para escribir la estructura de la documentación con OpenAPI.
//*3. Permitir loggearte desde la página de la documentación.
//+Joi Validaciones
//*1. POST /api/v1/users
//*2. PUT /api/v1/users/:userID
//*3. POST /api/v1/login
//*4. POST /api/v1/signup
//*5. PUT /api/v1/users/:userID/update-password
//*6. POST | PUT /api/v1/users/:userID/roles/:rolesID  //POST No requiere enviar JSON
//*7. POST /api/v1/roles
//*8. PUT /api/v1/roles/:rolesID
//+Correo electrónico con Token para resstablecer contraseña
//*1. Usando la ruta api/v1/reset-password comprobar que exista un usuario con el email proporcionado, si existe deberás de crear un token de restablecimiento en la tabla ResetTokens con una duración de dos horas o el tiempo que ustedes decidan.
//*2. Enviar el token vía URL por ejemplo http://tuapp/reset-password?tkn=:tokenUUID&uid=:userID , remplazando el :token por el token que creaste en el paso no.1 y el :userID del usuario que está solicitando el restablecimiento de contraseña.
//*3. Crear el endpoint /api/v1/users/:userID/update-password, enviar la nueva contraseña y el token
//*4. Validar del lado del servidor que la contraseña tenga una longitud de al menos 8 caracteres y el token sea de tipo UUID.
//*5. Validar que el token esté activo y que la fecha de hoy sea menor a expirationDate, puedes usar el paquete de moment para comparar las fechas https://momentjs.com/docs/#/query/is-before/.
//*6. Si el token es válido entonces restablecerás la contraseña del usuario, de lo contrarío enviar un mensaje de error indicando que el token es invalido o ha expirado.
//*7. Enviar un mensaje satisfactorio si la contraseña ha sido cambiada.
//*8. Desactivar el token en el momento que se haya actualizado la contraseña.
//+PROTEGER RUTAS
//*1. GET api/v1/users – Obtener todos los usuarios de la base de datos (protegida)
//*2. POST api/v1/roles – Agregar un nuevo rol
//*3. POST y PUT api/v1/users/:userID/roles/:rolesID – Agregar un rol para un usuario
//+DOCUMENTAR RUTAS Swagger
//*1. POST api/v1/login – Inicio de sesión y generar token de autorización JWT
//*2. POST api/v1/signup – Registrar un usuario y guardar el registro del usuario con su contraseña encriptada +++
//*3. POST api/v1/reset-password – Creará un nuevo “token” UUID en la tabla ResetTokens
//{4. PUT api/v1/users/:userID/update-password – Actualizar un usuario basado en el token UUID
//*5. GET api/v1/users – Obtener todos los usuarios de la base de datos (protegida)
//*6. POST api/v1/roles – Agregar un nuevo rol +++
//{7. POST y PUT api/v1/users/:userID/roles/:rolesID – Agregar un rol para un usuario
//+RETO Nodemailer
//{ Usar handlebars para crear una plantilla para restablecer la contraseña.
//{ https://alexanderpaterson.com/posts/use-handlebars-to-send-great-emails-from-node-applications
