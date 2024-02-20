console.log("Welcome to Spotify");

//Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('Songs\The Weeknd - Call Out My Name (Official Audio).mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar= document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songitem'));




let songs =[
    {songName: "Call Out My Name", filePath:"Songs\The Weeknd - Call Out My Name (Official Audio).mp3", coverPath="Covers\cover.jpg" },
    {songName: "Inside You", filePath:"Songs\inside-you-162760.mp3", coverPath = "Covers\cover2.jpg" },
    {songName: "Titanium", filePath:"Songs\better-day-186374.mp3", coverPath="Covers\cover3.jpg" },
    {songName: "Coverless-Book", filePath:"Songs\coverless-book-186307.mp3", coverPath="Covers\cover4.jpg" },
    {songName: "Better Day", filePath:"Songs\titanium-170190.mp3", coverPath="Covers\cover5.jpg" },
    {songName: "Off My Face", filePath:"Songs\The Weeknd - Call Out My Name (Official Audio).mp3", coverPath="Covers\cover6.jpg" },

]

songItems.forEach((element,i) => {
    element.getElementByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innertext = songs[i].songName;
    
});


// audioElement.play();

//Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }

})

//Listen to Events
audioElement.addEventListener('timeupdate', ()=>{
    console.log('timeupdate');
    //Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        makeAllPlays();
        songIndex= parseInt(e.target.id)
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = 'Songs\${songIndex+1}.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');

    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songIndex>=5){
        songIndex=0;
    }
    else{
        songIndex+=1;
    }
    audioElement.src = 'Songs\${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex=0;
    }
    else{
        songIndex-=1;
    }
    audioElement.src = 'Songs\${songIndex+1}.mp3';
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})
