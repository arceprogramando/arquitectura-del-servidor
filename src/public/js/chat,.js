// eslint-disable-next-line no-undef
const socket = io();

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);
  // eslint-disable-next-line no-console
  console.log(formData);
  try {
    const response = await fetch('/api/chat/', {
      method: 'POST',
      body: formData,
    });

    if (response.ok) {
      const data = await response.json();

      socket.emit('message', data.message);
      form.reset();

      // eslint-disable-next-line no-undef
      Swal.fire('Éxito', 'El mensaje se agregó correctamente', 'success');
    } else {
      throw new Error('Error al enviar el formulario');
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    // eslint-disable-next-line no-undef
    Swal.fire('Error', 'Hubo un problema al agregar el producto', 'error');
  }
});
