import fs from 'fs/promises';
import path from 'path';
import __dirname from '../utils.js';

class DataService {
  constructor() {
    this.dataPath = path.join(__dirname, '../data.json');
  }

  async getProductos() {
    try {
      const data = await fs.readFile(this.dataPath, 'utf-8');
      const jsonData = JSON.parse(data);
      return jsonData.productos || [];
    } catch (error) {
      console.error('Error al leer los datos:', error);
      return [];
    }
  }

  async getProductoById(id) {
    try {
      const productos = await this.getProductos();
      return productos.find((producto) => producto.id === parseInt(id, 10));
    } catch (error) {
      console.error('Error al obtener producto por ID:', error);
      return null;
    }
  }

  async getProductosByGenero(genero) {
    try {
      const productos = await this.getProductos();
      return productos.filter((producto) => producto.genero === genero);
    } catch (error) {
      console.error('Error al obtener productos por género:', error);
      return [];
    }
  }
}

export default DataService;
