const formFeedbackElem = document.querySelector('.feedback-form');
const textareaElem = formFeedbackElem.querySelector('textarea');
const inputElem = formFeedbackElem.querySelector('input');

formFeedbackElem.addEventListener('input', () => {
  const form = new FormData(formFeedbackElem);
  const email = form.get('email');
  const message = form.get('message');
  const formData = {
    email,
    message,
  };

  saveToLS('feedback-form-state', formData);
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

formFeedbackElem.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(formFeedbackElem);
  const email = formData.get('email');
  const message = formData.get('message');

  if (textareaElem.value === '' || inputElem.value === '')
    return alert('Fill please all fields');

  const data = { email, message };

  console.log(data);

  formFeedbackElem.reset();

  localStorage.removeItem('feedback-form-state');
});

window.addEventListener('DOMContentLoaded', () => {
  const data = loadFromLS('feedback-form-state');

  formFeedbackElem.elements.email.value = data?.email ?? '';
  formFeedbackElem.elements.message.value = data?.message ?? '';
});
