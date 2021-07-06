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

function pushNotification() {
  window;
}

/* NON FUNCTION CALLS */
setInterval(bookCounter, timeLimit / 2);
