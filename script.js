/**
* @license The Unlicense, http://unlicense.org/
* @version 0.1
* @author  Jonathan Hase, https://github.com/jonathan-hase/
* @updated 2024-02-09
*/


document.getElementById('spinButton').addEventListener('click', spinSlots);

let imagePaths = {};

// Load image paths from JSON
fetch('images.json')
  .then(response => response.json())
  .then(data => {
    imagePaths = data;
  })
  .catch(error => console.error('Error loading image paths:', error));

function preloadImages(images) {
  images.forEach(src => {
    const img = new Image();
    img.src = src;
  });
}

function spinSlots() {
  const slots = [document.getElementById('slot1'), document.getElementById('slot2'), document.getElementById('slot3')];

  slots.forEach((slot, index) => {
    const slotImages = imagePaths[`slot-${index + 1}`] || [];
    preloadImages(slotImages);

    let currentImageIndex = 0;
    let speed = 0.35; // Speed in seconds for each transition

    // Clear previous images if any
    slot.innerHTML = '';

    const spinInterval = setInterval(() => {
      addImageToSlot(slot, slotImages, currentImageIndex, speed);
      currentImageIndex = (currentImageIndex + 1) % slotImages.length;
    }, speed * 1000);

    // Stop spinning after a random time between 4 to 8 seconds
    setTimeout(() => {
      clearInterval(spinInterval);

      // Add the final image with a smooth transition
      addFinalImageToSlot(slot, slotImages, currentImageIndex, speed);
    }, 2000 + Math.random() * 6000);
  });
}

function addImageToSlot(slot, slotImages, currentImageIndex, speed) {
  const newImage = document.createElement('img');
  newImage.src = slotImages[currentImageIndex];
  newImage.style.position = 'absolute';
  newImage.style.top = '-100%'; // Start above the slot
  newImage.style.width = 'auto';
  newImage.style.height = 'auto';
  newImage.style.maxWidth = '100%';
  newImage.style.maxHeight = '100%';

  slot.appendChild(newImage);

  requestAnimationFrame(() => {
    newImage.style.transition = `top ${speed}s linear`;
    newImage.style.top = '100%'; // Slide through to below the slot
  });

  if (slot.children.length > 1) {
    const oldImage = slot.children[0];
    oldImage.style.transition = `top ${speed}s linear`;
    oldImage.style.top = '200%'; // Move completely out of view
    setTimeout(() => slot.removeChild(oldImage), speed * 1000);
  }
}

function addFinalImageToSlot(slot, slotImages, currentImageIndex, speed) {
  const finalImage = document.createElement('img');
  finalImage.src = slotImages[currentImageIndex];
  finalImage.style.position = 'absolute';
  finalImage.style.top = '-100%'; // Start above the slot
  finalImage.style.width = 'auto';
  finalImage.style.height = 'auto';
  finalImage.style.maxWidth = '100%';
  finalImage.style.maxHeight = '100%';

  slot.appendChild(finalImage);

  requestAnimationFrame(() => {
    finalImage.style.transition = `top ${speed}s linear`;
    finalImage.style.top = '0'; // Slide into view and stop
  });

  if (slot.children.length > 1) {
    const oldFinalImage = slot.children[0];
    oldFinalImage.style.transition = `top ${speed}s linear`;
    oldFinalImage.style.top = '100%'; // Move completely out of view
    setTimeout(() => slot.removeChild(oldFinalImage), speed * 1000);
  }
}

function addImageIntro() {
  const newImage = document.createElement('img');
  newImage.src = "src/intro.jpg";
  newImage.style.position = 'absolute';
  newImage.style.maxWidth = '100%';
  newImage.style.maxHeight = '100%';

  document.getElementById('intro').appendChild(newImage);
}

addImageIntro();
