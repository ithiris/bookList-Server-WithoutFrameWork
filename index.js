//Book Class:Represent a book
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}
//  deleteInfo
var deleteIcon = null;
var isbn = null;
// Ui class:Handle UI tasks


class UI {

    constructor() {
        this.title = document.querySelector('#title');
        this.author = document.querySelector("#author");
        this.isbn = document.querySelector("#isbn");
        this.form = document.querySelector("#book-form");
        this.bookList = document.querySelector("#book-list");
        this.modelDelteBtn = document.querySelector(".yes");
        this.modal = document.querySelector('.popup');
        this.close = document.querySelector('.closed');
        this.cancel = document.querySelector('.cancel')
    }



    static displayBooks(books) {
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const ui = new UI()


        const row = document.createElement('tr');

        row.innerHTML = `
      <td>${book.title}</td>
      <td>${book.author}</td>
      <td>${book.isbn}</td>
      <td><a href="#edit" class="btn btn-primary btn-sm edit"><i class="fa fa-edit"></i></a></td>
    <td><a class="btn btn-danger btn-sm delete"><i class="fa fa-trash"></i></a></td>
    `

        ui.bookList.appendChild(row);
    }


    static editBook(element) {
        if (element.classList.contains('fa-edit')) {
            const trElement = element.parentElement.parentElement.parentElement
            const isbn = trElement.cells[2].textContent;
            const currentPath = element.parentElement.href
            element.parentElement.href = `${currentPath}?id=${isbn}`

        }

    }

    static deleteBook(element) {
        element.parentElement.parentElement.parentElement.remove();

    }

    static showAlert(message, className) {
        const div = document.createElement('div')
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        //vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }


    static clearFields() {
        document.querySelector('#title').value = "";
        document.querySelector('#author').value = "";
        document.querySelector('#isbn').value = "";

    }
}



///Event:Display Books
function eventListeners() {
    const ui = new UI();


    const form = ui.form;
    const bookList = ui.bookList; //tbody
    const deleteBtn = ui.modelDelteBtn;
    const closeBtn = ui.close;
    const cancelBtn = ui.cancel

    if (form == null || bookList == null || deleteBtn == null || closeBtn == null || cancelBtn == null) {
        return
    }
    //form SubmitBtn
    form.addEventListener('submit', () => {
        event.preventDefault()
        // Get form values
        const title = ui.title.value;
        const author = ui.author.value;
        const isbn = ui.isbn.value
        //validate
        if (title === '' || author === '' || isbn === '') {
            UI.showAlert('please fill in all fields', 'danger');
        } else {
            //         //Instatiate book
            const book = new Book(title, author, isbn);

            //         //Add Book to UI
            UI.addBookToList(book)

            // Add book to server

            postRequest(book)

            //show success message
            UI.showAlert('Book Added', 'success');

            //        // clear fields
            UI.clearFields();

        }


    });
    //Event:Edit a Book
    bookList.addEventListener('click', (event) => {

        UI.editBook(event.target);

    });

    bookList.addEventListener('click', (event) => {
        getDeleteEventTarget(event)
        openModal()
    });

    // ModelBtn-Delete
    deleteBtn.addEventListener('click', () => {
        onDelete()
    });

    //pop-up close
    closeBtn.addEventListener('click', () => {
        closeModal()
    });

    cancelBtn.addEventListener('click', () => {
        closeModal()
    });

}







//deleteBtnTarget
function getDeleteEventTarget(event) {
    if (event.target.classList.contains('fa-trash')) {
        deleteIcon = event.target;
        isbn = event.target.parentElement.parentElement.previousElementSibling.previousElementSibling.textContent
    }
}

//Close Model
function closeModal() {
    const ui = new UI();
    ui.modal.style.display = "none"
}

//Open Modal
function openModal() {
    if (event.target.classList.contains('fa-trash')) {

        const ui = new UI();
        ui.modal.style.display = "block"
    }
}

//OnDelete
function onDelete() {

    const trash = deleteIcon



    //Delete Book
    UI.deleteBook(trash)

    //modalClose
    closeModal()


    //isbnValue
    const isbnValue = isbn

    // Remove book from server

    postRequest(isbnValue)

    // Show success message
    UI.showAlert('Book Removed', 'success');


}
