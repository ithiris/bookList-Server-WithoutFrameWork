var http = require('http');
var fs = require('fs');
var url = require('url');

const books = [{
    title: 'Book1',
    author: 'Jhon-Doe',
    isbn: '1'
},
    {
        title: 'Book2',
        author: 'Jhon',
        isbn: '2'
    }
];

//create a server object:
const server = http.createServer(function (req, res) {
    var pathname = url.parse(req.url).pathname;
    var routePath = '/route.js';
    var scriptPath = '/index.js';
    var cssPath = '/index.css';
    var editScript = '/edit.js';
    var homePath = 'home.html';
    var editPath = 'edit.html'

    console.log("Request for " + pathname + " received.");
    getRequest(req, res, pathname);
    postRequest(req, res, pathname);
// // // //Get request
// if (req.method === "GET" && pathname === "/home.html" || pathname =='/edit.html') {

//     res.writeHead(200, {
//           "Content-Type": 'text/plain',

//     })

//     res.write(JSON.stringify(books));
//     //console.log(books)

// }




    if (pathname == "/") {

        var html = fs.readFileSync('index.html', "utf8");
        console.log(res.write(html));
    } else if (pathname == scriptPath) {

        var script = fs.readFileSync('index.js', "utf8");
        res.write(script)
    } else if (pathname == editScript) {

        var script = fs.readFileSync('edit.js', "utf8");
        res.write(script)
    } else if (pathname == routePath) {

        var script = fs.readFileSync('route.js', "utf8");
        res.write(script)
    } else if (pathname == cssPath) {
        res.writeHead(200, {
            'Content-Type': 'text/css'
        });
        var css = fs.readFileSync('index.css', "utf8");
        res.write(css)

    } else {
        if (pathname != "/home.html") {
            var editPage = fs.readFileSync(editPath, "utf8");
            res.write(editPage);

        } else {
            var homePage = fs.readFileSync(homePath, "utf8");
            res.write(homePage);
        }

    }
    res.end();
});
var port =8020;
server.listen(port, "localhost", function () {
    console.log(`server is running on localhost:${port}`)
});


//Get request

function getRequest(req, res, pathname) {
    if (req.method === "GET" && pathname === '/home.html' || pathname === '/edit.html') {
        res.writeHead(200, {
            "Content-Type": 'text/plain',

        })
        console.log(books)
        res.write(JSON.stringify(books))
    }
}


//Post request
function postRequest(req, res, pathname) {
    if (req.method === "POST" && pathname === '/home.html' || pathname === '/edit.html') {
        console.log("postcoming")
        req.setEncoding('utf-8');
        req.on('data', (chunk) => {
            var book = JSON.parse(chunk);
            updateBook(book, pathname)

            if (pathname == '/home.html' && typeof book == 'object') {
                books.push(book)
            }
        });
        req.on('end', () => {
            res.end(JSON.stringify(books));
        });
    }
}

function updateBook(Updatedbook, pathname) {
    if (pathname =='/edit.html') {
        const UrlParamsId = Updatedbook.isbn
        books.forEach((book, index) => {
            if (book.isbn == UrlParamsId) {
                book.title = Updatedbook.title;
                book.author = Updatedbook.author;
                book.isbn = Updatedbook.isbn
                books.splice(index, 1, book)
            }
        });
    }
    console.log(books)
}
