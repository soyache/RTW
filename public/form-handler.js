window.addEventListener("DOMContentLoaded", (event) => {
  const scriptURL = import.meta.env.SCRIPT_URL;
  console.log("Script URL:", scriptURL); // Añadir log para depuración
  const form = document.getElementById("bookingForm");
  const submitButton = form.querySelector('button[type="submit"]');

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = "Loading...";

    fetch(scriptURL, {
      method: "POST",
      body: new FormData(form),
      headers: {
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Response data:", data); // Añadir log para depuración
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
        console.error("Error:", error); // Añadir log para depuración
        alert("There was an error submitting the form. Please try again.");
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      });
  });
});
