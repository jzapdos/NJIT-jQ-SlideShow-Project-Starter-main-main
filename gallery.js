let mCurrentIndex = 0 // Tracks the current image index
let mImages = [] // Array to hold GalleryImage objects
const mUrl = './images.json' // Replace with actual JSON URL
const mWaitTime = 5000 // Timer interval in milliseconds

$(document).ready(() => {
  $('.details').hide() // Hide details initially

  // Call a function here to start the timer for the slideshow
startTimer();
  // Select the moreIndicator button and add a click event to:
  // - toggle the rotation classes (rot90 and rot270)
  // - slideToggle the visibility of the .details section
$(".moreIndicator").on("click", function() {
  $(this).toggleClass("rot90, rot270")
  $(".details").slideToggle()
})

$("#nextPhoto").on("click", function() {
  showNextPhoto()
})

$("#prevPhoto").on("click", function() {
  showPrevPhoto()
})
  // Select the "Next Photo" button and add a click event to call showNextPhoto

  // Select the "Previous Photo" button and add a click event to call showPrevPhoto

  // Call fetchJSON() to load the initial set of images
  fetchJSON()
})

// Function to fetch JSON data and store it in mImages
function fetchJSON () {
  // Use $.ajax here to request the JSON data from mUrl
  // On success, parse the JSON and push each image object into mImages array
  // After JSON is loaded, call swapPhoto() to display the first image
  $.ajax({
    url: mUrl,
    method: "GET",
    dataType: "json",
    success: function(data) {
      console.log(data.images)
      mImages = data.images;
      swapPhoto()
    },
    error: function(err) {
      console.error("Error loading JSON", err)
    }
  })
}

// Function to swap and display the next photo in the slideshow
function swapPhoto () {
  $("#photo").attr("src", mImages[mCurrentIndex].imgPath)
  $(".imgFood").text("Food: " + mImages[mCurrentIndex].imgFood)
  $(".description").text("Description: " + mImages[mCurrentIndex].description)
  $(".eatTime").text("Eat Time: " + mImages[mCurrentIndex].eatTime)
}
// Advances to the next photo, loops to the first photo if the end of array is reached
function showNextPhoto () {
  if (mImages.length === 0) return
  mCurrentIndex++
  if (mCurrentIndex >= mImages.length) {
    mCurrentIndex = 0
  }
  swapPhoto()
}

// Goes to the previous photo, loops to the last photo if mCurrentIndex goes negative
function showPrevPhoto () {
  // Decrement mCurrentIndex and call swapPhoto()
  // Ensure it loops to the end if mCurrentIndex is less than 0
  if(mImages.length === 0) return;
  mCurrentIndex--
  if(mCurrentIndex < 0){
    mCurrentIndex = mImages.length - 1
  }
  swapPhoto()
}

// Starter code for the timer function
function startTimer () {
  // Create a timer to automatically call `showNextPhoto()` every mWaitTime milliseconds
  // Consider using setInterval to achieve this functionality
  // Hint: Make sure only one timer runs at a time

  mTimer = setInterval(() => {
    showNextPhoto()
  }, mWaitTime);
}
