document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  try {
    const response = await fetch('/api/products', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      console.log('La solicitud fue exitosa');
      window.location.reload();
    } else {
      console.error('La solicitud falló con un código de estado', response.status);
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
});

document.querySelectorAll('.btn-delete-product').forEach((deleteButton) => {
  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();
    console.log('🚀 ~ file: index.js:26 ~ deleteButton.addEventListener ~ event:', event);

    const productId = deleteButton.getAttribute('data-product-id');
    const endpoint = `/api/products/${productId}`;
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
