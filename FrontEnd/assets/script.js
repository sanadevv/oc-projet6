const gallery = document.querySelector(".gallery");
const modalGallery = document.querySelector(".modal-gallery");
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    createGallery(data);
  })

  .catch((error) => {
    console.error(error);
  });

// fonction pour créer la galerie dynamiquement
function createGallery(data) {
  data.forEach((work) => {
    const image = document.createElement("img");
    image.src = work.imageUrl;
    const titre = document.createElement("figcaption");
    titre.textContent = work.title;
    const figure = document.createElement("figure");
    figure.dataset.category = work.categoryId;
    figure.appendChild(image);
    figure.appendChild(titre);
    gallery.appendChild(figure);
  });
}
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    createFilters(data);
  })

  .catch((error) => {
    console.error(error);
  });

// fonction pour créer les boutons filtres dynamiquement

function createFilters(data) {
  data.unshift({ id: 0, name: "Tous" });
  const filtres = document.getElementById("filtres");
  data.forEach((filter) => {
    const btnfiltre = document.createElement("button");
    btnfiltre.textContent = filter.name;
    btnfiltre.dataset.id = filter.id;

    filtres.appendChild(btnfiltre);

    btnfiltre.addEventListener("click", filterFigure);
    btnfiltre.addEventListener("click", setActiveButton);
    btnfiltre.classList.add("not-selected");
  });
}
function filterFigure(event) {
  const btnCategory = this.getAttribute("data-id");

  const figures = document.querySelectorAll(".gallery figure ");
  for (let figure of figures) {
    const figureCategory = figure.dataset.category;

    if (btnCategory === "0" || btnCategory === figureCategory) {
      figure.style.display = "block";
    } else {
      figure.style.display = "none";
    }
  }
}
function setActiveButton() {
  const buttons = document.querySelectorAll("#filtres button");
  buttons.forEach((button) => {
    button.classList.remove("selected");
    button.classList.add("not-selected");
  });

  this.classList.add("selected");
  this.classList.remove("not-selected");
}
window.addEventListener("load", () => {
  const token = sessionStorage.getItem("authToken");

  if (token) {
    document.getElementById("filtres").style.display = "none";

    const login = document.querySelector(".login");
    login.textContent = "logout";

    const editionDiv = document.createElement("div");
    editionDiv.classList.add("edition-div");
    const header = document.querySelector("header");
    document.querySelector("body").insertBefore(editionDiv, header);

    const editionIcon = document.createElement("i");
    editionIcon.classList.add("fa-regular");
    editionIcon.classList.add("fa-pen-to-square");
    editionIcon.classList.add("icon");
    editionDiv.appendChild(editionIcon);

    const editionText = document.createElement("p");
    editionDiv.appendChild(editionText);
    editionText.textContent = "Mode édition";
    editionText.classList.add("edition-text");

    const modifyDiv = document.createElement("div");
    document.querySelector(".title-container").appendChild(modifyDiv);

    const modifyBtn = document.createElement("button");
    modifyBtn.classList.add("modify-btn");
    modifyBtn.textContent = "modifier";

    const modifyIcon = document.createElement("i");
    modifyIcon.classList.add("fa-regular");
    modifyIcon.classList.add("fa-pen-to-square");
    modifyDiv.appendChild(modifyIcon);
    modifyDiv.appendChild(modifyBtn);

    const modal = document.querySelector("dialog");
    // modal.classList.add("modal");
    // gallery.appendChild(modal);

    const closeModal = document.querySelector(".close-modal");
    // closeModal.classList.add("fa-solid");
    // closeModal.classList.add("fa-xmark");
    // closeModal.classList.add("close-modal");
    // modal.appendChild(closeModal);

    const modalGallery = document.querySelector(".modal-gallery");
    // modalGallery.classList.add("modal-gallery");
    // modal.appendChild(modalGallery);

    const btnAdd = document.querySelector(".btn-add");
    // btnAdd.classList.add("btn-add");
    // btnAdd.textContent = "Ajouter une photo";
    // modal.appendChild(btnAdd);

    modifyDiv.addEventListener("click", () => {
      modal.showModal();
    });
    closeModal.addEventListener("click", () => {
      modal.close();
    });

    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        createGallery(data);
      })

      .catch((error) => {
        console.error(error);
      });

    // fonction pour créer la galerie dynamiquement
    function createGallery(data) {
      data.forEach((work) => {
        const image = document.createElement("img");
        image.src = work.imageUrl;

        const figure = document.createElement("figure");
        figure.dataset.category = work.categoryId;

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid");
        trashIcon.classList.add("fa-trash-can");

        figure.appendChild(image);
        figure.appendChild(trashIcon);
        modalGallery.appendChild(figure);

        // trashIcon.addEventListener("click", () => {
        //   fetch("http://localhost:5678/api/works/1", {
        //     method: "DELETE",
        //     headers: {
        //       "content-type": "application/json",
        //     },
        //     body: JSON.stringify(),
        //   })
        //     .then((response) => response.json())
        //     .then((data) => {
        //       deletework(data);
        //     });
        // });
        // function deletework(data) {
        //   data.forEach((work) => {
        //     this;
        //   });
        // }
      });
    }
    const modalAddPhoto = document.querySelector(".modal-add");
    btnAdd.addEventListener("click", () => {
      modalAddPhoto.showModal();
      modal.close();
    });
  }
});
