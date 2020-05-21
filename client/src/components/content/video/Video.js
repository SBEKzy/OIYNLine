import React from "react";
import "./Video.css";

export default function Video() {
  var Peer = require("simple-peer");


  navigator.mediaDevices
    .getUserMedia({ video: true, audio: true })
    .then(gotLocalMediaStream)
    .catch(handleLocalMediaStreamError);

  function gotLocalMediaStream(stream) {
    console.log("qweqwe2");
    var peer = new Peer({
      initiator: window.location.hash === "#init",
      trickle: false,
      stream: stream,
    });

    peer.on("signal", function (data) {
      document.getElementById("yourId").innerHTML = JSON.stringify(data)
    });
    console.log("qweqwe1");
    document.getElementById("connect").onclick = function () {
      peer.signal(JSON.parse( document.getElementById('otherId').value))
    };
    peer.on("data", function (data) {
      document.getElementById("messages").textContent += data + "\n";
    });

    peer.on("stream", function (stream) {
      var video = document.createElement("video");
      document.body.appendChild(video);

      video.srcObject = stream;
      video.play();
    });
  }

  function handleLocalMediaStreamError(error){
    console.log("error",);
  }
 

    //   connectclk = (peer) => {
    //     console.log("qweqwe");
    //   var otherId = JSON.parse(document.getElementById('otherId').value)
    //   peer.signal(otherId)
    // }

    //  var sendclk = (peer) => {
    //   var yourMessage = document.getElementById('yourMessage').value
    //   peer.send(yourMessage)
    // }
 

  // get video/voice stream
  // navigator.mediaDevices.getUserMedia({
  //   video : true,
  //   audio: true
  // }).then(gotMedia).catch(() => {})

  // function gotMedia (stream) {
  //   var peer1 = new Peer({ initiator: true, stream: stream })
  //   var peer2 = new Peer()

  //   peer1.on('signal', data => {
  //     peer2.signal(data)
  //   })

  //   peer2.on('signal', data => {
  //     peer1.signal(data)
  //   })

  //   peer2.on('stream', stream => {
  //     // got remote video stream, now let's show it in a video tag
  //     var video = document.querySelector('video')

  //     if ('srcObject' in video) {
  //       video.srcObject = stream
  //     } else {
  //       video.src = window.URL.createObjectURL(stream) // for older browsers
  //     }

  //     video.play()
  //   })
  // }

  // const Constrains = {
  //   video: true,
  // };
  // const video = document.querySelector("video");

  // let localStream
  // function gotLocalMediaStream(mediaStream) {
  //   localStream = mediaStream;
  //   video.srcObject = mediaStream;
  //   console.log(localStream);
  //   console.log(mediaStream);

  // }
  // function handleLocalMediaStreamError(error) {
  //   console.log("Errror", error);
  // }

  // navigator.mediaDevices
  //   .getUserMedia(Constrains)
  //   .then(gotLocalMediaStream)
  //   .catch(handleLocalMediaStreamError);
  return (
    <div>
      <label>Your ID:</label>
      <br />
      <textarea id="yourId"></textarea>
      <br />
      <label>Other ID:</label>
      <br />
      <textarea id="otherId"></textarea>
      <button id="connect">connect</button>
      <br />
    </div>
  );
}
