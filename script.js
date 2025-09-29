
const caseClosed = document.getElementById("caseClosed");
const caseOpened = document.getElementById("caseOpened");
const card = document.getElementById("card");

const aboutButton = document.getElementById("aboutButton");
const contactsButton = document.getElementById("contactsButton");
const worksButton = document.getElementById("worksButton");

// Scroll Animation
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
        caseClosed.style.opacity = 0;
        caseOpened.style.opacity = 0;
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

    // Show button when card is fully visible
    // Show buttons when card is fully visible
    if (window.scrollY >= cardSlideStart + cardSlideDistance) {
        aboutButton.classList.add('visible');
        contactsButton.classList.add('visible');
        worksButton.classList.add('visible');
    } else {
        aboutButton.classList.remove('visible');
        contactsButton.classList.remove('visible');
        worksButton.classList.remove('visible');
    }
});

const popup = document.getElementById("popup");
const closePopupBtn = document.getElementById("closePopup");
const overlay = document.getElementById("overlay");

function openPopup() {
    popup.style.display = "block";
    overlay.style.display = "block";
    popup.style.left = "50%";
    popup.style.top = "50%";
    popup.style.transform = "translate(-50%, -50%)";
    xOffset = 0;
    yOffset = 0;
}

function closePopupFunc() {
    popup.style.display = "none";
    overlay.style.display = "none";
}

aboutButton.addEventListener("click", openPopup);
closePopupBtn.addEventListener("click", closePopupFunc);

// CONTACTS POPUP
const contactsPopup = document.getElementById("contactsPopup");
const closeContactsPopupBtn = document.getElementById("closeContactsPopup");

function openContactsPopup() {
    contactsPopup.style.display = "block";
    overlay.style.display = "block";
    contactsPopup.style.left = "50%";
    contactsPopup.style.top = "50%";
    contactsPopup.style.transform = "translate(-50%, -50%)";
    contactsXOffset = 0;
    contactsYOffset = 0;
}

function closeContactsPopup() {
    contactsPopup.style.display = "none";
    overlay.style.display = "none";
}

contactsButton.addEventListener("click", openContactsPopup);
closeContactsPopupBtn.addEventListener("click", closeContactsPopup);

// WORKS POPUP
const worksPopup = document.getElementById("worksPopup");
const closeWorksPopupBtn = document.getElementById("closeWorksPopup");

function openWorksPopup() {
    worksPopup.style.display = "block";
    overlay.style.display = "block";
    worksPopup.style.left = "50%";
    worksPopup.style.top = "50%";
    worksPopup.style.transform = "translate(-50%, -50%)";
    worksXOffset = 0;
    worksYOffset = 0;
}

function closeWorksPopup() {
    worksPopup.style.display = "none";
    overlay.style.display = "none";
}

worksButton.addEventListener("click", openWorksPopup);
closeWorksPopupBtn.addEventListener("click", closeWorksPopup);

// Update overlay click to close all popups
overlay.addEventListener("click", () => {
    closePopupFunc();
    closeContactsPopup();
    closeWorksPopup();
});

// Update Escape key to close all popups
document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
        closePopupFunc();
        closeContactsPopup();
        closeWorksPopup();
    }
});

// DRAG FUNCTIONALITY FOR ABOUT POPUP
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

popup.addEventListener("mousedown", dragStart);
document.addEventListener("mousemove", drag);
document.addEventListener("mouseup", dragEnd);

popup.addEventListener("touchstart", dragStart);
document.addEventListener("touchmove", drag);
document.addEventListener("touchend", dragEnd);

function dragStart(e) {
    if (e.target.id === "closePopup") return;

    if (e.type === "touchstart") {
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    if (e.target === popup || popup.contains(e.target)) {
        isDragging = true;
        popup.classList.add("dragging");
    }
}

function drag(e) {
    if (isDragging) {
        e.preventDefault();

        if (e.type === "touchmove") {
            currentX = e.touches[0].clientX - initialX;
            currentY = e.touches[0].clientY - initialY;
        } else {
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
        }

        xOffset = currentX;
        yOffset = currentY;

        setTranslate(currentX, currentY, popup);
    }
}

function dragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    popup.classList.remove("dragging");
}

function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`;
}

// DRAG FUNCTIONALITY FOR CONTACTS POPUP
let contactsIsDragging = false;
let contactsCurrentX;
let contactsCurrentY;
let contactsInitialX;
let contactsInitialY;
let contactsXOffset = 0;
let contactsYOffset = 0;

contactsPopup.addEventListener("mousedown", contactsDragStart);
document.addEventListener("mousemove", contactsDrag);
document.addEventListener("mouseup", contactsDragEnd);

function contactsDragStart(e) {
    if (e.target.id === "closeContactsPopup") return;

    contactsInitialX = e.clientX - contactsXOffset;
    contactsInitialY = e.clientY - contactsYOffset;

    if (e.target === contactsPopup || contactsPopup.contains(e.target)) {
        contactsIsDragging = true;
        contactsPopup.classList.add("dragging");
    }
}

function contactsDrag(e) {
    if (contactsIsDragging) {
        e.preventDefault();
        contactsCurrentX = e.clientX - contactsInitialX;
        contactsCurrentY = e.clientY - contactsInitialY;
        contactsXOffset = contactsCurrentX;
        contactsYOffset = contactsCurrentY;
        setTranslate(contactsCurrentX, contactsCurrentY, contactsPopup);
    }
}

function contactsDragEnd() {
    contactsInitialX = contactsCurrentX;
    contactsInitialY = contactsCurrentY;
    contactsIsDragging = false;
    contactsPopup.classList.remove("dragging");
}

// DRAG FUNCTIONALITY FOR WORKS POPUP
let worksIsDragging = false;
let worksCurrentX;
let worksCurrentY;
let worksInitialX;
let worksInitialY;
let worksXOffset = 0;
let worksYOffset = 0;

worksPopup.addEventListener("mousedown", worksDragStart);
document.addEventListener("mousemove", worksDrag);
document.addEventListener("mouseup", worksDragEnd);

function worksDragStart(e) {
    if (e.target.id === "closeWorksPopup") return;

    worksInitialX = e.clientX - worksXOffset;
    worksInitialY = e.clientY - worksYOffset;

    if (e.target === worksPopup || worksPopup.contains(e.target)) {
        worksIsDragging = true;
        worksPopup.classList.add("dragging");
    }
}

function worksDrag(e) {
    if (worksIsDragging) {
        e.preventDefault();
        worksCurrentX = e.clientX - worksInitialX;
        worksCurrentY = e.clientY - worksInitialY;
        worksXOffset = worksCurrentX;
        worksYOffset = worksCurrentY;
        setTranslate(worksCurrentX, worksCurrentY, worksPopup);
    }
}

function worksDragEnd() {
    worksInitialX = worksCurrentX;
    worksInitialY = worksCurrentY;
    worksIsDragging = false;
    worksPopup.classList.remove("dragging");
}