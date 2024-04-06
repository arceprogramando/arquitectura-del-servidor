# Arquitectura De un Servidor
## _Felipe Antonio Aleman Arce_

- Mi repositorio publico es  [arceprogramando][arceprogramando]
en github.

## 🧞 Commands 

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             |Para instalar las dependencias necesarias del proyecto|
| `npm run start:dev`             |Para inicializar el proyecto en dev necesita variables de entorno |
| `npm run start:test`             |Para inicializar el proyecto en test necesita variables de entorno |
| `npm run start:prod`             |Para inicializar el proyecto en prod necesita variables de entorno |

### Todos los paquetes desde cero
 
```sh
npm init @eslint/config 

npm install cross-env  nodemon  @faker-js/faker chai mocha -D

npm install express cors dotenv cookie-parser express-handlebars mongoose mongoose-paginate-v2 multer bcrypt passport passport-github2 connect-mongo express-session uuid nodemailer express-compression http-status-codes winston swagger-jsdoc swagger-ui-express supertest

```

# Estructura Variables de entorno

- **PORT=8080** (example)
- **DB_PORT=27017** (example)
- **DB_CNN=mongodb+srv://Example:Example@ecommerce.mhqm9ea.mongodb.net/**
- **DB_HOST=localhost** (example)
- **COLLECTION_NAME=ecommerceexample** (example)
- **NODE_ENV=devexample** (example)
- **GITHUB_CLIENT_ID=26cefeb1545d2aa3581a** (example)
- **GITHUB_CLIENT_SECRET=b855264f7625130617f1604c340b88** (example)
- **PERSISTENCE=MONGO** (example)
- **EMAIL=cndograepromaar@gmail.com** (example)
- **PSW_EMAIL=gugybzlvfagaarua** (example)
- **BASE_URL=http://localhost:8080** (example)
- **CLOUDINARYCLOUD_NAME==83sdp479q**(example)
- **CLOUDINARYAPI_KEY=145546893824915**(example)
- **CLOUDINARYAPISECRET=s_uCHpv-g4O1UBwM3n9kSuWWt-u**(example)

## Para la nueva estructura de mis commits voy a utilizar https://www.conventionalcommits.org/en/v1.0.0/

### Para realizar este Arquitectura

| Dependencias /Librerias | Funcionalidad                 |
| --------------- | --------------------------------------------------------------------------- |
| ✅ [node.js]    | Se  instalo a nivel local NodeJs.|
| ✅ [express]   | Se uso la libreria Express de NodeJs.|
| ✅ [nodemon]   |Se instalo globalmente Nodemon Se instalo como paquete de desarrollo.|
| ✅ [cross-env]   |Para ejecutar scripts que establecen y utilizan variables de entorno en diferentes plataformas.|
| ✅ [cors]   |Para que funcione como middleware que especifica los origenes permitidos, como servicios externos.|
| ✅ [dotenv]   |Para cargar variables de entorno desde archivos de configuración locales.|
| ✅ [cookie-parser]   |Que se utiliza para analizar las cookies en las solicitudes entrantes y hacerlas accesibles en req.cookies.|
| ✅ [mongoose]  | Interacción con la base de datos y proporciona una serie de características que facilitan el desarrollo de aplicaciones web y API que utilizan MongoDB |
| ✅ [mongoose-paginate-v2]  | Es una libreria para poder paginar que contiene un wrapper de paginas de diferentes estilos. |
| ✅ [tailwind]  | Tailwind incluido en CDN para crear diseño mas atractivo. |
| ✅ [multer]  | Para la configuracion de subida de archivos a travez del front , y manipularlos desde el server. |
| ✅ [bcrypt]  |Una libreria para poder hashear contraseñas. |
| ✅ [passport]  | Una libreria que funciona como middleware para hacer autentificacion de login , ya sea con esta misma o con sus extensiones. |
| ✅ [passport-github2]  | Estrategia de passport para poder poder hacer uso de el logeo con github. |
| ✅ [connect-mongo]  | Es un módulo de Node.js que se utiliza como almacén de sesiones. |
| ✅ [express-session]  |Esencial para manejar sesiones de usuario en aplicaciones web creadas con Express.js. |
| ✅ [passport-local]  |Estrategia de passport para manejar el inicio de sesion local. |
| ✅ [uuid]  |Libreria para crear ids aleatorios. |
| ✅ [nodemailer]  |Libreria para trabajar con mails. |
| ✅ [express-compression]  |Para comprimir. |
| ✅ [http-status-codes]  |Para las respuestas http en el EnumErrors. |
| ✅ [winston]  | Universal loggin library como storage de logs. |
| ✅ [swagger-jsdoc]  | Para documentar la API. |
| ✅ [swagger-ui-express]  | Para documentar la API. |

# Tareas Pendientes

- Hacer test  para session 
- Utilizar el middleware de Multer para poder recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.
- Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents.
-  Modificar el endpoint */api/users/premium/:uid* para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
-   Identificación, Comprobante de domicilio, Comprobante de estado de cuenta

  [Coderhouse]: <https://plataforma.coderhouse.com/cursos/43335/programacion-backend>
  [arceprogramando]: <https://github.com/arceprogramando>
  [node.js]: <http://nodejs.org>
  [express]: <http://expressjs.com>
  [nodemon]: <https://nodemon.io>
  [cross-env]:<https://www.npmjs.com/package/cross-env>
  [cors]:<https://www.npmjs.com/package/cors>
  [dotenv]:<https://www.npmjs.com/package/dotenv>
  [cookie-parser]:<https://www.npmjs.com/package/cookie-parser>
  [express-handlebars]:<https://www.npmjs.com/package/express-handlebars>
  [mongoose]:<https://www.npmjs.com/package/mongoose>
  [mongoose-paginate-v2]:<https://www.npmjs.com/package/mongoose-paginate-v2>
  [tailwind]:<https://tailwindcss.com>
  [multer]:<https://www.npmjs.com/package/multer>
  [bcrypt]:<https://www.npmjs.com/package/bcrypt>
  [passport]:<https://www.npmjs.com/package/passport>
  [passport-github2]:<https://www.npmjs.com/package/passport-github2>
  [connect-mongo]:<https://www.npmjs.com/package/connect-mongo>
  [express-session]:<https://www.npmjs.com/package/express-session>
  [passport-local]:<https://www.passportjs.org/packages/passport-local/>
  [uuid]:<https://www.npmjs.com/package/uuid>
  [nodemailer]:<https://www.npmjs.com/package/nodemailer>
  [express-compression]:<https://www.npmjs.com/package/express-compression>
  [http-status-codes]:<https://www.npmjs.com/package/http-status-codes>
  [winston]:<https://www.npmjs.com/package/winston>
  [artillery]:<https://www.npmjs.com/package/artillery>
  [swagger-jsdoc]:<https://www.npmjs.com/package/swagger-jsdoc>
  [swagger-ui-express]:<https://www.npmjs.com/package/swagger-ui-express>
  [supertest]:<https://www.npmjs.com/package/supertest>
  [chai]:<https://www.npmjs.com/package/chai>
  [mocha]:<https://www.npmjs.com/package/mocha>
