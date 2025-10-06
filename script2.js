let topZIndex = 1000;
// About Popup
// When clicked, Popup appears
// When button clicked again, if open leave it there, if closed open in certain position
const aboutButton = document.getElementById("aboutButton");
const aboutCloser = document.getElementById("closeAboutButton");
const aboutPopup = document.getElementById("aboutPopup");

function openAboutPopup() {
    if (aboutPopup.style.display === "block") {
        // Already open, close it
        closeAboutPopup();
        return;
    }
    aboutPopup.style.display = "block";
    aboutPopup.style.left = "50%";
    aboutPopup.style.top = "50%";
    aboutPopup.style.transform = "translate(-50%, -50%)";
    xOffset = 0;
    yOffset = 0;
    topZIndex++;
    aboutPopup.style.zIndex = topZIndex;
}
aboutButton.addEventListener("click", openAboutPopup);

function closeAboutPopup() {
    aboutPopup.style.display = "none";
    isDragging = false;
}
aboutCloser.addEventListener("click", closeAboutPopup);

// The popups are draggable
let isDragging = false;
let currentX;
let currentY;
let initialX;
let initialY;
let xOffset = 0;
let yOffset = 0;

// Desktop/PC
aboutPopup.addEventListener("mousedown", aboutDragStart);
document.addEventListener("mousemove", aboutDrag);
document.addEventListener("mouseup", aboutDragEnd);

// Mobile devices


function aboutDragStart(e) {
    // If click close button, don't drag and return immediately
    if (e.target.id === "closeAboutButton") return;

    topZIndex++;
    aboutPopup.style.zIndex = topZIndex;

    if (e.type === "touchstart") {
        // Get the click position of the screen
        // Subtract current offset to find where on the popup they clicked
        initialX = e.touches[0].clientX - xOffset;
        initialY = e.touches[0].clientY - yOffset;
    } else {
        // Desktop/PC
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
    }

    // the actual dragging
    if (e.target === aboutPopup || aboutPopup.contains(e.target)) {
        isDragging = true;
        aboutPopup.classList.add("dragging");
    }
}

function aboutDrag(e) {
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

        setTranslate(currentX, currentY, aboutPopup);
    }
}

function aboutDragEnd() {
    initialX = currentX;
    initialY = currentY;
    isDragging = false;
    aboutPopup.classList.remove("dragging");
}

// tf does this do???
function setTranslate(xPos, yPos, el) {
    el.style.transform = `translate(calc(-50% + ${xPos}px), calc(-50% + ${yPos}px))`;
}

// Draggable Contacts button setup
const contactsButton = document.getElementById("contactsButton");
const contactsCloser = document.getElementById("closeContactsButton");
const contactsPopup = document.getElementById("contactsPopup");

function openContactsPopup() {
    if (contactsPopup.style.display === "block") {
        closeContactsPopup();
        return;
    }

    contactsPopup.style.display = "block";
    contactsPopup.style.left = "50%";
    contactsPopup.style.top = "50%";
    contactsPopup.style.transform = "translate(-50%, -50%)";
    contactsXOffset = 0;
    contactsYOffset = 0;
    contactsPopup.style.zIndex = 1000;
    topZIndex++;
    contactsPopup.style.zIndex = topZIndex;
}
contactsButton.addEventListener("click", openContactsPopup);

function closeContactsPopup() {
    contactsPopup.style.display = "none";
    contactsIsDragging = false;
}
contactsCloser.addEventListener("click", closeContactsPopup);

let contactsIsDragging = false;
let contactsCurrentX;
let contactsCurrentY;
let contactsInitialX;
let contactsInitialY;
let contactsXOffset = 0;
let contactsYOffset = 0;
// 
contactsPopup.addEventListener("mousedown", contactsDragStart);
contactsPopup.addEventListener("touchstart", contactsDragStart);

function contactsDragStart(e) {
    if (e.target.id === "closeContactsButton") return;

    topZIndex++;
    contactsPopup.style.zIndex = topZIndex;

    if (e.type === "touchstart") {
        contactsInitialX = e.touches[0].clientX - contactsXOffset;
        contactsInitialY = e.touches[0].clientY - contactsYOffset;
    } else {
        contactsInitialX = e.clientX - contactsXOffset;
        contactsInitialY = e.clientY - contactsYOffset;
    }
    
    if (e.target === contactsPopup || contactsPopup.contains(e.target)) {
        contactsIsDragging = true;
        contactsPopup.classList.add("dragging");
        
        // Add listeners only when dragging starts
        document.addEventListener("mousemove", contactsDrag);
        document.addEventListener("mouseup", contactsDragEnd);
        document.addEventListener("touchmove", contactsDrag);
        document.addEventListener("touchend", contactsDragEnd);
    }
}

function contactsDrag(e) {
    if (contactsIsDragging) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
            contactsCurrentX = e.touches[0].clientX - contactsInitialX;
            contactsCurrentY = e.touches[0].clientY - contactsInitialY;
        } else {
            contactsCurrentX = e.clientX - contactsInitialX;
            contactsCurrentY = e.clientY - contactsInitialY;
        }

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
    
    // Remove listeners when dragging ends
    document.removeEventListener("mousemove", contactsDrag);
    document.removeEventListener("mouseup", contactsDragEnd);
    document.removeEventListener("touchmove", contactsDrag);
    document.removeEventListener("touchend", contactsDragEnd);
}

// Draggable Works button setup
const worksButton = document.getElementById("worksButton");
const worksCloser = document.getElementById("closeWorksButton");
const worksPopup = document.getElementById("worksPopup");

function openWorksPopup() {
    if (worksPopup.style.display === "block") {
        closeWorksPopup();
        return;
    }
    worksPopup.style.display = "block";
    worksPopup.style.left = "22%";
    worksPopup.style.top = "45%";
    worksPopup.style.transform = "translate(-50%, -50%)";
    worksXOffset = 0;
    worksYOffset = 0;
    worksPopup.style.zIndex = 1000;
    topZIndex++;
    worksPopup.style.zIndex = topZIndex;
}
worksButton.addEventListener("click", openWorksPopup);

function closeWorksPopup() {
    worksPopup.style.display = "none";
    worksIsDragging = false;
}
worksCloser.addEventListener("click", closeWorksPopup);

let worksIsDragging = false;
let worksCurrentX;
let worksCurrentY;
let worksInitialX;
let worksInitialY;
let worksXOffset = 0;
let worksYOffset = 0;

worksPopup.addEventListener("mousedown", worksDragStart);
worksPopup.addEventListener("touchstart", worksDragStart);

function worksDragStart(e) {
    if (e.target.id === "closeWorksButton") return;
    if (e.target.classList.contains('resize-handle')) return;

    topZIndex++;
    worksPopup.style.zIndex = topZIndex;

    if (e.type === "touchstart") {
        worksInitialX = e.touches[0].clientX - worksXOffset;
        worksInitialY = e.touches[0].clientY - worksYOffset;
    } else {
        worksInitialX = e.clientX - worksXOffset;
        worksInitialY = e.clientY - worksYOffset;
    }
    
    if (e.target === worksPopup || worksPopup.contains(e.target)) {
        worksIsDragging = true;
        worksPopup.classList.add("dragging");
        
        document.addEventListener("mousemove", worksDrag);
        document.addEventListener("mouseup", worksDragEnd);
        document.addEventListener("touchmove", worksDrag);
        document.addEventListener("touchend", worksDragEnd);
    }
}

function worksDrag(e) {
    if (worksIsDragging) {
        e.preventDefault();
        
        if (e.type === "touchmove") {
            worksCurrentX = e.touches[0].clientX - worksInitialX;
            worksCurrentY = e.touches[0].clientY - worksInitialY;
        } else {
            worksCurrentX = e.clientX - worksInitialX;
            worksCurrentY = e.clientY - worksInitialY;
        }

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
    
    document.removeEventListener("mousemove", worksDrag);
    document.removeEventListener("mouseup", worksDragEnd);
    document.removeEventListener("touchmove", worksDrag);
    document.removeEventListener("touchend", worksDragEnd);
}

// RESIZE FUNCTIONALITY FOR WORKS POPUP
let isResizing = false;
let resizeType = null;
let resizeStartX, resizeStartY;
let resizeStartWidth, resizeStartHeight;
let resizeStartLeft, resizeStartTop;

const resizeHandles = worksPopup.querySelectorAll('.resize-handle');

resizeHandles.forEach(handle => {
    handle.addEventListener('mousedown', (e) => {
        e.stopPropagation();
        isResizing = true;
        
        if (handle.classList.contains('resize-right')) {
            resizeType = 'right';
        } else if (handle.classList.contains('resize-bottom')) {
            resizeType = 'bottom';
        } else if (handle.classList.contains('resize-corner')) {
            resizeType = 'corner';
        }
        
        resizeStartX = e.clientX;
        resizeStartY = e.clientY;
        resizeStartWidth = worksPopup.offsetWidth;
        resizeStartHeight = worksPopup.offsetHeight;
        resizeStartLeft = worksPopup.offsetLeft;
        resizeStartTop = worksPopup.offsetTop;
        
        document.addEventListener('mousemove', handleResize);
        document.addEventListener('mouseup', stopResize);
    });
});

function handleResize(e) {
    if (!isResizing) return;
    
    const deltaX = e.clientX - resizeStartX;
    const deltaY = e.clientY - resizeStartY;
    
    if (resizeType === 'right' || resizeType === 'corner') {
        const newWidth = resizeStartWidth + deltaX;
        if (newWidth >= 300) {
            worksPopup.style.width = newWidth + 'px';
            // Don't change left position - keep it fixed
        }
    }
    
    if (resizeType === 'bottom' || resizeType === 'corner') {
        const newHeight = resizeStartHeight + deltaY;
        if (newHeight >= 200) {
            worksPopup.style.height = newHeight + 'px';
            // Don't change top position - keep it fixed
        }
    }
}

function stopResize() {
    isResizing = false;
    resizeType = null;
    document.removeEventListener('mousemove', handleResize);
    document.removeEventListener('mouseup', stopResize);
}

// Make GIF disappear after one loop and fade in business card
const introGif = document.getElementById('introGif');
const businessCard = document.getElementById('businessCard');
const aboutLabel = document.getElementById('aboutLabel');
const contactsLabel = document.getElementById('contactsLabel');
const worksLabel = document.getElementById('worksLabel');

const gifDuration = 3190; // 3.19 seconds

// Fade in business card after 1 second
setTimeout(() => {
    businessCard.classList.add('show');
}, 1000);

// Fade in labels after business card is visible (3 seconds total)
setTimeout(() => {
    aboutLabel.classList.add('show');
    contactsLabel.classList.add('show');
    worksLabel.classList.add('show');
}, 3000); // Appears at 3 seconds (card finishes fading in)

// GIF fade out
setTimeout(() => {
    introGif.classList.add('hidden');
    setTimeout(() => {
        introGif.style.display = 'none';
    }, 2000);
}, gifDuration);