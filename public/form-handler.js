window.addEventListener("DOMContentLoaded", (event) => {
  const scriptURL =
    "https://script.google.com/macros/s/AKfycbysuPXhjS_cVHj7ay8vCMldMXPTDaisZWuR2J6V1VwUHW3ibXXkd1INIJ7Zi1dLNo6OJA/exec";
  // process.env.SCRIPT_URL;
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
        console.log(data);
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
        console.error(error);
        alert("There was an error submitting the form. Please try again.");
        submitButton.disabled = false;
        submitButton.textContent = "Submit";
      });
  });
});
