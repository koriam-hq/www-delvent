document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('signupForm');
    const formContainer = document.getElementById('formContainer');
    const notificationCard = document.getElementById('notificationCard');

    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 


            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;

            console.log('Form submitted:', { firstName, lastName, email });

            if (formContainer) {
                formContainer.style.display = 'none';
            }

            // Show the notification card
            if (notificationCard) {
                notificationCard.style.display = 'block';
            }

            form.reset();
        });
    }

    const closeNotification = document.getElementById('closeNotification');
    if (closeNotification) {
        closeNotification.addEventListener('click', function() {
            notificationCard.style.display = 'none';
            formContainer.style.display = 'block';
        });
    }
});
