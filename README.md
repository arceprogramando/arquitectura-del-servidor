# Arquitectura De un Servidor

## _Felipe Antonio Aleman Arce_

- Mi repositorio publico es [arceprogramando][arceprogramando]
  en github.

## Instalacion

```sh

npm install

npm run dev

Se deben integrar el .env.dev.local o el ambiente correspondiente

```

### Como seguir estructura de commits a futuro

> 📌 Este proyecto sigue [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).  
> Usalo para mantener un historial de cambios legible y estructurado.

#### Examples

- `feat: add login functionality`
- `fix: correct form validation`
- `refactor: simplify route logic`
- `chore: update dependencies`
- `docs: add API usage instructions`
- `test: add unit tests for auth service`

### Para realizar este Arquitectura

| Dependencias /Librerias   | Funcionalidad                                                                                                                                          |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| ✅ [node.js]              | Se instalo a nivel local NodeJs.                                                                                                                       |
| ✅ [express]              | Se uso la libreria Express de NodeJs.                                                                                                                  |
| ✅ [nodemon]              | Se instalo globalmente Nodemon Se instalo como paquete de desarrollo.                                                                                  |
| ✅ [cross-env]            | Para ejecutar scripts que establecen y utilizan variables de entorno en diferentes plataformas.                                                        |
| ✅ [cors]                 | Para que funcione como middleware que especifica los origenes permitidos, como servicios externos.                                                     |
| ✅ [dotenv]               | Para cargar variables de entorno desde archivos de configuración locales.                                                                              |
| ✅ [cookie-parser]        | Que se utiliza para analizar las cookies en las solicitudes entrantes y hacerlas accesibles en req.cookies.                                            |
| ✅ [mongoose]             | Interacción con la base de datos y proporciona una serie de características que facilitan el desarrollo de aplicaciones web y API que utilizan MongoDB |
| ✅ [mongoose-paginate-v2] | Es una libreria para poder paginar que contiene un wrapper de paginas de diferentes estilos.                                                           |
| ✅ [tailwind]             | Tailwind incluido en CDN para crear diseño mas atractivo.                                                                                              |
| ✅ [multer]               | Para la configuracion de subida de archivos a travez del front , y manipularlos desde el server.                                                       |
| ✅ [bcrypt]               | Una libreria para poder hashear contraseñas.                                                                                                           |
| ✅ [passport]             | Una libreria que funciona como middleware para hacer autentificacion de login , ya sea con esta misma o con sus extensiones.                           |
| ✅ [passport-github2]     | Estrategia de passport para poder poder hacer uso de el logeo con github.                                                                              |
| ✅ [connect-mongo]        | Es un módulo de Node.js que se utiliza como almacén de sesiones.                                                                                       |
| ✅ [express-session]      | Esencial para manejar sesiones de usuario en aplicaciones web creadas con Express.js.                                                                  |
| ✅ [passport-local]       | Estrategia de passport para manejar el inicio de sesion local.                                                                                         |
| ✅ [uuid]                 | Libreria para crear ids aleatorios.                                                                                                                    |
| ✅ [nodemailer]           | Libreria para trabajar con mails.                                                                                                                      |
| ✅ [compression]          | Para comprimir.                                                                                                                                        |
| ✅ [http-status-codes]    | Para las respuestas http en el EnumErrors.                                                                                                             |
| ✅ [winston]              | Universal loggin library como storage de logs.                                                                                                         |
| ✅ [swagger-jsdoc]        | Para documentar la API.                                                                                                                                |
| ✅ [swagger-ui-express]   | Para documentar la API.                                                                                                                                |

# Tareas Pendientes

[Coderhouse]: https://plataforma.coderhouse.com/cursos/43335/programacion-backend
[arceprogramando]: https://github.com/arceprogramando
[node.js]: http://nodejs.org
[express]: http://expressjs.com
[nodemon]: https://nodemon.io
[cross-env]: https://www.npmjs.com/package/cross-env
[cors]: https://www.npmjs.com/package/cors
[dotenv]: https://www.npmjs.com/package/dotenv
[cookie-parser]: https://www.npmjs.com/package/cookie-parser
[express-handlebars]: https://www.npmjs.com/package/express-handlebars
[mongoose]: https://www.npmjs.com/package/mongoose
[mongoose-paginate-v2]: https://www.npmjs.com/package/mongoose-paginate-v2
[tailwind]: https://tailwindcss.com
[multer]: https://www.npmjs.com/package/multer
[bcrypt]: https://www.npmjs.com/package/bcrypt
[passport]: https://www.npmjs.com/package/passport
[passport-github2]: https://www.npmjs.com/package/passport-github2
[connect-mongo]: https://www.npmjs.com/package/connect-mongo
[express-session]: https://www.npmjs.com/package/express-session
[passport-local]: https://www.passportjs.org/packages/passport-local/
[uuid]: https://www.npmjs.com/package/uuid
[nodemailer]: https://www.npmjs.com/package/nodemailer
[express-compression]: https://www.npmjs.com/package/compression
[http-status-codes]: https://www.npmjs.com/package/http-status-codes
[winston]: https://www.npmjs.com/package/winston
[artillery]: https://www.npmjs.com/package/artillery
[swagger-jsdoc]: https://www.npmjs.com/package/swagger-jsdoc
[swagger-ui-express]: https://www.npmjs.com/package/swagger-ui-express
[supertest]: https://www.npmjs.com/package/supertest
[chai]: https://www.npmjs.com/package/chai
[mocha]: https://www.npmjs.com/package/mocha
