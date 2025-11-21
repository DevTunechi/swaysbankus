import { getUserProfile, updateUserProfile } from "../contexts/user.js";

function formatCurrency(amount) {
  return amount.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

function renderTransactions(transactions) {
  const tbody = document.querySelector("#transactionsTable tbody");
  tbody.innerHTML = "";

  transactions.forEach(tx => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${tx.date}</td>
      <td>${tx.description}</td>
      <td>${formatCurrency(tx.amount)}</td>
    `;
    tbody.appendChild(row);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  getUserProfile()
    .then(profile => {
      // Ensure transactions array exists
      if (!profile.transactions) {
        profile.transactions = [];
      }

      // Render existing transactions
      renderTransactions(profile.transactions);

      // Handle new transaction form
      const form = document.getElementById("transactionForm");
      form.addEventListener("submit", (event) => {
        event.preventDefault();

        const amount = parseFloat(document.getElementById("amount").value);
        const recipient = document.getElementById("recipient").value;

        const newTransaction = {
          date: new Date().toLocaleDateString(),
          description: `Sent to ${recipient}`,
          amount: -amount
        };

        profile.transactions.push(newTransaction);

        updateUserProfile(profile)
          .then(updated => {
            renderTransactions(updated.transactions);
            alert("Transaction successful!");
            form.reset();
          })
          .catch(error => console.error("Error updating transactions:", error));
      });
    })
    .catch(error => console.error("Error loading transactions:", error));
});
