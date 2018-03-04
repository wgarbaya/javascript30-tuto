const playbutt = document.querySelector(".player__button")
const player = document.querySelector(".player__video")
const volumcontroler = document.querySelector("input[name ='volume']")
const pbcontroler = document.querySelector("input[name ='playbackRate']")
const prgsbar = document.querySelector(".progress__filled")
const prg = document.querySelector(".progress")
const prgsbutt = document.querySelectorAll(".player__button[data-skip]")
const fullbutt = document.querySelector(".button_full")
const pl = document.querySelector('.player')
playbutt.addEventListener('click',playpause)
prgsbutt.forEach(()=> this.addEventListener('click',move))

function move(a){
    let moveto =  player.currentTime  + parseInt(a.target.dataset.skip);
    if (moveto > 0 && moveto <= player.duration)
    player.currentTime = moveto
}
function playpause() {
    if(player.paused) {
        playbutt.textContent = '►'
        player.play()
    }else{
        playbutt.textContent = 'pause'
        player.pause()
    }
}
function changedu(a){
    player.currentTime =( a.offsetX / prg.offsetWidth) * player.duration
}

function goFullscreen(){
    if(is_fullscreen == false){
         pl.mozRequestFullScreen(); //ISSUE for FF only no common API
     }else{
         document.mozCancelFullScreen();//ISSUE for FF only no common API
    }

}

document.addEventListener("fullscreenchange", notify);
document.addEventListener("webkitfullscreenchange", notify);
document.addEventListener("mozfullscreenchange", notify);
document.addEventListener("MSFullscreenChange", notify);
function notify(e){
    is_fullscreen =!is_fullscreen
}
 

let is_fullscreen = false;
let is_prg_clicked = false;
volumcontroler.addEventListener("change", (a)=>{player.volume = a.target.value})
pbcontroler.addEventListener("change", ()=> {player.playbackRate  = pbcontroler.value})
prg.addEventListener("mousedown", () => {is_prg_clicked = true})
prg.addEventListener("mouseup", () => {is_prg_clicked = false})
prg.addEventListener("mousemove", (a) => {if(is_prg_clicked) { changedu(a)}}) // ISSUE if you go outside...
prg.addEventListener("click", (a) => { changedu(a)})

player.addEventListener('timeupdate', ()=>{prgsbar.style.flexBasis = (player.currentTime / player.duration * 100) + "%"}) 
fullbutt.addEventListener("click",goFullscreen)