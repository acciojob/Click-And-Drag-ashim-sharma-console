const container = document.querySelector('.container');
const cubes = document.querySelectorAll('.cube');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Arrange cubes in a grid initially
const gridSize = 100; // spacing with margin
cubes.forEach((cube, index) => {
  const cols = 2;
  const x = (index % cols) * gridSize + 10;
  const y = Math.floor(index / cols) * gridSize + 10;
  cube.style.left = `${x}px`;
  cube.style.top = `${y}px`;

  // Add mouse down event
  cube.addEventListener('mousedown', (e) => {
    selectedCube = cube;

    // calculate offset inside the cube where mouse is clicked
    offsetX = e.clientX - cube.offsetLeft - container.offsetLeft;
    offsetY = e.clientY - cube.offsetTop - container.offsetTop;

    // Bring selected cube on top
    cube.style.zIndex = 1000;
  });
});

// Mouse move for dragging
document.addEventListener('mousemove', (e) => {
  if (selectedCube) {
    const containerRect = container.getBoundingClientRect();
    let x = e.clientX - containerRect.left - offsetX;
    let y = e.clientY - containerRect.top - offsetY;

    // Boundary checks
    x = Math.max(0, Math.min(x, container.clientWidth - selectedCube.clientWidth));
    y = Math.max(0, Math.min(y, container.clientHeight - selectedCube.clientHeight));

    selectedCube.style.left = `${x}px`;
    selectedCube.style.top = `${y}px`;
  }
});

// Mouse up to drop
document.addEventListener('mouseup', () => {
  if (selectedCube) {
    selectedCube.style.zIndex = '';
    selectedCube = null;
  }
});
