window.addEventListener("DOMContentLoaded", (event) => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbysuPXhjS_cVHj7ay8vCMldMXPTDaisZWuR2J6V1VwUHW3ibXXkd1INIJ7Zi1dLNo6OJA/exec";
  const form = document.forms["bookingForm"];
  const submitButton = form.querySelector('button[type="submit"]');
  const errorMessage = document.getElementById("error-message"); // Asegúrate de tener un elemento con id 'error-message' en tu HTML

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitButton.disabled = true; // Deshabilita el botón
    submitButton.textContent = "Loading..."; // Cambia el texto del botón

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        // Redirige a la página de confirmación
        window.location.href = "/booking-confirmation";
        form.reset(); // Reinicia el formulario
        submitButton.disabled = false; // Rehabilita el botón
        submitButton.textContent = "Submit"; // Restaura el texto del botón
      })
      .catch((error) => {
        errorMessage.textContent =
          "There was an error submitting the form. Please try again."; // Muestra el mensaje de error al usuario
        submitButton.disabled = false; // En caso de error, rehabilita el botón
        submitButton.textContent = "Submit"; // Restaura el texto del botón
      });
  });
});
