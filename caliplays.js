var myAudio = document.getElementById('myAudio');

var playButton = document.getElementById('play-button');
var replayButton = document.getElementById('replay-button');
var pauseButton = document.getElementById('pause-button');

var currentTimeContainer = document.getElementById('current-time');
var totalTimeContainer = document.getElementById('total-time');
var seekSlider = document.getElementById("seekslider");

var volUpButton = document.getElementById('vol-up-btn');
var volDownButton = document.getElementById('vol-down-btn');
var volMuteButton = document.getElementById('vol-mute-btn');
let volumeSlider = document.getElementById("volume-slider");
// 
playButton.addEventListener("click", function(){
    myAudio.play();
    playButton.classList.add('display-none');
    pauseButton.classList.remove('display-none');
});
pauseButton.addEventListener("click", function(){
    myAudio.pause();
    pauseButton.classList.add('display-none');
    playButton.classList.remove('display-none');
});
replayButton.addEventListener("click", function(){
    myAudio.play();
    replayButton.classList.add('display-none');
    pauseButton.classList.remove('display-none');
});

myAudio.addEventListener('loadedmetadata', function() {
    totalTimeContainer.innerHTML = myAudio.duration;
    currentTimeContainer.innerHTML = myAudio.currentTime;
});

function convertElapsedTime(inputSeconds) {
    var seconds = Math.floor(inputSeconds % 60)
    if (seconds < 10) {
        seconds = "0" + seconds
    }
    var minutes = Math.floor(inputSeconds / 60)
    return minutes + ":" + seconds
}

myAudio.addEventListener('loadedmetadata', function() {
     totalTimeContainer.innerHTML = convertElapsedTime(myAudio.duration);
     currentTimeContainer.innerHTML = convertElapsedTime(myAudio.currentTime);
});

myAudio.addEventListener('loadedmetadata', function() {
     totalTimeContainer.innerHTML = convertElapsedTime(myAudio.duration);
     currentTimeContainer.innerHTML = convertElapsedTime(myAudio.currentTime);
     seekSlider.max= myAudio.duration;
     seekSlider.setAttribute("value", myAudio.currentTime);
});

myAudio.addEventListener('timeupdate', function() {
     currentTimeContainer.innerHTML = convertElapsedTime(myAudio.currentTime);
     seekSlider.setAttribute("value", myAudio.currentTime);
     seekSlider.value = myAudio.currentTime;
     
     if (myAudio.ended) {
        pauseButton.classList.add('display-none');
        playButton.classList.add('display-none');
        replayButton.classList.remove('display-none');
     }
});

seekSlider.addEventListener("change", function () {
     myAudio.currentTime = seekSlider.value;
});


function setvolume(){
      myAudio.volume = volumeSlider.value;
}
function setvolumeSlider(){
      volumeSlider.value = myAudio.volume;
}
volumeSlider.addEventListener("mousemove", setvolume);

volUpButton.addEventListener("click", function(){
     myAudio.volume+=0.1;
     setvolumeSlider();
});
volDownButton.addEventListener("click", function(){
     myAudio.volume-=0.1;
     setvolumeSlider();
});
volMuteButton.addEventListener("click", function(){
     myAudio.muted = !myAudio.muted;
     setvolumeSlider();
});