document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // 1. MOBILE MENU TOGGLE
    // ==========================================
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }


    // ==========================================
    // 2. HERO SECTION SLIDESHOW
    // ==========================================
    const heroSlides = document.querySelectorAll(".hero-slide");
    const heroDots = document.querySelectorAll(".hero-dots .dot");
    const heroTitle = document.getElementById("hero-title");
    const heroSection = document.getElementById("hero");
    
    const slideTitles = [
        "Best Quality Solution In Cleaning",
        "Experienced & Expert Cleaners",
        "Highly Professional Cleaning Services"
    ];

    let currentHeroSlide = 0;
    let heroSlideInterval;

    function showHeroSlide(index) {
        if (!heroSlides.length) return;
        heroSlides.forEach(slide => slide.classList.remove("active"));
        heroDots.forEach(dot => dot.classList.remove("active"));

        currentHeroSlide = (index + heroSlides.length) % heroSlides.length;

        heroSlides[currentHeroSlide].classList.add("active");
        if (heroDots[currentHeroSlide]) heroDots[currentHeroSlide].classList.add("active");
        if (heroTitle) heroTitle.textContent = slideTitles[currentHeroSlide];
    }

    function nextHeroSlide() {
        showHeroSlide(currentHeroSlide + 1);
    }

    function startHeroSlider() {
        if (heroSlides.length) {
            heroSlideInterval = setInterval(nextHeroSlide, 5000);
        }
    }

    function stopHeroSlider() {
        clearInterval(heroSlideInterval);
    }

    heroDots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            stopHeroSlider();
            showHeroSlide(index);
            startHeroSlider();
        });
    });

    if (heroSection) {
        heroSection.addEventListener("mouseenter", stopHeroSlider);
        heroSection.addEventListener("mouseleave", startHeroSlider);
    }
    
    startHeroSlider();


    // ==========================================
    // 3. ANIMATED NUMBER COUNTERS
    // ==========================================
    const counters = document.querySelectorAll('.counter, #counter');
    let countersHasRun = false;

    function runCounters() {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            let count = 0;
            const speed = Math.max(target / 50, 1);

            function updateCount() {
                count += speed;
                if (count < target) {
                    counter.innerText = Math.ceil(count);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            }
            updateCount();
        });
    }

    window.addEventListener('scroll', function () {
        const targetSection = document.querySelector('.facts-section') || document.getElementById('about') || document.getElementById('why-choose');
        
        if (targetSection && !countersHasRun) {
            const sectionPos = targetSection.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;

            if (sectionPos < screenHeight - 100) {
                runCounters();
                countersHasRun = true;
            }
        }
    });


    // ==========================================
    // 4. CAROUSELS & SLIDERS (Services / Team)
    // ==========================================
    const serviceSlider = document.getElementById('serviceSlider') || document.getElementById('teamSlider') || document.getElementById('servicesTrack') || document.getElementById('teamTrack');
    const serviceNextBtn = document.getElementById('next-btn') || document.getElementById('nextBtn') || document.getElementById('teamNextBtn');
    const servicePrevBtn = document.getElementById('prev-btn') || document.getElementById('prevBtn') || document.getElementById('teamPrevBtn');

    const scrollAmount = 380;

    if (serviceSlider && serviceNextBtn && servicePrevBtn) {
        serviceNextBtn.addEventListener('click', () => {
            serviceSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        });

        servicePrevBtn.addEventListener('click', () => {
            serviceSlider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        });

        let autoScrollTimer = setInterval(() => {
            if (serviceSlider.scrollLeft + serviceSlider.clientWidth >= serviceSlider.scrollWidth) {
                serviceSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                serviceSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            }
        }, 3000);

        serviceSlider.addEventListener('mouseenter', () => clearInterval(autoScrollTimer));
        serviceSlider.addEventListener('mouseleave', () => {
            autoScrollTimer = setInterval(() => {
                if (serviceSlider.scrollLeft + serviceSlider.clientWidth >= serviceSlider.scrollWidth) {
                    serviceSlider.scrollTo({ left: 0, behavior: 'smooth' });
                } else {
                    serviceSlider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                }
            }, 3000);
        });
    }


    // ==========================================
    // 5. TESTIMONIAL SLIDER CAROUSEL
    // ==========================================
    const testimonialTrack = document.getElementById("testimonialTrack");
    const testimonialDots = document.querySelectorAll("#testimonialDots .dot, .testimonial-dots .dot");
    
    if (testimonialTrack) {
        const testimonialItems = testimonialTrack.children;
        let currentTestimonialIndex = 0;
        const totalTestimonials = testimonialItems.length;
        let testimonialTimer;

        function switchToTestimonialSlide(index) {
            currentTestimonialIndex = (index + totalTestimonials) % totalTestimonials;
            testimonialTrack.style.transform = `translateX(-${currentTestimonialIndex * 100}%)`;
            
            testimonialDots.forEach((dot, i) => {
                dot.classList.toggle("active", i === currentTestimonialIndex);
            });
        }

        function autoAdvanceTestimonial() {
            switchToTestimonialSlide(currentTestimonialIndex + 1);
        }

        testimonialDots.forEach((dot) => {
            dot.addEventListener("click", function () {
                clearInterval(testimonialTimer);
                const selectedIndex = parseInt(this.getAttribute("data-index")) || 0;
                switchToTestimonialSlide(selectedIndex);
                startTestimonialTimer();
            });
        });

        function startTestimonialTimer() {
            testimonialTimer = setInterval(autoAdvanceTestimonial, 5000);
        }

        const testimonialSectionNode = document.querySelector('.testimonial-section');
        if (testimonialSectionNode) {
            testimonialSectionNode.addEventListener("mouseenter", () => clearInterval(testimonialTimer));
            testimonialSectionNode.addEventListener("mouseleave", startTestimonialTimer);
        }

        startTestimonialTimer();
    }


    // ==========================================
    // 6. PROJECTS FILTERING LOGIC
    // ==========================================
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    if (filterButtons.length > 0 && projectCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectCards.forEach(card => {
                    const cardCategory = card.getAttribute('data-category');

                    if (filterValue === 'all' || cardCategory === filterValue) {
                        card.classList.remove('hide');
                    } else {
                        card.classList.add('hide');
                    }
                });
            });
        });
    }


    // ==========================================
    // 7. CONTACT FORM SUBMISSION HANDLER
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const formStatus = document.getElementById('formStatus');

    if (contactForm && formStatus) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formData = new FormData(contactForm);
            
            formStatus.style.color = '#0284c7';
            formStatus.textContent = "Sending message...";

            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: { 'Accept': 'application/json' }
                });

                if (response.ok) {
                    formStatus.style.color = 'var(--primary-green, #16a34a)';
                    formStatus.textContent = "Thanks! Your message has been sent directly to us.";
                    contactForm.reset();
                } else {
                    formStatus.style.color = '#dc2626';
                    formStatus.textContent = "Oops! There was a problem submitting your form.";
                }
            } catch (error) {
                formStatus.style.color = '#dc2626';
                formStatus.textContent = "Network error. Please check your connection.";
            }
        });
    }

});




// counter animation function
const counters = document.querySelectorAll(".counter");

const options = {
    threshold: 0.5
};

const counterObserver = new IntersectionObserver((entries, observer) => {

    entries.forEach(entry => {

        if (!entry.isIntersecting) return;

        const counter = entry.target;
        const target = +counter.dataset.target;

        const duration = 2500; // 2.5 seconds
        const increment = target / (duration / 20);

        let current = 0;

        const updateCounter = () => {

            current += increment;

            if(current < target){

                counter.textContent = Math.ceil(current);

                setTimeout(updateCounter,20);

            }else{

                counter.textContent = target;

            }

        };

        updateCounter();

        observer.unobserve(counter);

    });

}, options);

counters.forEach(counter => {

    counterObserver.observe(counter);

});







// formvalidation
const contactForm = document.getElementById("contactForm");


contactForm.addEventListener("submit", function(e){


    e.preventDefault();



    // Get values

    const name = document.getElementById("name").value.trim();

    const email = document.getElementById("email").value.trim();

    const subject = document.getElementById("subject").value.trim();

    const message = document.getElementById("message").value.trim();



    // Error elements

    const nameError = document.getElementById("nameError");

    const emailError = document.getElementById("emailError");

    const subjectError = document.getElementById("subjectError");

    const messageError = document.getElementById("messageError");


    const formStatus = document.getElementById("formStatus");



    // Clear previous errors

    nameError.textContent="";
    emailError.textContent="";
    subjectError.textContent="";
    messageError.textContent="";
    formStatus.textContent="";



    let isValid = true;



    // Name validation

    if(name === ""){

        nameError.textContent="Please enter your name";

        isValid=false;

    }



    // Email validation

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if(email === ""){

        emailError.textContent="Please enter your email";

        isValid=false;

    }

    else if(!emailPattern.test(email)){

        emailError.textContent="Enter a valid email address";

        isValid=false;

    }



    // Subject validation

    if(subject === ""){

        subjectError.textContent="Please enter a subject";

        isValid=false;

    }



    // Message validation

    if(message === ""){

        messageError.textContent="Please enter your message";

        isValid=false;

    }

    else if(message.length < 10){

        messageError.textContent="Message should be at least 10 characters";

        isValid=false;

    }




    // If valid

    if(isValid){


        formStatus.textContent=
        "Message sent successfully! We will contact you soon.";


        formStatus.style.color="green";


        contactForm.reset();


    }


});





// =====================================
// SERVICES CAROUSEL SCROLL
// =====================================

const servicesTrack = document.getElementById("servicesTrack");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");


let currentPosition = 0;


// Get card width dynamically
function getCardWidth(){

    const serviceCard = document.querySelector(".service-card");

    return serviceCard.offsetWidth + 25; // card width + gap

}


// Calculate maximum movement
function getMaxScroll(){

    return servicesTrack.scrollWidth - 
    servicesTrack.parentElement.offsetWidth;

}



// NEXT BUTTON

nextBtn.addEventListener("click", function(){


    let cardWidth = getCardWidth();

    let maxScroll = getMaxScroll();



    currentPosition += cardWidth;



    // Prevent going beyond last card

    if(currentPosition > maxScroll){

        currentPosition = maxScroll;

    }



    servicesTrack.style.transform =
    `translateX(-${currentPosition}px)`;


});






// PREVIOUS BUTTON

prevBtn.addEventListener("click", function(){


    let cardWidth = getCardWidth();



    currentPosition -= cardWidth;



    // Prevent going before first card

    if(currentPosition < 0){

        currentPosition = 0;

    }



    servicesTrack.style.transform =
    `translateX(-${currentPosition}px)`;


});







// Update size when screen changes

window.addEventListener("resize", ()=>{


    currentPosition = 0;


    servicesTrack.style.transform =
    "translateX(0)";


});




const teamTrack = document.getElementById("teamTrack");


// Clone cards for endless movement

const cards = [...teamTrack.children];


cards.forEach(card => {

    const clone = card.cloneNode(true);

    teamTrack.appendChild(clone);

});



// Pause on hover

teamTrack.addEventListener("mouseenter",()=>{

    teamTrack.style.animationPlayState="paused";

});


teamTrack.addEventListener("mouseleave",()=>{

    teamTrack.style.animationPlayState="running";

});




