const h1Element = document.querySelector('[data-uId]');
const uId = h1Element.getAttribute('data-uId');

// ProfileForm

const profileForm = document.getElementById('profileForm');

profileForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(profileForm);
  try {
    await fetch(`/api/user/${uId}/documents`, {
      method: 'POST',
      body: formData,
    });
    window.location.reload();
  } catch (error) {
    console.error('Error al enviar la imagen desde profileForm:', error);
  }
});

// identificationForm

const identificationForm = document.getElementById('identificationForm');

identificationForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(identificationForm);
  try {
    await fetch(`/api/user/${uId}/documents`, {
      method: 'POST',
      body: formData,
    });
    window.location.reload();
  } catch (error) {
    console.error('Error al enviar la imagen desde la identificationForm:', error);

  }
});

// residenceImage
const residenceImage = document.getElementById('residenceForm');
residenceImage.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(residenceImage);
  try {
    await fetch(`/api/user/${uId}/documents`, {
      method: 'POST',
      body: formData,
    });
    window.location.reload();
  } catch (error) {
    console.error('Error al enviar la imagen desde la residenceImage:', error);
  }
});

// accountstatusImage
const accountstatusImage = document.getElementById('accountstatusForm');
accountstatusImage.addEventListener('submit', async (e) => {
  e.preventDefault();
  const formData = new FormData(accountstatusImage);
  try {
    await fetch(`/api/user/${uId}/documents`, {
      method: 'POST',
      body: formData,
    });
    window.location.reload();
  } catch (error) {
    console.error('Error al enviar la imagen desde la accountstatusImage:', error);
  }
});
