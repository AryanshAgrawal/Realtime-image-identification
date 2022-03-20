function setup() {
  canvas = createCanvas(300, 300);
  canvas.position(500, 220);
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier('MobileNet', modalloaded);
}
previous_result = "";
function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotresult);
}
function modalloaded() {
  console.log('modalloaded');
}
function gotresult(error,results) {
if(error){
console.error(error)
}
else{
  if((results[0].confidence>0.5)&&(previous_result!=results[0].label)){
    console.log(results);
    previous_result=results[0].label;
    
    var syth=window.speechSynthesis;
speak_data="object detected is "+results[0].label;
var utterthis=new SpeechSynthesisUtterance(speak_data);
syth.speak(utterthis);

    document.getElementById("object").innerHTML=results[0].label;
    document.getElementById("accuracy").innerHTML=results[0].confidence.toFixed(2);

  }

}
}



