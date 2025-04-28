// Sample data for demonstration
const sampleData = {
    iris: [
        [5.1, 3.5, 1.4, 0.2],
        [4.9, 3.0, 1.4, 0.2],
        [4.7, 3.2, 1.3, 0.2],
        // Add more iris data points
    ],
    labels: ['Setosa', 'Versicolor', 'Virginica']
};

// Initialize visualizations
document.addEventListener('DOMContentLoaded', () => {
    initializeVisualizations();
    setupEventListeners();
    createPCADiagram();
});

function initializeVisualizations() {
    // Initialize D3.js visualizations
    const rawDataViz = d3.select('#raw-data-viz');
    const pcaViz = d3.select('#pca-viz');

    // Set up dimensions
    const width = rawDataViz.node().getBoundingClientRect().width;
    const height = 300;

    // Create SVG containers
    rawDataViz.append('svg')
        .attr('width', width)
        .attr('height', height);

    pcaViz.append('svg')
        .attr('width', width)
        .attr('height', height);
}

function setupEventListeners() {
    // File upload handler
    const fileInput = document.getElementById('dataset-upload');
    fileInput.addEventListener('change', handleFileUpload);

    // Demo dataset button
    const demoBtn = document.querySelector('.demo-btn');
    demoBtn.addEventListener('click', loadDemoDataset);

    // PC slider
    const pcSlider = document.getElementById('pc-slider');
    pcSlider.addEventListener('input', updatePCAVisualization);

    setupShortcutCards();
    setupImportantNotes();
    setupThemeToggle();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const data = parseCSV(e.target.result);
            visualizeData(data);
        };
        reader.readAsText(file);
    }
}

function loadDemoDataset() {
    visualizeData(sampleData.iris);
}

function parseCSV(csv) {
    // Simple CSV parser
    return csv.split('\n')
        .map(row => row.split(',')
            .map(val => parseFloat(val)))
        .filter(row => row.length > 1);
}

function visualizeData(data) {
    // Visualize raw data
    visualizeRawData(data);
    
    // Perform PCA and visualize
    const pcaResult = performPCA(data);
    visualizePCA(pcaResult);
}

function visualizeRawData(data) {
    const svg = d3.select('#raw-data-viz svg');
    svg.selectAll('*').remove();

    // Create scatter plot
    const width = svg.node().getBoundingClientRect().width;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3.scaleLinear()
        .domain(d3.extent(data, d => d[0]))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain(d3.extent(data, d => d[1]))
        .range([height - margin.bottom, margin.top]);

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    // Add points
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d[0]))
        .attr('cy', d => y(d[1]))
        .attr('r', 4)
        .attr('fill', '#4a90e2')
        .attr('opacity', 0.6);
}

function performPCA(data) {
    // Simple PCA implementation
    // 1. Center the data
    const centered = centerData(data);
    
    // 2. Calculate covariance matrix
    const covMatrix = calculateCovarianceMatrix(centered);
    
    // 3. Get eigenvalues and eigenvectors
    const { eigenvalues, eigenvectors } = getEigenDecomposition(covMatrix);
    
    // 4. Project data onto principal components
    const projected = projectData(centered, eigenvectors);
    
    return {
        projected,
        eigenvalues,
        eigenvectors
    };
}

function centerData(data) {
    const means = data[0].map((_, i) => 
        data.reduce((sum, row) => sum + row[i], 0) / data.length
    );
    
    return data.map(row => 
        row.map((val, i) => val - means[i])
    );
}

function calculateCovarianceMatrix(data) {
    const n = data.length;
    const dim = data[0].length;
    const cov = Array(dim).fill().map(() => Array(dim).fill(0));
    
    for (let i = 0; i < dim; i++) {
        for (let j = 0; j < dim; j++) {
            cov[i][j] = data.reduce((sum, row) => 
                sum + row[i] * row[j], 0) / (n - 1);
        }
    }
    
    return cov;
}

function getEigenDecomposition(matrix) {
    // Simplified eigen decomposition
    // In practice, use a library like math.js
    return {
        eigenvalues: [1, 0.5], // Placeholder
        eigenvectors: [[1, 0], [0, 1]] // Placeholder
    };
}

function projectData(data, eigenvectors) {
    return data.map(row => 
        eigenvectors.map(eigenvector =>
            row.reduce((sum, val, i) => sum + val * eigenvector[i], 0)
        )
    );
}

function visualizePCA(pcaResult) {
    const svg = d3.select('#pca-viz svg');
    svg.selectAll('*').remove();

    const width = svg.node().getBoundingClientRect().width;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const x = d3.scaleLinear()
        .domain(d3.extent(pcaResult.projected, d => d[0]))
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain(d3.extent(pcaResult.projected, d => d[1]))
        .range([height - margin.bottom, margin.top]);

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    // Add points
    svg.selectAll('circle')
        .data(pcaResult.projected)
        .enter()
        .append('circle')
        .attr('cx', d => x(d[0]))
        .attr('cy', d => y(d[1]))
        .attr('r', 4)
        .attr('fill', '#e74c3c')
        .attr('opacity', 0.6);

    // Update variance explained
    updateVarianceExplained(pcaResult.eigenvalues);
}

function updateVarianceExplained(eigenvalues) {
    const totalVariance = eigenvalues.reduce((sum, val) => sum + val, 0);
    const varianceExplained = eigenvalues.map(val => 
        (val / totalVariance * 100).toFixed(1)
    );
    
    const varianceDiv = document.getElementById('variance-explained');
    varianceDiv.innerHTML = `
        <h4>Variance Explained:</h4>
        <p>PC1: ${varianceExplained[0]}%</p>
        <p>PC2: ${varianceExplained[1]}%</p>
    `;
}

function updatePCAVisualization() {
    const numPCs = document.getElementById('pc-slider').value;
    // Update visualization based on number of PCs
    // This would be implemented based on the actual PCA implementation
}

// Add PCA visualization diagram
function createPCADiagram() {
    const diagramContainer = document.querySelector('.pca-diagram');
    const width = diagramContainer.clientWidth;
    const height = 300;
    const margin = { top: 20, right: 20, bottom: 30, left: 40 };

    const svg = d3.select(diagramContainer)
        .append('svg')
        .attr('width', width)
        .attr('height', height);

    // Create sample data points
    const data = Array.from({ length: 50 }, () => [
        Math.random() * 100,
        Math.random() * 100
    ]);

    // Create scales
    const x = d3.scaleLinear()
        .domain([0, 100])
        .range([margin.left, width - margin.right]);

    const y = d3.scaleLinear()
        .domain([0, 100])
        .range([height - margin.bottom, margin.top]);

    // Add axes
    svg.append('g')
        .attr('transform', `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

    svg.append('g')
        .attr('transform', `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));

    // Add data points
    svg.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('cx', d => x(d[0]))
        .attr('cy', d => y(d[1]))
        .attr('r', 4)
        .attr('fill', '#4a90e2')
        .attr('opacity', 0.6);

    // Add principal components
    const pc1 = svg.append('line')
        .attr('x1', x(0))
        .attr('y1', y(0))
        .attr('x2', x(100))
        .attr('y2', y(100))
        .attr('stroke', '#e74c3c')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

    const pc2 = svg.append('line')
        .attr('x1', x(0))
        .attr('y1', y(100))
        .attr('x2', x(100))
        .attr('y2', y(0))
        .attr('stroke', '#2ecc71')
        .attr('stroke-width', 2)
        .attr('stroke-dasharray', '5,5');

    // Add labels
    svg.append('text')
        .attr('x', x(80))
        .attr('y', y(80))
        .text('PC1')
        .attr('fill', '#e74c3c')
        .attr('font-weight', 'bold');

    svg.append('text')
        .attr('x', x(80))
        .attr('y', y(20))
        .text('PC2')
        .attr('fill', '#2ecc71')
        .attr('font-weight', 'bold');
}

// Add hover effects for shortcut cards
function setupShortcutCards() {
    const cards = document.querySelectorAll('.shortcut-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'translateY(0)';
        });
    });
}

// Add click handler for important notes
function setupImportantNotes() {
    const notes = document.querySelector('.important-note');
    notes.addEventListener('click', () => {
        notes.style.transform = 'scale(1.02)';
        setTimeout(() => {
            notes.style.transform = 'scale(1)';
        }, 200);
    });
}

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