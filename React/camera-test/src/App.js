// import React, { useEffect, useRef } from "react";
import * as tmPose from "@teachablemachine/pose";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
    // More API functions here:
    // https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

    // the link to your model provided by Teachable Machine export panel
    const URL = "./my_model/";
    let model, webcam, ctx, labelContainer, maxPredictions;

    async function init() {
        const modelURL = URL + "model.json";
        const metadataURL = URL + "metadata.json";

        // load the model and metadata
        // Refer to tmImage.loadFromFiles() in the API to support files from a file picker
        // Note: the pose library adds a tmPose object to your window (window.tmPose)
        model = await tmPose.load(modelURL, metadataURL);
        maxPredictions = model.getTotalClasses();

        // Convenience function to setup a webcam
        const size = 600;
        const flip = true; // whether to flip the webcam
        webcam = new tmPose.Webcam(size, size, flip); // width, height, flip
        console.log(webcam);
        await webcam.setup(); // request access to the webcam
        await webcam.play();
        window.requestAnimationFrame(loop);

        // append/get elements to the DOM
        const canvas = document.getElementById("canvas");
        canvas.width = size;
        canvas.height = size;
        ctx = canvas.getContext("2d");
        labelContainer = document.getElementById("label-container");
        for (let i = 0; i < maxPredictions; i++) {
            // and class labels
            labelContainer.appendChild(document.createElement("div"));
        }
    }

    async function loop(timestamp) {
        webcam.update(); // update the webcam frame
        await predict();
        window.requestAnimationFrame(loop);
    }

    async function predict() {
        // Prediction #1: run input through posenet
        // estimatePose can take in an image, video or canvas html element

        const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
        console.log("test");
        // Prediction 2: run input through teachable machine classification model
        const prediction = await model.predict(posenetOutput);

        for (let i = 0; i < maxPredictions; i++) {
            const classPrediction = prediction[i].className + ": " + prediction[i].probability.toFixed(2);
            labelContainer.childNodes[i].innerHTML = classPrediction;
        }

        // finally draw the poses
        drawPose(pose);
    }

    function drawPose(pose) {
        if (webcam.canvas) {
            ctx.drawImage(webcam.canvas, 0, 0);
            // draw the keypoints and skeleton
            if (pose) {
                const minPartConfidence = 0.5;
                tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
                tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
            }
        }
    }

    return (
        <div>
            <div>Teachable Machine Pose Model</div>
            <button type="button" onClick={init}>
                Start
            </button>
            <div>
                <canvas id="canvas"></canvas>
            </div>
            <div id="label-container"></div>
        </div>
    );

    // let videoRef = useRef(null);

    // //사용자 웹캠에 접근

    // const getUserCamera = () => {
    //     navigator.mediaDevices
    //         .getUserMedia({
    //             video: true,
    //         })
    //         .then((stream) => {
    //             //비디오 tag에 stream 추가
    //             let video = videoRef.current;

    //             video.srcObject = stream;
    //             video.oncanplaythrough = function () {
    //                 // 로드 완료되면 실행
    //                 video.play();
    //             };
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //         });
    // };

    // useEffect(() => {
    //     getUserCamera();
    // }, [videoRef]);

    // return (
    //     <div className="container">
    //         <h1>selfie App in React.js</h1>
    //         hello world
    //         <video className="container" ref={videoRef}></video>
    //     </div>
    // );
}

export default App;
