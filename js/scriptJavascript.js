var start=document.getElementById("start");
var snd = new Audio("./sounds/Good-Morning-Doctor-Weird.mp3");
var sndEnd=new Audio("./sounds/gameOver.mp3")
const bananas = [banana1, banana2, banana3];
var life=document.querySelector("#life");
var lifeScore=life.innerText;
var anim_id;
var restart=document.querySelector("#restart")


function startSet(){
    start.style.display="none";
    snd.play();
}


function my_game(){
    


    // movestuff()

    startSet();
    // console.log(lifeScore);

    var lastRandNum = 0
    var timeoutId;

    for(let banana of bananas){
    
        if (check_banana_hits_floor(banana)|| check_banana_hits_basket(banana))
        {
           set_banana_to_initial_position(banana);
        } else {

            var  styleBanana = window.getComputedStyle(banana) //get the style of banana
            banana_y_pos = parseInt(styleBanana.getPropertyValue('top'),10); //get the top style attrib of banana in numbers
            
            // if banana is in the intial position, perform banana_down after random interval,
            //else, call banana_down directly
            if (banana_y_pos == 70){
                // console.log("initial")
                do{
                    randNum = Math.floor(Math.random() * 80 +1);   
                }while(Math.abs(lastRandNum-randNum) < 20)
                lastRandNum = randNum
                timeoutId = window.setTimeout(banana_down,randNum*1000, banana)
            }else{
               banana_down(banana);
            } 
        }
         
    }
    if(lifeScore>0){
        anim_id = requestAnimationFrame(my_game);   
        // console.log( "the id is"+ anim_id)
    }
    else{
        // console.log("end of game")
        cancelAnimationFrame(anim_id)
        restart.style.display="block";
        snd.pause();
        snd.currentTime = 0;
        sndEnd.play();

        clearTimeout(timeoutId);
        return;
    }
    // console.log(`tick`)

}

start.onclick=my_game;