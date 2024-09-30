document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("signupForm");
  const formContainer = document.getElementById("formContainer");
  const notificationCard = document.getElementById("notificationCard");

  if (form) {
    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      const firstName = document.getElementById("firstName").value;
      const lastName = document.getElementById("lastName").value;
      const email = document.getElementById("email").value;

      console.debug("Form submitted:", { firstName, lastName, email });

      if (formContainer) {
        formContainer.style.display = "none";
      }

      // Show the notification card
      if (notificationCard) {
        notificationCard.style.display = "block";
      }

      const data = new FormData();
      data.append("first_name", firstName);
      data.append("last_name", lastName);
      data.append("email", email);
      console.debug({ data });

      const response = await fetch("https://delvent.io/api/wait-list", {
        mode: "no-cors",
        // mode: "cors",
        headers: {
          credentials: "include",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Headers": "*",
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        },
        method: "POST",
        body: data,
      });
      console.debug({ response: await response.json() });

      form.reset();
    });
  }

  const closeNotification = document.getElementById("closeNotification");
  if (closeNotification) {
    closeNotification.addEventListener("click", function () {
      notificationCard.style.display = "none";
      formContainer.style.display = "block";
    });
  }
});
