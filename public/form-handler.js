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
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json(); // Añade esta línea para convertir la respuesta en JSON
      })
      .then((data) => {
        if (data.result === "success") {
          // Solo redirige si la respuesta fue exitosa
          window.location.href = "/booking-confirmation";
        } else {
          // Muestra un mensaje de error al usuario
          alert("There was an error submitting the form. Please try again.");
        }
        form.reset(); // Reinicia el formulario
        submitButton.disabled = false; // Rehabilita el botón
        submitButton.textContent = "Submit"; // Restaura el texto del botón
      })
      .catch((error) => {
        // Muestra un mensaje de error al usuario
        alert("There was an error submitting the form. Please try again.");
        submitButton.disabled = false; // En caso de error, rehabilita el botón
        submitButton.textContent = "Submit"; // Restaura el texto del botón
      });
  });
});
