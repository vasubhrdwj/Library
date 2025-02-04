const myLibrary = [];

const mainBox = document.querySelector(".display");
const newBook = document.querySelector(".new-book");
const newBookBtn = document.querySelector(".new-book-btn");
const inputForm = document.querySelector(".new-input");
const dialog = document.querySelector("dialog");
const closeBtn = document.querySelector(".close-btn");
const addBtn = document.querySelector(".form-add");
const title = document.querySelector("#title");
const author = document.querySelector("#author");
const pages = document.querySelector("#pages");
const readStatus = document.querySelector(
  'input[name="readStatus"]'
)?.value;

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBooktoLibrary(title, author, pages, read) {
  const book = new Book(title, author, pages, read);
  myLibrary.push(book);
}

addBooktoLibrary("Atomic Habits", "James Clear", 250, true);
addBooktoLibrary("Thinking Fast and Slow", "Daniel Kahneman", 600, false);
// addBooktoLibrary("Atomic Habits", "James Clear", 250, true);
// addBooktoLibrary("Atomic Habits", "James Clear", 250, true);

function displayBooks() {
  myLibrary.forEach((book) => {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card");

    bookCard.innerHTML = `
            <h3 class="title">${book.title}</h3>
            <br><br>
            <p><strong>Author:</strong> ${book.author}</p>
            <br>
            <p><strong>Pages:</strong> ${book.pages}</p>
            <br>
            <p class="status ${book.read ? "" : "not-read"}">
                ${book.read ? "✅ Read" : "❌ Not Read"}
            </p>
    `;

    mainBox.appendChild(bookCard);
  });
}

displayBooks();

newBookBtn.addEventListener("click", (event) => {
  dialog.showModal();
});

closeBtn.addEventListener("click", (event) => {
  event.preventDefault();
  dialog.close();
});

inputForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const bookTitle = title.value.trim();
  const bookAuthor = author.value.trim();
  const bookPages = pages.value.trim();
  const bookReadStatus = document.querySelector('input[name="readStatus"]:checked')?.value === "yesRead"; 


  if (bookTitle && bookAuthor && bookPages) {
    addBooktoLibrary(bookTitle, bookAuthor, bookPages, bookReadStatus);

    mainBox.innerHTML = "";
    displayBooks();
  }

  // Reset form and close dialog
  inputForm.reset();
  dialog.close();
});
