import ViewService from '../services/views.services.js';
import ProductModel from '../model/products.models.js';
import CartModel from '../model/carts.models.js';
import UserModel from '../model/user.models.js';
import Responses from '../middleware/error.handlers.js';
import DataService from '../services/data.services.js';

class ViewController {
  constructor() {
    this.viewService = new ViewService();
    this.productModel = ProductModel;
    this.cartModel = CartModel;
    this.userModel = UserModel;
    this.dataService = new DataService();
    this.httpResponse = new Responses.HttpResponse();
    this.enumError = Responses.EnumError;
  }

  showLoginPage = async (req, res) => {
    try {
      return res.render('login', {});
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} error al visualizar el login `,
        { error: error.message },
      );
    }
  };

  showHomePage = async (req, res) => {
    try {
      const productos = await this.dataService.getProductos();

      return res.render('index', {
        title: 'Inicio - Vestimenta Catan',
        pageTitle: 'Bienvenido a Vestimenta Catan',
        pageDescription: 'Descubre nuestra colección de remeras térmicas',
        productos,
      });
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} error al visualizar la página de inicio `,
        { error: error.message },
      );
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

      const { docs, hasPrevPage, hasNextPage, prevPage, nextPage } =
        await this.viewService.getProducts(query, options);

      const productIds = docs.map((product) => product._id);

      const isAdminOrPremium = req.user.role;
      const { firstname } = req.user;
      return res.render('products', {
        visit,
        products: docs,
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        isAdminOrPremium,
        productsid: productIds,
        firstname,
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
      });
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} Error al obtener los mensajes en el views controller `,
        { error: error.message },
      );
    }
  };

  populateProductInCart = async (req, res) => {
    try {
      const { cId } = req.params;
      const populateProduct = await this.viewService.populateProductInCart(cId);
      return res.render('carts', {
        cart: populateProduct.toObject(),
      });
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR}Error al popular los mensajes en el views controller `,
        { error: error.message },
      );
    }
  };

  viewRegister = async (req, res) => {
    try {
      return res.render('register');
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} Error al visualizar el register en el controller del view `,
        { error: error.message },
      );
    }
  };

  viewRecover = async (req, res) => {
    try {
      return res.render('recover');
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR}Error al visualizar el register en el controller del view `,
        { error: error.message },
      );
    }
  };

  viewEmailToRecover = async (req, res) => {
    try {
      return res.render('emailwithrecover');
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR}Error al visualizar el register 
      en el controller del view `,
        { error: error.message },
      );
    }
  };

  viewCheckYourEmail = async (req, res) => {
    try {
      return res.render('checkyouremail');
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR}Error al visualizar el register 
      en el controller del view `,
        { error: error.message },
      );
    }
  };

  viewProfile = async (req, res) => {
    try {
      console.log('=== DEBUG PROFILE ===');
      console.log('req.user:', req.user);
      console.log('req.session:', req.session);
      console.log(
        'req.isAuthenticated():',
        req.isAuthenticated ? req.isAuthenticated() : 'No method',
      );

      const { user } = req;

      if (!user) {
        console.log('❌ No user found, redirecting to home');
        return res.redirect('/');
      }

      const isAdmin = req.user.role === 'ADMIN';
      const isPremium = req.user.role === 'PREMIUM';

      const profileData = {
        user: {
          firstname: user.firstname,
          lastname: user.lastname || user.login,
          age: user.age,
          email: user.email,
          role: user.role,
          phone: user.phone,
          address: user.address,
        },
        isAdmin,
        isPremium,
      };

      console.log('✅ Rendering profile with data:', profileData);

      return res.render('profile', profileData);
    } catch (error) {
      console.log('❌ Error in viewProfile:', error);
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

      const findUser = await this.userModel.findOne({ _id: uId }).populate('carts');

      const cId = findUser.carts[0]?.cart._id.toString();

      const findCart = await this.cartModel.findOne({ _id: cId }).populate('products.product');

      const findCartProducts = findCart.products.map((cartProduct) => ({
        title: cartProduct.product.title,
        price: cartProduct.product.price,
        quantity: cartProduct.quantity,
        stock: cartProduct.stock,
        productsid: cartProduct._id,
        image: cartProduct.thumbnails,
      }));

      return res.render('cartsuser', {
        firstname: user.firstname,
        lastname: user.lastname,
        role: user.role,
        isUser,
        products,
        cartsOfUser: findCartProducts,
        cId,
      });
    } catch (error) {
      return res.redirect('/');
    }
  };

  viewUpdateCompleteProfile = async (req, res) => {
    try {
      const { user } = req;
      const uId = user?._id.toString();
      return res.render('completeprofile', {
        firstname: user.firstname,
        lastname: user.lastname,
        age: user.age,
        email: user.email,
        uId,
        identification: user.uploadedDocuments.identificationImage,
        residence: user.uploadedDocuments.residenceImage,
        accountStatus: user.uploadedDocuments.accountStatusImage,
      });
    } catch (error) {
      return res.redirect('/profile');
    }
  };

  viewUserManagement = async (req, res) => {
    try {
      const { user } = req;
      const findUser = await this.userModel.find({});

      const filteredUsers = findUser.filter((userItem) => userItem.role !== 'ADMIN');

      const usermap = filteredUsers.map((userItem) => ({
        firstname: userItem.firstname,
        lastname: userItem.lastname,
        email: userItem.email,
        id: userItem._id,
        role: userItem.role,
        isAdmin: userItem.role === 'ADMIN',
      }));

      return res.render('usermanagement', {
        firstname: user.firstname,
        lastname: user.lastname,
        usermap,
      });
    } catch (error) {
      return res.redirect('/');
    }
  };

  showProductDetail = async (req, res) => {
    try {
      const { id } = req.params;
      const producto = await this.dataService.getProductoById(id);

      if (!producto) {
        return res.status(404).render('error', {
          title: 'Producto no encontrado',
          message: 'El producto que buscas no existe',
        });
      }

      return res.render('product-detail', {
        title: `${producto.producto} - ${producto.genero}`,
        pageTitle: producto.producto,
        pageDescription: `Detalles del producto: ${producto.producto} para ${producto.genero}`,
        producto,
      });
    } catch (error) {
      return this.httpResponse.ERROR(
        res,
        `${this.enumError.CONTROLER_ERROR} error al mostrar detalle del producto `,
        { error: error.message },
      );
    }
  };
}

export default ViewController;
