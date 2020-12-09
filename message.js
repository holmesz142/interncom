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
        var id = document.createElement('p');

        li.className = "collection-item avatar";
        li.id = "userItem";
        img.className = "circle";
        h5.className = "title";



        img.src = user.urlToImage;
        //console.log(img.src);
        h5.textContent = user.username;
        p.textContent = "Dept : ";
        a1.textContent = user.dept;


        p.appendChild(a1);
        li.appendChild(img);
        li.appendChild(h5);
        li.appendChild(p);

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