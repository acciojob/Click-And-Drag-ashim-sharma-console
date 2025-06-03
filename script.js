// Select container and all cubes
const container = document.querySelector('.items');
const cubes = container.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Make sure container is positioned relative for absolute positioning inside it
container.style.position = 'relative';

// Initialize cubes position in a grid
const colCount = 9;
const cubeWidth = 200;
const cubeHeight = container.clientHeight - 40;

cubes.forEach((cube, index) => {
  cube.style.position = 'absolute';
  // Calculate initial left/top to place cubes in a grid
  const x = (index % colCount) * cubeWidth;
  const y = Math.floor(index / colCount) * cubeHeight;
  cube.style.left = x + 'px';
  cube.style.top = y + 'px';

  // Attach mousedown event to start dragging
  cube.addEventListener('mousedown', function (e) {
    selectedCube = this;

    // Calculate offset of mouse inside the cube
    const rect = this.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    container.classList.add('active');
  });
});

// Listen for mousemove on document to drag selected cube
document.addEventListener('mousemove', function (e) {
  if (!selectedCube) return;

  // Get container boundaries and position
  const containerRect = container.getBoundingClientRect();

  // Calculate new position relative to container
  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary check so cube doesn't go out of container
  newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - selectedCube.offsetWidth));
  newTop = Math.max(0, Math.min(newTop, container.clientHeight - selectedCube.offsetHeight));

  // Set new position
  selectedCube.style.left = newLeft + 'px';
  selectedCube.style.top = newTop + 'px';
});

// On mouseup, release the selected cube
document.addEventListener('mouseup', function () {
  if (selectedCube) {
    selectedCube = null;
    container.classList.remove('active');
  }
});
