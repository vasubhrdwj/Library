class Book {
  constructor(title, author, pages, read, id) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = id;
  }

  toggleReadStatus() {
    this.read = !this.read;
  }
}

class Library {
  constructor() {
    this.books = [];
    this.mainBox = document.querySelector(".display");
    this.dialog = document.querySelector("dialog");
    this.inputForm = document.querySelector(".new-input");
    this.titleInput = document.querySelector("#title");
    this.authorInput = document.querySelector("#author");
    this.pagesInput = document.querySelector("#pages");

    this.initializeEventListeners();
  }

  initializeEventListeners() {
    document.querySelector(".new-book-btn").addEventListener("click", () => {
      this.dialog.showModal();
    });

    document.querySelector(".close-btn").addEventListener("click", (event) => {
      event.preventDefault();
      this.dialog.close();
    });

    this.inputForm.addEventListener("submit", (event) => this.addBookFromForm(event));

    this.mainBox.addEventListener("click", (event) => this.handleBookActions(event));
  }

  addBook(title, author, pages, read) {
    const id = this.books.length;
    const book = new Book(title, author, pages, read, id);
    this.books.push(book);
    this.displayBooks();
  }

  addBookFromForm(event) {
    event.preventDefault();

    const title = this.titleInput.value.trim();
    const author = this.authorInput.value.trim();
    const pages = this.pagesInput.value.trim();
    const read = document.querySelector('input[name="readStatus"]:checked')?.value === "yesRead";

    if (title && author && pages) {
      this.addBook(title, author, pages, read);
      this.inputForm.reset();
      this.dialog.close();
    }
  }

  handleBookActions(event) {
    const button = event.target.closest("button");

    if (!button) return;

    const bookId = parseInt(button.id.split("-")[1]);

    if (button.classList.contains("rem-btn")) {
      this.removeBook(bookId);
    } else if (button.classList.contains("toggle-btn")) {
      this.toggleBookReadStatus(bookId);
    }
  }

  removeBook(id) {
    this.books = this.books.filter((book) => book.id !== id);
    this.displayBooks();
  }

  toggleBookReadStatus(id) {
    const book = this.books.find((book) => book.id === id);
    if (book) {
      book.toggleReadStatus();
      this.displayBooks();
    }
  }

  displayBooks() {
    this.mainBox.innerHTML = "";
    this.books.forEach((book) => {
      const bookCard = document.createElement("div");
      bookCard.classList.add("book-card");

      bookCard.innerHTML = `
        <h3 class="title">${book.title}</h3>
        <br><br>
        <p><strong>Author:</strong> ${book.author}</p>
        <br>
        <p><strong>Pages:</strong> ${book.pages}</p>
        <br>
        <p class="status ${book.read ? "" : "not-read"}" id="status-${book.id}">
            ${book.read ? "✅ Read" : "❌ Not Read"}
        </p>
        <div class='btns'>
          <button class="toggle-btn" id="toggle-${book.id}">Toggle Read</button>
          <button class="rem-btn" id="rem-${book.id}">
            <img src="Icons/trashIcon.svg" alt="">
          </button>
        </div>
      `;

      this.mainBox.appendChild(bookCard);
    });
  }
}

// Initialize library and add some books
const myLibrary = new Library();
myLibrary.addBook("Atomic Habits", "James Clear", 250, true);
myLibrary.addBook("Thinking Fast and Slow", "Daniel Kahneman", 600, false);
