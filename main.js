var prediction1="";
var prediction2="";
Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});
camera=document.getElementById("camera");
Webcam.attach('#camera');
function take_snapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML='<img id="captured_image" src="'+data_uri+'"/>';
        
    });

}
console.log('ml5_version',ml5.version);
classifier=ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wQiuV0DGJ/model.json',modelLoaded);
function modelLoaded(){
    console.log('modelLoaded');
}
function speak(){
    var synth=window.speechSynthesis;
    speak_data1="The first prediction is "+prediction1;
    speak_data2="The second prediction is "+prediction2;
    var utterThis=new SpeechSynthesisUtterance(speak_data1+speak_data2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById('captured_image');
    classifier.classify(img, gotResults);

}
function gotResults(error, results){
    if (error){
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak()
        if (results[0].label == "Thumbs Up!") {
            document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if (results[0].label == "open hand") {
            document.getElementById("update_emoji").innerHTML = "&#9995;";
        }
        if (results[0].label == "super") {
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if (results[1].label == "Thumbs Up!") {
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
        }
        if (results[1].label == "open hand") {
            document.getElementById("update_emoji2").innerHTML = "&#9995;";
        }
        if (results[1].label == "super!") {
            document.getElementById("update_emoji2").innerHTML = "&#128076;";
        }
    }
}