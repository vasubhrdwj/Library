const myLibrary = [];

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

function displayBooks(){
  for(let i=0; i <myLibrary.size(); i++){
    
  }
}
