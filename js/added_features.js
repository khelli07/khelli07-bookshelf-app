let timeLimit = 1 * 60 * 1000; //gap 1 menit, cuma nyoba doang, bisa dibuat 1 minggu :D

function bookCounter() {
  const bookCount = document.getElementById("count");

  let count = 0;
  let dateNow = new Date().getTime();
  for (book of books) {
    let gap = dateNow - book.id;
    if (book.isCompleted && gap <= timeLimit) {
      count++;
    }
    //Hapus data hidden setiap time limit
    if (book.isCompleted && book.isHidden && gap > timeLimit) {
      const bookPosition = findIndex(book.id);
      books.splice(bookPosition, 1);

      book.remove();
      updateDataToStorage();
    }
  }
  bookCount.innerText = count;
}

function incrementBookCount() {
  const bookCount = document.getElementById("count");
  let number = parseInt(bookCount.innerText);
  bookCount.innerText = number + 1;
}

function decrementBookCount() {
  const bookCount = document.getElementById("count");
  let number = parseInt(bookCount.innerText);

  if (number != 0) {
    bookCount.innerText = number - 1;
  }
}

function collapseDiv(elementId) {
  const div = document.querySelector(elementId);
  const heightNow = div.clientHeight;
  let divHeight = "0vw";

  let countRead = 0;
  let countUnread = 0;
  for (book of books) {
    if (book.isHidden == false && book.isCompleted == false) {
      countUnread++;
    } else if (book.isHidden == false && book.isCompleted == true) {
      countRead++;
    }
  }

  if (elementId == UNREAD_BOOK_ID) {
    divHeight = (countUnread - 1) * heightNow;
  } else {
    divHeight = (countRead - 1) * heightNow;
  }

  div.animate([{ height: divHeight }], {
    duration: 1000,
  });
}

function buttonToggle(buttonId, elementId) {
  const button = document.getElementById(buttonId);
  const elementContainer = document.getElementById(elementId);

  if ((elementContainer.style.display = "block")) {
    button.style.marginBottom = "2vw";
  }

  button.addEventListener("click", function () {
    let toggle = button.classList.toggle("value");
    if (toggle == false) {
      elementContainer.style.display = "none";
      button.style.marginBottom = "0";
    } else {
      elementContainer.style.display = "block";
      button.style.marginBottom = "2vw";
    }
  });
}

/* NON FUNCTION CALLS */
setInterval(bookCounter, timeLimit / 2);
buttonToggle("toggle-complete", "completeBookList");
buttonToggle("toggle-incomplete", "incompleteBookList");
