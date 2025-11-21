// auth.js

let isAuthenticated = false;

// Seeded demo account
export const seededAccount = {
  username: "JENBJ2025",
  displayName: "JENNIFER STRICKLER / BJ NAKAMURA",
  password: "Imffunds#2025",
  savingsBalance: 5200000.0,
  checkingBalance: 10500000.0,
  token: "demo-token-123"
};

/**
 * Ensure a user exists in localStorage (seed for demo)
 */
export function ensureSeededUser() {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (!user || !token) {
    localStorage.setItem("user", JSON.stringify(seededAccount));
    localStorage.setItem("token", seededAccount.token);
    isAuthenticated = true;
  }
}

/**
 * Attempt login with seeded account first, then fallback to API (optional).
 */
export function login(username, password) {
  return new Promise((resolve, reject) => {
    if (username === seededAccount.username && password === seededAccount.password) {
      isAuthenticated = true;
      localStorage.setItem("token", seededAccount.token);
      localStorage.setItem("user", JSON.stringify(seededAccount));
      resolve(seededAccount);
      return;
    }

    const apiUrl = "https://api.swaysbankus.com/login";
    fetch(apiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    })
      .then((response) => {
        if (!response.ok) throw new Error("Login failed");
        return response.json();
      })
      .then((data) => {
        isAuthenticated = true;
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data));
        resolve(data);
      })
      .catch((error) => reject(error));
  });
}

export function logout() {
  isAuthenticated = false;
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export function isUserAuthenticated() {
  return isAuthenticated || !!localStorage.getItem("token");
}

export function getCurrentUser() {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
}
