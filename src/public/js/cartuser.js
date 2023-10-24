document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();

    const productId = button.getAttribute('data-product-id');
    const cartId = document.querySelector('[data-cart-id]').getAttribute('data-cart-id');
    const endpoint = `/api/carts/${cartId}/products/`;

    const quantity = document.querySelector('#quantity').value;

    const data = {
      product: productId,
      quantity: quantity || 1,
    };

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        console.log('Producto agregado al carrito exitosamente', response);

        window.location.reload();
      } else {
        console.error('Error al agregar el producto al carrito', response);
      }
    } catch (error) {
      console.error('Error al agregar el producto al carrito:', error);
    }
  });
});

document.getElementById('delete-cart').addEventListener('click', async (event) => {
  event.preventDefault();

  const cartId = document.querySelector('[data-cart-id]').getAttribute('data-cart-id');
  const endpoint = `/api/carts/${cartId}/deleteproducts`;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
    });
    setTimeout(() => {
      window.location.reload();
    }, 500);
    return response;
  } catch (error) {
    return console.error('Error al borrar el carrito:', error);
  }
});

document.querySelectorAll('.btn-delete-product').forEach((deleteButton) => {
  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const productId = deleteButton.getAttribute('data-product-id');
    const cartId = document.querySelector('[data-cart-id]').getAttribute('data-cart-id');
    const endpoint = `/api/carts/${cartId}/products/${productId}`;

    try {
      const response = await fetch(endpoint, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Producto borrado exitosamente del carrito', response);

        window.location.reload();
      } else {
        console.error('Error al borrar el producto del carrito', response);
      }
    } catch (error) {
      console.error('Error al borrar el producto del carrito:', error);
    }
  });
});

document.querySelector('.btn-purchase').addEventListener('click', async (event) => {
  event.preventDefault();

  const cartId = document.querySelector('[data-cart-id]').getAttribute('data-cart-id');
  const endpoint = `/api/carts/${cartId}/purchase`;

  try {
    const response = await fetch(endpoint, {
      method: 'GET',
    });

    if (response.ok) {
      console.log('Compra realizada con éxito', response);

    } else {
      console.error('Error al realizar la compra', response);
    }
  } catch (error) {
    console.error('Error al realizar la compra:', error);
  }
});
