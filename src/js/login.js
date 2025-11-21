import { login } from "../contexts/auth.js";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("loginForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    login(username, password)
      .then(user => {
        alert(`Welcome ${user.displayName}!`);
        // Redirect to dashboard
        window.location.href = "dashboard.html";
      })
      .catch(error => {
        console.error("Login failed:", error);
        alert("Invalid username or password. Please try again.");
      });
  });
});
