/*===========================================================
    Global variables
===========================================================*/
var currentDvd = "";

/*===========================================================
    Ready on load
===========================================================*/

$(document).ready(function () {


    $("#edit-dvd").hide();
    $("#add-dvd").hide();

    addDvd();
    searchDvd();
    displayDvds();
    getDvdIdEditButton();
    deleteButton();
    editSuccessEvent();
    addDvdBtn();
});


/*===========================================================
    Add Dvd
===========================================================*/
function addDvd() {
    $(document).on("click", "#create-btn", function () {
        $("#add-dvd").show();
        //alert("Create Dvd");

    });
}

function addDvdValues() {

    var data = returnData();
    var newId = data.length + 1;
    // for (var scanner = 0; scanner < data.length; scanner++) {
    //     var currentId = data[scanner].dvdId;
    //     newId = currentId++;
    // }
    console.log(newId);

    var userInput = {
        "dvdId": newId,
        "title": $("#add-dvd-title").val(),
        "releaseYear": $("#add-release").val(),
        "director": $("#add-director").val(),
        "rating": $("#add-rating").val(),
        "notes": $("#add-comments").val()
    }

    //adding new dvd
    data.push(userInput);
    displayDvds();
}

function addDvdBtn() {
    $(document).on("click", "#add-dvd-btn", function (event) {
        event.preventDefault;
        addDvdValues();


        $("#add-dvd").hide();
    })
}


/*===========================================================
    Get dvd Ids
===========================================================*/

function getDvdIdEditButton() {

    $(document).on("click", "#edit-btn-tbl", function (event) {
        $("#edit-dvd").show();
        event.preventDefault();
        var btn = $(event.target);
        var id = btn.attr("data-id");
        console.log(id);
        currentDvd = getDvdFromDataBase(id);

        $("#edit-result").text(`Edit ${currentDvd.title}`);


    })


    function getDvdFromDataBase(id) {
        var dvd = "";
        console.log(id);
        returnData().forEach(function (element) {
            if (element.dvdId == id) {
                currentDvd = element;

                dvd = currentDvd;

            }
        });
        return dvd;
    }

}





function editSuccessEvent() {
    $(document).on("click", "#edit-btn-submit", function (event) {
        event.preventDefault;

        console.log("before");
        console.log(returnData());

        var id = currentDvd.dvdId;
        console.log(returnData());
        var newEdittedDvd = getEditUserValues(id);
        console.log("new edit");
        console.log(newEdittedDvd);
        console.log(returnData());

        editDvdFromDataBase(newEdittedDvd);
        console.log(returnData());
        displayDvds();
        $("#edit-dvd").hide();
    });
}

function getEditUserValues(id) {
    var userInput = {
        "dvdId": id,
        "title": $("#edit-title").val(),
        "releaseYear": $("#edit-release").val(),
        "director": $("#edit-director").val(),
        "rating": $("#edit-rating").val(),
        "notes": $("#comments").val()
    }
    return userInput;
}




function editDvdFromDataBase(newEdittedDvd) {
    var currentData = returnData();
    for (var x = 0; x < currentData.length; x++) {
        if (currentData[x].dvdId == newEdittedDvd.dvdId) {

            currentData[x] = newEdittedDvd;
            console.log("final");
            console.log(currentData[x]);
            console.log(currentData);
        }
    }
}

/*===========================================================
    Remove Dvds
===========================================================*/
function deleteButton() {
    $(document).on("click", ".delete", function (event) {
        //alert("hello");
        //console.log("Hello");
        event.preventDefault;
        var value = $(event.target);
        //console.log(value);
        var id = value.attr("data-id");
        console.log(id);
        //var dvd = getDvdFromDataBase(id);
        //console.log(dvd);

        //removeDvd(dvd);
        getAndremoveDvd(id);
        displayDvds();
    })
}

//remove dvd
function getAndremoveDvd(id) {
    var currentData = returnData();
    for (var x = 0; x < currentData.length; x++) {
        if (currentData[x].dvdId == id) {
            //splice removes the index and the amount
            currentData = currentData.splice(x, 1);
            // currentData[x] = dvd;
            // console.log("final");
            // console.log(currentData[x]);
            // console.log(currentData);
        }
    }
}

/*===========================================================
    View Dvds
===========================================================*/

function displayDvds() {
    refreshDisplay();
    var data = returnData();
    data.forEach(function (element) {

        append(htmlConvert(element));
    });
}

function refreshDisplay() {
    $("#dvd-print").empty();
}

function append(html) {
    $("#dvd-print").append(html);
}

function htmlConvert(data) {
    return `
    <tr>
        <th scope="row">${data.title}</th>
            <td>${data.releaseYear}</td>
            <td>${data.director}</td>
            <td>${data.rating}</td>
            <td><a data-id="${data.dvdId}" id="edit-btn-tbl">Edit</a> | <a data-id="${data.dvdId}" id="delete-btn" class="delete">Delete</a></td>
    </tr> 
    `;
}

/*===========================================================
    Search Dvds
===========================================================*/

function searchDvd() {
    //$("search-dvd-btn")

    var btns = ["title", "release-date", "director", "rating"];
    var dataAttr = ["title", "releaseYear", "director", "rating"];

    for (var y = 0; y < btns.length; y++) {
        $(document).on("click", "#" + btns[y], function (event) {
            var value = $("#" + btns[y]).val();
            var textValue = $("#search-box").val();
            for (var data = 0; data < btns.length; data++) {
                var btn = $(event.target);
                var textValue = btn.attr("data-" + dataAttr[data]);

                if (textValue != undefined) {
                    // textValue;
                    //console.log("textValue " + textValue);
                    // var searchInput = $("#search-box").val();
                    // console.log(searchInput);
                    searchBtn(textValue);
                    //

                }
            }

        })
    }

}

function getDvdFromDataBase(category, name) {
    refreshDisplay();
    //var dvd = "";
    //var dataAttr = ["title", "releaseYear", "director", "rating"];
    returnData().forEach(function (element) {
        //console.log(category);

        // if (category == "title"){

        // }  
        console.log(category);
        console.log(name);
        console.log(element.releaseYear);
        switch (category) {
            case "title":
                if (element.title == name) {
                    var html = htmlConvert(element);
                    append(html);
                }

                break;
            case "releaseYear":
                //
                if (element.releaseYear == name) {
                    var html = htmlConvert(element);
                    append(html);
                }
                break;
            case "director":
                //
                if (element.director == name) {
                    var html = htmlConvert(element);
                    append(html);
                }
                break;
            case "rating":
                //
                if (element.rating == name) {
                    var html = htmlConvert(element);
                    append(html);
                }
                break;


        }
    });

}

function searchBtn(textValue) {
    $(document).on("click", "#search-dvd-btn", function (event) {
        event.preventDefault;
        var searchInput = $("#search-box").val();
        console.log(searchInput);
        console.log("textValue " + textValue);
        //code to search and display

        getDvdFromDataBase(textValue, searchInput);

    })
}

// $(document).on("click", "#search-dvd-btn", function (event) {
//     if ($("#search-box").val() == "") {
//         alert("Insert Search Category and Search Term");
//     }
// })
/*===========================================================
    Data
===========================================================*/

function returnData() {
    return data;
}

var data = [
    {
        "dvdId": 0,
        "title": "A Great Tale",
        "releaseYear": 2015,
        "director": "Sam Jones",
        "rating": "PG",
        "notes": "This really is a great tale!"
    },
    {
        "dvdId": 1,
        "title": "A Good Tale",
        "releaseYear": 2012,
        "director": "Joe Smith",
        "rating": "PG-13",
        "notes": "This is a good tale!"
    }
]
