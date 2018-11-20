$(document).ready(function(){
    var nav = $("nav");

    
    $(window).scroll(function(){
        console.log(window.scrollY);
        if(window.scrollY >= 170){
            nav.css("opacity", 0.5);
        }else{
            nav.css("opacity", 1)
        }
    })

    

    
});