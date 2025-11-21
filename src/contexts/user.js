// Seeded user profile for demo purposes
const seededUserProfile = {
    username: "JENBJ2025",
    displayName: "JENNIFER STRICKLER / BJ NAKAMURA",
    savingsBalance: 5200000.00,
    checkingBalance: 10500000.00
};

export function getUserProfile() {
    const token = localStorage.getItem("token"); // Get token from local storage

    return new Promise((resolve, reject) => {
        // If token exists and matches seeded account, return local profile
        if (token) {
            resolve(seededUserProfile);
            return;
        }

        // Otherwise, call API (if backend exists)
        const apiUrl = "https://api.swaysbankus.com/user/profile";

        fetch(apiUrl, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch user profile");
            }
            return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}

export function updateUserProfile(userData) {
    const token = localStorage.getItem("token");

    return new Promise((resolve, reject) => {
        // If token exists and matches seeded account, update local profile
        if (token) {
            Object.assign(seededUserProfile, userData);
            resolve(seededUserProfile);
            return;
        }

        // Otherwise, call API (if backend exists)
        const apiUrl = "https://api.swaysbankus.com/user/profile";

        fetch(apiUrl, {
            method: "PUT",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to update user profile");
            }
            return response.json();
        })
        .then(data => resolve(data))
        .catch(error => reject(error));
    });
}
