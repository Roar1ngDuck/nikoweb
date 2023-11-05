const imageList = [
    "IMG_0271.webp",
    "IMG_0963.webp",
    "IMG_1787.webp",
    "IMG_1956.webp",
    "IMG_2020.webp",
    "IMG_2221.webp",
    "IMG_2269.webp",
    "IMG_2423.webp",
    "IMG_2923.webp",
    "IMG_5560.webp",
    "IMG_5734.webp",
    "IMG_6057.webp",
    "IMG_6153.webp",
    "IMG_6176.webp",
    "IMG_6184.webp",
    "IMG_6200.webp",
    "IMG_6483.webp",
    "IMG_6546.webp",
    "IMG_6738.webp",
    "IMG_7860.webp",
    "IMG_8214.webp",
    "IMG_8448.webp",
    "IMG_8644.webp",
    "IMG_8653.webp",
    "IMG_9030.webp",
    "IMG_9301.webp",
    "IMG_9956.webp",
    "RemoteMediaFile_6553616_0_2021_10_13_10_59_32.webp"
  ];

var page = "about"
  
function createGallery(images) {
    showGalleryImages(images);

    setupImageSizeButtons();

    setupModal();
}

function showGalleryImages(images) {
    // Find the gallery container
    const galleryContainer = document.querySelector('.gallery');
    // Clear out the existing content
    galleryContainer.innerHTML = '';

    // Generate HTML for each image and append to the gallery
    images.forEach(filename => {
    const imgContainer = document.createElement('div');
    imgContainer.className = 'img-container half-width'; // All images are half-width
    
    // Create img element
    const imgElement = document.createElement('img');
    imgElement.src = `images/gallery/${filename}`;
    imgElement.alt = 'Gallery Image';
    imgContainer.appendChild(imgElement);

    // Append the imgContainer to the gallery
    galleryContainer.appendChild(imgContainer);
    });
}

function setupModal() {
    // Get the modal
    var modal = document.getElementById('imageModal');

    var modalImg = document.getElementById('modalImage');

    // Get all the images that will open the modal
    var images = document.getElementsByClassName('gallery');

    // Loop through all images
    for (var i = 0; i < images.length; i++) {
        var img = images[i];
        
        // And attach our click event to each image
        img.onclick = function(evt){
            modal.style.display = "block";
            high_res_src = evt.target.src
            high_res_src = high_res_src.replace("/gallery/", "/gallery/full_res/")
            high_res_src = high_res_src.replace(".webp", ".JPEG")
            modalImg.src = high_res_src;
        }
    }

    // Get the <span> element that closes the modal
    var span = document.createElement("span");
    span.classList.add("close");
    span.innerHTML = "&times;";
    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Add close button to modal
    modal.appendChild(span);
}

function setupImageSizeButtons() {
    function setImageSizeSmall() {
        if (page != "gallery"){
            return;
        }

        // Select all elements with 'full-width'
        var elements = document.querySelectorAll('.full-width');

        // Loop through the NodeList and toggle the class
        elements.forEach(function(element) {
            element.classList.remove('full-width');
            element.classList.add('half-width');
        });

        largeButton.classList.remove("active")
        smallButton.classList.add("active")
    }

    function setImageSizeLarge() {
        if (page != "gallery"){
            return;
        }

        // Select all elements with 'half-width'
        var elements = document.querySelectorAll('.half-width');

        // Loop through the NodeList and toggle the class
        elements.forEach(function(element) {
            element.classList.remove('half-width');
            element.classList.add('full-width');
        });

        smallButton.classList.remove("active")
        largeButton.classList.add("active")
    }

    // Select the button and add an event listener to it
    var smallButton = document.getElementById('setSmall');
    smallButton.addEventListener('click', setImageSizeSmall);

    // Select the button and add an event listener to it
    var largeButton = document.getElementById('setLarge');
    largeButton.addEventListener('click', setImageSizeLarge);
}

document.querySelectorAll('[data-page]').forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault();

        // Remove 'active' class from all buttons
        document.querySelectorAll('.nav-button').forEach(btn => {
            btn.classList.remove('active');
        });

        // Add 'active' class to the clicked button
        button.classList.add('active');

        page = e.target.getAttribute('data-page');

        // Fade out current content
        const contentContainer = document.getElementById('app-content');
        contentContainer.classList.add('fade-out');

        // Fetch the new content after fade out is complete
        setTimeout(() => {
            fetch(`/${page}.html`)
                .then(response => response.text())
                .then(content => {
                    contentContainer.innerHTML = content;

                    // Fade in new content
                    contentContainer.classList.remove('fade-out');

                    // Check if the gallery page was loaded, and if so, create the gallery
                    if (page === 'gallery') {
                        createGallery(imageList);
                    }

                })
                .catch(error => console.error('Error fetching the content:', error));
        }, 200);
    });
});