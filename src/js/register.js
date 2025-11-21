document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const displayName = document.getElementById("displayName").value;
    const password = document.getElementById("password").value;

    // Simulate saving user (in real app, call API)
    const newUser = {
      username,
      displayName,
      password,
      savingsBalance: 0,
      checkingBalance: 0
    };

    console.log("Registered new user:", newUser);
    alert("Registration successful! You can now log in.");

    // Redirect to login page
    window.location.href = "login.html";
  });
});
