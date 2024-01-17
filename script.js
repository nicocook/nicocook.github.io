// When the form is submitted, prevent the default form submission and handle the data
document.getElementById('userForm').addEventListener('submit', function(event) {
    event.preventDefault();

    // Retrieve the goal entered by the user
    const goal = document.getElementById('goal').value;

    // Send a POST request to the server with the goal
    fetch('/generateProgram', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ goal: goal }),
    })
        .then(response => {
            // Check if the response is successful
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            // Display the personalized program received from the server
            displayProgram(data);
        })
        .catch(error => {
            // Log errors to the console
            console.error('Failed to fetch program:', error);
        });
});

// Function to display the personalized program
function displayProgram(programData) {
    const programDiv = document.getElementById('program');

    // Construct the display content
    const content = `<h3>Your Personalized Program for: ${programData.goal}</h3>
                     <p>${programData.description}</p>`;

    // Update the programDiv with the new content
    programDiv.innerHTML = content;
}
