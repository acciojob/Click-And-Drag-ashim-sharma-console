 document.addEventListener('DOMContentLoaded', function() {
            const container = document.getElementById('container');
            const cubes = document.querySelectorAll('.cube');
            
            // Variables to track dragging state
            let isDragging = false;
            let currentCube = null;
            let offsetX, offsetY;
            
            // Initialize cube positions in a grid
            function initializeCubes() {
                cubes.forEach((cube, index) => {
                    // Remove any existing inline styles
                    cube.style.position = 'absolute';
                    
                    // Calculate grid position
                    const row = Math.floor(index / 4);
                    const col = index % 4;
                    
                    // Calculate position based on grid
                    const cubeSize = (container.clientWidth - 50) / 4;
                    const posX = col * (cubeSize + 10) + 10;
                    const posY = row * (cubeSize + 10) + 10;
                    
                    // Set initial position
                    cube.style.left = posX + 'px';
                    cube.style.top = posY + 'px';
                    cube.style.width = cubeSize + 'px';
                    cube.style.height = cubeSize + 'px';
                });
            }
            
            // Set up event listeners for each cube
            cubes.forEach(cube => {
                cube.addEventListener('mousedown', startDrag);
            });
            
            function startDrag(e) {
                isDragging = true;
                currentCube = e.target;
                currentCube.classList.add('dragging');
                
                // Calculate offset between mouse position and cube position
                const rect = currentCube.getBoundingClientRect();
                offsetX = e.clientX - rect.left;
                offsetY = e.clientY - rect.top;
                
                // Prevent text selection during drag
                e.preventDefault();
            }
            
            function drag(e) {
                if (!isDragging || !currentCube) return;
                
                // Get container boundaries
                const containerRect = container.getBoundingClientRect();
                const cubeWidth = currentCube.offsetWidth;
                const cubeHeight = currentCube.offsetHeight;
                
                // Calculate new position
                let newX = e.clientX - containerRect.left - offsetX;
                let newY = e.clientY - containerRect.top - offsetY;
                
                // Apply boundary constraints
                newX = Math.max(0, Math.min(newX, containerRect.width - cubeWidth));
                newY = Math.max(0, Math.min(newY, containerRect.height - cubeHeight));
                
                // Update cube position
                currentCube.style.left = newX + 'px';
                currentCube.style.top = newY + 'px';
            }
            
            function stopDrag() {
                if (isDragging && currentCube) {
                    currentCube.classList.remove('dragging');
                }
                isDragging = false;
                currentCube = null;
            }
            
            // Add event listeners to document for smooth dragging
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            
            // Initialize the cubes
            initializeCubes();
            
            // Handle window resize
            window.addEventListener('resize', initializeCubes);
        });