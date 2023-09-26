// eslint-disable-next-line no-undef
const socket = io();

document.getElementById('noteForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

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

      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      throw new Error('Error al enviar el formulario');
    }
  } catch (error) {
    console.log(error);
  }
});
