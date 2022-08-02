img="";
status1="";
object=[];

function setup(){
    canvas=createCanvas(380,340);
    canvas.center();
    video=createCapture(VIDEO);
    video.hide();
    video.size(380,340);
   canvas.center();

}

function preload(){
    
}


function modelLoaded(){
    console.log("modelLoaded");
     status1="true";
}
function start(){
    objectDetector=ml5.objectDetector('cocossd',modelLoaded);
    document.getElementById("status").innerHTML="Status: Detecting objects";
    object_name=document.getElementById("objectname").value;
}



function draw(){
    image(video,0,0,380,380);
    if(status1 !="")
    {
        r=random(255);
        g=random(255);
        b=random(255);
        objectDetector.detect(video, gotResult);
        for(i=0 ; i<object.length;i++){
            document.getElementById("status").innerHTML="Status : Object Detected";
          
            fill(r,g,b);
            percent=floor(object[i].confidence*100);
            text(object[i].label+" "+percent+"%",object[i].x,object[i].y);
            noFill();
            stroke(r,g,b);
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
            if(object_name==object[i].label){
                video.stop();
                objectDetector.detect(gotResult);
                document.getElementById("status").innerHTML=object_name+" Found";
                synth=window.speechSynthesis;
                utterThis=new SpeechSynthesisUtterance(object_name+" Found");
                synth.speak(utterThis);
            }
            else{
                document.getElementById("status").innerHTML=object_name+" Not Found";
            }

        }
    }
}

function gotResult(error,results){
    
        if(error){
            console.error(error);
        }
        else{
            console.log(results);
            object=results;
        }
        }
        
        
    
    





