// Toggle between Login and Register forms
document.getElementById('toggle-form').addEventListener('click', function(event) {
    event.preventDefault();

    // Clear all input fields
    document.querySelectorAll("form input").forEach(input => {
        input.value = "";
    });

    // Get elements by ID
    const formTitle = document.getElementById('form-title');
    const submitBtn = document.getElementById('submit-btn');
    const toggleText = document.getElementById('toggle-text');
    const toggleForm = document.getElementById('toggle-form');
    const nameField = document.getElementById('name-field');

    // Toggle form states
    if (submitBtn.textContent.trim() === "Login") {
        // Switch to Register Form
        formTitle.textContent = "Register";
        submitBtn.textContent = "Register";
        toggleText.textContent = "Already have an account?";
        toggleForm.textContent = "Login";
        nameField.style.display = "flex"; // Show name field
    } else {
        // Switch back to Login Form
        formTitle.textContent = "Login";
        submitBtn.textContent = "Login";
        toggleText.textContent = "Don't have an account?";
        toggleForm.textContent = "Register";
        nameField.style.display = "none"; // Hide name field
    }
});
