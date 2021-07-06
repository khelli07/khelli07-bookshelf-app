function bookCounter() {
  const bookCount = document.getElementById("count");

  let count = 0;
  let timeLimit = 1 * 60 * 1000; //gap 1 menit, cuma nyoba doang, bisa dibuat 1 minggu :D
  let dateNow = new Date().getTime();
  for (book of books) {
    let gap = dateNow - book.id;
    if (book.isCompleted && gap <= timeLimit) {
      count++;
    }

    //Hapus data hidden setiap 1 menit
    if (book.isCompleted && book.isHidden && gap > timeLimit) {
      const bookPosition = findIndex(book.id);
      books.splice(bookPosition, 1);

      book.remove();
      updateDataToStorage();
    }
  }

  bookCount.innerText = count;
}

setInterval(bookCounter, 10);
