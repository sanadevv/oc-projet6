const formLogIn = document.getElementById("log-in");
const message = document.getElementById("message");
formLogIn.addEventListener("submit", function (event) {
  event.preventDefault();
  const identifiers = {
    email: event.target.querySelector("[name=email]").value,
    password: event.target.querySelector("[name=password]").value,
  };

  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(identifiers),
  })
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error("Email ou mot de passe incorrects");
      }
    })
    .then((data) => {
      sessionStorage.setItem("authToken", data.token);
      window.location.href = "index.html";
      message.textContent = "Connexion réussie";
    })
    .catch((error) => {
      message.textContent = error;
      message.style.color = "red";
      document.querySelector("#email").style.border = "1px solid red";
      document.querySelector("#password").style.border = "1px solid red";
    });
});
