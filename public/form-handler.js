window.addEventListener("DOMContentLoaded", (event) => {
  console.log("form-handler.js loaded"); // Log para verificar que el script se carga

  const scriptURL = import.meta.env.SCRIPT_URL;
  console.log("Script URL:", scriptURL); // Añadir log para depuración
  if (!scriptURL) {
    console.error("SCRIPT_URL is not defined");
  }

  const form = document.getElementById("bookingForm");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault(); // Prevenir el comportamiento por defecto del formulario
    console.log("Form submitted"); // Log para verificar el envío

    submitButton.disabled = true;
    submitButton.textContent = "Loading...";
    console.log("Button disabled and text changed"); // Log para verificar el cambio de estado del botón

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => {
        console.log("Response received"); // Log para verificar la recepción de la respuesta
        return response.json();
      })
      .then((data) => {
        console.log("Response data:", data); // Log para verificar los datos de respuesta
        if (data.result === "success") {
          console.log("Form submission successful, redirecting..."); // Log para verificar el éxito y la redirección
          window.location.href = "/booking-confirmation";
        } else {
          console.log("Form submission failed, showing alert"); // Log para verificar la condición de fallo
          alert("There was an error submitting the form. Please try again.");
        }
        form.reset();
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
        console.log("Form reset and button re-enabled"); // Log para verificar el restablecimiento del formulario y el botón
      })
      .catch((error) => {
        console.error("Error:", error); // Log para verificar errores en la captura
        alert("There was an error submitting the form. Please try again.");
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      });
  });
});
