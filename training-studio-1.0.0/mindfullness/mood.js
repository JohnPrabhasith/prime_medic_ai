// script.js

// Get references to the form and history list elements
const moodForm = document.getElementById('mood-form');
const historyList = document.getElementById('history-list');

// Function to handle form submission
function submitMood() {
  // Get values from the form fields
  const mood = document.getElementById('mood').value;
  const energy = document.getElementById('energy').value;
  const sleep = document.getElementById('sleep').value;
  const stress = document.getElementById('stress').value;
  const enjoyment = document.getElementById('enjoyment').value;

  // Get today's date
  const today = new Date().toLocaleDateString();

  // Create a new mood entry HTML
  const moodEntry = `
    <li>
      <div><strong>Date:</strong> ${today}</div>
      <div><strong>Mood:</strong> ${mood}</div>
      <div><strong>Energy:</strong> ${energy}</div>
      <div><strong>Sleep:</strong> ${sleep}</div>
      <div><strong>Stress:</strong> ${stress}</div>
      <div><strong>Enjoyment:</strong> ${enjoyment}</div>
    </li>
  `;

  // Insert the new entry into the history list
  historyList.insertAdjacentHTML('beforeend', moodEntry);

  // Reset the form
  moodForm.reset();
}

// Attach an event listener to the form to handle submission
moodForm.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent the form from submitting normally
  submitMood(); // Call the submitMood function
});
