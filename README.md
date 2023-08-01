# Segunda practica Integradora
## _Felipe Antonio Aleman Arce_
### Ejercicio 10 entregable , Segunda practica Integradora
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
- Segunda practica integradora (>‿◠)

Cosas que me aun tengo sin funcionar o sin entender conceptos de anterior entregas:

- Si se desea hacer la conexión de socket emits con HTTP, deberás buscar la forma de utilizar el servidor io de Sockets dentro de la petición POST. ¿Cómo utilizarás un emit dentro del POST?(sin terminar)❌❔
- Llevar a una nueva vista con el producto seleccionado con su descripción completa, detalles de precio, categoría, etc. Además de un botón para agregar al carrito.
- Contar con el botón de “agregar al carrito” directamente, sin necesidad de abrir una página adicional con los detalles del producto.(no se como hacer) ❌❔

## (Nos encontramos aca) Segunda practica integradora

- Continuar sobre el proyecto que has trabajado para tu ecommerce y configurar los siguientes elementos:
- Crear un modelo User el cual contará con los campos:
first_name:String,
last_name:String,
email:String (único)
age:Number,
password:String(Hash)
cart:Id con referencia a Carts
role:String(default:’user’)
Desarrollar las estrategias de Passport para que funcionen con este modelo de usuarios
- Modificar el sistema de login del usuario para poder trabajar con session o con jwt (a tu elección). 
(Sólo para jwt) desarrollar una estrategia “current” para extraer la cookie que contiene el token para obtener el usuario asociado a dicho token, en caso de tener el token, devolver al usuario asociado al token, caso contrario devolver un error de passport, utilizar un extractor de cookie.
Agregar al router /api/sessions/ la ruta /current, la cual utilizará el modelo de sesión que estés utilizando, para poder devolver en una respuesta el usuario actual.

- Me falta practicar aggregate a mis queries (minuto 50 clase mongo avanzado 2 esta la explicacion)
- Las rutas para renderizar tengo que acomodarlas con la pagination  (minuto 23 parte 2 mongo avanzado 2 esta la explicacion )

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

### Todos los paquetes 
```sh
npm init @eslint/config

npm install cross-env nodemon -D

npm install express cors dotenv cookie-parser express-handlebars mongoose mongoose-paginate-v2

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