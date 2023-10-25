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

document.querySelectorAll('.btn-rol-user').forEach((rolUserButton) => {
  rolUserButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const userId = rolUserButton.getAttribute('data-user-id');
    const endpoint = `/api/users/${userId}/changerole`;

    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
      });

      if (response.ok) {
        console.log('Rol de usuario modificado exitosamente', response);

        window.location.reload();
      } else {
        console.error('Error al modificar el rol del usuario', response);
      }
    } catch (error) {
      console.error('Error al modificar el rol del usuario:', error);
    }
  });
});
