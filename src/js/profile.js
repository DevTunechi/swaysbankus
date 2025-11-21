import { getUserProfile, updateUserProfile } from "../contexts/user.js";

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

document.addEventListener("DOMContentLoaded", () => {
  // Load the seeded user profile
  getUserProfile()
    .then(profile => {
      // Populate fields
      document.getElementById("username").value = profile.username;
      document.getElementById("displayName").value = profile.displayName;
      document.getElementById("savingsBalance").value = formatCurrency(profile.savingsBalance);
      document.getElementById("checkingBalance").value = formatCurrency(profile.checkingBalance);
    })
    .catch(error => console.error("Error loading profile:", error));

  // Handle form submission
  const form = document.getElementById("profileForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    // Collect updated data (balances are read-only in this demo)
    const updatedProfile = {
      username: document.getElementById("username").value,
      displayName: document.getElementById("displayName").value,
      savingsBalance: parseFloat(document.getElementById("savingsBalance").value.replace(/[^0-9.-]+/g,"")),
      checkingBalance: parseFloat(document.getElementById("checkingBalance").value.replace(/[^0-9.-]+/g,""))
    };

    updateUserProfile(updatedProfile)
      .then(data => {
        alert("Profile updated successfully!");
        console.log("Updated profile:", data);
      })
      .catch(error => console.error("Error updating profile:", error));
  });
});
