const caseClosed = document.getElementById("caseClosed");
const caseOpened = document.getElementById("caseOpened");

window.addEventListener("scroll", () => {
    const scrollY = window.scrollY
    const fadeDistance = 300;
    const fadeStart = 4000;
    const cardSlideStart = 6000;
    const cardSlideDistance = 1500;

    if (window.scrollY < 1000) {
        caseClosed.style.opacity = 1;
        caseOpened.style.opacity = 0;
        card.style.opacity = 0;
    } else if (window.scrollY >= 1000 && window.scrollY < 4000) {
        caseOpened.style.transition = 'none';
        caseClosed.style.opacity = 0;
        caseOpened.style.opacity = 1;
        card.style.opacity = 0;
    } else if (window.scrollY >= 4000 && window.scrollY < 5000) {
        caseClosed.style.opacity = 0;
        caseOpened.style.transition = 'opacity 0.5s ease'; 
        card.style.opacity = 0;
        
        let opacity = 1 - ((window.scrollY - fadeStart) / fadeDistance);
        if (opacity < 0) opacity = 0;
        if (opacity > 1) opacity = 1;

        caseOpened.style.opacity = opacity;
    } else {
        caseClosed.style.opactiy = 0;
        caseOpened.style.opactiy = 0;
    }

    if (window.scrollY >= cardSlideStart) {
        let progress = (window.scrollY - cardSlideStart) / cardSlideDistance;
        if (progress > 1) progress = 1;

        let topPosition = -50 + (progress * 100);
        card.style.top = topPosition + '%';
        card.style.opacity = 1;
    } else {
        card.style.top = '-50%';
        card.style.opacity = 0;
    }

});

