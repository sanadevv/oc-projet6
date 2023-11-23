const gallery = document.querySelector(".gallery");
const modalGallery = document.querySelector(".modal-gallery");
const modalAddPhoto = document.querySelector(".modal-add");
const modal = document.querySelector("dialog");

// *******création de la galerie****** \\
fetch("http://localhost:5678/api/works")
  .then((response) => response.json())
  .then((data) => {
    createGallery(data);
  })

  .catch((error) => {
    console.error(error);
  });

function createGallery(data) {
  data.forEach((work) => {
    createWorkInGallery(work);
  });
}
function createWorkInGallery(work) {
  const image = document.createElement("img");
  image.src = work.imageUrl;
  const titre = document.createElement("figcaption");
  titre.textContent = work.title;
  const figure = document.createElement("figure");
  figure.dataset.category = work.categoryId;
  figure.dataset.id = work.id;
  figure.appendChild(image);
  figure.appendChild(titre);
  gallery.appendChild(figure);
}
// ******creation des filtres****** \\
fetch("http://localhost:5678/api/categories")
  .then((response) => response.json())
  .then((data) => {
    createFilters(data);
  })

  .catch((error) => {
    console.error(error);
  });

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
// ******la page d'acceuil aprés la connexion de l'administrateur****** \\
window.addEventListener("load", () => {
  const token = sessionStorage.getItem("authToken");

  if (token) {
    // modification de la page d'acceuil aprés la connexion
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
    editionText.textContent = "Mode édition";
    editionText.classList.add("edition-text");
    editionDiv.appendChild(editionText);

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

    // *****la modal de suppression des traveaux***** \\
    const closeModal = document.querySelector(".close-modal");
    const modalGallery = document.querySelector(".modal-gallery");
    const btnAdd = document.querySelector(".btn-add");

    modifyDiv.addEventListener("click", () => {
      modal.showModal();
    });
    closeModal.addEventListener("click", () => {
      modal.close();
    });

    fetch("http://localhost:5678/api/works")
      .then((response) => response.json())
      .then((data) => {
        createModalGallery(data);
      })

      .catch((error) => {
        console.error(error);
      });

    function createModalGallery(data) {
      data.forEach((work) => {
        createWorkInModalGallery(work);
      });
    }
    function createWorkInModalGallery(work) {
      const image = document.createElement("img");
      image.src = work.imageUrl;

      const figure = document.createElement("figure");
      figure.dataset.id = work.id;

      const trashIcon = document.createElement("i");
      trashIcon.classList.add("fa-solid");
      trashIcon.classList.add("fa-trash-can");

      figure.appendChild(image);
      figure.appendChild(trashIcon);
      modalGallery.appendChild(figure);

      // la suppression des travaux
      trashIcon.addEventListener("click", (event) => {
        const figure = event.target.parentElement;
        const id = figure.dataset.id;
        deleteWork(id, figure);
      });
    }
    function deleteWork(id, figure) {
      const token = sessionStorage.getItem("authToken");
      fetch("http://localhost:5678/api/works/" + id, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => {
          if (response.ok) {
            figure.style.display = "none";
            const galleryFigure = document.querySelector(
              `.gallery figure[data-id="${id}"]`
            );
            if (galleryFigure) {
              galleryFigure.style.display = "none";
            }
          } else throw new Error("impossible de supprimer le travail");
        })

        .catch((error) => {
          console.error(error);
        });
    }
    // *****la modal d'ajout des travaux***** \\
    btnAdd.addEventListener("click", () => {
      modalAddPhoto.showModal();
      modal.close();
    });
    const btnCloseAddModal = document.querySelector(".close-addmodal");
    btnCloseAddModal.addEventListener("click", () => {
      modalAddPhoto.close();
      inputContainer.style.display = "flex";
      imagePreview.style.display = "none";
      form.reset();
    });
    const bntReturn = document.querySelector(".fa-arrow-left");
    bntReturn.addEventListener("click", () => {
      modalAddPhoto.close();
      modal.showModal();
      inputContainer.style.display = "flex";
      imagePreview.style.display = "none";
      form.reset();
    });
    // ajouter les catégories dans le menu déroulant
    fetch("http://localhost:5678/api/categories")
      .then((response) => response.json())
      .then((data) => {
        createSelect(data);
      })

      .catch((error) => {
        console.error(error);
      });

    function createSelect(data) {
      const inputSelect = document.getElementById("category-select");
      data.forEach((select) => {
        const option = document.createElement("option");
        option.textContent = select.name;
        option.value = select.id;
        inputSelect.appendChild(option);
      });
    }
    // ajouter un aperçu de l'image
    const imageInput = document.getElementById("add-image");
    const imagePreview = document.getElementById("image-preview");
    const inputContainer = document.querySelector(".input-container");
    function previewPicture() {
      imageInput.addEventListener("change", function () {
        const file = this.files[0];

        if (file) {
          const reader = new FileReader();
          reader.onload = function (e) {
            imagePreview.src = e.target.result;
          };

          reader.readAsDataURL(file);
        }
        inputContainer.style.display = "none";
        imagePreview.style.display = "block";
      });
    }
    previewPicture();

    // activer le bouton valider
    const inputTitle = document.getElementById("titre");
    const inputSelect = document.getElementById("category-select");
    const btnSubmit = document.getElementById("btn-submit");
    const inputFile = document.getElementById("add-image");

    function activateButton() {
      if (
        inputTitle.value.trim() !== "" &&
        inputSelect.value !== "" &&
        inputFile.value !== ""
      ) {
        btnSubmit.disabled = false;
        btnSubmit.style.backgroundColor = "#1D6154";
      } else {
        btnSubmit.disabled = true;
        btnSubmit.style.backgroundColor = "#A7A7A7";
      }
    }
    inputTitle.addEventListener("input", activateButton);
    inputSelect.addEventListener("change", activateButton);
    inputFile.addEventListener("change", activateButton);
    // Ajout d'un nouveau travail
    const form = document.getElementById("add-form");

    form.addEventListener("submit", function (event) {
      event.preventDefault();
      const formData = new FormData(this);

      formData.append("image", inputFile.files[0]);
      const token = sessionStorage.getItem("authToken");
      fetch("http://localhost:5678/api/works", {
        method: "POST",
        body: formData,
        headers: {
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          createWorkInGallery(data);
          createWorkInModalGallery(data);
          modalAddPhoto.close();
          modal.showModal();

          inputContainer.style.display = "flex";
          imagePreview.style.display = "none";
          form.reset();
        })

        .catch((error) => {
          console.error(error);
        });
    });
  }
});
