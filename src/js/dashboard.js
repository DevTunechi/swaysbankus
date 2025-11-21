// dashboard.js
// Direct seeded account object
const seededAccount = {
  username: "JENBJ2025",
  displayName: "JENNIFER STRICKLER / BJ NAKAMURA",
  savingsBalance: 5200000.00,
  checkingBalance: 10500000.00
};

/**
 * Format numbers as USD currency
 */
function formatCurrency(amount) {
  return amount.toLocaleString("en-US", {
    style: "currency",
    currency: "USD"
  });
}

/**
 * Populate the dashboard with seeded account info
 */
function loadSeededAccount() {
  // Account holder name
  const nameEl = document.getElementById("displayName");
  if (nameEl) nameEl.textContent = seededAccount.displayName;

  // Balances
  const savingsEl = document.getElementById("savingsBalance");
  const checkingEl = document.getElementById("checkingBalance");
  if (savingsEl) savingsEl.textContent = formatCurrency(seededAccount.savingsBalance);
  if (checkingEl) checkingEl.textContent = formatCurrency(seededAccount.checkingBalance);

  // Recent activity
  const activityEl = document.getElementById("recentActivity");
  if (activityEl) activityEl.textContent = `Welcome back, ${seededAccount.displayName}`;
}

/**
 * Initialize dashboard
 */
document.addEventListener("DOMContentLoaded", () => {
  loadSeededAccount();

  const logoutBtn = document.getElementById("logoutButton");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      alert("You have been logged out.");
      window.location.href = "login.html";
    });
  }
});
