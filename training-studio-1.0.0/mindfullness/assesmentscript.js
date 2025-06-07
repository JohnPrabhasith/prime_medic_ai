// Store questions and results data as before...
// Store questions for each assessment
const questions = {
    Anxiety: [
      "Do you feel nervous or anxious?",
      "Do you have trouble sleeping?",
      "Do you find it hard to concentrate?",
      "Do you avoid social interactions?",
      "Do you feel easily overwhelmed?"
    ],
    Stress: [
      "Do you often feel overwhelmed by your responsibilities?",
      "Do you experience physical symptoms like headaches or muscle tension?",
      "Do you feel easily irritated or frustrated?",
      "Do you have trouble relaxing or unwinding?",
      "Do you feel a lack of control over your daily life?"
    ],
    Depression: [
      "Do you feel sad or hopeless most of the time?",
      "Do you have little interest or pleasure in doing things?",
      "Do you experience changes in your appetite or weight?",
      "Do you feel tired or have little energy?",
      "Do you have difficulty making decisions or concentrating?"
    ]
  };
  
  // Store results for interpretation with descriptive answers
  const results = {
    Anxiety: [
      { label: "Low Anxiety", description: "You are feeling calm and not anxious. There are no significant signs of anxiety in your responses.", image: "anxiety-low.png" },
      { label: "Moderate Anxiety", description: "You may experience occasional anxiety. It is manageable but might affect your daily activities in some situations.", image: "anxiety-moderate.png" },
      { label: "High Anxiety", description: "You are experiencing significant anxiety. It may be impacting your daily life, and you may want to consider seeking professional help.", image: "anxiety-high.png" }
    ],
    Stress: [
      { label: "Low Stress", description: "You are managing your responsibilities well with minimal stress. Your body and mind are in a relaxed state.", image: "stress-low.png" },
      { label: "Moderate Stress", description: "You are experiencing moderate stress. It may affect your mood or productivity occasionally, but it is still manageable.", image: "stress-moderate.png" },
      { label: "High Stress", description: "You are under significant stress, which might be affecting your physical and mental well-being. You might want to find ways to manage or reduce stress.", image: "stress-high.png" }
    ],
    Depression: [
      { label: "Low Depression", description: "You are in a positive mental state with no significant signs of depression. Keep nurturing your emotional well-being.", image: "depression-low.png" },
      { label: "Moderate Depression", description: "You may be experiencing some depressive feelings or lack of interest in activities. Consider speaking to a mental health professional if it persists.", image: "depression-moderate.png" },
      { label: "High Depression", description: "You may be going through significant depressive symptoms. It is essential to seek support and guidance from a mental health professional.", image: "depression-high.png" }
    ]
  };
  
  let currentAssessment = null;
  
// Navigate to Questions Page
function startAssessment(assessment) {
    localStorage.setItem("assessment", assessment);
    window.location.href = "questions.html";
  }
  
  // Populate Questions
  if (window.location.pathname.includes("questions.html")) {
    const assessment = localStorage.getItem("assessment");
    const questionContainer = document.getElementById("questions-container");
    document.getElementById("assessment-title").innerText = `${assessment} Test Questions`;
  
    questions[assessment].forEach((question, index) => {
      const questionDiv = document.createElement("div");
      questionDiv.className = "question";
      questionDiv.innerHTML = `
        <p><strong>${index + 1}. ${question}</strong></p>
        <select id="answer-${index}">
          <option value="0">Select</option>
<option value="1">Not at all</option>
          <option value="2">Sometimes</option>
          <option value="3">Often</option>
          <option value="4">Very often</option>
        </select>
      `;
      questionContainer.appendChild(questionDiv);
    });
  }
  
  // Submit Answers and Navigate to Result Page
  function submitAnswers() {
    const assessment = localStorage.getItem("assessment");
    const answers = questions[assessment].map((_, index) =>
      parseInt(document.getElementById(`answer-${index}`).value)
    );
    const totalScore = answers.reduce((a, b) => a + b, 0);
    localStorage.setItem("score", totalScore);
    window.location.href = "result.html";
  }
  
  // Display Result with Pie Chart, Description, and Image
  if (window.location.pathname.includes("result.html")) {
    const assessment = localStorage.getItem("assessment");
    const score = parseInt(localStorage.getItem("score"));
    const resultIndex = score <= 5 ? 0 : score <= 10 ? 1 : 2;
  
    const resultContainer = document.getElementById("result-container");
    resultContainer.innerHTML = `
      <p><strong>${results[assessment][resultIndex].label}</strong></p>
      <p>${results[assessment][resultIndex].description}</p>
      <p>Your total score: ${score}</p>
      <img src="${results[assessment][resultIndex].image}" alt="${assessment} result" class="result-image">
    `;
  
    // Render pie chart
    const percentage = Math.round((score / (questions[assessment].length * 3)) * 100);
    const ctx = document.getElementById("result-chart").getContext("2d");
    new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["Your Score (%)", "Remaining (%)"],
        datasets: [{
          data: [percentage, 100 - percentage],
          backgroundColor: ["#DE638A", "#F3D9E5"]
        }]
      },
      options: {
        plugins: {
          legend: {
            display: true
          }
        }
      }
    });
  }
  
  // Return to Home
  function goBackToHome() {
    localStorage.clear();
    window.location.href = "home.html";
  }
  
