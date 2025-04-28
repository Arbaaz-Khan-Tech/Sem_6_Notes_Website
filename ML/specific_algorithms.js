// Theme toggle functionality
function setupThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
    }
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const icon = document.querySelector('.theme-toggle i');
    icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
}

// MCP Model Logic Gate Simulator
function setupGateSimulator() {
    const input1 = document.getElementById('input1');
    const input2 = document.getElementById('input2');
    const weight1 = document.getElementById('weight1');
    const weight2 = document.getElementById('weight2');
    const threshold = document.getElementById('threshold');
    const output = document.getElementById('output');

    function updateOutput() {
        const sum = (input1.checked ? parseFloat(weight1.value) : 0) +
                   (input2.checked ? parseFloat(weight2.value) : 0);
        output.textContent = sum >= parseFloat(threshold.value) ? '1' : '0';
    }

    input1.addEventListener('change', updateOutput);
    input2.addEventListener('change', updateOutput);
    weight1.addEventListener('input', updateOutput);
    weight2.addEventListener('input', updateOutput);
    threshold.addEventListener('input', updateOutput);
}

// Hebbian Learning Synapse Builder
function setupSynapseBuilder() {
    const neuron1 = document.getElementById('neuron1');
    const neuron2 = document.getElementById('neuron2');
    const connection = document.getElementById('connection');
    const learningRate = document.getElementById('learningRate');
    const activateBtn = document.getElementById('activateBtn');

    let connectionStrength = 0.5;

    function updateConnection() {
        connection.style.width = `${200 * connectionStrength}px`;
        connection.style.background = `rgba(74, 144, 226, ${connectionStrength})`;
    }

    activateBtn.addEventListener('click', () => {
        connectionStrength = Math.min(1, connectionStrength + parseFloat(learningRate.value) * 0.1);
        updateConnection();
    });

    updateConnection();
}

// SVM Visualization
function setupSVMVisualization() {
    const svmViz = document.getElementById('svm-viz');
    const kernelSelect = document.getElementById('kernelSelect');
    const addPointBtn = document.getElementById('addPointBtn');
    const clearBtn = document.getElementById('clearBtn');

    const width = svmViz.clientWidth;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(svmViz)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    const x = d3.scaleLinear()
        .domain([0, 1])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, 1])
        .range([height - margin.bottom, margin.top]);

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    let points = [];
    let currentClass = 1;

    function addPoint() {
        const point = {
            x: Math.random(),
            y: Math.random(),
            class: currentClass
        };
        points.push(point);
        currentClass = -currentClass;
        updateVisualization();
    }

    function clearPoints() {
        points = [];
        updateVisualization();
    }

    function updateVisualization() {
        // Clear previous points
        svg.selectAll('circle').remove();

        // Add points
        svg.selectAll('circle')
            .data(points)
            .enter()
            .append('circle')
            .attr('cx', d => x(d.x))
            .attr('cy', d => y(d.y))
            .attr('r', 4)
            .attr('fill', d => d.class === 1 ? '#4a90e2' : '#e74c3c')
            .attr('opacity', 0.6);

        // Add decision boundary (simplified)
        if (points.length > 0) {
            const kernel = kernelSelect.value;
            // In a real implementation, this would compute the actual SVM boundary
            // For now, we'll just draw a simple line
            svg.selectAll('line').remove();
            svg.append('line')
                .attr('x1', x(0))
                .attr('y1', y(0.5))
                .attr('x2', x(1))
                .attr('y2', y(0.5))
                .attr('stroke', '#2ecc71')
                .attr('stroke-width', 2)
                .attr('stroke-dasharray', '5,5');
        }
    }

    addPointBtn.addEventListener('click', addPoint);
    clearBtn.addEventListener('click', clearPoints);
    kernelSelect.addEventListener('change', updateVisualization);
}

// XOR Challenge
function setupXORChallenge() {
    const xorChallenge = document.getElementById('xor-challenge');
    // Implementation for XOR gate challenge
}

// SVM Challenge
function setupSVMChallenge() {
    const svmChallenge = document.getElementById('svm-challenge');
    // Implementation for SVM challenge
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupThemeToggle();
    setupGateSimulator();
    setupSynapseBuilder();
    setupSVMVisualization();
    setupXORChallenge();
    setupSVMChallenge();
}); 