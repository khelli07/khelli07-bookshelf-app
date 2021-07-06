const UNREAD_BOOK_ID = "incompleteBookList";
const FINISHED_BOOK_ID = "completeBookList";
const BOOK_ITEM_ID = "itemId";

function makeBook(title, author, year, isCompleted) {
  const bookTitle = document.createElement("h3");
  const bookDesc = document.createElement("p");
  bookTitle.innerText = title;
  bookDesc.innerText = "Authored by " + author + ", published in " + year;

  let buttonBlue = createCheckButton();
  let buttonRed = createTrashButton();
  if (isCompleted) {
    buttonBlue = createUndoButton();
    buttonRed = createHideButton();
  }

  const wordContainer = document.createElement("article");
  const buttonContainer = document.createElement("div");
  const container = document.createElement("div");
  container.classList.add("book_list", "fade-in"); //fade-in for animation
  wordContainer.classList.add("book_item");
  buttonContainer.classList.add("action");

  wordContainer.append(bookTitle, bookDesc);
  buttonContainer.append(buttonBlue, buttonRed);
  container.append(wordContainer, buttonContainer);

  return container;
}

function addBook() {
  const incompleteBook = document.getElementById(UNREAD_BOOK_ID);
  const completeBook = document.getElementById(FINISHED_BOOK_ID);

  const title = document.getElementById("inputBookTitle").value;
  const author = document.getElementById("inputBookAuthor").value;
  const year = document.getElementById("inputBookYear").value;
  const isCompleted = document.getElementById("inputBookIsComplete").checked;

  const book = makeBook(title, author, year, isCompleted);

  if (isCompleted) {
    completeBook.append(book);
    incrementBookCount();
  } else {
    incompleteBook.append(book);
  }

  // storage
  const bookObject = composeBookObject(title, author, year, isCompleted);
  book[BOOK_ITEM_ID] = bookObject.id;
  books.push(bookObject);

  updateDataToStorage();
}

function createButton(buttonTypeClass, eventListener) {
  const button = document.createElement("button");
  button.classList.add(buttonTypeClass);
  button.addEventListener("click", function (event) {
    eventListener(event);
    event.stopPropagation();
  });
  return button;
}

function createCheckButton() {
  return createButton("blue-check", function (event) {
    bookIsCompleted(event.target.parentElement.parentElement);
  });
}

function createUndoButton() {
  return createButton("blue-undo", function (event) {
    bookUndoCompleted(event.target.parentElement.parentElement);
  });
}

function createTrashButton() {
  return createButton("red-trash", function (event) {
    bookRemove(event.target.parentElement.parentElement);
  });
}

function bookIsCompleted(bookElement) {
  const completeBook = document.getElementById(FINISHED_BOOK_ID);

  const title = bookElement.querySelector(".book_item h3").innerText;
  const description = bookElement.querySelector(".book_item > p");

  const descText = description.innerText;
  const descLength = descText.length;
  const author = descText.substring(12, descLength - 19);
  const year = descText.substring(descLength - 4);
  const newBook = makeBook(title, author, year, true);

  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isCompleted = true;
  book.id = +new Date(); //buat id baru, agar gap bisa dideteksi
  newBook[BOOK_ITEM_ID] = book.id;

  completeBook.append(newBook);

  //Book Counter
  incrementBookCount();

  //Animation
  bookElement.classList.add("fall");
  bookElement.addEventListener("animationend", function () {
    bookElement.remove();
  });

  updateDataToStorage();
}

function bookUndoCompleted(bookElement) {
  const incompleteBook = document.getElementById(UNREAD_BOOK_ID);

  const title = bookElement.querySelector(".book_item h3").innerText;
  const description = bookElement.querySelector(".book_item > p");

  const descText = description.innerText;
  const descLength = descText.length;
  const author = descText.substring(12, descLength - 19);
  const year = descText.substring(descLength - 4);

  const newBook = makeBook(title, author, year, false);
  const book = findBook(bookElement[BOOK_ITEM_ID]);
  book.isCompleted = false;
  newBook[BOOK_ITEM_ID] = book.id;

  incompleteBook.append(newBook);

  //Book Counter
  decrementBookCount();

  //Animation
  bookElement.classList.add("fall");
  bookElement.addEventListener("animationend", function () {
    bookElement.remove();
  });

  updateDataToStorage();
}

function bookRemove(bookElement) {
  if (confirm("Apakah yakin ingin menghapus buku?")) {
    const bookPosition = findIndex(bookElement[BOOK_ITEM_ID]);
    books.splice(bookPosition, 1);
    bookElement.classList.add("fall");
    bookElement.addEventListener("animationend", function () {
      bookElement.remove();
    });

    updateDataToStorage();
  }
}

function refreshDataFromStorage() {
  const incompleteBook = document.getElementById(UNREAD_BOOK_ID);
  const completeBook = document.getElementById(FINISHED_BOOK_ID);

  for (book of books) {
    const newBook = makeBook(
      book.title,
      book.author,
      book.year,
      book.isCompleted
    );
    newBook[BOOK_ITEM_ID] = book.id;

    if (!book.isHidden) {
      if (book.isCompleted) {
        completeBook.append(newBook);
      } else {
        incompleteBook.append(newBook);
      }
    }
  }
}

/* OPTIONAL : SEARCH */
function searchBook() {
  const bookTitle = document.getElementById("searchBookTitle").value;
  const bookTitleLists = document.querySelectorAll(".book_item h3");

  for (book of bookTitleLists) {
    let bookName = book.innerText.toLowerCase();
    if (!bookName.includes(bookTitle)) {
      book.parentElement.parentElement.style.display = "none";
    } else {
      book.parentElement.parentElement.style.display = "flex";
    }
  }
}

/* IMPROVISATION */
function createHideButton() {
  return createButton("red-hide", function (event) {
    hideFinishedBook(event.target.parentElement.parentElement);
  });
}

function hideFinishedBook(bookElement) {
  if (
    confirm(
      "Apakah Anda yakin untuk menghilangkan buku yang telah selesai? \
      Buku yang telah dihilangkan akan terhapus di storage setelah 1 menit."
    )
  ) {
    bookElement.style.display = "none";
    const book = findBook(bookElement[BOOK_ITEM_ID]);
    book.isHidden = true;
    updateDataToStorage();
  }
}
