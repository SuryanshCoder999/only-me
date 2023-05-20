Webcam.set({
    width:350,
    height:300,
    image_format:'png',
    png_quality:90
});

camera = document.getElementById("cam");

Webcam.attach('#cam');

function take_snapshot()
{
    Webcam.snap(function(data_uri) {
        document.getElementById("result").innerHTML = '<img id="capture_image" src="'+data_uri+'"/>';
    });
}
console.log('ml5 version:',ml5.version);
classifer = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/YZRbWmeOC/model.json',modelLoaded);
function modelLoaded()
{
    console.log("model is loaded");
}

function check()
{
    img=document.getElementById('capture_image');
    classifer.classify(img,got_result);
}
function  got_result(error,results)
{
    if(error)
    {
        console.log(error);
    }
    else
    {
    console.log(results);
    document.getElementById('rom').innerHTML=results[0].label;
    document.getElementById('ram').innerHTML=results[0].confidence.toFixed(2)*100+"%";
    var sh=window.speechSynthesis;
    var data="This is"+results[0].label;
    var sp=new SpeechSynthesisUtterance(data);
    sh.speak(sp);
    }
}
