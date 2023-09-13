export default class ProductDTO {
  constructor(productData) {
    this.title = productData.title.trim();
    this.description = productData.description.trim();
    this.price = parseFloat(productData.price);
    this.stock = parseInt(productData.stock, 10);
    this.category = productData.category.trim();
  }

  isValid() {
    return (
      this.title.trim() !== ''
      && this.description.trim() !== ''
      && !Number.isNaN(this.price) && this.price > 0
      && !Number.isNaN(this.stock) && this.stock > 0
      && this.category.trim() !== ''
    );
  }
}
