// formValidations.js

// Function to validate login form
function validateLoginForm() {
  const username = document.querySelector('#username').value.trim();
  const password = document.querySelector('#password').value.trim();

  if (!username || !password) {
    alert('Both username and password are required.');
    return false;
  }

  return true;
}

// Function to validate registration form
function validateRegistrationForm() {
  const username = document.querySelector('#username').value.trim();
  const displayName = document.querySelector('#displayName').value.trim();
  const password = document.querySelector('#password').value.trim();
  const confirmPasswordField = document.querySelector('#confirmPassword');
  const confirmPassword = confirmPasswordField ? confirmPasswordField.value.trim() : null;

  if (!username || !displayName || !password) {
    alert('All fields are required.');
    return false;
  }

  if (confirmPassword && password !== confirmPassword) {
    alert('Passwords do not match.');
    return false;
  }

  return true;
}

// Event listeners for form submissions
document.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.querySelector('#loginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
      if (!validateLoginForm()) {
        event.preventDefault();
      }
    });
  }

  const registerForm = document.querySelector('#registerForm');
  if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
      if (!validateRegistrationForm()) {
        event.preventDefault();
      }
    });
  }
});
