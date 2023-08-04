# Arquitectura del servidor: Diseño(no finalizada)
## _Felipe Antonio Aleman Arce_
### Ejercicio 11 entregable , Arquitectura del servidor: Diseño(no finalizada)
[![Coderhouse](https://res.cloudinary.com/hdsqazxtw/image/upload/v1570710978/coderhouse.jpg)](https://github.com/arceprogramando)
Mi repositorio publico es  [arceprogramando][arceprogramando]
en github.

Estoy haciendo una limpieza de el codigo asi que hice una especie de reinicio para poder estar al dia con el codigo un poco mas limpio. 

Hasta ahora realice:

- Nuevas funcionalidades de los lenguajes ECMAScritpt✔️
- Manejo de archivos en JavaScript✔️
- Servidor con Express ✔️
- Router y Multer✔️
- Motores de plantillas✔️
- Primera practica integradora ((>‿◠)✌) ✔️
- Post de Practica Integadora ((>‿◠)✌) ✔️
- Login Por Formulario ✔️
- Estrategia de autenticacion por terceros ✔️
- Segunda practica integradora (>‿◠) (falta reentregar ,pero esta completada en este proyecto)
- Arquitectura del servidor: Diseño (Sin terminar)
Cosas que me aun tengo sin funcionar o sin entender conceptos de anterior entregas:

- Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?(sin terminar)❌❔
- Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
- Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.(no se como hacer) ❌❔

##  Segunda practica integradora

- Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:
- Crear un modelo User el cual contará con los campos:
first_name:String,
last_name:String,
email:String (único)
age:Number,
password:String(Hash)
cart:Id con referencia a Carts
role:String(default:’USER’)✔️
Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios✔️
- Modificar el sistema de login del usuario para poder trabajar con session o con jwt (a tu elección). ✔️

### Use passportlocal 
(Sólo para jwt) desarrollar una estrategia “current” para extraer la cookie que contiene el token para obtener el usuario asociado a dicho token, en caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.
Agregar al router /api/sessions/ la ruta /current, la cual utilizará el modelo de sesión que estés utilizando, para poder devolver en una respuesta el usuario actual.(use sessions por ahora)

## Arquitectura del servidor: Diseño (Nos encontramos aca , sin terminar)
### Aspectos a incluir
- El proyecto debe contar con capas de
routing, controlador, dao, con nuestras
vistas bien separadas y con las
responsabilidades correctamente
delegadas.
- Aspectos a incluir
✓ Además, mover del proyecto todas las
partes importantes y
comprometedoras en un archivo .env
para poder leerlo bajo variables de
entorno en un archivo config.js

> Espero que Los ejercicios se encuentren
> resueltos de buena forma y espero 
> que lo haya solucionado de forma optima

Para realizar este Ejercicio

- [Coderhouse]  - Se vieron las clases de coderhouse Correspondientes!
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

### Todos los paquetes 
```sh
npm init @eslint/config

npm install cross-env nodemon -D

npm install express cors dotenv cookie-parser express-handlebars mongoose mongoose-paginate-v2 multer bcrypt passport passport-github2 connect-mongo express-session

```

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