window.addEventListener("DOMContentLoaded", (event) => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbysuPXhjS_cVHj7ay8vCMldMXPTDaisZWuR2J6V1VwUHW3ibXXkd1INIJ7Zi1dLNo6OJA/exec";
  const form = document.forms["bookingForm"];
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitButton.disabled = true; // Deshabilita el botón
    submitButton.textContent = "Loading..."; // Cambia el texto del botón

    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then((response) => {
        alert("Thanks for booking! We'll contact you soon.");
        form.reset(); // Reinicia el formulario
        submitButton.disabled = false; // Rehabilita el botón
        submitButton.textContent = "Submit"; // Restaura el texto del botón
      })
      .catch((error) => {
        console.error("Error!", error.message);
        submitButton.disabled = false; // En caso de error, rehabilita el botón
        submitButton.textContent = "Submit"; // Restaura el texto del botón
      });
  });
});
