const formData = {
  email: '',
  message: '',
};

const form = document.querySelector('.feedback-form');
const textareaElem = form.querySelector('textarea');
const inputElem = form.querySelector('input');

formElem.addEventListener('input', () => {
  const formData = new FormData(formElem);
  const email = formData.get('email');
  const message = formData.get('message');

  saveToLs('feedback-form-state', email);
  saveToLs('feedback-form-state', message);
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const json = localStorage.getItem(key);
  try {
    const data = JSON.parse(json);
    return data;
  } catch {
    return json;
  }
}

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(formElem);
  const email = formData.get('email');
  const message = formData.get('message');

  if (textareaElem.value === '' || inputElem.value === '')
    return alert('Fill please all fields');

  const data = { email, message };

  console.log(data);

  form.reset();

  localStorage.removeItem('feedback-form-state');
});

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS('feedback-form-state');

  form.elements.email.value = data?.email ?? '';
  form.elements.message.value = data?.message ?? '';
});
