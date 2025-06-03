// Your code here.
const container = document.querySelector('.items');
const cubes = document.querySelectorAll('.item');

let selectedCube = null;
let offsetX = 0;
let offsetY = 0;

// Container boundaries for dragging
const containerRect = container.getBoundingClientRect();

cubes.forEach(cube => {
  // Make cubes position absolute for free dragging inside container
  cube.style.position = 'absolute';

  // Initialize cubes in a grid layout inside container
  const index = [...cubes].indexOf(cube);
  const colCount = 9; // approx columns (based on CSS nth-child patterns)
  const cubeWidth = 200;
  const cubeHeight = container.clientHeight - 40; // from CSS height calc(100% - 40px)
  const margin = 0; // no margin needed, inline-flex already spaced

  let x = (index % colCount) * cubeWidth;
  let y = Math.floor(index / colCount) * cubeHeight;

  cube.style.left = x + 'px';
  cube.style.top = y + 'px';

  // Mouse down to start dragging
  cube.addEventListener('mousedown', e => {
    selectedCube = cube;

    // Calculate offset of mouse click inside the cube
    const rect = cube.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    // Add active class to container to change cursor, optional
    container.classList.add('active');
  });
});

document.addEventListener('mousemove', e => {
  if (!selectedCube) return;

  // Calculate new position relative to container
  const containerRect = container.getBoundingClientRect();

  let newLeft = e.clientX - containerRect.left - offsetX;
  let newTop = e.clientY - containerRect.top - offsetY;

  // Boundary constraints
  newLeft = Math.max(0, Math.min(newLeft, container.clientWidth - selectedCube.offsetWidth));
  newTop = Math.max(0, Math.min(newTop, container.clientHeight - selectedCube.offsetHeight));

  selectedCube.style.left = newLeft + 'px';
  selectedCube.style.top = newTop + 'px';
});

document.addEventListener('mouseup', e => {
  if (selectedCube) {
    selectedCube = null;
    container.classList.remove('active');
  }
});
