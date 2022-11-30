var MODEL = (function () {


    var _changePageContent = function (pageID) {

        let contentName = pageID + "Content";
        $("#app").html(eval(contentName));

    };

    // Makes the results accesible in app.js
    return {

        // makes it seen as updateView
        changePageContent: _changePageContent,

    };
    })();