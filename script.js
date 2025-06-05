 const container = document.getElementById('container');

    const numberOfCubes = 4; // Number of cubes to generate
    const cubes = []; // Store the created cubes

    for (let i = 0; i < numberOfCubes; i++) {
      const cube = document.createElement('div');
      cube.classList.add('cube');
      container.appendChild(cube);
      cubes.push(cube);
    }

    // Variables for drag functionality
    let selectedCube = null;
    let offsetX = 0;
    let offsetY = 0;

    // Set initial positions for the cubes
    const spacing = 100;
    cubes.forEach((cube, index) => {
      const col = index % 2;
      const row = Math.floor(index / 2);
      cube.style.left = `${10 + col * spacing}px`;
      cube.style.top = `${10 + row * spacing}px`;

      // Mouse down: start drag
      cube.addEventListener('mousedown', (e) => {
        selectedCube = cube;
        const rect = container.getBoundingClientRect();
        offsetX = e.clientX - rect.left - cube.offsetLeft;
        offsetY = e.clientY - rect.top - cube.offsetTop;
      });
    });

    // Mouse move: update cube position
    document.addEventListener('mousemove', (e) => {
      if (selectedCube) {
        const rect = container.getBoundingClientRect();
        let x = e.clientX - rect.left - offsetX;
        let y = e.clientY - rect.top - offsetY;

        // Keep within bounds
        const maxX = container.clientWidth - selectedCube.offsetWidth;
        const maxY = container.clientHeight - selectedCube.offsetHeight;

        x = Math.max(0, Math.min(x, maxX));
        y = Math.max(0, Math.min(y, maxY));

        selectedCube.style.left = `${x}px`;
        selectedCube.style.top = `${y}px`;
      }
    });

    // Mouse up: release drag
    document.addEventListener('mouseup', () => {
      if (selectedCube) {
        selectedCube = null;
      }
    });