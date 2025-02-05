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
const readStatus = document.querySelector('input[name="readStatus"]')?.value;
const remBtn = document.querySelector(".rem-btn");

function Book(title, author, pages, read, id) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
  this.id = id;
}

function addBooktoLibrary(title, author, pages, read) {
  let id = myLibrary.length;
  const book = new Book(title, author, pages, read, id);
  myLibrary.push(book);
}

Book.prototype.toggleReadStatus = function () {
  this.read = !this.read;
};

addBooktoLibrary("Atomic Habits", "James Clear", 250, true);
addBooktoLibrary("Thinking Fast and Slow", "Daniel Kahneman", 600, false);
// addBooktoLibrary("Atomic Habits", "James Clear", 250, true);
// addBooktoLibrary("Atomic Habits", "James Clear", 250, true);

function displayBooks() {
  mainBox.innerHTML = "";
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
            <p class="status ${book.read ? "" : "not-read"}" id="status-${
      book.id
    }">
                ${book.read ? "✅ Read" : "❌ Not Read"}
            </p>
            <div class='btns'>
            <button class="toggle-btn" id="toggle-${
              book.id
            }">Toggle Read</button>
            <button class="rem-btn" id="b-${book.id}">
                <img src="Icons/trashIcon.svg" alt="">
            </button>
            </div>
    `;

    mainBox.appendChild(bookCard);
  });
}

displayBooks();

newBookBtn.addEventListener("click", (event) => {
  dialog.showModal();
});

mainBox.addEventListener("click", function (event) {
  if (event.target.closest(".rem-btn")) {
    const button = event.target.closest(".rem-btn");
    const bookId = button.id.split("-")[1];

    myLibrary.splice(bookId, 1); 
    displayBooks(); 
  }

  if (event.target.closest(".toggle-btn")) {
    const button = event.target.closest(".toggle-btn");
    const bookId = button.id.split("-")[1];

    myLibrary[bookId].toggleReadStatus(); 
    displayBooks(); 
  }
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
  const bookReadStatus =
    document.querySelector('input[name="readStatus"]:checked')?.value ===
    "yesRead";

  if (bookTitle && bookAuthor && bookPages) {
    addBooktoLibrary(bookTitle, bookAuthor, bookPages, bookReadStatus);

    mainBox.innerHTML = "";
    displayBooks();
  }

  inputForm.reset();
  dialog.close();
});
