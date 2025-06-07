function saveSignUpDetails() {
  // Prevent form submission
  event.preventDefault();

  // Get user input values
  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const confirmPassword = document.getElementById("confirmPassword").value.trim();
  const termsAccepted = document.getElementById("terms").checked;

  // Validation checks
  if (!fullName || !email || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
  }

  if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
  }

  if (!termsAccepted) {
      alert("You must agree to the terms and conditions.");
      return;
  }

  // Create a user object
  const user = {
      fullName,
      email,
      password, // Note: Passwords should not be stored in plain text in a real application
  };

  // Get existing users from localStorage or initialize an empty array
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  const emailExists = users.some((u) => u.email === email);
  if (emailExists) {
      alert("An account with this email already exists.");
      return;
  }

  // Add the new user to the array
  users.push(user);

  // Save the updated users array to localStorage
  localStorage.setItem("users", JSON.stringify(users));

  // Confirmation message and redirect
  alert("Sign-up successful!");
  window.location.href = "login.html";
}
function handleLogin(event) {
    // Prevent form submission
    event.preventDefault();

    // Get input values
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check for empty fields
    if (!email || !password) {
        alert("Please fill in all fields.");
        return;
    }

    // Retrieve stored users from localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Find a matching user
    const user = users.find((u) => u.email === email && u.password === password);

    if (user) {
        // Successful login
        alert(`Welcome back, ${user.fullName}!`);
        // Redirect to a dashboard or home page
        window.location.href = "homepage.html";
    } else {
        // Invalid login
        alert("Invalid email or password. Please try again.");
    }
}

// Attach the function to the login button
document.getElementById('loginForm').addEventListener('submit', handleLogin);
