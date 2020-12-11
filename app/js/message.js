const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");
var config = {
    apiKey: "AIzaSyB9-0fSDE7L9161oTksup63Ugy4vHUfMb4",
    authDomain: "project-message-65c25.firebaseapp.com",
    databaseURL: "https://project-message-65c25.firebaseio.com",
    projectId: "project-message-65c25",
    storageBucket: "project-message-65c25.appspot.com",
    messagingSenderId: "1037020081116",
    appId: "1:1037020081116:web:e25f32a41574d37b93fd19",
    measurementId: "G-94K8JYMM5E"
};
firebase.initializeApp(config);

const db = firebase.firestore();

var users = [];
//db.settings({ timestampsInSnapshots: true});
//get user from database
const getUser = db.collection('users').where('id', '!=', 'FnAWubAdtFgYwGIML23oRAtp5u93').get().then((snapshot) => {

    snapshot.docs.forEach(doc => {
        let items = doc.data();

        users.push(items);

    });
    showUser();
});


function showUser() {
    users.forEach((user) => {
        var ul = document.querySelector('ul');
        var li = document.createElement('li');
        var img = document.createElement('img');
        var h5 = document.createElement('h5');
        var p = document.createElement('p');
        var a1 = document.createElement('a');
        var a2 = document.createElement('a');
        var i = document.createElement('i');
        var id = document.createElement('p');


        li.className = "collection-item avatar";
        li.id = "userItem";
        img.className = "circle";
        h5.className = "title";
        a2.className = "secondary-content";
        a2.id = "btn-call";
        i.className = "material-icons li-user";


        img.src = user.urlToImage;
        //console.log(img.src);
        h5.textContent = user.username;
        p.textContent = "Dept : ";
        a1.textContent = user.dept;
        i.textContent = "phone";
        a2.href = "#";
        i.id = "call-video"

        i.title = user.id;

        a2.appendChild(i);
        p.appendChild(a1);
        li.appendChild(img);
        li.appendChild(h5);
        li.appendChild(p);
        li.appendChild(a2);
        li.appendChild(id);

        ul.appendChild(li);

    })
}


//Search user
function searchUser() {
    var input, filter, ul, li, a, i, txtValue;
    input = document.getElementById("search");
    filter = input.value.toUpperCase();
    ul = document.getElementById("myUL");
    li = ul.getElementsByTagName("li");
    for (i = 0; i < li.length; i++) {
        a = li[i].getElementsByTagName("a")[0];
        txtValue = a.textContent || a.innerText;
        if (txtValue.toUpperCase().indexOf(filter) > -1) {
            li[i].style.display = "";
        } else {
            li[i].style.display = "none";
        }
    }
}



//pass Id User
function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement;
}

var ul = document.getElementById('myUL');
ul.onclick = function (event) {
    var target = getEventTarget(event);
    var idUser = target.title;
    if (idUser != null && idUser != '') {
        createBrowserWindow(idUser);
    };
}



let win;
function createBrowserWindow(idUser) {
    const remote = require('electron').remote;
    const BrowserWindow = remote.BrowserWindow;
    win = new BrowserWindow({
        height: 600,
        width: 1030,
        webPreferences: {
            nodeIntegration: true,
            additionalArguments: [idUser]
        }
    });
    win.on('maximize', () => {
        win.unmaximize();
    });

    win.loadURL('file://' + __dirname + '/index.html');
}
