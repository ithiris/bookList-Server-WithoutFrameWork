//Update Info

class UpdateInfo {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn
    }
}
// Edit Book
class EditUI {
    constructor() {
        this.title = document.querySelector('#updateTitle')
        this.author = document.querySelector('#updateAuthor')
        this.isbn = document.querySelector('#updateIsbn')
        this.updateBtn = document.querySelector('#updateBtn');
    }
    static queryString() {
        const UrlParams = window.location.hash

        const splitStr = UrlParams.split("?id=")
        const paramsid = splitStr[1]
        return paramsid



    }

    static editBook(books) {
        const UrlParamsId = EditUI.queryString()

        const editui = new EditUI();
        books.forEach((book) => {
            if (book.isbn == UrlParamsId) {
                editui.title.value = book.title
                editui.author.value = book.author
                editui.isbn.value = book.isbn
            }
        });
    }
    static updateBook(bookData) {
        const updateInfo = new UpdateInfo()
        const UrlParamsId = EditUI.queryString()
        const ui = new EditUI();
        const books = bookData
        if (books == null) {
            return
        }
        books.forEach((book, index) => {
            if (book.isbn == UrlParamsId) {
                updateInfo.title = ui.title.value;
                updateInfo.author = ui.author.value;
                updateInfo.isbn = ui.isbn.value
                books.splice(index, 1, updateInfo)
            }
        });
        postRequest(updateInfo)
        window.location.hash = "#home"
    }
}







function listeners(bookData) {

    const ui = new EditUI();
    //Edit Event
    EditUI.editBook(bookData)

//Update Event

    ui.updateBtn.addEventListener('click', () => {
        EditUI.updateBook(bookData)
    });

}
