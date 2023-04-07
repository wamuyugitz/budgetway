const form = document.getElementById('myForm');
const emailInput = form.querySelector('input[type="email"]');
const messageInput = form.querySelector('textarea');
const button = form.querySelector('button');

form.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  if (!emailInput.checkValidity()) {
    alert('Please enter a valid email address.');
    emailInput.focus();
    return;
  }

  if (messageInput.value.trim() === '') {
    alert('Please enter a message.');
    messageInput.focus();
    return;

  }

  // Form is valid, do something with the data
  alert('Form submitted!');
});


