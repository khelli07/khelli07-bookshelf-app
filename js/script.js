document.addEventListener("DOMContentLoaded", function () {
  const submitForm = document.getElementById("inputBook");

  submitForm.addEventListener("submit", function (event) {
    event.preventDefault();
    addBook();
  });

  const submitSearch = document.getElementById("searchBook");

  submitSearch.addEventListener("submit", function (event) {
    event.preventDefault();
    searchBook();
  });

  if (isStorageExist()) {
    loadDataFromStorage();
  }

  bookCounter(); //diperlukan untuk awal load browser
});

document.addEventListener("ondatasaved", () => {
  console.log("Data berhasil disimpan.");
});

document.addEventListener("ondataloaded", () => {
  refreshDataFromStorage();
});

// document.cookie = "SameSite=None; Secure";
