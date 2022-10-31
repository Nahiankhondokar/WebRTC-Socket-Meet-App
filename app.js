
// get all data
const s1 = document.getElementById('s1');
const camera_btn = document.getElementById('camera_btn');
const microphone_btn = document.getElementById('microphone');
const screenShare_btn = document.getElementById('screenShare')
const s2 = document.getElementById('s2')
const miniScreenDisplayNone = document.querySelector('#s2');
const create_offer_btn = document.getElementById('create-offer')
const create_answer_btn = document.getElementById('create-answer')
const add_answer_btn = document.getElementById('add-answer')
const create_offer_sdp = document.getElementById('create-offer-sdp')
const create_answer_sdp = document.getElementById('create-answer-sdp')
const add_answer_sdp = document.getElementById('add-answer-sdp')



// let valriables
let localStream;
let screenShareStrm;
let peerConnection;
let remoteStream;


// peer configaration
let servers = {
    iceServers : [
        {
            "urls" : [
                "stun1.l.google.com:19302",
                "stun2.l.google.com:19302"
            ]
        }
    ]
}



// camera share 
const localStreamInit = () => {
    navigator.mediaDevices.getUserMedia({
        video: true,
        audio : false
    })
    .then((stream) => {
        localStream = stream;
        s1.srcObject = stream;
    });
}
localStreamInit();


// create offer
const createOffer = async () => {
    // peer connection
    peerConnection = new RTCPeerConnection(servers);

    // remore stream
    remoteStream = new remoteStream();
    s1.srcObject = remoteStream;

    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // get access of remote stream
    peerConnection.ontrack = async (e) =>{
        e.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    }


    // ice candidate checking
    peerConnection.onicecandidate = (e) => {
        if(e.candidate){
            create_offer_sdp.value = JSON.stringify(peerConnection.localDescription);
        }
    }

    // make offer
    let offer = await peerConnection.createOffer();
    // offer sdp
    create_offer_sdp.value = JSON.stringify(offer);
    peerConnection.setLocalDescription(offer);

}

// create Answer
const createAnswer = async () => {
    // peer connection
    peerConnection = new RTCPeerConnection(servers);

    // remore stream
    remoteStream = new remoteStream();
    s1.srcObject = remoteStream;
    
    localStream.getTracks().forEach(track => {
        peerConnection.addTrack(track, localStream);
    });

    // get access of remote stream
    peerConnection.ontrack = async (e) =>{
        e.streams[0].getTracks().forEach(track => {
            remoteStream.addTrack(track);
        });
    }


    // ice candidate checking
    peerConnection.onicecandidate = (e) => {
        if(e.candidate){
            create_answer_sdp.value = JSON.stringify(peerConnection.localDescription);
        }
    }


    // recieve offers
    let offer = create_offer_sdp.value;
    offer = JSON.parse(offer);
    await remoteStream.setRemoteDescription(offer);

    // make offer
    let answer = await peerConnection.createAnswer();
    // offer sdp
    create_answer_sdp.value = JSON.stringify(answer);
    await peerConnection.setLocalDescription(answer);

}


// add answer 
const addAnswer = async () => {
    let answer = add_answer_sdp.value;
    answer = JSON.parse(answer);
    await peerConnection.setRemoteDescription(answer);
}

// create offer button
create_offer_btn.onclick = () => {
    createOffer();
    // alert();
}

// create answer button
create_answer_btn.onclick = () => {
    createAnswer();
    // alert();
}

// Add answer button
add_answer_btn.onclick = () => {
    addAnswer();
    // alert();
}





// camera share button
let cameraStatus = true;
camera_btn.onclick = (e) => {
    cameraStatus = !cameraStatus;
    localStream.getVideoTracks()[0].enabled = cameraStatus;
    // alert()
    camera_btn.classList.toggle('active');
}


// microphone OFF ON button
let microphoneStatus = true;
microphone_btn.onclick = (e) => {
    microphoneStatus = !microphoneStatus;
    localStream.getAudioTracks()[0].enabled = microphoneStatus;
    // alert()
    microphone.classList.toggle('active');
}








// // screen share
// const screenShare = () => {
//     navigator.mediaDevices.getDisplayMedia({ 
//         video: true, 
//         audio : false
//     })
//     .then((stream) => {
//         s1.srcObject = stream;
//         s2.srcObject = localStream;
//         screenShareStrm = stream;
//     });
// }


// // screen share button
// let screenShareStatus = false;
// screenShare_btn.onclick = (e) => {
//     screenShareStatus = !screenShareStatus;

//     if(screenShareStatus){
//         screenShare();
//         miniScreenDisplayNone.style.display = 'block';
//         s2.srcObject = localStream;
//     }else {
//         miniScreenDisplayNone.style.display = 'none';
//         s1.srcObject = localStream;
//         // localStream.getVideoTracks()[0].enabled = screenShareStatus;
//     }
   
//     // webCam_01.srcObject = screenShareStrm;
    
//     screenShare_btn.classList.toggle('active');
// }



