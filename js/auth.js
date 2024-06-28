let timeout;

function checkPassword() {
  const password = document.getElementById("passwordInput").value;
  const correctPassword = "ATcv@2024"; // Replace with your actual password

  if (password === correctPassword) {
    // Store authentication status and timestamp
    localStorage.setItem("authenticated", "true");
    localStorage.setItem("loginTime", Date.now());

    // Show the main content
    document.getElementById("passwordForm").style.display = "none";
    document.getElementById("content").style.display = "block";

    // Start timeout timer
    startLogoutTimer();
  } else {
    alert("Incorrect password. Please try again.");
  }
}

function startLogoutTimer() {
  // Clear existing timeout if any
  clearTimeout(timeout);

  // Set timeout to logout after 1 hour (3600 seconds * 1000 milliseconds)
  timeout = setTimeout(logout, 3600000); // 1 hour timeout

  // Optionally, you can also add an event listener to reset the timer on user activity
  document.addEventListener("mousemove", resetLogoutTimer);
  document.addEventListener("keypress", resetLogoutTimer);
}

function resetLogoutTimer() {
  clearTimeout(timeout);
  startLogoutTimer();
}

function logout() {
  localStorage.removeItem("authenticated");
  localStorage.removeItem("loginTime");
  document.getElementById("content").style.display = "none";
  document.getElementById("passwordForm").style.display = "block";
  alert("Session expired. Please log in again.");
}

// Check if already authenticated and start the timer if authenticated
window.onload = function () {
  if (localStorage.getItem("authenticated") === "true") {
    const loginTime = localStorage.getItem("loginTime");
    const currentTime = Date.now();
    const elapsedTime = currentTime - loginTime;

    if (elapsedTime < 3600000) {
      // Less than 1 hour
      startLogoutTimer();
      document.getElementById("passwordForm").style.display = "none";
      document.getElementById("content").style.display = "block";
    } else {
      logout(); // Session expired
    }
  }
};
