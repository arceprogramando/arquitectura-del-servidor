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
    } else {

      console.error('La solicitud falló con un código de estado', response.status);
    }
  } catch (error) {
    console.error('Error al enviar la solicitud:', error);
  }
});
