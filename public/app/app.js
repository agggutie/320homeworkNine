var LISTS = [
    {
    name: "Dairy",
        listItems: [
            {
                name: "Milk",
                checked: false,
                category: "Dairy",
            },
            {
                name: "Cheese",
                checked: false,
                category: "Dairy",
            },{
                name: "Butter",
                checked: false,
                category: "Dairy",
            },
        ],
    },
    {
        name: "Camping",
            listItems: [
                {
                    name: "Tent",
                    checked: false,
                    category: "Sporting goods",
                },
                {
                    name: "Hammock",
                    checked: false,
                    category: "Sporting goods",
                },{
                    name: "Bug Spray",
                    checked: false,
                    category: "Outdoor",
                },
            ],
    },
    {
        name: "Chips",
            listItems: [
                {
                    name: "Sun Chips",
                    checked: false,
                    category: "Chips",
                },
                {
                    name: "Takis",
                    checked: false,
                    category: "Chips",
                },{
                    name: "Kettle Chips",
                    checked: false,
                    category: "Chips",
                },
            ],
    },
    {
        name: "Candy",
            listItems: [
                {
                    name: "Jolly Ranchers",
                    checked: false,
                    category: "Pack",
                },
                {
                    name: "M&Ms",
                    checked: false,
                    category: "Pack",
                },{
                    name: "Snickers",
                    checked: false,
                    category: "Single",
                },
            ],
    },
    {
        name: "Drinks",
            listItems: [
                {
                    name: "Sprite",
                    checked: false,
                    category: "2 Liter",
                },
                {
                    name: "Minute Maid",
                    checked: false,
                    category: "2 Liter",
                },{
                    name: "Dr. Pepper",
                    checked: false,
                    category: "6-pack",
                },
            ],
    },
    {
        name: "Pet Food",
            listItems: [
                {
                    name: "Blue Ribbon",
                    checked: false,
                    category: "Dog Food",
                },
                {
                    name: "Meow Mix",
                    checked: false,
                    category: "Cat Food",
                },{
                    name: "ReptoMin",
                    checked: false,
                    category: "Turtle Food",
                },
            ],
    },
    {
        name: "Fruits",
            listItems: [
                {
                    name: "Limes",
                    checked: false,
                    category: "Bag",
                },
                {
                    name: "Oranges",
                    checked: false,
                    category: "Bag",
                },{
                    name: "Lemons",
                    checked: false,
                    category: "Bag",
                },
            ],
    },
    {
        name: "Bakery",
            listItems: [
                {
                    name: "Donuts",
                    checked: false,
                    category: "6-pack",
                },
                {
                    name: "Muffins",
                    checked: false,
                    category: "6-pack",
                },{
                    name: "Cake",
                    checked: false,
                    category: "Single Unit",
                },
            ],
    },
    {
        name: "Pharmacy",
            listItems: [
                {
                    name: "Asprin",
                    checked: false,
                    category: "30-count",
                },
                {
                    name: "Melatonin",
                    checked: false,
                    category: "100-count",
                },{
                    name: "Advil",
                    checked: false,
                    category: "30-count",
                },
            ],
    },
    {
        name: "Frozen",
            listItems: [
                {
                    name: "Red Baron Pep Pizza",
                    checked: false,
                    category: "Twin-pack",
                },
                {
                    name: "Monterey Burritos",
                    checked: false,
                    category: "8-pack",
                },{
                    name: "Kroger Corn Dogs",
                    checked: false,
                    category: "20-pack",
                },
            ],
    },
];

var userExist = false;
var userFullName = "";

function itemChecked(element, listIndex, itemIndex){
    $(element).parent().toggleClass("strike");
    let checkedValue = !LISTS[listIndex].listItems[itemIndex].checked;
    LISTS[listIndex].listItems[itemIndex].checked = checkedValue;
    // console.log("checked", LISTS);
}

function loadListItems(listIndex) {
    let listString = `<button onclick="loadLists()">Back</button><ul>`;
    $.each(LISTS[listIndex].listItems, function(idx, listItem){
        listString += `<li id="${idx}" class="${listItem.checked ? "strike" : ""}"> <input ${listItem.checked ? (checked = "checked") : ""
    } type="checkbox" id="${idx}" name"${listItem.name}" onclick="itemChecked(this, ${listIndex}, ${idx})"> ${listItem.name}</li>`;
    });
    listString += "</ul>";
    $("#app").html(listString);
}

function loadLists(){
    let listString = "<ul>";
    $.each(LISTS, function(idx, list){
        listString += `<li id="${idx}" onclick="loadListItems(${idx})">${list.name}</li>`
    });
    listString += "</ul>";
    $("#app").html(listString);
}

function initListeners(){}

function initFirebase(){
    firebase.auth().onAuthStateChanged((user) =>{
        if(user){
            console.log("auth changed logged in");
            if(user.displayName){
                $(".name").html(user.displayName);
            }
            $(".load").prop("disabled", false)
            userExist = true
        }else{
            console.log("auth changed logged out");
            $(".name").html("")
            $(".load").attr("disabled", true)
            userExist = false
            userFullName = "";
        }
    })
}

function signOut(){
    firebase.auth().signOut().then(() =>{
    console.log("signed out");
    })
    .catch((error) =>{
        console.log("error signing out")
    });
}

function login(){
    let email = $("#log-email").val();
    let pw = $("#log-pw").val();

    firebase.auth().signInWithEmailAndPassword(email, pw)
  .then((userCredential) => {
    console.log("signed in");
    var user = userCredential.user;
    $("#log-email").val("");
    $("#log-pw").val("");
    // ...
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log("error signing out " + errorMessage)
  });

}

function createAccount(){
    let fName = $("#fName").val();
    let lName = $("#lName").val();
    let email = $("#email").val();
    let pw = $("#pw").val();
    let fullName = fName + " " + lName;

    
    firebase.auth().createUserWithEmailAndPassword(email, pw)
  .then((userCredential) => {
    // Signed in 
    var user = userCredential.user;
    console.log("created ")
    firebase.auth().currentUser.updateProfile({
        displayName: fullName,
    });
    userFullName = fullName;
    $(".name").html(userFullName);
    $("#fName").val("");
    $("#lName").val("");
    $("#email").val("");
    $("#pw").val("");
  })
  .catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log('create error ' + errorMessage)
  });
}
function signIn(){
    firebase.auth().signInAnonymously()
    .then(() => {
        console.log("signed in");
    })
    .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log("Error Signing in " + errorMessage);
  });
}

    $(document).ready(function () {
        try {
            let app = firebase.app();
            initFirebase();
            initListeners();
        } catch (error) {
            console.log("error", error);
        }
    });

   
