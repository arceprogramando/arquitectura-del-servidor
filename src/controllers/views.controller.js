import ViewService from '../services/views.services.js';
import ProductModel from '../model/products.models.js';
import CartModel from '../model/carts.models.js';
import UserModel from '../model/user.models.js';
import Responses from '../middleware/error.handlers.js';

class ViewController {

  constructor() {
    this.viewService = new ViewService();
    this.productModel = ProductModel;
    this.cartModel = CartModel;
    this.userModel = UserModel;
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
  }

  showLoginPage = async (req, res) => {
    try {
      return res.render('login', {
        style: 'index.css',
      });
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} error al visualizar el login `, { error: error.message });
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

      const productIds = docs.map((product) => product._id);

      const isAdminOrPremium = req.user.role === 'ADMIN' || req.user.role === 'PREMIUM';

      return res.render('products', {
        visit,
        products: docs,
        style: 'index.css',
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        isAdminOrPremium,
        productsid: productIds,
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
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} Error al obtener los mensajes en el views controller `, { error: error.message });

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
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al popular los mensajes en el views controller `, { error: error.message });
    }
  };

  viewRegister = async (req, res) => {
    try {
      return res.render('register');
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR} Error al visualizar el register en el controller del view `, { error: error.message });
    }
  };

  viewRecover = async (req, res) => {
    try {
      return res.render('recover');
    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al visualizar el register en el controller del view `, { error: error.message });
    }
  };

  viewEmailToRecover = async (req, res) => {
    try {

      return res.render('emailwithrecover');

    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al visualizar el register 
      en el controller del view `, { error: error.message });

    }
  };

  viewCheckYourEmail = async (req, res) => {
    try {
      return res.render('checkyouremail');

    } catch (error) {
      return this.httpResponse.ERROR(res, `${this.enumError.CONTROLER_ERROR}Error al visualizar el register 
      en el controller del view `, { error: error.message });
    }
  };

  viewProfile = async (req, res) => {
    try {
      const { user } = req;

      const isAdmin = req.user.role === 'ADMIN';

      const isPremium = req.user.role === 'PREMIUM';

      return res.render('profile', {
        firstname: user.firstname,
        lastname: user.lastname || user.login,
        age: user.age,
        email: user.email,
        role: user.role,
        isAdmin,
        isPremium,
      });
    } catch (error) {
      return res.redirect('/');
    }
  };

  viewCartUser = async (req, res) => {
    try {
      const { user } = req;
      const uId = user?._id.toString();
      const isUser = req.user?.role === 'USER';
      const findProducts = await this.productModel.find({});

      const products = findProducts.map((product) => ({
        title: product.title,
        description: product.description,
        price: product.price,
        _id: product._id,
        image: product.thumbnails,
        stock: product.stock,
      }));

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
        productsid: cartProduct._id,
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
      return res.redirect('/');
    }
  };
}

export default ViewController;
