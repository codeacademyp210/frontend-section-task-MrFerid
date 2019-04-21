'use strict'
function init(){

    // menu fix on window scroll

    let hline = document.querySelector('.header-line');
    document.onscroll = function(){
        if(document.documentElement.scrollTop > hline.scrollHeight){
            document.querySelector('.header-menu').classList.add('fixed');
        }
        else{
            document.querySelector('.header-menu').classList.remove('fixed');
        }
    }
    
    // creating collapse menu
    let menu = document.querySelector('.header-menu .general-ul');
    let opener = document.querySelector('.menu-opener');
    if(opener != null){
        opener.addEventListener('click',function(){

        menu.classList.toggle('opened');

        if(!menu.classList.contains('opened')){
             menu.style.height = 0 + 'px';
             console.log(menu.scrollHeight);
        }
        else{
            menu.style.height =  40 + 'vh';
        }
  
    });
    }
    
   // ================= Album plugin ===================

        let albumItem = document.querySelectorAll('.album-item');
        let albumImg = document.querySelectorAll('.album img');
        let title = document.querySelectorAll('.album-title');
        let currentImg;

        // creating components
        let albumScreen = document.createElement('div');
        let photoWrapper = document.createElement('div');
        let photo = document.createElement('img');
        let photoTitle = document.createElement('div');
        let titleHead = document.createElement('p');
        let titleText = document.createElement('p');
        let photoCountWrapper = document.createElement('div');
        let closeButton = document.createElement('div');
        let prevButton = document.createElement('div');
        let nextButton = document.createElement('div');

        // adding all classes
        closeButton.classList.add('cls-btn');
        prevButton.classList.add('prv-btn');
        nextButton.classList.add('nxt-btn');
        photo.classList.add('album-img');
        photoWrapper.classList.add('photo-wrapper');
        closeButton.classList.add('close-icon');
        photoTitle.classList.add('photo-title');
        photoCountWrapper.classList.add('photo-count');

        albumScreen.classList.add('album-screen');
        document.querySelector('body').appendChild(albumScreen);
        
        //adding elements to screen
        albumScreen.appendChild(closeButton);
        albumScreen.appendChild(prevButton);
        albumScreen.appendChild(nextButton);
        photoWrapper.appendChild(photo);

        photoTitle.appendChild(titleHead);
        photoTitle.appendChild(titleText);
        photoTitle.appendChild(photoCountWrapper);

        photoWrapper.appendChild(photoTitle);
        albumScreen.appendChild(photoWrapper);

        // open image on item click
        for(let i=0; i< albumItem.length; i++){
            albumItem[i].addEventListener('click', function(){
                
                showImg(i);
            });
        }
     // close button
     closeButton.addEventListener('click',function(){
            albumScreen.style.display = 'none';
     });
     // next button
     nextButton.addEventListener('click',function(){
            currentImg++;
            if(currentImg == albumImg.length){
                currentImg = 0;
            }
            showImg(currentImg);
     });
     // prev button
     prevButton.addEventListener('click',function(){
        currentImg--;
        if(currentImg < 0){
            currentImg = albumImg.length-1;
        }
        showImg(currentImg);
    });
    
     // show images function
     function showImg(imgId){
        photo.src = albumImg[imgId].src;
        titleHead.innerHTML = title[imgId].children[0].innerHTML;
        titleText.innerHTML = title[imgId].children[1].innerHTML;
        photoCountWrapper.innerHTML = (imgId+1) +' of '+ albumImg.length;
        albumScreen.style.display = "block";
        currentImg = imgId;
     }

// ================= fSwipe slider ===================


     let slider = document.querySelectorAll('.fSwipe-slider');

     for(let a=0; a < slider.length; a++){

            let sliderContainer = slider[a].children[0];
            let slideCount = sliderContainer.children.length;

            let parentStyle = window.getComputedStyle(slider[a],null);
            let parendWidth = parentStyle.getPropertyValue('width');
            // giving width of slider parent to items
            for(let i=0; i< sliderContainer.children.length; i++){
                sliderContainer.children[i].style.width = parendWidth;
            }

            let slideWidth = parendWidth.slice(0,-2);

            sliderContainer.style.width = (slideWidth * slideCount) + 'px';

            //creating thumbnails and setting click functionality
            let tmbs = slider[a].children[1];

            let tmbUl = document.createElement('ul');
            for(let i=0; i< slideCount; i++){
                let tmb = document.createElement('li');
                    tmb.addEventListener('click',function(){
                            sliderContainer.style.marginLeft = -i * slideWidth + 'px';
                            for(let y=0; y<tmbs.children[0].children.length; y++){
                                    tmbs.children[0].children[y].classList.remove('active');
                            }
                            tmbs.children[0].children[i].classList.add('active');
                    });
                tmbUl.appendChild(tmb);
            }
            tmbs.appendChild(tmbUl);

            //adding active to first
            tmbs.children[0].children[0].classList.add('active');
    }



// ================= tabSlide plugin ===================
    let tabSlide = document.querySelectorAll('.tabSlide');
    for(let a=0; a < tabSlide.length; a++){

        let accMenu = tabSlide[a].querySelector('ul');
        let acContent = tabSlide[a].querySelector('.tabSlide-content');
        acContent.children[0].style.display = 'block';

        // catch error or menu items more than content or vice versa
        if(accMenu.children.length > acContent.children.length || acContent.children.length > accMenu.children.length){
            acContent.children[0].innerHTML = 'Tab menu and contents must be equal (3x3 or 4x4 etc.)';
            return;
        }
        let biggerHeight = 0;
        for(let i=0; i< accMenu.children.length; i++){
            // adding click function to menu items
            accMenu.children[i].addEventListener('click', function(){
                for(let y=0; y< accMenu.children.length; y++){
                    accMenu.children[y].classList.remove('active');
                    acContent.children[y].style.display = 'none';
                }
                accMenu.children[i].classList.add('active');
                acContent.children[i].style.display = 'block';
            });
            // taking bigger content height 
            if(biggerHeight < acContent.children[i].scrollHeight){
                biggerHeight = acContent.children[i].scrollHeight;
            }
        }
        // and set bigger height to height of content
        acContent.style.height = biggerHeight + 'px';
    }
            
// ================= fFade slide ( autoplay not complated ) ===================

    let fadeSlider = document.querySelectorAll('.fFade-slide');
 
    for(let i=0; i< fadeSlider.length; i++){

        let container = fadeSlider[i].querySelector('ul');
        let slideCount = container.children.length;
        let slideWidth = fadeSlider[i].parentElement.scrollWidth;
        let prev = fadeSlider[i].querySelectorAll('a')[0];
        let next = fadeSlider[i].querySelectorAll('a')[1];

        let slides = container.children;
        let index = 0;
        let prevSlide;
        let nextSlide;
        let autoInterval = null;
        let slideTime = 2000;

        fadeSlider[i].style.height = fadeSlider[i].parentElement.scrollHeight + 'px';

         slides[0].style.display = 'block';
         //slides[0].classList.add('current');

        for(let y=0; y<slides.length; y++){

             
            slides[y].style.width = slideWidth + 'px';
            // slides[y].classList.add('animated');
            // slides[y].classList.add('slideInDown');
        }

        next.addEventListener('click',function(e){
             e.preventDefault();
             stopPlay();
             index++;
             if(index > slides.length - 1){
                index = 0;
             }
             showSlide(index,1);
        });//add event listener

        prev.addEventListener('click',function(e){
            e.preventDefault();
            stopPlay();
            index--;
            if(index < 0){
               index = slides.length - 1;
            }
            showSlide(index,0);
       });//add event listener
        
        // showSlide function
       function showSlide(index,dir){

                nextSlide = slides[index];

            if(dir ==1 ){
                    if(index > 0){
                        prevSlide = slides[index -1];
                    }
                    else{
                        prevSlide = slides[slides.length-1];
                    }
            }
            else if(dir == 0){
                    if(index < slides.length -1){
                        prevSlide = slides[index + 1];
                    }
                    else{
                        prevSlide = slides[0];
                    }
            }

                // ZoomOut slide
                prevSlide.style.zIndex = '5';
                let deg = 1;
                let outInterval = setInterval(function(){
                        deg = deg - 0.1;
                        prevSlide.querySelector('img').style.transform = 'scale(' + deg + ')';
                        prevSlide.style.opacity = deg;
                        if(deg <= 0.7){ 
                            prevSlide.style.display = 'none'; 
                            clearInterval(outInterval); 
                        }
                },70);

                // SlideIn slide
                nextSlide.style.display = 'block';
                nextSlide.style.transform = 'translateY(-100%)';
                let prosent = 100;
                let inInterval = setInterval(function(){
                    prosent = prosent - 5;
                    nextSlide.style.transform = 'translateY(' + (-prosent) +'%)';

                    if(prosent <= 0){
                        clearInterval(inInterval);
                    }
                },20);

                for(let y=0; y < slides.length; y++){
                    slides[y].querySelector('img').style.transform = 'scale(1)';
                    slides[y].style.opacity = 1;
                    slides[y].style.zIndex = 0;
                }

               
             }

             function autoPlay(){
                 clearInterval(autoInterval);
                 index++;
                 if(index > slides.length - 1){
                    index = 0;
                 }
                 showSlide(index,1);
                 autoInterval = setInterval(autoPlay, 2000);
             }
            
             function stopPlay(){
                 clearInterval(autoInterval);
             }

            // autoPlay();
    }

    // ================= Accardion plugin ==========================

    let accard = document.querySelectorAll('.accardion');

    for(let i=0; i<accard.length; i++){

        let accItem = accard[i].children;
            
            // adding i tag width "+" to items
            for(let y=0; y< accItem.length; y++){
                let elmI = document.createElement('i');
                elmI.innerHTML = "+";
                let pElm = accItem[y].children[0];
                pElm.insertBefore(elmI,pElm.firstChild);
            }

            // showing first item and "-" icon
            accItem[0].children[1].style.visibility = 'visible';
            accItem[0].children[1].style.height = accItem[0].children[1].children[0].scrollHeight + 'px';
            accItem[0].querySelector('i').innerHTML = '-';
            console.log(accItem[0].querySelector('i'))

            for(let y=0; y < accItem.length; y++){

                 // adding click to accardion tabs
                 accItem[y].querySelector('p').addEventListener('click',function(){

                 // hiding all items
                 for(let x=0; x<accard[i].children.length; x++){
                    accItem[x].querySelector('ul').style.height = 0;
                    accItem[x].querySelector('ul').style.visibility = 'hidden';
                    accItem[x].classList.remove('active');
                    accItem[x].querySelector('i').innerHTML = '+';
                 }
                 // showing clicked item
                 this.parentElement.classList.add('active');
                 this.children[0].innerHTML = '-';
                 this.parentElement.querySelector('ul').style.visibility = 'visible';
                 this.parentElement.querySelector('ul').style.height = this.parentElement.querySelector('ul li').scrollHeight + 'px';

                });
            }
    }



    
    // Page form style
    let costum = document.querySelectorAll('.cost-input');

    for(let i=0; i<costum.length; i++ ){

        let input = costum[i].querySelector('input');

        if(input != null){

                input.onfocus = function(){
                    if(costum[i].querySelector('i') != null){
                        costum[i].querySelector('i').style.color = '#4ebd4a';
                    }
                    costum[i].style.borderColor = '#4ebd4a';

                 }

                 input.onblur = function(){
                if(costum[i].querySelector('i') != null){
                    costum[i].querySelector('i').style.color = 'rgb(184, 184, 184)';
                    }
                    costum[i].style.boxShadow = 'none';
                    costum[i].querySelector('input').style.boxShadow = 'none';
                    costum[i].style.webkitBoxShadow = 'none';
                    costum[i].style.mozBoxShadow = 'none';
                    costum[i].style.borderColor = 'rgb(223, 223, 223)';
                 }

             }
        }


        // checking person in form

        window.emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        window.textRegex = /^[A-Za-z]+$/;
        window.NumberRegex = /[\d]/;

        let opp1 = document.querySelector('.opp1');
        let opp2 = document.querySelector('.opp2');
        window.rand1 = Math.floor(Math.random() * 20) + 1;  
        window.rand2 = Math.floor(Math.random() * 20) + 1;
        if(opp1 != null && opp2 != null){
            opp1.innerHTML = rand1;
            opp2.innerHTML = rand2;
        }
        

        loadPlayer();
        // Youtube player 
        function getArtistId() {
        return 'l-gQLqv9f4o';
        }
        
        function loadPlayer() { 
            if (typeof(YT) == 'undefined' || typeof(YT.Player) == 'undefined') {
        
            let tag = document.createElement('script');
            tag.src = "https://www.youtube.com/iframe_api";
            let firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
        
            window.onYouTubePlayerAPIReady = function() {
                onYouTubePlayer();
                };
            } else {onYouTubePlayer();}
        }
        
        let player;
        function onYouTubePlayer() {
        player = new YT.Player('player', {
            height: '490',
            width: '880',
            videoId: getArtistId(),
            playerVars: { controls:0,
                        autoplay:1,
                        mute:1,
                        showinfo: 0, 
                        enablejsapi: 1,
                        rel: 0, 
                        showsearch: 0, 
                        iv_load_policy: 3 
                    },
            events: {
            'onError': catchError
            }
        });
        }
        
        function catchError(event)
        {
            if(event.data == 100) console.log("The video on background dont open");
        }
        
        
        let playing = true;
        document.querySelector('.pause-button').addEventListener('click',function(){
            if(playing == true){
                player.pauseVideo();
                playing = false;
                document.querySelector('.pause-button i').innerHTML = 'play';
            }
            else{
                player.playVideo();
                playing = true;
                document.querySelector('.pause-button i').innerHTML = 'pause';
            }
            
        });



}// end of onliad function




function checkInput(){
    let ths = event.target;

    ths.onblur = function(){
        if(ths.classList.contains('email') && ths.value != "" && !emailRegex.test(ths.value)){

                alertMesg("Email address incorrect")
        }
        else if(ths.classList.contains('txt') && ths.value != "" && !textRegex.test(ths.value)){

                alertMesg("Type only letters")
        }
        else if(ths.classList.contains('nmb') && ths.value != "" && !NumberRegex.test(ths.value)){

                alertMesg("Type only numbers")
        }
        else if(ths.classList.contains('subj') && ths.value != "" && ths.value.length < 4){

                alertMesg("Subject must be at least 4 characters")
        }
        else if(ths.classList.contains('textarea') && ths.value != "" && ths.value.length < 10){
                alertMesg("Message must be at least 10 characters")
        }
        else{
                ths.parentElement.nextElementSibling.innerHTML = "";
                ths.style.background = 'rgb(235, 255, 235)';
                ths.style.borderColor = 'rgb(235, 255, 235)';
                ths.previousElementSibling.style.background = 'rgb(235, 255, 235)';
                ths.previousElementSibling.children[0].style.color = 'rgb(184, 184, 184)';
        }
    }

    function alertMesg(msg){
            ths.parentElement.nextElementSibling.innerHTML = msg;
            ths.style.backgroundColor = 'rgb(255, 219, 219)';
            ths.style.borderColor = 'rgb(255, 219, 219)';
            ths.previousElementSibling.style.background = 'rgb(255, 219, 219)';
            ths.previousElementSibling.children[0].style.color = 'rgb(253, 153, 153)';
    }
}


// reset button
function resett(event){
    event.preventDefault();

    let inputs = document.forms['form'].querySelectorAll('input');
    let txtarea = document.forms['form'].querySelector('textarea');
    
    txtarea.value = "";
    for(let i=0; i< inputs.length;i++){
        if(inputs[i].type != 'submit'){
            inputs[i].value = "";
        }
    }

}


// on form submitted
function sent(event){
        event.preventDefault();
        
        let allInputs = document.forms['form'].querySelectorAll('input');        
        let alertBox = document.querySelector('.error-box');

        alertBox.innerHTML = '';
        let success = true;

        //console.log(textInputs[0].value)

        for(let i=0; i< allInputs.length;i++){
            if(allInputs[i].value == ""){
                alertBox.style.display = 'block';                
                alertBox.innerHTML += "You left empty area in form <br>";
                success = false;
                return false;
            } 

            if(allInputs[i].classList.contains('txt') && !textRegex.test(allInputs[i].value) && allInputs[i].value != "" ){
                alertBox.style.display = 'block';
                alertBox.innerHTML += "Text areas must be only text <br>";
                success = false;
                return false;
            }

            if(allInputs[i].classList.contains('nmb') && !NumberRegex.test(allInputs[i].value) && allInputs[i].value != ""){
                alertBox.style.display = 'block';
                alertBox.innerHTML += "Number areas must be only number <br>";
                success = false;
                return false;
            }

            if(allInputs[i].classList.contains('email') && !emailRegex.test(allInputs[i].value) && allInputs[i].value != ""){
                alertBox.style.display = 'block';
                alertBox.innerHTML += "Your email incorrect <br>";
                success = false;
                return false;
            }

            if(allInputs[i].classList.contains('checking')){
                let answer = rand1 + rand2;
                if(allInputs[i].value != answer){
                    alertBox.innerHTML = "Captcha is false!";
                    success = false;
                    return false;
                }
            }

            if(allInputs[i].classList.contains('agree') && allInputs[i].checked == false){
                alertBox.innerHTML = "Pleace agree our terms"
                success = false;
                return false;
            }

        }

        if(success == true){
            alertBox.style.display = 'block';
            alertBox.style.backgroundColor = 'green';
            alertBox.innerHTML = 'Your accaunt created !';
        }
    }







