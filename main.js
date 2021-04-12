prediction_1 ="";
prediction_2 = "";
Webcam.set({
    width : 250,
    height : 250,
    image_format : 'png',
    image_quality : 90
});
Webcam.attach('#camera');
function takeSnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = "<img id = 'captured_img' src = "+data_uri+">";
    })

}
console.log(ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/55IIWFHls/model.json",modalLoaded);
 function modalLoaded(){
     console.log('modalLoaded')
 }
 function speak(){
    var voice_box = window.speechSynthesis;
    data_1 = "The first prediction is"+prediction_1;
    data_2 = "The second prediction is"+prediction_2;
    var voice_message = new SpeechSynthesisUtterance(data_1 + data_2);
    voice_box.speak(voice_message);
}
function check(){
    img = document.getElementById('captured_img');
    classifier.classify(img , gotResult);
}
function gotResult(error , result){
    if(error){
        console.log(error);
    }else{
        console.log(result);
        prediction_1 = result[0].label;
        prediction_2 = result[1].label;
        document.getElementById("result_gesture_name").innerHTML = prediction_1;
        document.getElementById("result_gesture_name2").innerHTML = prediction_2;
        speak();
        if(prediction_1 == "best"){
             document.getElementById("update_emoji").innerHTML = "&#128077;";
        }
        if(prediction_1 == "super"){
            document.getElementById("update_emoji").innerHTML = "&#128076;";
        }
        if(prediction_1 == "victory"){
            document.getElementById("update_emoji").innerHTML = "&#9996; "
        }
        
        if(prediction_2 == "best"){
            document.getElementById("update_emoji2").innerHTML = "&#128077;";
       }
       if(prediction_2 == "super"){
           document.getElementById("update_emoji2").innerHTML = "&#128076;";
       }
       if(prediction_2 == "victory"){
           document.getElementById("update_emoji2").innerHTML = "&#9996; "
       }
    }
    }
