// REWRITTEN TO TAKE ADVANTAGE OF CLOSURES
const $ = (id) => {
    return document.getElementById(id);
};

const createSlideshow = function () {
    // PRIVATE VARIABLES AND FUNCTIONS
    let timer;
    let play = true;
    let speed = 2000;
    
    let nodes = { image: null, caption: null };
    let img = { cache: [], counter: 0 };
    
    const stopSlideShow = function () {
        clearInterval(timer);
    };
    const displayNextImage = function () {
        if (img.counter === img.cache.length) {
            img.counter = 0;
        } else {
            img.counter += 1;
        }
        let image = img.cache[img.counter];
        nodes.image.src = image.src;
        nodes.caption.innerHTML = image.title;
    };
    const setPlayText = function (btn) {
        if (play) {
            btn.value = 'Resume';
        } else {
            btn.value = 'Pause';
        }
    };


    // PUBLIC METHODS THAT HAVE ACCESS TO PRIVATE VARIABLES AND FUNCTIONS
    return {
        loadImages: function (slides) {
            var image;
            for (let i = 0; i < slides.length; i++) {
                image = new Image();
                image.src = slides[i].href;
                image.title = slides[i].title;
                img.cache.push(image);
            }
            return this;
        },
        startSlideShow: function () {
            if (arguments.length === 2) {
                nodes.image = arguments[0];
                nodes.caption = arguments[1];
            }
            timer = setInterval(displayNextImage, speed);
            return this;
        },
        createToggleHandler: function () {
            let me = this;
            // CLOSURE TO BE USED AS THE CLICK EVENT HANDLER
            return function () {
                // 'THIS' IS THE CLICKED BUTTON
                // 'ME' IS THE OBJECT LITERAL
                if (play) {
                    stopSlideShow();
                } else {
                    me.startSlideShow();
                }
                setPlayText(this);
                // TOGGLE PLAY 'FLAG'
                play = !play;
            };
        },
        setSpeed: function (newSpeed) {
            // Convert speed from seconds to milliseconds and Set variable
            speed = newSpeed * 1000;
            // Clear the existing timer
            clearInterval(timer);
            // Start new slideshow
            this.startSlideShow();           
        },
        getSpeed: function () {
            // convert speed from millisecond to seconds
            return (speed / 1000);
        }
    };
};

// CREATE THE SLIDESHOW OBJECT
const slideshow = createSlideshow();

window.addEventListener('load', () => {
    const slides = [
        {href: 'images/backpack.jpg', title: 'He backpacks in the Sierras often'},
        {href: 'images/boat.jpg', title: 'He loves his boat'},
        {href: 'images/camaro.jpg', title: 'He loves his Camaro more'},
        {href: 'images/punk.jpg', title: 'He used to be in a punk band and toured with No Doubt and Sublime'},
        {href: 'images/race.jpg', title: 'He\'s active and loves obstacle coarse racing'}
    ];
	// START THE SLIDESHOW
    slideshow.loadImages(slides).startSlideShow($('image'), $('caption'));
    // PAUSE THE SLIDESHOW
    $('play_pause').onclick = slideshow.createToggleHandler();
    //get Speed from user and Set speed
    $('set_speed').addEventListener('click', () => {
        let speed = parseInt(prompt(`Current speed is ${slideshow.getSpeed()} seconds.\nEnter new speed in Seconds`));
        //Set speed for slideshow
        slideshow.setSpeed(speed);
    });
});