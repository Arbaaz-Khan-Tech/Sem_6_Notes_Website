document.addEventListener('DOMContentLoaded', () => {
    // Theme toggler
    const themeToggle = document.getElementById('themeToggle');
    const themeIcon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }

    // Theme toggle click handler
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    // Update theme icon based on current theme
    function updateThemeIcon(theme) {
        if (theme === 'dark') {
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        } else {
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        }
    }

    // Perceptron Visualization
    const perceptronCanvas = document.getElementById('perceptronCanvas');
    const perceptronCtx = perceptronCanvas.getContext('2d');
    let isAND = true;

    // Set canvas size
    function resizeCanvas(canvas) {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
    }

    resizeCanvas(perceptronCanvas);
    window.addEventListener('resize', () => resizeCanvas(perceptronCanvas));

    // Draw perceptron
    function drawPerceptron() {
        perceptronCtx.clearRect(0, 0, perceptronCanvas.width, perceptronCanvas.height);
        
        // Draw axes
        const padding = 40;
        const width = perceptronCanvas.width - 2 * padding;
        const height = perceptronCanvas.height - 2 * padding;
        
        perceptronCtx.beginPath();
        perceptronCtx.strokeStyle = '#666';
        perceptronCtx.moveTo(padding, padding);
        perceptronCtx.lineTo(padding, perceptronCanvas.height - padding);
        perceptronCtx.lineTo(perceptronCanvas.width - padding, perceptronCanvas.height - padding);
        perceptronCtx.stroke();
        
        // Draw data points
        const points = isAND ? [
            { x: 0, y: 0, label: 0 },
            { x: 0, y: 1, label: 0 },
            { x: 1, y: 0, label: 0 },
            { x: 1, y: 1, label: 1 }
        ] : [
            { x: 0, y: 0, label: 0 },
            { x: 0, y: 1, label: 1 },
            { x: 1, y: 0, label: 1 },
            { x: 1, y: 1, label: 1 }
        ];
        
        points.forEach(point => {
            perceptronCtx.beginPath();
            perceptronCtx.fillStyle = point.label === 1 ? '#2ecc71' : '#e74c3c';
            perceptronCtx.arc(
                padding + point.x * width,
                perceptronCanvas.height - padding - point.y * height,
                8, 0, 2 * Math.PI
            );
            perceptronCtx.fill();
        });
        
        // Draw decision boundary
        perceptronCtx.beginPath();
        perceptronCtx.strokeStyle = '#3498db';
        perceptronCtx.lineWidth = 2;
        perceptronCtx.moveTo(padding, perceptronCanvas.height - padding);
        perceptronCtx.lineTo(perceptronCanvas.width - padding, padding);
        perceptronCtx.stroke();
    }

    // Toggle AND/OR gate
    document.getElementById('toggleGate').addEventListener('click', () => {
        isAND = !isAND;
        drawPerceptron();
    });

    // Reset perceptron
    document.getElementById('resetPerceptron').addEventListener('click', () => {
        isAND = true;
        drawPerceptron();
    });

    // Initial draw
    drawPerceptron();

    // Backpropagation Visualization
    const backpropCanvas = document.getElementById('backpropCanvas');
    const backpropCtx = backpropCanvas.getContext('2d');
    let isForward = true;

    resizeCanvas(backpropCanvas);
    window.addEventListener('resize', () => resizeCanvas(backpropCanvas));

    // Draw neural network
    function drawNeuralNetwork() {
        backpropCtx.clearRect(0, 0, backpropCanvas.width, backpropCanvas.height);
        
        const padding = 40;
        const width = backpropCanvas.width - 2 * padding;
        const height = backpropCanvas.height - 2 * padding;
        
        // Draw input layer
        const inputNodes = 2;
        const hiddenNodes = 3;
        const outputNodes = 1;
        
        const nodeRadius = 15;
        const layerSpacing = width / 2;
        
        // Draw nodes
        for (let i = 0; i < inputNodes; i++) {
            backpropCtx.beginPath();
            backpropCtx.fillStyle = '#3498db';
            backpropCtx.arc(
                padding,
                padding + (height / (inputNodes + 1)) * (i + 1),
                nodeRadius, 0, 2 * Math.PI
            );
            backpropCtx.fill();
        }
        
        for (let i = 0; i < hiddenNodes; i++) {
            backpropCtx.beginPath();
            backpropCtx.fillStyle = '#2ecc71';
            backpropCtx.arc(
                padding + layerSpacing,
                padding + (height / (hiddenNodes + 1)) * (i + 1),
                nodeRadius, 0, 2 * Math.PI
            );
            backpropCtx.fill();
        }
        
        for (let i = 0; i < outputNodes; i++) {
            backpropCtx.beginPath();
            backpropCtx.fillStyle = '#e74c3c';
            backpropCtx.arc(
                padding + 2 * layerSpacing,
                padding + (height / (outputNodes + 1)) * (i + 1),
                nodeRadius, 0, 2 * Math.PI
            );
            backpropCtx.fill();
        }
        
        // Draw connections
        backpropCtx.strokeStyle = isForward ? '#3498db' : '#e74c3c';
        backpropCtx.lineWidth = 2;
        
        for (let i = 0; i < inputNodes; i++) {
            for (let j = 0; j < hiddenNodes; j++) {
                backpropCtx.beginPath();
                backpropCtx.moveTo(
                    padding + nodeRadius,
                    padding + (height / (inputNodes + 1)) * (i + 1)
                );
                backpropCtx.lineTo(
                    padding + layerSpacing - nodeRadius,
                    padding + (height / (hiddenNodes + 1)) * (j + 1)
                );
                backpropCtx.stroke();
            }
        }
        
        for (let i = 0; i < hiddenNodes; i++) {
            for (let j = 0; j < outputNodes; j++) {
                backpropCtx.beginPath();
                backpropCtx.moveTo(
                    padding + layerSpacing + nodeRadius,
                    padding + (height / (hiddenNodes + 1)) * (i + 1)
                );
                backpropCtx.lineTo(
                    padding + 2 * layerSpacing - nodeRadius,
                    padding + (height / (outputNodes + 1)) * (j + 1)
                );
                backpropCtx.stroke();
            }
        }
    }

    // Toggle forward/backward
    document.getElementById('toggleForwardBackward').addEventListener('click', () => {
        isForward = !isForward;
        drawNeuralNetwork();
    });

    // Reset backpropagation
    document.getElementById('resetBackprop').addEventListener('click', () => {
        isForward = true;
        drawNeuralNetwork();
    });

    // Initial draw
    drawNeuralNetwork();

    // Activation Functions Visualization
    const activationCanvas = document.getElementById('activationCanvas');
    const activationCtx = activationCanvas.getContext('2d');
    const activationSelect = document.getElementById('activationSelect');

    resizeCanvas(activationCanvas);
    window.addEventListener('resize', () => resizeCanvas(activationCanvas));

    // Draw activation function
    function drawActivationFunction() {
        activationCtx.clearRect(0, 0, activationCanvas.width, activationCanvas.height);
        
        const padding = 40;
        const width = activationCanvas.width - 2 * padding;
        const height = activationCanvas.height - 2 * padding;
        
        // Draw axes
        activationCtx.beginPath();
        activationCtx.strokeStyle = '#666';
        activationCtx.moveTo(padding, padding);
        activationCtx.lineTo(padding, activationCanvas.height - padding);
        activationCtx.lineTo(activationCanvas.width - padding, activationCanvas.height - padding);
        activationCtx.stroke();
        
        // Draw function
        activationCtx.beginPath();
        activationCtx.strokeStyle = '#3498db';
        activationCtx.lineWidth = 2;
        
        const functionType = activationSelect.value;
        const points = [];
        
        for (let x = -5; x <= 5; x += 0.1) {
            let y;
            switch (functionType) {
                case 'sigmoid':
                    y = 1 / (1 + Math.exp(-x));
                    break;
                case 'relu':
                    y = Math.max(0, x);
                    break;
                case 'tanh':
                    y = Math.tanh(x);
                    break;
            }
            
            points.push({
                x: padding + ((x + 5) / 10) * width,
                y: activationCanvas.height - padding - (y * height)
            });
        }
        
        activationCtx.moveTo(points[0].x, points[0].y);
        points.forEach(point => {
            activationCtx.lineTo(point.x, point.y);
        });
        activationCtx.stroke();
    }

    // Update activation function
    activationSelect.addEventListener('change', drawActivationFunction);

    // Initial draw
    drawActivationFunction();

    // Neural Network Playground
    const networkCanvas = document.getElementById('networkCanvas');
    const networkCtx = networkCanvas.getContext('2d');
    let numLayers = 2;
    let neuronsPerLayer = 3;

    resizeCanvas(networkCanvas);
    window.addEventListener('resize', () => resizeCanvas(networkCanvas));

    // Draw network
    function drawNetwork() {
        networkCtx.clearRect(0, 0, networkCanvas.width, networkCanvas.height);
        
        const padding = 40;
        const width = networkCanvas.width - 2 * padding;
        const height = networkCanvas.height - 2 * padding;
        
        const nodeRadius = 15;
        const layerSpacing = width / (numLayers + 1);
        
        // Draw layers
        for (let layer = 0; layer < numLayers; layer++) {
            const layerX = padding + layerSpacing * (layer + 1);
            
            for (let i = 0; i < neuronsPerLayer; i++) {
                networkCtx.beginPath();
                networkCtx.fillStyle = layer === 0 ? '#3498db' : '#2ecc71';
                networkCtx.arc(
                    layerX,
                    padding + (height / (neuronsPerLayer + 1)) * (i + 1),
                    nodeRadius, 0, 2 * Math.PI
                );
                networkCtx.fill();
            }
        }
        
        // Draw connections
        networkCtx.strokeStyle = '#666';
        networkCtx.lineWidth = 1;
        
        for (let layer = 0; layer < numLayers - 1; layer++) {
            const layerX1 = padding + layerSpacing * (layer + 1);
            const layerX2 = padding + layerSpacing * (layer + 2);
            
            for (let i = 0; i < neuronsPerLayer; i++) {
                for (let j = 0; j < neuronsPerLayer; j++) {
                    networkCtx.beginPath();
                    networkCtx.moveTo(
                        layerX1 + nodeRadius,
                        padding + (height / (neuronsPerLayer + 1)) * (i + 1)
                    );
                    networkCtx.lineTo(
                        layerX2 - nodeRadius,
                        padding + (height / (neuronsPerLayer + 1)) * (j + 1)
                    );
                    networkCtx.stroke();
                }
            }
        }
    }

    // Add layer
    document.getElementById('addLayer').addEventListener('click', () => {
        if (numLayers < 5) {
            numLayers++;
            drawNetwork();
        }
    });

    // Remove layer
    document.getElementById('removeLayer').addEventListener('click', () => {
        if (numLayers > 1) {
            numLayers--;
            drawNetwork();
        }
    });

    // Update neurons per layer
    document.getElementById('neuronsPerLayer').addEventListener('change', (e) => {
        neuronsPerLayer = parseInt(e.target.value);
        drawNetwork();
    });

    // Train network
    document.getElementById('trainNetwork').addEventListener('click', () => {
        const accuracy = Math.random() * 100;
        document.getElementById('accuracyValue').textContent = `${accuracy.toFixed(1)}%`;
    });

    // Reset network
    document.getElementById('resetNetwork').addEventListener('click', () => {
        numLayers = 2;
        neuronsPerLayer = 3;
        document.getElementById('neuronsPerLayer').value = 3;
        document.getElementById('accuracyValue').textContent = '0%';
        drawNetwork();
    });

    // Initial draw
    drawNetwork();

    // Points popup
    const pointsPopup = document.querySelector('.points-popup');
    const closePopup = document.querySelector('.close-popup');

    setTimeout(() => {
        pointsPopup.classList.add('show');
    }, 5000);

    closePopup.addEventListener('click', () => {
        pointsPopup.classList.remove('show');
    });
}); 