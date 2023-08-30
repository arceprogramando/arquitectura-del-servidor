import ViewService from '../services/views.services.js';

class ViewController {
  constructor() {
    this.viewService = new ViewService();
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
      const {
        limit, page, sort, query,
      } = req.query;

      const {
        docs, hasPrevPage, hasNextPage, prevPage, nextPage,
      } = await this.viewService.getProducts(limit, page, sort, query);

      let visit;

      if (req.session.counter) {
        req.session.counter += 1;
        visit = `Se ha visitado el sitio ${req.session.counter} veces`;
      } else {
        req.session.counter = 1;
        visit = 'Se ha visitado el sitio 1 vez';
      }

      const admin = req.session.user === 'ADMIN';

      res.render('products', {
        visit,
        products: docs,
        style: 'index.css',
        page,
        hasPrevPage,
        hasNextPage,
        prevPage,
        nextPage,
        admin,
      });
    } catch (error) {
      res.status(500).json({ error: `Error al obtener los productos en el views controller ${error}` });
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
      return res.render('profile', {
        firstname: user.firstname,
        lastname: user.lastname || user.login,
        age: user.age,
        email: user.email,
      });
    } catch (error) {
      return res.status(500).json({ error: `Error al visualizar el perfil en el controlador de vista: ${error}` });
    }
  };
}

export default ViewController;
