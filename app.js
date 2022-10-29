
// get all data
const webCam = document.getElementById('video_screen');
const cam = document.getElementById('cam')
const screen = document.getElementById('screen')

// camera share 
const camShare = (video = false, audio = false) => {
    navigator.mediaDevices.getUserMedia({ video: video, audio : audio})
    .then((stream) => {
        webCam.srcObject = stream;
        webCam.play();
    })
    .catch((err) => {

    });
}

// screen share
const screenShare = (video = false, audio = false) => {
    navigator.mediaDevices.getDisplayMedia({ video: video, audio : audio})
    .then((stream) => {
        webCam.srcObject = stream;
        webCam.play();
    })
    .catch((err) => {

    });
}


// camera share button
cam.onclick = (e) => {
    camShare(true);
}

// screen share button
screen.onclick = (e) => {
    screenShare(true);
}


