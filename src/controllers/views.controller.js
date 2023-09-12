import ViewService from '../services/views.services.js';
import ProductModel from '../model/products.models.js';
import CartModel from '../model/carts.models.js';
import UserModel from '../model/user.models.js';

class ViewController {

  constructor() {
    this.viewService = new ViewService();
    this.productModel = ProductModel;
    this.cartModel = CartModel;
    this.userModel = UserModel;
  }

  showLoginPage = async (req, res) => {
    try {
      return res.render('login', {
        style: 'index.css',
      });
    } catch (error) {
      return res.status(500).json({ error: 'Error al visualizar el login' });
    }
  };

  getProducts = async (req, res) => {
    try {
      const limit = req.query.limit || 10;
      const page = req.query.page || 1;
      const sort = req.query.sort || 'desc';

      const query = {};

      if (req.query.query) {
        query.title = { $regex: req.query.query, $options: 'i' };
      }

      const options = { page, limit, lean: true };

      if (sort === 'asc') {
        options.sort = { price: 1 };
      } else if (sort === 'desc') {
        options.sort = { price: -1 };
      }
      let visitCount = parseInt(req.cookies.visitCount, 10) || 0;

      visitCount += 1;

      res.cookie('visitCount', visitCount);

      const visit = `Se ha visitado el sitio ${visitCount} ${visitCount === 1 ? 'vez' : 'veces'}`;

      const {
        docs, hasPrevPage, hasNextPage, prevPage, nextPage,
      } = await this.viewService.getProducts(query, options);

      const isAdmin = req.user.role === 'ADMIN';

      return res.render('products', {
        visit,
        products: docs,
        style: 'index.css',
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        isAdmin,
      });
    } catch (error) {
      return res.redirect('/');
    }
  };

  getMessages = async (req, res) => {
    try {
      const findmessage = await this.viewService.getMessages();
      const messages = findmessage.map((message) => message.toObject());
      return res.render('chat', {
        messages,
        style: 'index.css',
      });
    } catch (error) {
      return res.status(500).json({ error: `Error al obtener los mensajes en el views controller ${error}` });
    }
  };

  populateProductInCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const populateProduct = await this.viewService.populateProductInCart(cId);
      return res.render('carts', {
        cart: populateProduct.toObject(),
        style: '../../css/index.css',
      });
    } catch (error) {
      return res.status(500).json({ error: `Error al popular los mensajes en el views controller ${error}` });
    }
  };

  viewRegister = async (req, res) => {
    try {
      return res.render('register');
    } catch (error) {
      return res.status(500).json({ error: `Error al visualizar el register en el controller del view ${error}` });

    }
  };

  viewRecover = async (req, res) => {
    try {
      return res.render('recover');
    } catch (error) {
      return res.status(500).json({ error: `Error al visualizar el register en el controller del view ${error}` });
    }
  };

  viewProfile = async (req, res) => {
    try {
      const { user } = req;

      const isAdmin = req.user.role === 'ADMIN';
      return res.render('profile', {
        firstname: user.firstname,
        lastname: user.lastname || user.login,
        age: user.age,
        email: user.email,
        role: user.role,
        isAdmin,
      });
    } catch (error) {
      return res.redirect('/');
    }
  };

  viewCartUser = async (req, res) => {
    try {
      // Traigo al user del request
      const { user } = req;
      // Accedo al objeto _id y lo paso a string al objeto que es en un objeto de mongo
      const uId = user?._id.toString();
      // Reviso si el request de user contiene el role con un nombre igual a USER
      const isUser = req.user?.role === 'USER';

      // Traigo todos los productos con mi modelo de productos de Mongoose
      const findProducts = await this.productModel.find({});

      // Hago el map de findProduct para que por cada producto traiga el titulo ,descripccion , precio , id de mongo , image , y stock

      const products = findProducts.map((product) => ({
        title: product.title,
        description: product.description,
        price: product.price,
        _id: product._id,
        image: product.thumbnails,
        stock: product.stock,
      }));

      // segun el usuario que se haya conectado utilizo mi modelo busco su usuario y le doy un populate a carts
      const findUser = await this.userModel
        .findOne({ _id: uId })
        .populate('carts');

      const cId = findUser.carts[0]?.cart._id.toString();

      const findCart = await this.cartModel.findOne({ _id: cId }).populate('products.product');
      const findCartProducts = findCart.products.map((cartProduct) => ({
        title: cartProduct.product.title,
        price: cartProduct.product.price,
        quantity: cartProduct.quantity,
        stock: cartProduct.stock,
      }));

      return res.render('cartsuser', {
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        isUser,
        products,
        cartsOfUser: findCartProducts,
        style: '../../css/index.css',
        cId,
      });
    } catch (error) {
      console.error('Error en viewCartUser:', error);
      return res.redirect('/');
    }
  };
}

export default ViewController;
