//pathName
var pathInfo = {
    pathName:null
}

init()

function init() {
    if (!location.hash) {
        location.hash = "#home"
        navigate()
    } else {
        navigate()
    }
}

function navigate() {
    var filePath = removeQueryStrAndHash()

    pathInfo.pathName = filePath + '.html'
    getRequest(pathInfo.pathName, function (text) {
        responseData(text)
    });
}

function removeQueryStrAndHash(){
    const fragmentId = location.hash.substr(1);

    var filePath = ""
    for (var position = 0; position < fragmentId.length; position++) { // this is used for edit.html page url coming in correct format.
        var value = fragmentId[position];
        if (value == "?") {
            filePath = ""
            filePath += fragmentId.slice(0, position)
            return filePath
        } else {
            filePath += value
        }

    }
    return filePath
}

function getRequest(path, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", path)

    request.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            callback(this.responseText);
        }
    }
    request.send()
}


function postRequest(book) {
    const request = new XMLHttpRequest();
    request.open("POST", pathInfo.pathName)

    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send(JSON.stringify(book))

}
function responseData(data){
    var recivedData=data.split('<!DOCTYPE html>')
    const books =JSON.parse(recivedData[0])
    const domcontent =recivedData[1]
    displayPage(books,domcontent)
}
function displayPage(books,domcontent) {
    document.querySelector('#content').innerHTML =domcontent
    if (location.hash !== '#home') {
        //Edit Page display
        listeners(books)

    } else {
        //Home page display
        UI.displayBooks(books)
        eventListeners()
    }

}

// hasChange listener
window.addEventListener('hashchange', navigate)
