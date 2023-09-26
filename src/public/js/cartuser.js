document.querySelectorAll('.add-to-cart').forEach((button) => {
  button.addEventListener('click', async (event) => {
    event.preventDefault();

    const productId = button.getAttribute('data-product-id');
    const cartId = document.querySelector('[data-cart-id]').getAttribute('data-cart-id');
    const endpoint = `/api/carts/${cartId}/products/`;

    const quantity = document.querySelector('#quantity').value;
    console.log('🚀 ~ file: cartuser.js:10 ~ button.addEventListener ~ quantity:', quantity);

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
  const endpoint = `/api/carts/${cartId}`;

  try {
    const response = await fetch(endpoint, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('Carrito borrado exitosamente', response);

      window.location.reload();
    } else {
      console.error('Error al borrar el carrito', response);
    }
  } catch (error) {
    console.error('Error al borrar el carrito:', error);
  }
});
