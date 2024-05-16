document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector('.section');
  const originalArticle = container.querySelector('.article');
  const threshold = 120;

  // Initial scroll to position
  window.scrollTo(threshold, threshold);

  // Scroll event listener
  window.addEventListener('scroll', () => {
    const halfHeight = container.clientHeight / 2;
    const halfWidth = container.clientWidth / 2;

    // Vertical scrolling
    if (window.scrollY > halfHeight + threshold) {
      window.scrollTo(0, window.scrollY - halfHeight);
    } else if (window.scrollY < threshold) {
      window.scrollTo(0, halfHeight + window.scrollY);
    }

    // Horizontal scrolling
    if (window.scrollX > halfWidth + threshold) {
      window.scrollTo(window.scrollX - halfWidth, window.scrollY);
    } else if (window.scrollX < threshold) {
      window.scrollTo(halfWidth + window.scrollX, window.scrollY);
    }
  });

  // Function to generate random position within the viewport
  function getRandomPosition(container) {
    var containerRect = container.getBoundingClientRect();
    var containerWidth = containerRect.width;
    var containerHeight = containerRect.height;
    var buffer = 2000;

    var posX = Math.floor(Math.random() * (containerWidth + buffer)) - buffer;
    var posY = Math.floor(Math.random() * (containerHeight + buffer)) - buffer;

    return { x: posX, y: posY };
  }

  // Function to clone and position pictures
  function cloneAndPositionPictures() {
    const articles = container.querySelectorAll('.article');
    const numImages = 30;

    articles.forEach(article => {
      const clonedArticle = article.cloneNode(true);
      container.appendChild(clonedArticle);

      const clonedPictures = clonedArticle.querySelectorAll('.pictures');

      for (let i = 0; i < numImages; i++) {
        clonedPictures.forEach(clonedPicture => {
          const newPicture = clonedPicture.cloneNode(true);
          const randomPos = getRandomPosition(container);
          newPicture.style.position = 'absolute';
          newPicture.style.left = randomPos.x + 'px';
          newPicture.style.top = randomPos.y + 'px';
          clonedArticle.appendChild(newPicture);
        });
      }
    });
  }

  // Function to handle positioning of pictures in looped containers
  function handleLoopedContainers() {
    const loopedContainers = document.querySelectorAll('.section .article:not(:first-child)');

    loopedContainers.forEach(loopedContainer => {
      const loopedPictures = loopedContainer.querySelectorAll('.pictures');
      loopedPictures.forEach(loopedPicture => {
        const randomPos = getRandomPosition(container);
        loopedPicture.style.position = 'absolute';
        loopedPicture.style.left = randomPos.x + 'px';
        loopedPicture.style.top = randomPos.y + 'px';
      });
    });
  }

  // Call the functions to generate images after the DOM is fully loaded
  cloneAndPositionPictures();
  handleLoopedContainers();

  // Popup logic
  var modal = document.getElementById("popupModal");
  var closeButton = document.querySelector(".close-button");

  function toggleModal() {
    modal.style.display = (modal.style.display === "none" ? "block" : "none");
  }

  closeButton.addEventListener("click", toggleModal);

  // Automatically show the modal
  window.onload = function() {
    modal.style.display = "block";
  };
});
