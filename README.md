# Arquitectura De un Servidor
## _Felipe Antonio Aleman Arce_


[![arceprogramando](https://static.zerochan.net/Spy.%C3%97.Family.full.4049834.jpg)](https://github.com/arceprogramando)

- Mi repositorio publico es  [arceprogramando][arceprogramando]
en github.

Hasta ahora realice:

# Cosas por  hacer

### 17

- Hacer test  para session 

### 18

- Utilizar el middleware de Multer para poder recibir los documentos que se carguen y actualizar en el usuario su status para hacer saber que ya subió algún documento en particular.

- Si se sube una imagen de perfil, deberá guardarlo en una carpeta profiles, en caso de recibir la imagen de un producto, deberá guardarlo en una carpeta products, mientras que ahora al cargar un documento, multer los guardará en una carpeta documents.

-  Modificar el endpoint */api/users/premium/:uid* para que sólo actualice al usuario a premium si ya ha cargado los siguientes documentos:
-   Identificación, Comprobante de domicilio, Comprobante de estado de cuenta

### Para realizar este Arquitectura

- [node.js] - Se uso instalo a nivel local Node Js
- [express] - Se uso la libreria Express de Node
- [nodemon] - Se instalo globalmente Nodemon Se instalo como paquete de desarrollo
- [cross-env] - Para ejecutar scripts que establecen y utilizan variables de entorno en diferentes plataformas
- [cors] - Para que funcione como middleware que especifica los origenes permitidos, como servicios externos(no se tanto su funcionamiento)
- [dotenv] - para cargar variables de entorno desde archivos de configuración locales.
- [cookie-parser] que se utiliza para analizar las cookies en las solicitudes entrantes y hacerlas accesibles en req.cookies.
- [mongoose] interacción con la base de datos y proporciona una serie de características que facilitan el desarrollo de aplicaciones web y API que utilizan MongoDB 
- [mongoose-paginate-v2] es una libreria para poder paginar que contiene un wrapper de paginas de diferentes estilos
- [bootstrap] bootstrap incluido en CDN para crear diseño mas atractivo
- [multer] para la configuracion de subida de archivos a travez del front , y manipularlos desde el server
- [bcrypt] una libreria para poder hashear contraseñas
- [passport] una libreria que funciona como middleware para hacer autentificacion de login , ya sea con esta misma o con sus extensiones.
- [passport-github2] Estrategia de passport para poder poder hacer uso de el logeo con github
- [connect-mongo] es un módulo de Node.js que se utiliza como almacén de sesiones 
- [express-session] esencial para manejar sesiones de usuario en aplicaciones web creadas con Express.js
- [passport-local] estrategia de passport para manejar el inicio de sesion local
- [uuid] libreria para crear ids aleatorios
- [nodemailer] Libreria para trabajar con mails 
- [express-compression] Para comprimir 
- [http-status-codes] Para las respuestas http en el EnumError
- [@faker-js/faker] Como variable de entorno para hacer prueba de mocking de productos 
- [winston] universal loggin library como storage de logs
- [swagger-jsdoc]  Para documentar la API
- [swagger-ui-express] Para documentar la API

## Instalacion 
```sh

npm install

npm run start:prod

```
### Todos los paquetes desde cero
 
```sh
npm init @eslint/config 

npm install cross-env  nodemon  @faker-js/faker chai mocha -D

npm install express cors dotenv cookie-parser express-handlebars mongoose mongoose-paginate-v2 multer bcrypt passport passport-github2 connect-mongo express-session uuid nodemailer express-compression http-status-codes winston swagger-jsdoc swagger-ui-express supertest

```

### Como seguir estructura de commits a futuro

- 🌈 Change Styles: Úsarlo para commits que afecten principalmente la apariencia o el diseño de la aplicación.
- ✨ New Features: Usarlo cuando agregue una nueva característica o funcionalidad a la aplicación.
- ⛔ Critical Changes: usarlo cuando se  que contengan cambios críticos que puedan afectar gravemente el funcionamiento de la aplicación.
- 🐛 Error Fix: Para commits que solucionen problemas o errores en el código existente.
- 🧼 Cleanup: Utiliza este emoji cuando realices tareas delimpieza de código, sin cambios funcionales.
- 🚀 Refactor: Marca commits que mejoren el rendimiento de la aplicación o cambios funcionales.
- 🚧 Work in Progress: Usarlo para indicar que el commit contiene trabajo en progreso que no está listo para ser implementado.

### Estructura Variables de entorno

PORT=8080(example)
DB_PORT=27017(example)
DB_CNN=mongodb+srv://Example:Example@ecommerce.mhqm9ea.mongodb.net/
DB_HOST=localhost(example)
DB_NAME=ecommerceexample(example)
NODE_ENV=devexample(example)
GITHUB_CLIENT_ID=26cefeb1545d2aa3581a(example)
GITHUB_CLIENT_SECRET=b855264f7625130617f1604c340b88(example)
PERSISTENCE=MONGO(example)
EMAIL=cndograepromaar@gmail.com(example)
PSW_EMAIL=gugybzlvfagaarua(example)
BASE_URL=http://localhost:8080(example)

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
  [bootstrap]:<https://getbootstrap.com>
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
  [@faker-js/faker]:<https://www.npmjs.com/package/@faker-js/faker> 
  [http-status-codes]:<https://www.npmjs.com/package/http-status-codes>
  [winston]:<https://www.npmjs.com/package/winston>
  [artillery]:<https://www.npmjs.com/package/artillery>
  [swagger-jsdoc]:<https://www.npmjs.com/package/swagger-jsdoc>
  [swagger-ui-express]:<https://www.npmjs.com/package/swagger-ui-express>
  [supertest]:<https://www.npmjs.com/package/supertest>
  [chai]:<https://www.npmjs.com/package/chai>
  [mocha]:<https://www.npmjs.com/package/mocha>
