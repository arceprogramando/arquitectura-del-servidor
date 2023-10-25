document.querySelectorAll('.btn-delete-user').forEach((deleteButton) => {
  deleteButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const userId = deleteButton.getAttribute('data-user-id');
    const endpoint = `/api/users/${userId}`;
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
      console.error('Error al borrar el usuario del carrito:', error);

    }
  });
});
