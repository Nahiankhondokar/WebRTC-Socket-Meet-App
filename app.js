
// get all data
const s1 = document.getElementById('s1');
const camera_btn = document.getElementById('camera_btn');
const microphone_btn = document.getElementById('microphone');
const screenShare_btn = document.getElementById('screenShare')
const s2 = document.getElementById('s2')
const miniScreenDisplayNone = document.querySelector('#s2');

// let valriables
let webCameraStrm;
let screenShareStrm;

// camera share 
const cameraShare = () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio : false
    })
    .then((stream) => {
        webCameraStrm = stream;
        s1.srcObject = stream;
    });
}
cameraShare();

// camera share button
let cameraStatus = true;
camera_btn.onclick = (e) => {
    cameraStatus = !cameraStatus;
    webCameraStrm.getVideoTracks()[0].enabled = cameraStatus;
    // alert()
    camera_btn.classList.toggle('active');
}


// microphone OFF ON button
let microphoneStatus = true;
microphone_btn.onclick = (e) => {
    microphoneStatus = !microphoneStatus;
    webCameraStrm.getAudioTracks()[0].enabled = microphoneStatus;
    // alert()
    microphone.classList.toggle('active');
}





// screen share
const screenShare = () => {
    navigator.mediaDevices.getDisplayMedia({ 
        video: true, 
        audio : false
    })
    .then((stream) => {
        s1.srcObject = stream;
        s2.srcObject = webCameraStrm;
        screenShareStrm = stream;
    });
}


// screen share button
let screenShareStatus = false;
screenShare_btn.onclick = (e) => {
    screenShareStatus = !screenShareStatus;

    if(screenShareStatus){
        screenShare();
        miniScreenDisplayNone.style.display = 'block';
        s2.srcObject = webCameraStrm;
    }else {
        miniScreenDisplayNone.style.display = 'none';
        s1.srcObject = webCameraStrm;
        // webCameraStrm.getVideoTracks()[0].enabled = screenShareStatus;
    }
   
    // webCam_01.srcObject = screenShareStrm;
    
    screenShare_btn.classList.toggle('active');
}



