
// get all data
const webCam = document.getElementById('video_screen');
const camBtn = document.getElementById('cam');
const microphone = document.getElementById('microphone');
const screen = document.getElementById('screen')

// let valriables
let webCamearStrm;

// camera share 
const camShare = () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio : false
    })
    .then((stream) => {
        webCamearStrm = stream;
        webCam.srcObject = stream;
        webCam.play();
    });
}
camShare();

// camera share button
let camstatus = true;
camBtn.onclick = (e) => {
    camstatus = !camstatus;
    webCamearStrm.getVideoTracks()[0].enabled = camstatus;
    // alert()
    camBtn.classList.toggle('active');
}


// microphone OFF ON button
let microphoneStatus = true;
microphone.onclick = (e) => {
    microphoneStatus = !microphoneStatus;
    webCamearStrm.getAudioTracks()[0].enabled = microphoneStatus;
    // alert()
    microphone.classList.toggle('active');
}





// screen share
// const screenShare = (video = false, audio = false) => {
//     navigator.mediaDevices.getDisplayMedia({ video: video, audio : audio})
//     .then((stream) => {
//         webCam.srcObject = stream;
//         webCam.play();
//     })
//     .catch((err) => {

//     });
// }




// // screen share button
// screen.onclick = (e) => {
//     screenShare(true);
// }


