const STORAGE_KEY = "BOOK_LIST";

let books = [];

function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Maaf, browser kamu tidak mendukung local storage!");
    return false;
  }
  return true;
}

function saveData() {
  const parsed = JSON.stringify(books);
  localStorage.setItem(STORAGE_KEY, parsed);
  document.dispatchEvent(new Event("ondatasaved"));
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(STORAGE_KEY);

  let data = JSON.parse(serializedData);

  if (data !== null) {
    books = data;
  }

  document.dispatchEvent(new Event("ondataloaded"));
}

function updateDataToStorage() {
  if (isStorageExist()) {
    saveData();
  }
}

function composeBookObject(title, author, year, isCompleted) {
  return {
    id: +new Date(),
    isHidden: false,
    title: title,
    author: author,
    year: year,
    isCompleted: isCompleted,
  };
}

function findIndex(bookId) {
  let index = 0;
  for (book of books) {
    if (book.id == bookId) {
      return index;
    }
    index++;
  }

  return -1;
}

function findBook(bookId) {
  for (book of books) {
    if (book.id === bookId) {
      return book;
    }
  }
  return null;
}
