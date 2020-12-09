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
const ref = firebase.storage().ref();
var file;
var image;
var idUser = window.process.argv.slice(-1).toString();
const db = firebase.firestore();
var database = firebase.database().ref();
var yourVideo = document.getElementById("yourVideo");
var friendsVideo = document.getElementById("friendsVideo");
var yourId = Math.floor(Math.random() * 1000000000);
var servers = { 'iceServers': [{ 'urls': 'stun:stun.services.mozilla.com' }, { 'urls': 'stun:stun.l.google.com:19302' }, { 'urls': 'turn:numb.viagenie.ca', 'credential': 'webrtc', 'username': 'websitebeaver@mail.com' }] };
var pc = new RTCPeerConnection(servers);
var count = 0;
pc.onicecandidate = (event => event.candidate ? sendMessage(yourId, JSON.stringify({ 'ice': event.candidate })) : console.log("Sent All Ice"));
pc.onaddstream = (event => friendsVideo.srcObject = event.stream);
function sendMessage(senderId, data) {
    var msg = database.push({ sender: senderId, message: data });
    count++;
    msg.remove();
    if (count == 1) {

        addDataToFirestore(data);

    }
}



async function uploadImageToStorage(file) {
    const name = (+new Date()) + '-' + file.name;
    const task = ref.child('Photos').child(name).put(file);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then((url) => {
            console.log(url);
            //document.querySelector('#someImageTagID').src = url;
            return url;
        })
        .catch(console.error);
}

async function addDataToFirestore(data) {
    const name = (+new Date()) + '-' + file.name;
    const task = ref.child('Photos').child(name).put(file);
    task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(async (url) => {
            const res = await db.collection('requests').add({
                idSend: 'FnAWubAdtFgYwGIML23oRAtp5u93',
                receiveID: idUser,
                completed: false,
                request: true,
                publishAt: firebase.firestore.FieldValue.serverTimestamp(),
                responcedTime: firebase.firestore.FieldValue.serverTimestamp(),
                urlToImage: url,
                filePath: '',
                responce: '',
                sdp: data
            });
        })
        .catch(console.error);
}
function readMessage(data) {
    var msg = JSON.parse(data.val().message);
    var sender = data.val().sender;
    if (sender != yourId) {
        if (msg.ice != undefined) {
            pc.addIceCandidate(new RTCIceCandidate(msg.ice));
        }
        else if (msg.sdp.type == "offer") {
            var r = confirm("Answer call?");
            if (r == true) {
                pc.setRemoteDescription(new RTCSessionDescription(msg.sdp))
                    .then(() => pc.createAnswer())
                    .then(answer => pc.setLocalDescription(answer))
                    .then(() => sendMessage(yourId, JSON.stringify({ 'sdp': pc.localDescription })));
            } else {
                alert("Rejected the call");
            }
        }
        else if (msg.sdp.type == "answer") {
            pc.setRemoteDescription(new RTCSessionDescription(msg.sdp));
        }
    }
};
database.on('child_added', readMessage);
function showMyFace() {
    navigator.mediaDevices.getUserMedia({ audio: true, video: true })
        .then(stream => yourVideo.srcObject = stream)
        .then(stream => pc.addStream(stream));
}
function showFriendsFace() {
    if (file != null) {
        pc.createOffer()
            .then(offer => pc.setLocalDescription(offer))
            .then(() => {
                sendMessage(yourId, JSON.stringify({ 'sdp': pc.localDescription }));

            });
    } else {
        console.log('No Image');
    }
}


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
        var video = document.getElementById('yourVideo');
        var canvas = document.getElementById('canvas');
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        canvas.getContext('2d').drawImage(img, 0, 0, video.videoWidth, video.videoHeight);





        img.onload = function () {

            context.drawImage(img, 0, 0, video.videoWidth, video.videoHeight);
        }
        //
        file = dataURLtoFile(img.src, 'filename.png');
    })
})

function capture() {
    var canvas = document.getElementById('canvas');
    var video = document.getElementById('yourVideo');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext('2d').drawImage(video, 0, 0, video.videoWidth, video.videoHeight); // for drawing the video element on the canvas

    if (canvas.getContext) {
        var ctx = canvas.getContext("2d");
        var myImage = canvas.toDataURL("image/png");
        console.log(myImage);
        file = dataURLtoFile(myImage, 'filename.png');
    }
}

function processBase64Image(dataString) {
    var matches = dataString.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/), response = {};

    if (matches.length !== 3) {
        return new Error('Invalid input string');
    }

    response.type = matches[1];
    response.data = new Buffer(matches[2], 'base64');

    return response;
}

document.getElementById("capture").addEventListener('click', capture);

function dataURLtoFile(dataurl, filename) {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}

console.log(idUser);