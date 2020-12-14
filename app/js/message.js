
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
const ref = firebase.storage().ref();
//const ref = firebase.database().ref();

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
        var label = document.createElement('label');
        var input = document.createElement('input');
        var span = document.createElement('span');
        var img = document.createElement('img');
        var h5 = document.createElement('h5');
        var p = document.createElement('p');
        var a1 = document.createElement('a');
        var a2 = document.createElement('a');
        var i = document.createElement('i');


        li.className = "collection-item avatar";
        li.id = "userItem";
        img.className = "circle";
        h5.className = "title";
        a2.className = "secondary-content icon-call";
        a2.id = "btn-call";
        i.className = "material-icons li-user";
        input.className = "filled-in list-user-item";

        label.htmlFor = user.id;
        input.type = "checkbox";
        input.id = user.id;
        label.onclick = "test()";

        input.name = "user";
        input.value = user.id;
        img.src = user.urlToImage;
        h5.textContent = user.username;
        p.textContent = "Dept : ";
        a1.textContent = user.dept;
        i.textContent = "phone";
        a2.href = "#";
        i.id = "call-video"

        i.title = user.id;

        a2.appendChild(i);
        p.appendChild(a1);
        span.appendChild(img);
        span.appendChild(h5);
        span.appendChild(p);
        span.appendChild(a2);
        label.appendChild(input);
        label.appendChild(span);

        li.appendChild(label);

        ul.appendChild(li);

    })
}
function removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b)
};

var arrCheckedUser = [];
function selectUser() {
    var checks = document.getElementsByClassName('list-user-item');
    arrCheckedUser = [];
    for (i = 0; i < 5; i++) {
        if (checks[i].checked === true) {
            arrCheckedUser.push(checks[i].value);
        }
    }
    removeDuplicates(arrCheckedUser);
}

//select all user
var selectAll;
document.getElementById('select-all').onclick = function () {
    var checkboxes = document.getElementsByName('user');
    for (var checkbox of checkboxes) {
        checkbox.checked = this.checked;
    }
    checkSelectAll();
}
var _checkSelectAll = document.getElementById('select-all');
function checkSelectAll() {
    if (_checkSelectAll.checked) {
        selectAll = true;
    }
    else {
        selectAll = false;
    }
    console.log(selectAll);
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

//choose image from browser
var file;
var note;
const electron = require('electron');

var canvas = document.getElementById("canvas");
var context = canvas.getContext("2d");

document.getElementById('btn').addEventListener('click', () => {
    // trigger file prompt
    electron.ipcRenderer.send('chooseFile');

    // handle response
    electron.ipcRenderer.on('chosenFile', (event, base64) => {
        const src1 = `data:image/jpg;base64,${base64}`;
        var img = new Image();
        img.src = src1;

        var canvas = document.getElementById('canvas');

        canvas.getContext('2d').drawImage(img, 0, 0, 300, 300);





        img.onload = function () {

            context.drawImage(img, 0, 0, canvas.width, canvas.height);
        }
        //
        file = dataURLtoFile(img.src, 'filename.jpg');
        console.log(file);

    })
})

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
//send notification
document.getElementById('btn-send').addEventListener('click', () => {
    // note = document.getElementById('note-input').value;
    // console.log(note);
    // document.getElementById('note-input').value = '';
    addDataToFirestore();
    document.getElementById('note-input').value = '';
    var canvas = document.getElementById('canvas');
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
})
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

async function addDataToFirestore() {
    const name = (+new Date()) + '-' + file.name;
    const task = ref.child('Photos').child(name).put(file);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(async (url) => {
            const res = await db.collection('notifications').add({
                all: selectAll,
                body: document.getElementById('note-input').value,
                key: 'VINH',
                members: arrCheckedUser,
                publishAt: firebase.firestore.FieldValue.serverTimestamp(),
                title: '',
                urlToImage: url,

            });
        })
        .catch(console.error);
}