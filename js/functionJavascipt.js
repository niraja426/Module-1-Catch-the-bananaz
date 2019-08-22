//  
var the_game=0;
var scoreCount=0;
var life=document.querySelector("#life")
var lifeScore=life.innerText
var restart=document.querySelector("#restart")
var basket=document.getElementById("basket")
var elem = document.querySelector('#container') 
var div = document.querySelector('#basket')
var banana=document.querySelector(".banana")
banana_initial_position = 70;
var x = 0, 
mousedown = false; 


// Firstly: basket move
//Controling basket with Keys
// function keyDownHandler(event){

//   var styleBasket = window.getComputedStyle(basket);
//   basket_x_pos = parseInt(styleBasket.getPropertyValue('left'),10)
//   if(event.keyCode === 37){
//    div.style.left= basket_x_pos-20 +"px"; 
//   }
//   else if(event.key==="ArrowRight") {
//     div.style.left= basket_x_pos+20+"px";
//   }

// const keyState= {};
// function movestuff(){
//   for(let key in keyState){
//     if(keyState[key]){
//       console.log(key)
//       if(key === "ArrowRight") div.style.left=  (basket_x_pos-2)+"px";
//       if(key === "ArrowLeft")  div.style.left= (basket_x_pos - 50) +"px"; 
//     }
//   }
// }

// }
// document.onkeydown=keyDownHandler;
////////////////////////////////////////////////////////////////

// window.onkeydown = (e) => keyState[e.code] = true;
// window.onkeyup = e => keyState[e.code] = false;

//controling basket with mouse
div.addEventListener('mousedown', function (e) { 
mousedown = true; // mouse state set to true 
x = div.offsetLeft - e.clientX; // subtract offset 
// console.log(x);
}, true); 

// div event mouseup 
div.addEventListener('mouseup', function (e) { 
mousedown = false; // mouse state set to false 
}, true); 

// element mousemove to stop 
elem.addEventListener('mousemove', function (e) { 
if (mousedown) { // Is mouse pressed 
//  the difference upwards 
div.style.left = e.clientX + x + 'px';  
} 
}, true); 




// Second: make banana fall
function banana_down(banana) {  // console.log("i am inside banana_down")
    // console.log(banana)
  var speed=2;
    // var speed=Math.floor(Math.random() * 6 + 1)
   var  style = window.getComputedStyle(banana),
      top = style.getPropertyValue('top');
    //   console.log(top);
      banana_current_position = parseInt(top,10);
    //console.log(banana_current_position)
  
    banana.style.top=banana_current_position + speed+"px";
    // console.log(banana.style.top)
  }


//Third: check if banana hits floor: 
  function check_banana_hits_floor(banana) {
    var container=document.querySelector("#container")

    var  style = window.getComputedStyle(banana),
    top = style.getPropertyValue('top');
    banana_current_position = parseInt(top,10);

    if(banana_current_position>container.offsetHeight){
      decrement_life();
      return true;
    }
    else return false;
}


//set banana to initial position from where it fell: 50px;
function set_banana_to_initial_position(banana) { 
    banana.style.top= banana_initial_position+"px";
}



// Forth: check if banana hits basket: 
function check_banana_hits_basket(banana) {
  var score=document.getElementById("score-1")
  var scoreHead=document.querySelector("#score")
  
  var thresholdX = 50/2; // width of the basket for the hit detection
  var thresholdY = 5; // heigh of the handle, to detect if the banana is inside the bucket

  // FOR BANANA
  var  styleBanana = window.getComputedStyle(banana) //get the style of banana
  banana_y_pos = parseInt(styleBanana.getPropertyValue('top'),10); //get the top style attrib of banana in numbers
  banana_x_pos = parseInt(styleBanana.getPropertyValue('left'),10);// get the left style attrib of banana in numbers

  // FOR BASKET
  var styleBasket = window.getComputedStyle(basket); //get the style of basket
  basket_y_pos = parseInt(styleBasket.getPropertyValue('top'),10); // get the top
  basket_x_pos = parseInt(styleBasket.getPropertyValue('left'),10) + thresholdX; // get the left
  
  // if y position or the top of the banana is higher than the basket y position AND x position of the banana is within the basket hole, then it is a score and return true
  // console.log(basket_y_pos)
  // return
  // if (banana_y_pos > basket_y_pos)
  if( ( Math.abs(basket_x_pos-banana_x_pos) < thresholdX) &&
      ( Math.abs(banana_y_pos-basket_y_pos) < thresholdY) ){
        scoreCount++;
        console.log(scoreCount)
        score.innerText=scoreCount;
        scoreHead.innerText=scoreCount;
       return true;
  }
  // if( (Math.abs(basket_x_pos-banana_x_pos) < thresholdX) &&
  //     (banana_y_pos-thresholdY > basket_y_pos) ){
  //       scoreCount++;
  //       console.log(scoreCount)
  //       score.innerText=scoreCount;
  //       scoreHead.innerText=scoreCount;
  //      return true;
  // }
  
  return false;
}

function decrement_life() {
  lifeScore--;
  life.innerText=lifeScore;
  console.log(life)
 
}

// function stop_the_game(anim_id) {
//   cancelAnimationFrame(anim_id);
  
// }