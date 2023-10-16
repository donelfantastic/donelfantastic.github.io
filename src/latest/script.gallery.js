/* ======================
	Async image loading
====================== */
var asyncImgClasses = {
  // Class name of element that holds the images
  asyncImgHolder: 'async-image-holder',
  // Class for <img>s appended to holder element
  asyncImg: 'async-image',
  // Low res image class (loaded first)
  lowResClass: 'low-res',
  // Appended to new <img> elements after they're loaded
  loadedClass: 'loaded' };


// data-* attribute keys
var asyncImgDataKeys = {
  // Full res
  dFullRes: 'data-async-src',
  // Low res
  dLowRes: 'data-async-src-low',
  // Gradient start 
  // ex. rgba(255, 255, 255, .6)
  dGradient: 'data-gradient',
  // Gradient end 
  // ex. rgba(255, 255, 255, .6)
  dGradientTo: 'data-gradient-to',
  // Class string appended to each image
  // ex: 'class-a class-b'
  dImgClass: 'data-img-class',
  // Image alt
  dImgAlt: 'data-alt' };


// Function loads an image *after* returning it's <img> element
function loadAsyncImage(src, lowRes, classString, gradient, gradientTo, imgAlt) {
  var imgEl = new Image();
  // Blank gif keeps img element transparent
  imgEl.src = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  // Add image class strings
  imgEl.className = asyncImgClasses.asyncImg + ' ' + (classString || '');
  // Appends low-res class(if needed)
  if (lowRes) imgEl.className += ' ' + asyncImgClasses.lowResClass;
  // Set alt
  imgEl.alt = imgAlt || 'Asynchronous image';
  // This is a loading element(never appended to the document)
  imgLoader = new Image();
  // Prepare for when image is loaded
  imgLoader.onload = function () {
    var linearGradient = '';
    // Gradient defaults to the first value being used both from/to
    if (gradient) linearGradient = 'linear-gradient(' + gradient + ',' + (gradientTo || gradient) + '),';
    // Append real src as background to image element that is returned
    imgEl.style.backgroundImage = linearGradient + "url('" + src + "')";
    imgEl.className += ' ' + asyncImgClasses.loadedClass;
  };
  // Load image
  imgLoader.src = src;
  return imgEl;
}

// Automatically find and load async images 
function findAsyncImages() {
  var asyncImageHolders = document.getElementsByClassName(asyncImgClasses.asyncImgHolder);
  for (var q = 0; q < asyncImageHolders.length; q++) {
    var asyncWrap = asyncImageHolders[q];
    // Get img data
    var fullResSrc = asyncWrap.getAttribute(asyncImgDataKeys.dFullRes);
    var lowResSrc = asyncWrap.getAttribute(asyncImgDataKeys.dLowRes);
    var gradient = asyncWrap.getAttribute(asyncImgDataKeys.dGradient);
    var gradientTo = asyncWrap.getAttribute(asyncImgDataKeys.dGradientTo);
    var imgClass = asyncWrap.getAttribute(asyncImgDataKeys.dImgClass);
    var imgAlt = asyncWrap.getAttribute(asyncImgDataKeys.dImgAlt);

    // Remove current background image from wrap
    if (lowResSrc || fullResSrc) asyncWrap.style.backgroundImage = 'none';

    // Low res
    if (lowResSrc)
    asyncWrap.appendChild(
    loadAsyncImage(lowResSrc, true, imgClass, gradient, gradientTo, imgAlt));

    // Full res
    if (fullResSrc)
    asyncWrap.appendChild(
    loadAsyncImage(fullResSrc, false, imgClass, gradient, gradientTo, imgAlt));

  }
}

window.addEventListener('DOMContentLoaded', function () {
  console.log('Searching for images to load in elements with class "' + asyncImgClasses.asyncImgHolder + '"');
  findAsyncImages();
});


/* ======================
	BEGIN LIGHTBOX
====================== */
// Various meta keys
const lightboxKeys = {
  defaultLightboxLabel: 'swgl-default-lightbox',
  dataImgSrc: 'data-swgl-src',
  dataImgAlt: 'data-swgl-alt',
  dataLightboxLabel: 'data-swgl-label' };

// Flags for preloading images on either side of image selected
const preload = {
  'previous': true,
  'next': true };

const lightboxStyles = {
  ids: {
    overlay: 'swgl-overlay',
    digitizer: 'swgl-digitizer',
    slideWrapper: 'swgl-slide-wrapper',
    controls: 'swgl-controls' },

  classes: {
    // Overlay active
    overlayActive: 'active',
    digitizer: 'swgl-digitizer',
    // Slide classes
    slide: 'swgl-slide',
    slideLoaded: 'loaded',
    deleteSlide: 'swgl-delete',
    activeSlide: 'swgl-active',
    leftSlide: 'swgl-left',
    rightSlide: 'swgl-right',
    centerSlide: 'swgl-center',
    slideImg: 'swgl-slide-img',
    slideImgLoaded: 'loaded',
    slidePortrait: 'portrait',
    slideLandscape: 'landscape',
    slideCaption: 'swgl-caption',
    loadingSpinner: 'swgl-loading-spinner' } };


// Delays need to match css transition times (ms)
const animationDelays = {
  openOverlay: 250,
  closeOverlay: 250,
  slideTransition: 500 };

/* ======================
	All lightbox data
====================== */
let lightboxData = {};
const setAllLightboxData = data => {
  lightboxData = data;
};
// Deep copies object data and returns that
const getLightboxData = label => {
  return JSON.parse(JSON.stringify(lightboxData[label]));
};
/* ==================================
	Currently selected lightbox data
=================================== */
let currentLightboxData = {};
const getCurrentLightboxData = () =>
JSON.parse(JSON.stringify(currentLightboxData));

const setCurrentLightboxData = data => {
  currentLightboxData = data;
};
const clearCurrentLightboxData = () => {
  currentLightboxData = {};
};
const getSrcFromCurrentData = (imageIndex) =>
currentLightboxData.images[imageIndex].src;

const getImageFromCurrentData = (imageIndex) =>
getImageData(currentLightboxData, imageIndex);

/* ==================================
	Currently selected index
=================================== */
let currentIndex = 0;
const getCurrentIndex = () =>
currentIndex;

const setCurrentIndex = newIndex => {
  currentIndex = newIndex;
};
const clearCurrentIndex = () => {
  currentIndex = 0;
};


/* ======================
	Create HTML funcs
====================== */
const createControls = () => {
  const controlsEl = document.createElement('div');
  controlsEl.id = lightboxStyles.ids.controls;
  // Digitizer
  const digitizer = document.createElement('div');
  digitizer.id = lightboxStyles.ids.digitizer;
  digitizer.className = lightboxStyles.classes.digitizer;
  digitizer.addEventListener('click', closeLightbox);
  controlsEl.appendChild(digitizer);
  // Close btn
  const closeBtn = document.createElement('button');
  closeBtn.innerHTML = '&times;';
  closeBtn.id = 'swgl-close-btn';
  closeBtn.className = 'swgl-btn';
  closeBtn.addEventListener('click', closeLightbox);
  controlsEl.appendChild(closeBtn);
  // Prev btn
  const prevBtn = document.createElement('button');
  prevBtn.innerHTML = '&#10094;';
  prevBtn.id = 'swgl-prev-btn';
  prevBtn.className = 'swgl-btn swgl-nav-btn';
  prevBtn.addEventListener('click', prevSlide);
  controlsEl.appendChild(prevBtn);
  // Next btn
  const nextBtn = document.createElement('button');
  nextBtn.innerHTML = '&#10095;';
  nextBtn.id = 'swgl-next-btn';
  nextBtn.className = 'swgl-btn swgl-nav-btn';
  nextBtn.addEventListener('click', nextSlide);
  controlsEl.appendChild(nextBtn);

  return controlsEl;
};
const createFramework = () => {
  const overlay = createOverlay();
  const slideWrapper = createSlideWrapper();
  const controls = createControls();
  overlay.appendChild(slideWrapper);
  overlay.appendChild(controls);
  return overlay;
};
const createLoadingSpinner = () => {
  const newSpinner = document.createElement('img');
  newSpinner.className = lightboxStyles.classes.loadingSpinner;
  newSpinner.alt = 'Loading image, please wait';
  newSpinner.src = 'data:image/svg+xml,' + loadingSvg;
  return newSpinner;
};
const createOverlay = () => {
  const overlay = document.createElement('div');
  overlay.id = lightboxStyles.ids.overlay;
  return overlay;
};
const createSlideWrapper = () => {
  const slideWrapper = document.createElement('div');
  slideWrapper.id = lightboxStyles.ids.slideWrapper;
  return slideWrapper;
};
// This blank gif is also used in async-images, but I'm putting it here to keep them modular
const blankSrc = 'data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
const createSlide = (src, alt) => {
  // Create elements
  const newSlide = document.createElement('div');
  newSlide.className = lightboxStyles.classes.slide;
  // Spinner
  const spinnerEl = createLoadingSpinner();

  // Img
  const newImg = new Image();
  newImg.className = ' ' + lightboxStyles.classes.slideImg;
  // Starts img element transparent if loading
  newImg.src = blankSrc;

  // Background loader image
  imgLoader = new Image();
  // Prepare image loading
  imgLoader.onload = function () {
    // Remove spinner
    spinnerEl.parentNode.removeChild(spinnerEl);
    // Switch real image to src
    newImg.src = src;
    // Fade in img again with real src
    newImg.className += ' ' + lightboxStyles.classes.slideImgLoaded;

    const isLandscape = imgLoader.width >= imgLoader.height;
    const imgTypeClass = isLandscape ? lightboxStyles.classes.slideLandscape : lightboxStyles.classes.slidePortrait;

    newSlide.className += ' ' + lightboxStyles.classes.slideLoaded + ' ' + imgTypeClass;

  };
  // Load image
  imgLoader.src = src;

  newSlide.appendChild(newImg);
  newSlide.appendChild(spinnerEl);

  // Add caption
  const newCaption = document.createElement('div');
  newCaption.className = lightboxStyles.classes.slideCaption;
  newCaption.innerHTML = alt || 'Lightbox image';
  newSlide.appendChild(newCaption);
  return newSlide;
};
/* ======================
	Generic nav funcs
====================== */
const selectSlide = (src, dir, alt) => {
  // Declare vars for slide direction
  let formerActiveDir;
  let newSlideDirClass;

  // Slide from left
  if (dir < 0) {
    formerActiveDir = lightboxStyles.classes.rightSlide;
    newSlideDirClass = lightboxStyles.classes.leftSlide;
  }
  // Slide from right
  else if (dir > 0) {
      formerActiveDir = lightboxStyles.classes.leftSlide;
      newSlideDirClass = lightboxStyles.classes.rightSlide;
    }
    // Center slide
    else {
        // Slide any active slides to the left
        formerActiveDir = lightboxStyles.classes.centerSlide;
        // Make slide invisible to start
        newSlideDirClass = lightboxStyles.classes.centerSlide;
      }
  // Remove any remaining slides
  deleteActiveSlides(formerActiveDir);

  // Set new slide class to active
  const newSlide = createSlide(src, alt);
  newSlide.className += ' ' + newSlideDirClass;
  // Find slide wrapper
  const slideWrapper = document.getElementById(lightboxStyles.ids.slideWrapper);
  // Add new slide
  slideWrapper.appendChild(newSlide);
  // Put in setTimeout to wait for DOM update
  setTimeout(() => {
    newSlide.className = newSlide.className.replace(newSlideDirClass, '') + ' ' + lightboxStyles.classes.activeSlide;
  }, 0);
};
// Generic navigation function
const genericSlide = indexDirection => {
  // Get current data
  const currentData = getCurrentLightboxData();
  // Get current inds
  const currentIndex = getCurrentIndex();
  // Build next index
  const newIndex = verifyIndex(currentData, currentIndex, indexDirection);
  // Update with new index
  setCurrentIndex(newIndex);
  // Get image data from new index
  const img = getImageFromCurrentData(newIndex);
  // Render new slide
  selectSlide(img.src, newIndex - currentIndex, img.alt);

  // Preload next images
  checkImagePreload(currentData, newIndex);
};

/* ======================
	Lightbox actions
====================== */
const openLightbox = (srcIndex, lightboxLabel) => {

  // Retrieve data
  const lightboxData = getLightboxData(lightboxLabel || lightboxKeys.defaultLightboxLabel);

  // Set which data to use
  setCurrentLightboxData(lightboxData);
  setCurrentIndex(srcIndex);

  // Create new slide
  const img = getImageFromCurrentData(srcIndex);
  selectSlide(img.src, 0, img.alt);

  // Get overlay
  let overlay = getOverlay();
  // Add active class 
  overlay.className += ' ' + lightboxStyles.classes.overlayActive;
};
const closeLightbox = () => {
  // Clear active data
  clearCurrentLightboxData();
  clearCurrentIndex();
  deleteActiveSlides();
  // Hide overlay
  const overlay = getOverlay();
  overlay.className = overlay.className.replace(new RegExp(lightboxStyles.classes.overlayActive, 'g'), '').trim();
};
const prevSlide = e => {
  e.preventDefault();
  genericSlide(-1);
};
const nextSlide = e => {
  e.preventDefault();
  genericSlide(1);
};

/* ======================
	Utility Funcs
====================== */
// Preloads images on either side of current
const checkImagePreload = (currentData, currentIndex) => {
  if (preload.previous) {
    const prevIndex = verifyIndex(currentData, currentIndex - 1);
    const img = getImageData(currentData, prevIndex);
    preloadImage(img.src);
  }

  if (preload.next) {
    const nextIndex = verifyIndex(currentData, currentIndex + 1);
    const img = getImageData(currentData, nextIndex);
    preloadImage(img.src);
  }
};
// Removes all slides active before navigation
const deleteActiveSlides = dir => {
  const slideWrapper = getSlideWrapper();
  const dirClass = dir || lightboxStyles.classes.centerSlide;

  // Get all active slides
  const currentSlides = slideWrapper.getElementsByClassName(lightboxStyles.classes.activeSlide);
  for (let q = 0; q < currentSlides.length; q++) {
    const oldSlide = currentSlides[q];
    // Clear activeClass
    oldSlide.className = currentSlides[q].className.replace(lightboxStyles.classes.activeSlide, dirClass);
    // Delete old slide
    setTimeout(() => {
      if (oldSlide && oldSlide.parentNode) oldSlide.parentNode.removeChild(oldSlide);
    }, animationDelays.slideTransition);
  }
};
// Retrieval function for image data
const getImageData = (data, index) => {
  return data.images[index];
};
// Retrieval function for overlay element
const getOverlay = () => {
  return document.getElementById(lightboxStyles.ids.overlay);
};
// Retrieval function for slide wrapper
const getSlideWrapper = () => {
  return document.getElementById(lightboxStyles.ids.slideWrapper);
};
// Preloads without showing image
const preloadImage = src => {
  const img = new Image();
  img.alt = 'Preloading image';
  img.src = src;
};
// Ensures image index loops around image count
const verifyIndex = (currentData, currentIndex, indexDirection = 0) => {
  let attemptedIndex = currentIndex + indexDirection;
  let newIndex;
  if (attemptedIndex >= currentData.images.length) newIndex = 0;else
  if (attemptedIndex < 0) newIndex = currentData.images.length - 1;else
  newIndex = attemptedIndex;
  return newIndex;
};

/* ========================
	Initialization funcs
======================== */
const genLightboxData = label => ({
  label,
  images: [] });

const genLightboxImage = (src, imgAlt) => ({
  src,
  alt: imgAlt || 'Lightbox image' });

const initializeFramework = () => {
  const swglLightbox = createFramework();
  document.getElementsByTagName('body')[0].appendChild(swglLightbox);
};
const intializeSlides = () => {
  if (!lightboxKeys.dataImgSrc) throw new Error("lightboxKeys.dataImgSrc var empty");
  if (!lightboxKeys.dataLightboxLabel) throw new Error("lightboxKeys.dataLightboxLabel var empty");
  if (!lightboxKeys.dataImgAlt) throw new Error('lightboxKeys.dataImgAlt empty');

  // Search for lightbox images
  const imgSrcEls = document.querySelectorAll('[' + lightboxKeys.dataImgSrc + ']');
  // holds final lightbox data
  const lightboxData = {};

  for (let q = 0; q < imgSrcEls.length; q++) {
    const imgEl = imgSrcEls[q];
    const imgSrc = imgEl.getAttribute(lightboxKeys.dataImgSrc);
    const imgAlt = imgEl.getAttribute(lightboxKeys.dataImgAlt);
    // Uses element's lightbox label or default
    const lightboxLabel = imgEl.getAttribute(lightboxKeys.dataLightboxLabel) || lightboxKeys.defaultLightboxLabel;
    const newLightboxImage = genLightboxImage(imgSrc, imgAlt);
    // Ensure data is prepped
    if (!lightboxData[lightboxLabel]) lightboxData[lightboxLabel] = genLightboxData(lightboxLabel);
    // Push new image
    lightboxData[lightboxLabel].images.push(newLightboxImage);
    const imgIndex = lightboxData[lightboxLabel].images.length - 1;

    imgEl.addEventListener('click', () => {
      openLightbox(imgIndex, lightboxLabel);
    });
  }

  setAllLightboxData(lightboxData);
};

window.addEventListener('DOMContentLoaded', () => {
  // Prepare lightbox HTML
  initializeFramework();
  // Find all slides and initialize lightbox data
  intializeSlides();
});

/* ======================================
	Loading svg (url-encoded for IE)
==================================== */
// Unfortunately this adds over a kb to the code, 
// the upside being it doesn't take another request
const loadingSvg = '%3Csvg%20viewBox%3D%220%200%20265%20273%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill-rule%3D%22evenodd%22%20clip-rule%3D%22evenodd%22%20stroke-linejoin%3D%22round%22%20stroke-miterlimit%3D%221.414%22%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-21.676%20-2.418)%20scale(1.1417)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-8.379%2033.813)%20scale(1.29394)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-21.726%2085.436)%20scale(1.44612)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-65.864%20137.056)%20scale(1.59837)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-136.654%20173.288)%20scale(1.7506)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-222.825%20182.865)%20scale(1.90279)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-309.011%20161.662)%20scale(2.05505)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-379.808%20113.803)%20scale(2.20732)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-423.925%2050.56)%20scale(2.35946)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-437.292%20-12.69)%20scale(2.51175)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-423.993%20-60.546)%20scale(2.66398)%22%2F%3E%3Ccircle%20cx%3D%22188.828%22%20cy%3D%2238.185%22%20r%3D%229.158%22%20transform%3D%22translate(-395.289%20-81.746)%20scale(2.81613)%22%2F%3E%3C%2Fsvg%3E';