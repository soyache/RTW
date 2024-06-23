window.addEventListener("DOMContentLoaded", (event) => {
  console.log("form-handler.js loaded"); // Log para verificar que el script se carga

  const form = document.getElementById("bookingForm");
  const scriptURL = form.getAttribute("data-script-url");

  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    submitButton.disabled = true;
    submitButton.textContent = "Loading...";

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        if (data.result === "success") {
          window.location.href = "/booking-confirmation";
        } else {
          alert("There was an error submitting the form. Please try again.");
        }
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      })
      .catch((error) => {
        alert("There was an error submitting the form. Please try again.");
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      });
  });
});
