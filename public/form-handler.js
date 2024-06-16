window.addEventListener("DOMContentLoaded", (event) => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbysuPXhjS_cVHj7ay8vCMldMXPTDaisZWuR2J6V1VwUHW3ibXXkd1INIJ7Zi1dLNo6OJA/exec";
  const form = document.forms["bookingForm"];
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitButton.disabled = true; // Deshabilita el botón
    submitButton.textContent = "Loading..."; // Cambia el texto del botón

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data); // Agrega esto para depuración
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
        console.error(error); // Agrega esto para depuración
        // Muestra un mensaje de error al usuario
        alert("There was an error submitting the form. Please try again.");
        submitButton.disabled = false; // En caso de error, rehabilita el botón
        submitButton.textContent = "Submit"; // Restaura el texto del botón
      });
  });
});
