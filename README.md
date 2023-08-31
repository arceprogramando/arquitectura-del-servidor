# Tercera entrega del proyecto Final
## _Felipe Antonio Aleman Arce_
### Ejercicio 12 entregable , Tercera entrega del proyecto Final
[![Coderhouse](https://res.cloudinary.com/hdsqazxtw/image/upload/v1570710978/coderhouse.jpg)](https://github.com/arceprogramando)
- Mi repositorio publico es  [arceprogramando][arceprogramando]
en github.

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
- Segunda practica integradora (>‿◠) ✔️
- Arquitectura del servidor: Diseño ✔️
- Tercera entrega del proyecto Final (en progreso)

## Tercera Entrega Del Proyecto Final 
- Sólo el usuario puede agregar productos a su carrito.(como hacer esto)
- Crear un modelo Ticket el cual contará con todas las formalizaciones de la compra. Éste contará con los campos
Id (autogenerado por mongo)
code: String debe autogenerarse y ser único
purchase_datetime: Deberá guardar la fecha y hora exacta en la cual se formalizó la compra (básicamente es un created_at)
amount: Number, total de la compra.
purchaser: String, contendrá el correo del usuario asociado al carrito
- Implementar, en el router de carts, la ruta /:cid/purchase, la cual permitirá finalizar el proceso de compra de dicho carrito.
- La compra debe corroborar el stock del producto al momento de finalizarse
- Si el producto tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces restarlo del stock del producto y continuar.
- Si el producto no tiene suficiente stock para la cantidad indicada en el producto del carrito, entonces no agregar el producto al proceso de compra. 
- al final, utilizar el servicio de Tickets para poder generar un ticket con los datos de la compra.
- En caso de existir una compra no completada, devolver el arreglo con los ids de los productos que no pudieron procesarse.
- Una vez finalizada la compra, el carrito asociado al usuario que compró deberá contener sólo los productos que no pudieron comprarse. 
  Es decir, se filtran los que sí se compraron y se quedan aquellos que no tenían disponibilidad.
- Además, archivo .env para poder correr el proyecto.

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