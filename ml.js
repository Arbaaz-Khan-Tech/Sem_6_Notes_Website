// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;
    const icon = themeToggle.querySelector('i');
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    }
    
    // Theme toggle event listener
    themeToggle.addEventListener('click', function() {
        if (body.getAttribute('data-theme') === 'dark') {
            body.removeAttribute('data-theme');
            icon.classList.remove('fa-sun');
            icon.classList.add('fa-moon');
            localStorage.setItem('theme', 'light');
        } else {
            body.setAttribute('data-theme', 'dark');
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
            localStorage.setItem('theme', 'dark');
        }
    });
    
    // Initialize Mermaid diagrams
    mermaid.initialize({
        startOnLoad: true,
        theme: body.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
        securityLevel: 'loose',
        flowchart: {
            useMaxWidth: true,
            htmlLabels: true
        }
    });
    
    // Algorithm Tabs Functionality
    const algorithmTabs = document.querySelectorAll('.algorithm-tab');
    const algorithmPanels = document.querySelectorAll('.algorithm-panel');
    
    algorithmTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const algorithm = this.getAttribute('data-algorithm');
            
            // Update active tab
            algorithmTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding panel
            algorithmPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('data-algorithm') === algorithm) {
                    panel.classList.add('active');
                }
            });
            
            // Initialize algorithm visualization
            if (algorithm === 'supervised') {
                initSVMVisualization();
            } else {
                initKMeansVisualization();
            }
        });
    });
    
    // Dataset Tabs Functionality
    const datasetTabs = document.querySelectorAll('.dataset-tab');
    const datasetPanels = document.querySelectorAll('.dataset-panel');
    
    datasetTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const dataset = this.getAttribute('data-dataset');
            
            // Update active tab
            datasetTabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Show corresponding panel
            datasetPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.getAttribute('data-dataset') === dataset) {
                    panel.classList.add('active');
                }
            });
            
            // Initialize dataset visualization
            if (dataset === 'iris') {
                initIrisVisualization();
            } else {
                initCustomerVisualization();
            }
        });
    });
    
    // Interactive Quiz Functionality
    const quizOptions = document.querySelectorAll('.quiz-option');
    const quizResult = document.querySelector('.quiz-result');
    const resultText = document.querySelector('.result-text');
    const tryAgainBtn = document.querySelector('.try-again-btn');
    
    const quizQuestions = [
        {
            question: "Grouping news articles by topic without predefined categories.",
            options: ["Supervised Learning", "Unsupervised Learning"],
            correct: 1
        },
        {
            question: "Predicting house prices based on features like size and location.",
            options: ["Supervised Learning", "Unsupervised Learning"],
            correct: 0
        },
        {
            question: "Identifying customer segments based on purchasing behavior.",
            options: ["Supervised Learning", "Unsupervised Learning"],
            correct: 1
        },
        {
            question: "Classifying emails as spam or not spam.",
            options: ["Supervised Learning", "Unsupervised Learning"],
            correct: 0
        }
    ];
    
    let currentQuestionIndex = 0;
    
    function loadQuestion(index) {
        const question = quizQuestions[index];
        document.querySelector('.quiz-question p').textContent = question.question;
        
        quizOptions.forEach((option, i) => {
            option.querySelector('.option-text').textContent = question.options[i];
            option.classList.remove('correct', 'incorrect');
            option.style.backgroundColor = '';
        });
        
        quizResult.style.display = 'none';
    }
    
    function showResult(isCorrect) {
        quizResult.style.display = 'block';
        resultText.textContent = isCorrect ? 
            "Correct! Well done!" : 
            "Not quite right. Try again!";
        resultText.style.color = isCorrect ? 
            getComputedStyle(document.documentElement).getPropertyValue('--quiz-correct') : 
            getComputedStyle(document.documentElement).getPropertyValue('--quiz-incorrect');
    }
    
    quizOptions.forEach((option, index) => {
        option.addEventListener('click', function() {
            const currentQuestion = quizQuestions[currentQuestionIndex];
            const isCorrect = index === currentQuestion.correct;
            
            // Highlight correct and incorrect answers
            quizOptions.forEach((opt, i) => {
                if (i === currentQuestion.correct) {
                    opt.classList.add('correct');
                    opt.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--quiz-correct');
                } else if (i === index && !isCorrect) {
                    opt.classList.add('incorrect');
                    opt.style.backgroundColor = getComputedStyle(document.documentElement).getPropertyValue('--quiz-incorrect');
                }
            });
            
            showResult(isCorrect);
        });
    });
    
    tryAgainBtn.addEventListener('click', function() {
        currentQuestionIndex = (currentQuestionIndex + 1) % quizQuestions.length;
        loadQuestion(currentQuestionIndex);
    });
    
    // Initialize first question
    loadQuestion(currentQuestionIndex);
    
    // Interactive Demo Functionality
    initTeacherDemo();
    initMagnifyingGlassDemo();
    
    // Initialize algorithm visualizations
    initSVMVisualization();
    initKMeansVisualization();
    
    // Initialize dataset visualizations
    initIrisVisualization();
    initCustomerVisualization();
});

// Teacher Demo Animation
function initTeacherDemo() {
    const dataItems = document.querySelectorAll('.teacher-demo .data-item');
    const modelOutput = document.querySelector('.teacher-demo .model-output');
    
    // Animate data flow
    dataItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(50px)';
            item.style.opacity = '0.7';
            
            // Update model output based on the data
            const animal = item.textContent.split(' ')[0];
            modelOutput.textContent = `Predicts: ${animal}`;
            
            // Reset after animation
            setTimeout(() => {
                item.style.transform = '';
                item.style.opacity = '';
            }, 1000);
        }, index * 1000);
    });
}

// Magnifying Glass Demo Animation
function initMagnifyingGlassDemo() {
    const dataItems = document.querySelectorAll('.magnifying-glass-demo .data-item');
    const modelOutput = document.querySelector('.magnifying-glass-demo .model-output');
    
    // Animate data flow
    dataItems.forEach((item, index) => {
        setTimeout(() => {
            item.style.transform = 'translateX(50px)';
            item.style.opacity = '0.7';
            
            // Update model output based on the data
            const color = item.textContent === '🔴' ? 'Red' : 'Blue';
            modelOutput.textContent = `Groups: ${color}`;
            
            // Reset after animation
            setTimeout(() => {
                item.style.transform = '';
                item.style.opacity = '';
            }, 1000);
        }, index * 1000);
    });
}

// SVM Visualization
function initSVMVisualization() {
    const svmPlot = document.querySelector('.svm-plot');
    if (!svmPlot) return;
    
    // Clear existing points
    const existingPoints = svmPlot.querySelectorAll('.plot-point');
    existingPoints.forEach(point => point.remove());
    
    // Create random data points
    const numPoints = 20;
    const points = [];
    
    for (let i = 0; i < numPoints; i++) {
        const x = Math.random() * 280 + 10;
        const y = Math.random() * 180 + 10;
        const isClass1 = y < 100 + Math.sin(x / 50) * 30;
        
        points.push({ x, y, isClass1 });
    }
    
    // Add points to the plot
    points.forEach(point => {
        const pointElement = document.createElement('div');
        pointElement.className = `plot-point ${point.isClass1 ? 'class1' : 'class2'}`;
        pointElement.style.left = `${point.x}px`;
        pointElement.style.top = `${point.y}px`;
        svmPlot.appendChild(pointElement);
    });
    
    // Add decision boundary
    const decisionBoundary = document.createElement('div');
    decisionBoundary.className = 'decision-boundary';
    svmPlot.appendChild(decisionBoundary);
    
    // Animate decision boundary
    decisionBoundary.style.width = '0%';
    decisionBoundary.style.transition = 'width 1.5s ease-in-out';
    
    setTimeout(() => {
        decisionBoundary.style.width = '100%';
    }, 500);
}

// K-Means Visualization
function initKMeansVisualization() {
    const kmeansPlot = document.querySelector('.kmeans-plot');
    if (!kmeansPlot) return;
    
    // Clear existing points
    const existingPoints = kmeansPlot.querySelectorAll('.cluster-point, .cluster-center');
    existingPoints.forEach(point => point.remove());
    
    // Create random data points
    const numPoints = 30;
    const points = [];
    
    // Generate two clusters
    for (let i = 0; i < numPoints; i++) {
        const isCluster1 = i < numPoints / 2;
        const centerX = isCluster1 ? 80 : 220;
        const centerY = isCluster1 ? 80 : 120;
        
        const x = centerX + (Math.random() - 0.5) * 60;
        const y = centerY + (Math.random() - 0.5) * 60;
        
        points.push({ x, y, isCluster1 });
    }
    
    // Add points to the plot
    points.forEach(point => {
        const pointElement = document.createElement('div');
        pointElement.className = `cluster-point ${point.isCluster1 ? 'cluster1' : 'cluster2'}`;
        pointElement.style.left = `${point.x}px`;
        pointElement.style.top = `${point.y}px`;
        kmeansPlot.appendChild(pointElement);
    });
    
    // Add cluster centers
    const center1 = document.createElement('div');
    center1.className = 'cluster-center center1';
    kmeansPlot.appendChild(center1);
    
    const center2 = document.createElement('div');
    center2.className = 'cluster-center center2';
    kmeansPlot.appendChild(center2);
    
    // Animate cluster centers
    center1.style.opacity = '0';
    center2.style.opacity = '0';
    
    setTimeout(() => {
        center1.style.opacity = '1';
        center2.style.opacity = '1';
    }, 1000);
}

// Iris Dataset Visualization
function initIrisVisualization() {
    const irisFlowers = document.querySelectorAll('.iris-flower');
    
    irisFlowers.forEach(flower => {
        // Add hover effect to show flower image
        flower.addEventListener('mouseenter', function() {
            const type = this.classList.contains('setosa') ? 'setosa' : 
                         this.classList.contains('versicolor') ? 'versicolor' : 'virginica';
            
            const tooltip = document.createElement('div');
            tooltip.className = 'flower-tooltip';
            tooltip.innerHTML = `
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Kosaciec_szczecinkowaty_Iris_setosa.jpg/220px-Kosaciec_szczecinkowaty_Iris_setosa.jpg" alt="${type} iris">
                <p>${type.charAt(0).toUpperCase() + type.slice(1)} Iris</p>
            `;
            
            this.appendChild(tooltip);
        });
        
        flower.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.flower-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Customer Dataset Visualization
function initCustomerVisualization() {
    const customerSegments = document.querySelectorAll('.customer-segment');
    
    customerSegments.forEach(segment => {
        // Add hover effect to show segment details
        segment.addEventListener('mouseenter', function() {
            const segmentType = this.textContent;
            
            const tooltip = document.createElement('div');
            tooltip.className = 'segment-tooltip';
            
            let details = '';
            if (segmentType === 'Budget Shoppers') {
                details = 'Frequently purchases sale items and basic products';
            } else if (segmentType === 'Luxury Buyers') {
                details = 'Prefers premium brands and makes large purchases';
            } else {
                details = 'Buys occasionally with no clear pattern';
            }
            
            tooltip.innerHTML = `<p>${details}</p>`;
            this.appendChild(tooltip);
        });
        
        segment.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.segment-tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });
}

// Add CSS for tooltips
const style = document.createElement('style');
style.textContent = `
    .flower-tooltip, .segment-tooltip {
        position: absolute;
        background-color: var(--card-bg);
        border-radius: 8px;
        padding: 10px;
        box-shadow: 0 5px 15px var(--card-shadow);
        z-index: 100;
        width: 200px;
        text-align: center;
        top: -220px;
        left: 50%;
        transform: translateX(-50%);
    }
    
    .flower-tooltip img {
        width: 100%;
        border-radius: 4px;
        margin-bottom: 8px;
    }
    
    .flower-tooltip p, .segment-tooltip p {
        margin: 0;
        font-size: 0.9rem;
    }
    
    .iris-flower, .customer-segment {
        position: relative;
    }
    
    .quiz-option.correct {
        background-color: var(--quiz-correct) !important;
        color: white;
    }
    
    .quiz-option.incorrect {
        background-color: var(--quiz-incorrect) !important;
        color: white;
    }
`;
document.head.appendChild(style);

// Linear Regression and Regularization Section
document.addEventListener('DOMContentLoaded', () => {
    // Ridge vs. Lasso Tabs
    const regTabs = document.querySelectorAll('.reg-tab');
    const regPanels = document.querySelectorAll('.reg-panel');
    
    regTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and panels
            regTabs.forEach(t => t.classList.remove('active'));
            regPanels.forEach(p => p.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding panel
            tab.classList.add('active');
            const panel = document.querySelector(`.reg-panel[data-reg="${tab.dataset.reg}"]`);
            panel.classList.add('active');
        });
    });
    
    // Lambda Slider
    const lambdaSlider = document.getElementById('lambda');
    const lambdaValue = document.querySelector('.lambda-value');
    const plotBefore = document.querySelector('.plot-before');
    const plotAfter = document.querySelector('.plot-after');
    
    if (lambdaSlider && lambdaValue) {
        lambdaSlider.addEventListener('input', () => {
            const value = lambdaSlider.value;
            lambdaValue.textContent = value;
            
            // Update plots based on lambda value
            updatePlots(value);
        });
    }
    
    function updatePlots(lambda) {
        // Simulate coefficient shrinkage
        const beforeCoeffs = [0.8, 0.6, 0.4, 0.2];
        const afterCoeffs = beforeCoeffs.map(coeff => {
            // Ridge: gradual shrinkage
            const ridgeCoeff = coeff / (1 + lambda);
            // Lasso: sharp shrinkage
            const lassoCoeff = Math.max(0, coeff - lambda);
            return { ridge: ridgeCoeff, lasso: lassoCoeff };
        });
        
        // Update visual representation
        updatePlotVisualization(plotBefore, beforeCoeffs);
        updatePlotVisualization(plotAfter, afterCoeffs);
    }
    
    function updatePlotVisualization(plot, coefficients) {
        // Clear existing content
        plot.innerHTML = '';
        
        // Create bars for each coefficient
        coefficients.forEach((coeff, index) => {
            const bar = document.createElement('div');
            bar.className = 'coeff-bar';
            bar.style.height = `${coeff * 100}%`;
            bar.style.left = `${(index / coefficients.length) * 100}%`;
            plot.appendChild(bar);
        });
    }
    
    // Quiz Functionality
    const quizOptions = document.querySelectorAll('.regression-quiz .quiz-option');
    const resultText = document.querySelector('.regression-quiz .result-text');
    const tryAgainBtn = document.querySelector('.regression-quiz .try-again-btn');
    
    if (quizOptions.length > 0) {
        quizOptions.forEach(option => {
            option.addEventListener('click', () => {
                const isCorrect = option.dataset.option === 'lasso';
                
                // Show result
                resultText.textContent = isCorrect 
                    ? 'Correct! Lasso is ideal for feature selection when you suspect only a few features matter.'
                    : 'Not quite. Lasso would be better here as it can force coefficients to exactly zero.';
                resultText.style.color = isCorrect ? 'var(--success-color)' : 'var(--error-color)';
                
                // Disable options
                quizOptions.forEach(opt => opt.style.pointerEvents = 'none');
            });
        });
    }
    
    if (tryAgainBtn) {
        tryAgainBtn.addEventListener('click', () => {
            // Reset quiz
            resultText.textContent = '';
            quizOptions.forEach(opt => {
                opt.style.pointerEvents = 'auto';
                opt.style.backgroundColor = '';
                opt.style.color = '';
            });
        });
    }
    
    // Initialize plots
    updatePlots(0);
});

// Enhanced Linear Regression Interactivity
document.addEventListener('DOMContentLoaded', () => {
    // Equation Box Interactivity
    const plotContainer = document.querySelector('.plot-container');
    const addPointBtn = document.querySelector('.add-point-btn');
    const resetPointsBtn = document.querySelector('.reset-points-btn');
    const dataPoints = document.querySelector('.data-points');
    const regressionLine = document.querySelector('.regression-line');
    
    if (plotContainer && addPointBtn && resetPointsBtn) {
        // Add random point
        addPointBtn.addEventListener('click', () => {
            const x = Math.random() * 0.8 + 0.1;
            const y = Math.random() * 0.8 + 0.1;
            
            const point = document.createElement('div');
            point.className = 'point';
            point.setAttribute('data-x', x);
            point.setAttribute('data-y', y);
            point.style.left = `${x * 100}%`;
            point.style.top = `${y * 100}%`;
            
            dataPoints.appendChild(point);
            updateRegressionLine();
        });
        
        // Reset points
        resetPointsBtn.addEventListener('click', () => {
            dataPoints.innerHTML = '';
            updateRegressionLine();
        });
        
        // Update regression line
        function updateRegressionLine() {
            const points = Array.from(dataPoints.children);
            if (points.length < 2) {
                regressionLine.style.display = 'none';
                return;
            }
            
            regressionLine.style.display = 'block';
            // Simple linear regression calculation
            const xValues = points.map(p => parseFloat(p.getAttribute('data-x')));
            const yValues = points.map(p => parseFloat(p.getAttribute('data-y')));
            
            const n = points.length;
            const sumX = xValues.reduce((a, b) => a + b, 0);
            const sumY = yValues.reduce((a, b) => a + b, 0);
            const sumXY = xValues.reduce((a, b, i) => a + b * yValues[i], 0);
            const sumXX = xValues.reduce((a, b) => a + b * b, 0);
            
            const slope = (n * sumXY - sumX * sumY) / (n * sumXX - sumX * sumX);
            const intercept = (sumY - slope * sumX) / n;
            
            // Update line position and rotation
            regressionLine.style.transform = `rotate(${Math.atan(slope) * (180 / Math.PI)}deg)`;
            regressionLine.style.top = `${intercept * 100}%`;
        }
    }
    
    // Coefficient Plot Interactivity
    const coeffPoints = document.querySelectorAll('.coeff-point');
    const ridgeCurve = document.querySelector('.ridge-curve');
    const lassoCurve = document.querySelector('.lasso-curve');
    
    if (coeffPoints.length > 0) {
        coeffPoints.forEach(point => {
            point.addEventListener('mouseenter', () => {
                const coeff = parseFloat(point.getAttribute('data-coeff'));
                updateCurves(coeff);
            });
            
            point.addEventListener('mouseleave', () => {
                resetCurves();
            });
        });
    }
    
    function updateCurves(coeff) {
        if (ridgeCurve) {
            ridgeCurve.style.opacity = '0.6';
            ridgeCurve.style.transform = `scaleY(${coeff})`;
        }
        if (lassoCurve) {
            lassoCurve.style.opacity = '0.6';
            lassoCurve.style.transform = `scaleY(${coeff})`;
        }
    }
    
    function resetCurves() {
        if (ridgeCurve) {
            ridgeCurve.style.opacity = '0.3';
            ridgeCurve.style.transform = 'scaleY(1)';
        }
        if (lassoCurve) {
            lassoCurve.style.opacity = '0.3';
            lassoCurve.style.transform = 'scaleY(1)';
        }
    }
    
    // House Pricing Analogy Interactivity
    const sizeSlider = document.querySelector('.size-slider');
    const sizeValue = document.querySelector('.size-value');
    const predictedPrice = document.querySelector('.predicted-price');
    
    if (sizeSlider && sizeValue && predictedPrice) {
        sizeSlider.addEventListener('input', () => {
            const size = parseInt(sizeSlider.value);
            sizeValue.textContent = size;
            
            // Simple price prediction based on size
            const price = Math.round(size * 150 + 100000);
            predictedPrice.textContent = `$${price.toLocaleString()}`;
        });
    }
    
    // Feature Selection Interactivity
    const featureCheckboxes = document.querySelectorAll('.feature-selector input[type="checkbox"]');
    const activeFeatures = document.querySelector('.active-features');
    
    if (featureCheckboxes.length > 0 && activeFeatures) {
        featureCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
                const activeCount = Array.from(featureCheckboxes).filter(cb => cb.checked).length;
                activeFeatures.textContent = activeCount;
                
                // Update price prediction based on active features
                if (predictedPrice) {
                    const basePrice = parseInt(sizeSlider.value) * 150;
                    const featureMultiplier = activeCount / 3;
                    const newPrice = Math.round(basePrice * featureMultiplier + 100000);
                    predictedPrice.textContent = `$${newPrice.toLocaleString()}`;
                }
            });
        });
    }
    
    // Factor Weights Interactivity
    const weightBars = document.querySelectorAll('.weight-bar');
    
    if (weightBars.length > 0) {
        weightBars.forEach(bar => {
            bar.addEventListener('mouseenter', () => {
                bar.style.width = '80%';
            });
            
            bar.addEventListener('mouseleave', () => {
                bar.style.width = bar.getAttribute('data-original-width') || '60%';
            });
        });
    }
});

// Perceptron Models and Logic Gates Section
document.addEventListener('DOMContentLoaded', () => {
    // Interactive Perceptron Demo
    const weightSliders = document.querySelectorAll('.weight-slider');
    const biasSlider = document.querySelector('.bias-slider');
    const weightValues = document.querySelectorAll('.weight-value');
    const biasValue = document.querySelector('.bias-value');
    const decisionLine = document.querySelector('.decision-line');
    const dataPoints = document.querySelectorAll('.data-point');
    const gateButtons = document.querySelectorAll('.gate-btn');
    
    // Gate configurations
    const gateConfigs = {
        and: {
            weights: [1, 1],
            bias: -1.5,
            outputs: [0, 0, 0, 1]
        },
        or: {
            weights: [1, 1],
            bias: -0.5,
            outputs: [0, 1, 1, 1]
        },
        xor: {
            weights: [1, 1],
            bias: -0.5,
            outputs: [0, 1, 1, 0]
        }
    };
    
    let currentGate = 'and';
    
    // Update decision boundary
    function updateDecisionBoundary() {
        const w1 = parseFloat(weightSliders[0].value);
        const w2 = parseFloat(weightSliders[1].value);
        const b = parseFloat(biasSlider.value);
        
        // Calculate line parameters
        const slope = -w1 / w2;
        const intercept = -b / w2;
        
        // Update line position and rotation
        decisionLine.style.transform = `rotate(${Math.atan(slope) * (180 / Math.PI)}deg)`;
        decisionLine.style.top = `${intercept * 100}%`;
        
        // Update point colors based on classification
        dataPoints.forEach((point, index) => {
            const x = parseFloat(point.getAttribute('data-x'));
            const y = parseFloat(point.getAttribute('data-y'));
            const output = w1 * x + w2 * y + b >= 0 ? 1 : 0;
            
            point.style.backgroundColor = output === 1 ? 
                'var(--supervised-color)' : 'var(--unsupervised-color)';
        });
    }
    
    // Initialize sliders
    weightSliders.forEach((slider, index) => {
        slider.addEventListener('input', () => {
            weightValues[index].textContent = slider.value;
            updateDecisionBoundary();
        });
    });
    
    if (biasSlider) {
        biasSlider.addEventListener('input', () => {
            biasValue.textContent = biasSlider.value;
            updateDecisionBoundary();
        });
    }
    
    // Gate selection
    gateButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            gateButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current gate
            currentGate = button.dataset.gate;
            const config = gateConfigs[currentGate];
            
            // Update sliders
            weightSliders[0].value = config.weights[0];
            weightSliders[1].value = config.weights[1];
            biasSlider.value = config.bias;
            
            // Update values
            weightValues[0].textContent = config.weights[0];
            weightValues[1].textContent = config.weights[1];
            biasValue.textContent = config.bias;
            
            // Update decision boundary
            updateDecisionBoundary();
        });
    });
    
    // Train Your Perceptron Game
    const resetBtn = document.querySelector('.reset-btn');
    const checkBtn = document.querySelector('.check-btn');
    const gameFeedback = document.querySelector('.game-feedback');
    const attemptsValue = document.querySelector('.stat-value:first-child');
    const bestScoreValue = document.querySelector('.stat-value:last-child');
    
    let attempts = 0;
    let bestScore = 0;
    
    if (resetBtn && checkBtn) {
        resetBtn.addEventListener('click', () => {
            // Reset sliders to random values
            weightSliders.forEach(slider => {
                slider.value = (Math.random() * 4 - 2).toFixed(1);
            });
            biasSlider.value = (Math.random() * 4 - 2).toFixed(1);
            
            // Update values
            weightValues.forEach((value, index) => {
                value.textContent = weightSliders[index].value;
            });
            biasValue.textContent = biasSlider.value;
            
            // Update decision boundary
            updateDecisionBoundary();
            
            // Hide feedback
            gameFeedback.style.display = 'none';
        });
        
        checkBtn.addEventListener('click', () => {
            attempts++;
            attemptsValue.textContent = attempts;
            
            // Calculate score
            const config = gateConfigs[currentGate];
            const w1 = parseFloat(weightSliders[0].value);
            const w2 = parseFloat(weightSliders[1].value);
            const b = parseFloat(biasSlider.value);
            
            let correct = 0;
            dataPoints.forEach((point, index) => {
                const x = parseFloat(point.getAttribute('data-x'));
                const y = parseFloat(point.getAttribute('data-y'));
                const output = w1 * x + w2 * y + b >= 0 ? 1 : 0;
                
                if (output === config.outputs[index]) {
                    correct++;
                }
            });
            
            const score = (correct / 4) * 100;
            
            // Update best score
            if (score > bestScore) {
                bestScore = score;
                bestScoreValue.textContent = `${bestScore}%`;
            }
            
            // Show feedback
            gameFeedback.style.display = 'block';
            gameFeedback.textContent = score === 100 ? 
                'Perfect! You found the correct weights and bias!' :
                `Score: ${score}%. Try adjusting the weights and bias.`;
            gameFeedback.style.backgroundColor = score === 100 ? 
                'var(--quiz-correct)' : 'var(--quiz-incorrect)';
            gameFeedback.style.color = 'white';
        });
    }
    
    // Initialize with AND gate
    const andButton = document.querySelector('.gate-btn[data-gate="and"]');
    if (andButton) {
        andButton.click();
    }
});

// Enhanced Perceptron Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Add connection lines between neurons
    function drawConnections() {
        const neuralNetwork = document.querySelector('.neural-network');
        if (!neuralNetwork) return;

        const layers = neuralNetwork.querySelectorAll('.layer');
        const connections = document.createElement('div');
        connections.className = 'neuron-connections';
        neuralNetwork.appendChild(connections);

        // Draw connections between layers
        for (let i = 0; i < layers.length - 1; i++) {
            const currentLayer = layers[i];
            const nextLayer = layers[i + 1];
            const currentNeurons = currentLayer.querySelectorAll('.neuron');
            const nextNeurons = nextLayer.querySelectorAll('.neuron');

            currentNeurons.forEach(currentNeuron => {
                nextNeurons.forEach(nextNeuron => {
                    const line = document.createElement('div');
                    line.className = 'connection-line';
                    connections.appendChild(line);

                    // Position the line
                    const currentRect = currentNeuron.getBoundingClientRect();
                    const nextRect = nextNeuron.getBoundingClientRect();
                    const networkRect = neuralNetwork.getBoundingClientRect();

                    const startX = currentRect.right - networkRect.left;
                    const startY = currentRect.top + currentRect.height/2 - networkRect.top;
                    const endX = nextRect.left - networkRect.left;
                    const endY = nextRect.top + nextRect.height/2 - networkRect.top;

                    const length = Math.sqrt(Math.pow(endX - startX, 2) + Math.pow(endY - startY, 2));
                    const angle = Math.atan2(endY - startY, endX - startX) * 180 / Math.PI;

                    line.style.width = `${length}px`;
                    line.style.left = `${startX}px`;
                    line.style.top = `${startY}px`;
                    line.style.transform = `rotate(${angle}deg)`;
                });
            });
        }
    }

    // Add weight visualization
    function updateWeightVisualization() {
        const weightSliders = document.querySelectorAll('.weight-slider');
        const biasSlider = document.querySelector('.bias-slider');
        const connectionLines = document.querySelectorAll('.connection-line');

        weightSliders.forEach((slider, index) => {
            const value = parseFloat(slider.value);
            const color = value > 0 ? 
                `rgba(74, 108, 247, ${Math.abs(value)})` : 
                `rgba(255, 159, 67, ${Math.abs(value)})`;
            
            connectionLines[index].style.backgroundColor = color;
            connectionLines[index].style.width = `${Math.abs(value) * 2}px`;
        });

        // Update bias visualization
        const biasValue = parseFloat(biasSlider.value);
        const biasColor = biasValue > 0 ? 
            `rgba(74, 108, 247, ${Math.abs(biasValue)})` : 
            `rgba(255, 159, 67, ${Math.abs(biasValue)})`;
        
        document.querySelector('.bias-indicator').style.backgroundColor = biasColor;
    }

    // Add decision boundary animation
    function animateDecisionBoundary() {
        const decisionLine = document.querySelector('.decision-line');
        if (!decisionLine) return;

        decisionLine.style.transition = 'transform 0.5s ease-in-out';
        decisionLine.style.transform = 'scaleX(0)';
        
        setTimeout(() => {
            decisionLine.style.transform = 'scaleX(1)';
        }, 100);
    }

    // Add XOR problem visualization
    function visualizeXORProblem() {
        const xorPlot = document.querySelector('.xor-plot .plot-area');
        if (!xorPlot) return;

        // Add curved decision boundary
        const curve = document.createElement('div');
        curve.className = 'xor-curve';
        xorPlot.appendChild(curve);

        // Animate the curve
        curve.style.transition = 'all 1s ease-in-out';
        curve.style.transform = 'scaleX(0)';
        
        setTimeout(() => {
            curve.style.transform = 'scaleX(1)';
        }, 500);
    }

    // Initialize enhanced features
    drawConnections();
    updateWeightVisualization();
    animateDecisionBoundary();
    visualizeXORProblem();

    // Add event listeners for weight updates
    const weightSliders = document.querySelectorAll('.weight-slider');
    const biasSlider = document.querySelector('.bias-slider');

    weightSliders.forEach(slider => {
        slider.addEventListener('input', () => {
            updateWeightVisualization();
            animateDecisionBoundary();
        });
    });

    biasSlider.addEventListener('input', () => {
        updateWeightVisualization();
        animateDecisionBoundary();
    });
});

// Backpropagation Section
document.addEventListener('DOMContentLoaded', () => {
    // Live Gradient Calculation
    const inputSlider = document.querySelector('.input-slider[data-input="x"]');
    const weightSlider = document.querySelector('.weight-slider[data-weight="w"]');
    const lrSlider = document.querySelector('.lr-slider');
    const gradientValue = document.querySelector('.gradient-value .value');
    const lossValue = document.querySelector('.loss-value .value');
    const heatmapCells = document.querySelectorAll('.heatmap-cell');
    
    function updateGradientCalculation() {
        const x = parseFloat(inputSlider.value);
        const w = parseFloat(weightSlider.value);
        const lr = parseFloat(lrSlider.value);
        
        // Simple gradient calculation
        const gradient = 2 * x * (w * x - 1);
        const loss = Math.pow(w * x - 1, 2);
        
        // Update displays
        gradientValue.textContent = gradient.toFixed(2);
        lossValue.textContent = loss.toFixed(2);
        
        // Update heatmap
        heatmapCells.forEach((cell, index) => {
            const cellGradient = gradient * (1 - index * 0.2);
            const intensity = Math.min(Math.abs(cellGradient), 1);
            cell.style.opacity = intensity;
            cell.style.backgroundColor = cellGradient > 0 ? 
                'var(--accent-color)' : 'var(--unsupervised-color)';
        });
    }
    
    if (inputSlider && weightSlider && lrSlider) {
        [inputSlider, weightSlider, lrSlider].forEach(slider => {
            slider.addEventListener('input', updateGradientCalculation);
        });
    }
    
    // Break the Network Game
    const resetBtn = document.querySelector('.break-network-game .reset-btn');
    const trainBtn = document.querySelector('.break-network-game .train-btn');
    const lossPlot = document.querySelector('.loss-plot');
    const plotLine = document.querySelector('.loss-plot .plot-line');
    const plotPoints = document.querySelector('.loss-plot .plot-points');
    const weightSliders = document.querySelectorAll('.break-network-game .weight-slider');
    
    let isTraining = false;
    let trainingInterval;
    let currentLoss = 0;
    let points = [];
    
    function resetGame() {
        isTraining = false;
        clearInterval(trainingInterval);
        currentLoss = 0;
        points = [];
        plotPoints.innerHTML = '';
        plotLine.style.transform = 'translateY(0)';
        
        weightSliders.forEach(slider => {
            slider.value = 1;
        });
    }
    
    function trainNetwork() {
        if (isTraining) return;
        isTraining = true;
        
        const w1 = parseFloat(weightSliders[0].value);
        const w2 = parseFloat(weightSliders[1].value);
        
        trainingInterval = setInterval(() => {
            // Simulate training
            currentLoss = Math.pow(w1 * w2 - 1, 2);
            points.push(currentLoss);
            
            // Update plot
            const maxPoints = 50;
            if (points.length > maxPoints) {
                points.shift();
            }
            
            plotPoints.innerHTML = '';
            points.forEach((point, index) => {
                const pointElement = document.createElement('div');
                pointElement.className = 'plot-point';
                pointElement.style.left = `${(index / maxPoints) * 100}%`;
                pointElement.style.top = `${(1 - point) * 100}%`;
                plotPoints.appendChild(pointElement);
            });
            
            // Stop if loss is small enough
            if (currentLoss < 0.01) {
                clearInterval(trainingInterval);
                isTraining = false;
            }
        }, 100);
    }
    
    if (resetBtn && trainBtn) {
        resetBtn.addEventListener('click', resetGame);
        trainBtn.addEventListener('click', trainNetwork);
    }
    
    // Optimizer Comparison
    const optimizerTabs = document.querySelectorAll('.optimizer-tab');
    const convergencePlot = document.querySelector('.convergence-plot');
    const sgdLine = document.querySelector('.plot-line.sgd');
    const adamLine = document.querySelector('.plot-line.adam');
    const iterationsValue = document.querySelector('.optimizer-stats .stat-value:first-child');
    const finalLossValue = document.querySelector('.optimizer-stats .stat-value:last-child');
    
    let currentOptimizer = 'sgd';
    let iterations = 0;
    let finalLoss = 0;
    
    function updateOptimizerVisualization() {
        // Simulate optimization
        const learningRate = 0.1;
        const momentum = 0.9;
        let velocity = 0;
        let position = 1;
        
        const points = [];
        for (let i = 0; i < 100; i++) {
            const gradient = 2 * position;
            
            if (currentOptimizer === 'sgd') {
                position -= learningRate * gradient;
            } else {
                velocity = momentum * velocity - learningRate * gradient;
                position += velocity;
            }
            
            points.push(Math.pow(position, 2));
        }
        
        // Update plot
        const line = currentOptimizer === 'sgd' ? sgdLine : adamLine;
        line.style.clipPath = `polygon(0 100%, ${points.map((p, i) => 
            `${i}% ${(1 - p) * 100}%`
        ).join(', ')}, 100% 100%)`;
        
        // Update stats
        iterations = 100;
        finalLoss = points[points.length - 1];
        iterationsValue.textContent = iterations;
        finalLossValue.textContent = finalLoss.toFixed(4);
    }
    
    optimizerTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            optimizerTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentOptimizer = tab.dataset.optimizer;
            updateOptimizerVisualization();
        });
    });
    
    // Initialize
    updateGradientCalculation();
    updateOptimizerVisualization();
});

// Activation Functions Section
document.addEventListener('DOMContentLoaded', () => {
    // Function Tabs
    const functionTabs = document.querySelectorAll('.function-tab');
    const functionPlots = document.querySelectorAll('.function-plot');
    const gradientOverlay = document.querySelector('.gradient-overlay');
    const deadNeuronHighlight = document.querySelector('.dead-neuron-highlight');
    
    functionTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs
            functionTabs.forEach(t => t.classList.remove('active'));
            
            // Add active class to clicked tab
            tab.classList.add('active');
            
            // Update plot based on selected function
            const functionType = tab.dataset.function;
            updatePlot(functionType);
        });
    });
    
    // Show Gradient and Dead Neurons
    const showGradient = document.getElementById('showGradient');
    const showDeadNeurons = document.getElementById('showDeadNeurons');
    
    if (showGradient && gradientOverlay) {
        showGradient.addEventListener('change', () => {
            gradientOverlay.classList.toggle('active', showGradient.checked);
        });
    }
    
    if (showDeadNeurons && deadNeuronHighlight) {
        showDeadNeurons.addEventListener('change', () => {
            deadNeuronHighlight.classList.toggle('active', showDeadNeurons.checked);
        });
    }
    
    // Function to update plot
    function updatePlot(functionType) {
        const plot = document.querySelector('.function-plot');
        if (!plot) return;
        
        // Clear existing plot
        plot.style.background = 'none';
        
        // Set new plot based on function type
        switch (functionType) {
            case 'binary':
                plot.style.background = 'linear-gradient(to right, transparent, var(--supervised-color))';
                break;
            case 'bipolar':
                plot.style.background = 'linear-gradient(to right, transparent, var(--unsupervised-color))';
                break;
            case 'relu':
                plot.style.background = 'linear-gradient(to right, transparent, var(--accent-color))';
                break;
        }
    }
    
    // Break the Network Challenge
    const startBtn = document.querySelector('.break-network-challenge .start-btn');
    const resetBtn = document.querySelector('.break-network-challenge .reset-btn');
    const neurons = document.querySelectorAll('.neuron');
    const epochValue = document.querySelector('.training-stats .stat-value:first-child');
    const lossValue = document.querySelector('.training-stats .stat-value:last-child');
    
    let isTraining = false;
    let epoch = 0;
    let loss = 1.0;
    
    if (startBtn && resetBtn) {
        startBtn.addEventListener('click', () => {
            if (!isTraining) {
                isTraining = true;
                startTraining();
            }
        });
        
        resetBtn.addEventListener('click', () => {
            isTraining = false;
            epoch = 0;
            loss = 1.0;
            updateStats();
            resetNeurons();
        });
    }
    
    function startTraining() {
        if (!isTraining) return;
        
        // Simulate training
        epoch++;
        loss = Math.max(0.1, loss - 0.1);
        
        // Update stats
        updateStats();
        
        // Animate neurons
        animateNeurons();
        
        // Continue training if not complete
        if (loss > 0.1) {
            setTimeout(startTraining, 1000);
        } else {
            isTraining = false;
        }
    }
    
    function updateStats() {
        if (epochValue) epochValue.textContent = epoch;
        if (lossValue) lossValue.textContent = loss.toFixed(2);
    }
    
    function animateNeurons() {
        neurons.forEach((neuron, index) => {
            setTimeout(() => {
                neuron.classList.add('active');
                setTimeout(() => {
                    neuron.classList.remove('active');
                }, 500);
            }, index * 200);
        });
    }
    
    function resetNeurons() {
        neurons.forEach(neuron => {
            neuron.classList.remove('active');
        });
    }
    
    // Activation Explorer
    const inputSlider = document.querySelector('.activation-explorer .input-slider');
    const lrSlider = document.querySelector('.activation-explorer .lr-slider');
    const inputValue = document.querySelector('.activation-explorer .input-value');
    const outputValue = document.querySelector('.activation-explorer .output-value');
    const gradientValue = document.querySelector('.activation-explorer .gradient-value');
    const activationFunction = document.querySelector('.activation-explorer .activation-function');
    
    if (inputSlider && lrSlider) {
        [inputSlider, lrSlider].forEach(slider => {
            slider.addEventListener('input', () => {
                const x = parseFloat(inputSlider.value);
                const lr = parseFloat(lrSlider.value);
                
                // Update input value display
                if (inputValue) inputValue.textContent = `x = ${x}`;
                
                // Calculate output based on active function
                const activeFunction = document.querySelector('.function-tab.active')?.dataset.function || 'relu';
                let output, gradient;
                
                switch (activeFunction) {
                    case 'binary':
                        output = x >= 0 ? 1 : 0;
                        gradient = 0;
                        break;
                    case 'bipolar':
                        output = (1 - Math.exp(-x)) / (1 + Math.exp(-x));
                        gradient = (1 - output * output) * lr;
                        break;
                    case 'relu':
                        output = Math.max(0, x);
                        gradient = x > 0 ? lr : 0;
                        break;
                }
                
                // Update displays
                if (outputValue) outputValue.textContent = `f(x) = ${output.toFixed(2)}`;
                if (gradientValue) gradientValue.textContent = `∂f/∂x = ${gradient.toFixed(2)}`;
                
                // Update activation function visualization
                if (activationFunction) {
                    activationFunction.style.opacity = output;
                }
            });
        });
    }
});

// Hebbian Learning Section
document.addEventListener('DOMContentLoaded', () => {
    // Interactive Synapse Demo
    const neuronButtons = document.querySelectorAll('.neuron-btn');
    const neurons = document.querySelectorAll('.neuron');
    const synapse = document.querySelector('.synapse');
    const weightValue = document.querySelector('.weight-value');
    const lrSlider = document.querySelector('.synapse-demo .lr-slider');
    const lrValue = document.querySelector('.synapse-demo .lr-value');
    
    let weight = 0.2;
    let learningRate = 0.1;
    
    // Update learning rate
    if (lrSlider && lrValue) {
        lrSlider.addEventListener('input', () => {
            learningRate = parseFloat(lrSlider.value);
            lrValue.textContent = learningRate.toFixed(1);
        });
    }
    
    // Neuron activation
    neuronButtons.forEach(button => {
        button.addEventListener('click', () => {
            const neuronType = button.dataset.neuron;
            const neuron = document.querySelector(`.neuron-${neuronType}`);
            
            // Activate neuron
            neuron.classList.add('active');
            setTimeout(() => {
                neuron.classList.remove('active');
            }, 500);
            
            // If both neurons are active, update weight
            if (neurons[0].classList.contains('active') && neurons[1].classList.contains('active')) {
                updateWeight();
            }
        });
    });
    
    function updateWeight() {
        // Hebbian learning rule: Δw = η · x · y
        const deltaW = learningRate * 1.0 * 1.0; // Assuming full activation
        weight = Math.min(1.0, weight + deltaW);
        
        // Update visualization
        if (weightValue) weightValue.textContent = `w = ${weight.toFixed(2)}`;
        if (synapse) {
            synapse.style.opacity = weight;
            synapse.classList.add('active');
            setTimeout(() => {
                synapse.classList.remove('active');
            }, 500);
        }
    }
    
    // Real-World Analogies
    const pavlovDemo = document.querySelector('.pavlov-demo');
    const socialDemo = document.querySelector('.social-demo');
    
    if (pavlovDemo) {
        const bell = pavlovDemo.querySelector('.bell');
        const food = pavlovDemo.querySelector('.food');
        const response = pavlovDemo.querySelector('.response');
        
        let isTraining = false;
        let trainingCount = 0;
        
        bell.addEventListener('click', () => {
            bell.classList.add('active');
            setTimeout(() => {
                bell.classList.remove('active');
            }, 500);
            
            if (isTraining) {
                food.classList.add('active');
                setTimeout(() => {
                    food.classList.remove('active');
                    response.classList.add('active');
                    setTimeout(() => {
                        response.classList.remove('active');
                    }, 500);
                }, 500);
                
                trainingCount++;
                if (trainingCount >= 3) {
                    isTraining = false;
                    trainingCount = 0;
                }
            }
        });
        
        food.addEventListener('click', () => {
            isTraining = true;
            trainingCount = 0;
        });
    }
    
    if (socialDemo) {
        const people = socialDemo.querySelectorAll('.person');
        const connection = socialDemo.querySelector('.connection');
        
        people.forEach(person => {
            person.addEventListener('click', () => {
                person.classList.add('active');
                setTimeout(() => {
                    person.classList.remove('active');
                }, 500);
                
                if (people[0].classList.contains('active') && people[1].classList.contains('active')) {
                    connection.classList.add('active');
                    setTimeout(() => {
                        connection.classList.remove('active');
                    }, 500);
                }
            });
        });
    }
    
    // Train a Hebbian Neuron Game
    const patternCells = document.querySelectorAll('.pattern-cell');
    const strengthBar = document.querySelector('.strength-bar');
    const strengthValue = document.querySelector('.strength-value');
    const startBtn = document.querySelector('.hebbian-game .start-btn');
    const resetBtn = document.querySelector('.hebbian-game .reset-btn');
    
    let isTraining = false;
    let strength = 0;
    let targetPattern = [];
    
    // Initialize target pattern (horizontal line)
    targetPattern = [3, 4, 5]; // Middle row
    
    if (startBtn && resetBtn) {
        startBtn.addEventListener('click', () => {
            isTraining = true;
            patternCells.forEach(cell => {
                cell.addEventListener('click', handleCellClick);
            });
        });
        
        resetBtn.addEventListener('click', () => {
            isTraining = false;
            strength = 0;
            updateStrength();
            patternCells.forEach(cell => {
                cell.classList.remove('active');
                cell.removeEventListener('click', handleCellClick);
            });
        });
    }
    
    function handleCellClick() {
        if (!isTraining) return;
        
        const index = Array.from(patternCells).indexOf(this);
        this.classList.toggle('active');
        
        // Check if pattern matches target
        const currentPattern = Array.from(patternCells)
            .map((cell, i) => cell.classList.contains('active') ? i : -1)
            .filter(i => i !== -1);
        
        const isCorrect = currentPattern.length === targetPattern.length &&
            currentPattern.every(i => targetPattern.includes(i));
        
        if (isCorrect) {
            strength = Math.min(100, strength + 10);
        } else {
            strength = Math.max(0, strength - 5);
        }
        
        updateStrength();
    }
    
    function updateStrength() {
        if (strengthBar) {
            strengthBar.style.setProperty('--strength', `${strength}%`);
        }
        if (strengthValue) {
            strengthValue.textContent = `${strength}%`;
        }
    }
    
    // Neuroplasticity Timeline
    const timelinePoints = document.querySelectorAll('.timeline-point');
    
    timelinePoints.forEach(point => {
        point.addEventListener('mouseenter', () => {
            const time = point.dataset.time;
            highlightTimelinePoint(time);
        });
        
        point.addEventListener('mouseleave', () => {
            resetTimelineHighlight();
        });
    });
    
    function highlightTimelinePoint(time) {
        timelinePoints.forEach(point => {
            if (parseInt(point.dataset.time) <= parseInt(time)) {
                point.style.opacity = '1';
            } else {
                point.style.opacity = '0.5';
            }
        });
    }
    
    function resetTimelineHighlight() {
        timelinePoints.forEach(point => {
            point.style.opacity = '1';
        });
    }
});

// SVD Section
document.addEventListener('DOMContentLoaded', () => {
    // Interactive Matrix Decomposition
    const matrixCells = document.querySelectorAll('.matrix-cell');
    const decomposeBtn = document.querySelector('.decompose-btn');
    const valueBars = document.querySelectorAll('.value-bar .bar-fill');
    const retentionValue = document.querySelector('.retention-value');
    const matrixGrids = document.querySelectorAll('.matrix .matrix-grid');
    
    // Initialize matrix visualization
    function initMatrixGrids() {
        matrixGrids.forEach(grid => {
            grid.innerHTML = '';
            for (let i = 0; i < 9; i++) {
                const cell = document.createElement('div');
                cell.className = 'matrix-cell';
                cell.textContent = '0';
                grid.appendChild(cell);
            }
        });
    }
    
    // Perform SVD decomposition
    function performSVD() {
        // Get matrix values
        const matrix = [];
        matrixCells.forEach(cell => {
            const row = parseInt(cell.dataset.row);
            const col = parseInt(cell.dataset.col);
            if (!matrix[row]) matrix[row] = [];
            matrix[row][col] = parseFloat(cell.value);
        });
        
        // Simple SVD simulation (for demonstration)
        const singularValues = [5, 3, 1]; // Example values
        const totalEnergy = singularValues.reduce((a, b) => a + b * b, 0);
        
        // Update singular value bars
        valueBars.forEach((bar, index) => {
            const value = singularValues[index];
            const percentage = (value * value / totalEnergy) * 100;
            bar.style.width = `${percentage}%`;
        });
        
        // Update energy retention
        const retention = ((singularValues[0] * singularValues[0] + 
                          singularValues[1] * singularValues[1]) / totalEnergy) * 100;
        retentionValue.textContent = `${retention.toFixed(1)}%`;
        
        // Update matrix visualizations
        updateMatrixVisualization(matrixGrids[0], matrix); // A
        updateMatrixVisualization(matrixGrids[1], generateRandomOrthogonal(3)); // U
        updateMatrixVisualization(matrixGrids[2], generateDiagonal(singularValues)); // Σ
        updateMatrixVisualization(matrixGrids[3], generateRandomOrthogonal(3)); // Vᵀ
    }
    
    function updateMatrixVisualization(grid, matrix) {
        const cells = grid.children;
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                cells[i * 3 + j].textContent = matrix[i][j].toFixed(2);
            }
        }
    }
    
    function generateRandomOrthogonal(size) {
        const matrix = [];
        for (let i = 0; i < size; i++) {
            matrix[i] = [];
            for (let j = 0; j < size; j++) {
                matrix[i][j] = Math.random() * 2 - 1;
            }
        }
        return matrix;
    }
    
    function generateDiagonal(values) {
        const matrix = Array(3).fill().map(() => Array(3).fill(0));
        for (let i = 0; i < values.length; i++) {
            matrix[i][i] = values[i];
        }
        return matrix;
    }
    
    if (decomposeBtn) {
        decomposeBtn.addEventListener('click', performSVD);
    }
    
    // Initialize matrix grids
    initMatrixGrids();
    
    // Geometric Interpretation
    const sigmaSliders = document.querySelectorAll('.sigma-slider');
    const sigmaValues = document.querySelectorAll('.sigma-value');
    const transformedSphere = document.querySelector('.transformed-sphere');
    const ellipse = document.querySelector('.ellipse');
    
    sigmaSliders.forEach((slider, index) => {
        slider.addEventListener('input', () => {
            const value = parseFloat(slider.value);
            sigmaValues[index].textContent = value.toFixed(1);
            
            // Update ellipse shape
            const values = Array.from(sigmaSliders).map(s => parseFloat(s.value));
            const maxValue = Math.max(...values);
            const minValue = Math.min(...values);
            
            ellipse.style.borderRadius = `${50 + (maxValue - minValue) * 25}% ${50 + (maxValue - minValue) * 25}% ${50 + (maxValue - minValue) * 25}% ${50 + (maxValue - minValue) * 25}% / ${50 + (maxValue - minValue) * 25}% ${50 + (maxValue - minValue) * 25}% ${50 + (maxValue - minValue) * 25}% ${50 + (maxValue - minValue) * 25}%`;
            
            // Update sphere position
            const angle = (index * 120) * (Math.PI / 180);
            const x = Math.cos(angle) * value * 50;
            const y = Math.sin(angle) * value * 50;
            transformedSphere.style.transform = `translate(${x}px, ${y}px)`;
        });
    });
    
    // Image Compression Tool
    const imageUpload = document.getElementById('imageUpload');
    const rankSlider = document.querySelector('.rank-slider');
    const rankValue = document.querySelector('.rank-value');
    const originalSize = document.querySelector('.compression-stats .stat-value:first-child');
    const compressedSize = document.querySelector('.compression-stats .stat-value:nth-child(2)');
    const compressionRatio = document.querySelector('.compression-stats .stat-value:last-child');
    const originalImage = document.querySelector('.original .image-container');
    const compressedImage = document.querySelector('.compressed .image-container');
    
    let currentImage = null;
    
    if (imageUpload) {
        imageUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    currentImage = new Image();
                    currentImage.src = event.target.result;
                    currentImage.onload = () => {
                        originalImage.innerHTML = '';
                        originalImage.appendChild(currentImage.cloneNode());
                        originalSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
                        updateCompression();
                    };
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    if (rankSlider) {
        rankSlider.addEventListener('input', () => {
            rankValue.textContent = rankSlider.value;
            updateCompression();
        });
    }
    
    function updateCompression() {
        if (!currentImage) return;
        
        // Simulate compression
        const rank = parseInt(rankSlider.value);
        const compressionFactor = 1 - (rank / 100);
        const newSize = parseFloat(originalSize.textContent) * compressionFactor;
        
        compressedSize.textContent = `${newSize.toFixed(1)} KB`;
        compressionRatio.textContent = `${(compressionFactor * 100).toFixed(1)}%`;
        
        // Update compressed image
        compressedImage.innerHTML = '';
        const compressed = currentImage.cloneNode();
        compressed.style.filter = `blur(${(1 - compressionFactor) * 5}px)`;
        compressedImage.appendChild(compressed);
    }
    
    // SVD vs. Eigen Decomposition
    const matrixTypes = document.querySelectorAll('.matrix-type');
    
    matrixTypes.forEach(type => {
        const matrixGrid = type.querySelector('.matrix-grid');
        const eigenResult = type.querySelector('.eigen-decomp .result-matrix');
        const svdResult = type.querySelector('.svd-decomp .result-matrix');
        
        // Initialize matrix
        matrixGrid.innerHTML = '';
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement('div');
            cell.className = 'matrix-cell';
            cell.textContent = Math.random().toFixed(2);
            matrixGrid.appendChild(cell);
        }
        
        // Simulate decompositions
        const isSymmetric = type.querySelector('h4').textContent.includes('Symmetric');
        if (isSymmetric) {
            eigenResult.textContent = 'Eigen Decomposition Possible';
            svdResult.textContent = 'SVD = Eigen Decomposition';
        } else {
            eigenResult.textContent = 'Eigen Decomposition Not Possible';
            svdResult.textContent = 'SVD Always Possible';
        }
    });
});

// Overfitting and Underfitting Section
document.addEventListener('DOMContentLoaded', () => {
    // Interactive Model Fitting Demo
    const degreeSlider = document.getElementById('degree-slider');
    const degreeValue = document.querySelector('.degree-value');
    const addPointBtn = document.querySelector('.add-point-btn');
    const resetPointsBtn = document.querySelector('.reset-points-btn');
    const dataPoints = document.querySelector('.data-points');
    const modelCurve = document.querySelector('.model-curve');
    const trainingLoss = document.querySelector('.training-loss');
    const validationLoss = document.querySelector('.validation-loss');
    
    let points = [];
    let currentDegree = 1;
    
    // Initialize polynomial regression
    function initPolynomialRegression() {
        if (degreeSlider && degreeValue) {
            degreeSlider.addEventListener('input', () => {
                currentDegree = parseInt(degreeSlider.value);
                degreeValue.textContent = currentDegree;
                updateModel();
            });
        }
        
        if (addPointBtn) {
            addPointBtn.addEventListener('click', () => {
                const x = Math.random() * 0.8 + 0.1;
                const y = Math.random() * 0.8 + 0.1;
                addPoint(x, y);
            });
        }
        
        if (resetPointsBtn) {
            resetPointsBtn.addEventListener('click', () => {
                points = [];
                dataPoints.innerHTML = '';
                updateModel();
            });
        }
    }
    
    function addPoint(x, y) {
        points.push({ x, y });
        const point = document.createElement('div');
        point.className = 'data-point';
        point.style.left = `${x * 100}%`;
        point.style.top = `${y * 100}%`;
        dataPoints.appendChild(point);
        updateModel();
    }
    
    function updateModel() {
        if (points.length < 2) {
            modelCurve.style.display = 'none';
            return;
        }
        
        modelCurve.style.display = 'block';
        
        // Simple polynomial regression
        const coefficients = fitPolynomial(points, currentDegree);
        const curve = generatePolynomialCurve(coefficients);
        
        // Update model curve
        modelCurve.style.clipPath = `polygon(0 100%, ${curve.map((p, i) => 
            `${i}% ${(1 - p) * 100}%`
        ).join(', ')}, 100% 100%)`;
        
        // Update loss curves
        const { trainLoss, valLoss } = calculateLosses(points, coefficients);
        trainingLoss.style.clipPath = `polygon(0 100%, ${trainLoss.map((l, i) => 
            `${i}% ${(1 - l) * 100}%`
        ).join(', ')}, 100% 100%)`;
        
        validationLoss.style.clipPath = `polygon(0 100%, ${valLoss.map((l, i) => 
            `${i}% ${(1 - l) * 100}%`
        ).join(', ')}, 100% 100%)`;
    }
    
    function fitPolynomial(points, degree) {
        // Simple polynomial regression implementation
        const n = points.length;
        const x = points.map(p => p.x);
        const y = points.map(p => p.y);
        
        // Create design matrix
        const X = x.map(xi => {
            const row = [];
            for (let i = 0; i <= degree; i++) {
                row.push(Math.pow(xi, i));
            }
            return row;
        });
        
        // Solve normal equations
        const XT = transpose(X);
        const XTX = multiply(XT, X);
        const XTy = multiply(XT, y);
        const coefficients = solve(XTX, XTy);
        
        return coefficients;
    }
    
    function generatePolynomialCurve(coefficients) {
        const curve = [];
        for (let x = 0; x <= 1; x += 0.01) {
            let y = 0;
            for (let i = 0; i < coefficients.length; i++) {
                y += coefficients[i] * Math.pow(x, i);
            }
            curve.push(y);
        }
        return curve;
    }
    
    function calculateLosses(points, coefficients) {
        const trainLoss = [];
        const valLoss = [];
        
        // Generate validation points
        const valPoints = points.map(p => ({
            x: p.x + (Math.random() - 0.5) * 0.1,
            y: p.y + (Math.random() - 0.5) * 0.1
        }));
        
        // Calculate losses for different degrees
        for (let degree = 1; degree <= 15; degree++) {
            const trainCoeffs = fitPolynomial(points, degree);
            const valCoeffs = fitPolynomial(valPoints, degree);
            
            const trainError = calculateError(points, trainCoeffs);
            const valError = calculateError(valPoints, valCoeffs);
            
            trainLoss.push(trainError);
            valLoss.push(valError);
        }
        
        return { trainLoss, valLoss };
    }
    
    function calculateError(points, coefficients) {
        let error = 0;
        points.forEach(p => {
            const predicted = evaluatePolynomial(p.x, coefficients);
            error += Math.pow(p.y - predicted, 2);
        });
        return error / points.length;
    }
    
    function evaluatePolynomial(x, coefficients) {
        let y = 0;
        for (let i = 0; i < coefficients.length; i++) {
            y += coefficients[i] * Math.pow(x, i);
        }
        return y;
    }
    
    // Matrix operations
    function transpose(matrix) {
        return matrix[0].map((_, i) => matrix.map(row => row[i]));
    }
    
    function multiply(a, b) {
        if (b[0].length) {
            return a.map(row => b[0].map((_, i) => 
                row.reduce((sum, val, j) => sum + val * b[j][i], 0)
            ));
        } else {
            return a.map(row => 
                row.reduce((sum, val, i) => sum + val * b[i], 0)
            );
        }
    }
    
    function solve(A, b) {
        // Simple Gaussian elimination
        const n = A.length;
        const augmented = A.map((row, i) => [...row, b[i]]);
        
        for (let i = 0; i < n; i++) {
            let maxRow = i;
            for (let j = i + 1; j < n; j++) {
                if (Math.abs(augmented[j][i]) > Math.abs(augmented[maxRow][i])) {
                    maxRow = j;
                }
            }
            
            [augmented[i], augmented[maxRow]] = [augmented[maxRow], augmented[i]];
            
            for (let j = i + 1; j < n; j++) {
                const factor = augmented[j][i] / augmented[i][i];
                for (let k = i; k <= n; k++) {
                    augmented[j][k] -= factor * augmented[i][k];
                }
            }
        }
        
        const x = new Array(n).fill(0);
        for (let i = n - 1; i >= 0; i--) {
            let sum = augmented[i][n];
            for (let j = i + 1; j < n; j++) {
                sum -= augmented[i][j] * x[j];
            }
            x[i] = sum / augmented[i][i];
        }
        
        return x;
    }
    
    // Initialize polynomial regression
    initPolynomialRegression();
    
    // Bias-Variance Tradeoff
    const tradeoffGraph = document.querySelector('.tradeoff-graph');
    const biasCurve = document.querySelector('.bias-curve');
    const varianceCurve = document.querySelector('.variance-curve');
    const totalErrorCurve = document.querySelector('.total-error-curve');
    const crosshair = document.querySelector('.crosshair');
    
    if (tradeoffGraph) {
        // Generate curves
        const complexity = Array.from({ length: 100 }, (_, i) => i / 100);
        const bias = complexity.map(x => Math.exp(-5 * x));
        const variance = complexity.map(x => 1 - Math.exp(-5 * x));
        const total = complexity.map((x, i) => bias[i] + variance[i]);
        
        // Update curves
        biasCurve.style.clipPath = `polygon(0 100%, ${bias.map((b, i) => 
            `${i}% ${(1 - b) * 100}%`
        ).join(', ')}, 100% 100%)`;
        
        varianceCurve.style.clipPath = `polygon(0 100%, ${variance.map((v, i) => 
            `${i}% ${(1 - v) * 100}%`
        ).join(', ')}, 100% 100%)`;
        
        totalErrorCurve.style.clipPath = `polygon(0 100%, ${total.map((t, i) => 
            `${i}% ${(1 - t) * 100}%`
        ).join(', ')}, 100% 100%)`;
        
        // Add mouse interaction
        tradeoffGraph.addEventListener('mousemove', (e) => {
            const rect = tradeoffGraph.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            crosshair.style.left = `${x * 100}%`;
            crosshair.style.top = `${y * 100}%`;
        });
    }
    
    // Confusion Matrix Comparison
    const matrixGrids = document.querySelectorAll('.matrix-grid');
    
    matrixGrids.forEach(grid => {
        const isOverfit = grid.parentElement.classList.contains('overfit');
        const matrix = isOverfit ? 
            [[0.9, 0.1], [0.1, 0.9]] : 
            [[0.6, 0.4], [0.4, 0.6]];
        
        grid.innerHTML = '';
        matrix.forEach(row => {
            row.forEach(cell => {
                const cellElement = document.createElement('div');
                cellElement.className = 'matrix-cell';
                cellElement.textContent = cell.toFixed(1);
                cellElement.style.backgroundColor = `rgba(var(--accent-rgb), ${cell})`;
                grid.appendChild(cellElement);
            });
        });
    });
    
    // Regularization Demo
    const lambdaSlider = document.getElementById('lambda-slider');
    const lambdaValue = document.querySelector('.lambda-value');
    const originalCurve = document.querySelector('.original-curve');
    const regularizedCurve = document.querySelector('.regularized-curve');
    
    if (lambdaSlider && lambdaValue) {
        lambdaSlider.addEventListener('input', () => {
            const lambda = parseFloat(lambdaSlider.value);
            lambdaValue.textContent = lambda.toFixed(1);
            
            // Update curves
            const x = Array.from({ length: 100 }, (_, i) => i / 100);
            const original = x.map(xi => Math.sin(xi * 10) + 0.2 * Math.random());
            const regularized = x.map(xi => Math.sin(xi * 10) * (1 / (1 + lambda)));
            
            originalCurve.style.clipPath = `polygon(0 100%, ${original.map((y, i) => 
                `${i}% ${(1 - y) * 100}%`
            ).join(', ')}, 100% 100%)`;
            
            regularizedCurve.style.clipPath = `polygon(0 100%, ${regularized.map((y, i) => 
                `${i}% ${(1 - y) * 100}%`
            ).join(', ')}, 100% 100%)`;
        });
    }
    
    // Feature Engineering Demo
    const featureBtns = document.querySelectorAll('.feature-btn');
    const originalModel = document.querySelector('.original-model');
    const enhancedModel = document.querySelector('.enhanced-model');
    
    featureBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const feature = btn.dataset.feature;
            
            // Update models
            const x = Array.from({ length: 100 }, (_, i) => i / 100);
            const original = x.map(xi => xi * 0.5);
            const enhanced = x.map(xi => {
                if (feature === 'polynomial') {
                    return xi * 0.5 + Math.pow(xi, 2) * 0.3;
                } else {
                    return xi * 0.5 + Math.sin(xi * 5) * 0.2;
                }
            });
            
            originalModel.style.clipPath = `polygon(0 100%, ${original.map((y, i) => 
                `${i}% ${(1 - y) * 100}%`
            ).join(', ')}, 100% 100%)`;
            
            enhancedModel.style.clipPath = `polygon(0 100%, ${enhanced.map((y, i) => 
                `${i}% ${(1 - y) * 100}%`
            ).join(', ')}, 100% 100%)`;
        });
    });
    
    // Doctor Diagnosis Game
    const tools = document.querySelectorAll('.tool');
    const treatmentFeedback = document.querySelector('.treatment-feedback');
    const modelVisualization = document.querySelector('.model-visualization');
    const modelSymptoms = document.querySelector('.model-symptoms');
    
    let currentDiagnosis = null;
    let score = 0;
    let attempts = 0;
    
    function generateRandomModel() {
        const type = Math.random() < 0.5 ? 'overfit' : 'underfit';
        const x = Array.from({ length: 100 }, (_, i) => i / 100);
        const y = type === 'overfit' ?
            x.map(xi => Math.sin(xi * 10) + 0.2 * Math.random()) :
            x.map(xi => xi * 0.5);
        
        currentDiagnosis = type;
        
        // Update visualization
        modelVisualization.style.background = `linear-gradient(to right, transparent, var(--${type}-color))`;
        modelVisualization.style.clipPath = `polygon(0 100%, ${y.map((yi, i) => 
            `${i}% ${(1 - yi) * 100}%`
        ).join(', ')}, 100% 100%)`;
        
        // Update symptoms
        const symptoms = type === 'overfit' ? [
            "High training accuracy but poor generalization",
            "Model follows noise in the data",
            "Complex decision boundary"
        ] : [
            "Poor performance on both training and test data",
            "Oversimplified model",
            "Misses important patterns"
        ];
        
        modelSymptoms.innerHTML = `
            <h4>Model Symptoms:</h4>
            <ul>
                ${symptoms.map(symptom => `<li>${symptom}</li>`).join('')}
            </ul>
            <div class="score-display">
                <span>Score: ${score}</span>
                <span>Attempts: ${attempts}</span>
            </div>
        `;
    }
    
    tools.forEach(tool => {
        tool.addEventListener('click', () => {
            attempts++;
            const treatment = tool.dataset.tool;
            let feedback = '';
            let isCorrect = false;
            
            if (currentDiagnosis === 'overfit') {
                if (treatment === 'regularization') {
                    feedback = 'Correct! Regularization helps reduce overfitting by penalizing complex models.';
                    isCorrect = true;
                } else if (treatment === 'data') {
                    feedback = 'Good choice! More training data can help the model generalize better.';
                    isCorrect = true;
                } else {
                    feedback = 'Not the best choice. Adding more features might make overfitting worse.';
                }
            } else {
                if (treatment === 'features') {
                    feedback = 'Correct! Adding more features can help capture the underlying pattern.';
                    isCorrect = true;
                } else if (treatment === 'data') {
                    feedback = 'Good choice! More data can help the model learn better.';
                    isCorrect = true;
                } else {
                    feedback = 'Not the best choice. Regularization might make underfitting worse.';
                }
            }
            
            if (isCorrect) {
                score++;
            }
            
            // Update feedback with animation
            treatmentFeedback.style.opacity = '0';
            setTimeout(() => {
                treatmentFeedback.textContent = feedback;
                treatmentFeedback.style.backgroundColor = isCorrect ? 
                    'var(--success-color)' : 'var(--warning-color)';
                treatmentFeedback.style.opacity = '1';
            }, 300);
            
            // Generate new model after a delay
            setTimeout(() => {
                generateRandomModel();
            }, 2000);
        });
    });
    
    // Initialize game
    generateRandomModel();
    
    // Dataset Playground
    const datasetBtns = document.querySelectorAll('.dataset-btn');
    const datasetPoints = document.querySelector('.dataset-visualization .data-points');
    const modelFit = document.querySelector('.dataset-visualization .model-fit');
    
    datasetBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            datasetBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            // Generate dataset
            const dataset = btn.dataset.dataset;
            const points = generateDataset(dataset);
            
            // Update visualization
            datasetPoints.innerHTML = '';
            points.forEach(p => {
                const point = document.createElement('div');
                point.className = 'data-point';
                point.style.left = `${p.x * 100}%`;
                point.style.top = `${p.y * 100}%`;
                datasetPoints.appendChild(point);
            });
            
            // Fit model
            const coefficients = fitPolynomial(points, 3);
            const curve = generatePolynomialCurve(coefficients);
            
            modelFit.style.clipPath = `polygon(0 100%, ${curve.map((y, i) => 
                `${i}% ${(1 - y) * 100}%`
            ).join(', ')}, 100% 100%)`;
        });
    });
    
    function generateDataset(type) {
        const points = [];
        const n = 20;
        
        for (let i = 0; i < n; i++) {
            const x = i / (n - 1);
            let y;
            
            switch (type) {
                case 'linear':
                    y = 0.5 * x + 0.1 * (Math.random() - 0.5);
                    break;
                case 'sine':
                    y = 0.5 * Math.sin(x * 5) + 0.1 * (Math.random() - 0.5);
                    break;
                case 'noisy':
                    y = 0.5 * x + 0.3 * (Math.random() - 0.5);
                    break;
            }
            
            points.push({ x, y });
        }
        
        return points;
    }
    
    // Initialize dataset playground
    const defaultDataset = document.querySelector('.dataset-btn.active');
    if (defaultDataset) {
        defaultDataset.click();
    }
});

// Principal Component Analysis (PCA) Section
document.addEventListener('DOMContentLoaded', () => {
    // Interactive Geometric Demo
    const pointCloud = document.querySelector('.point-cloud');
    const dataPoints = document.querySelector('.data-points');
    const covarianceEllipse = document.querySelector('.covariance-ellipse');
    const pcArrows = document.querySelector('.pc-arrows');
    const stepBtns = document.querySelectorAll('.step-btn');
    const dimBtns = document.querySelectorAll('.dim-btn');
    
    let points = [];
    let isDragging = false;
    let currentPoint = null;
    
    // Initialize point cloud
    function initPointCloud() {
        // Add random points
        for (let i = 0; i < 20; i++) {
            const x = Math.random() * 0.8 + 0.1;
            const y = Math.random() * 0.8 + 0.1;
            addPoint(x, y);
        }
        
        // Add event listeners
        pointCloud.addEventListener('mousedown', startDragging);
        pointCloud.addEventListener('mousemove', drag);
        pointCloud.addEventListener('mouseup', stopDragging);
        pointCloud.addEventListener('mouseleave', stopDragging);
    }
    
    function addPoint(x, y) {
        points.push({ x, y });
        const point = document.createElement('div');
        point.className = 'data-point';
        point.style.left = `${x * 100}%`;
        point.style.top = `${y * 100}%`;
        dataPoints.appendChild(point);
    }
    
    function startDragging(e) {
        const rect = pointCloud.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        // Check if clicking on existing point
        const point = document.elementFromPoint(e.clientX, e.clientY);
        if (point && point.classList.contains('data-point')) {
            currentPoint = point;
            isDragging = true;
        } else {
            // Add new point
            addPoint(x, y);
        }
    }
    
    function drag(e) {
        if (!isDragging || !currentPoint) return;
        
        const rect = pointCloud.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        
        currentPoint.style.left = `${x * 100}%`;
        currentPoint.style.top = `${y * 100}%`;
        
        // Update point data
        const index = Array.from(dataPoints.children).indexOf(currentPoint);
        points[index] = { x, y };
    }
    
    function stopDragging() {
        isDragging = false;
        currentPoint = null;
    }
    
    // Step controls
    stepBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const step = btn.dataset.step;
            
            switch (step) {
                case 'center':
                    centerData();
                    break;
                case 'covariance':
                    showCovariance();
                    break;
                case 'pcs':
                    showPCs();
                    break;
            }
        });
    });
    
    function centerData() {
        // Calculate mean
        const meanX = points.reduce((sum, p) => sum + p.x, 0) / points.length;
        const meanY = points.reduce((sum, p) => sum + p.y, 0) / points.length;
        
        // Center points
        points = points.map(p => ({
            x: p.x - meanX + 0.5,
            y: p.y - meanY + 0.5
        }));
        
        // Update visualization
        updatePoints();
    }
    
    function showCovariance() {
        covarianceEllipse.style.opacity = '1';
    }
    
    function showPCs() {
        // Calculate covariance matrix
        const cov = calculateCovarianceMatrix();
        
        // Calculate eigenvectors
        const { eigenvectors } = eigendecomposition(cov);
        
        // Update PC arrows
        const pc1 = eigenvectors[0];
        const pc2 = eigenvectors[1];
        
        const pc1Arrow = document.querySelector('.pc-arrow.pc1');
        const pc2Arrow = document.querySelector('.pc-arrow.pc2');
        
        pc1Arrow.style.transform = `rotate(${Math.atan2(pc1[1], pc1[0]) * (180 / Math.PI)}deg)`;
        pc2Arrow.style.transform = `rotate(${Math.atan2(pc2[1], pc2[0]) * (180 / Math.PI)}deg)`;
        
        pc1Arrow.style.opacity = '1';
        pc2Arrow.style.opacity = '1';
    }
    
    function calculateCovarianceMatrix() {
        const n = points.length;
        const meanX = points.reduce((sum, p) => sum + p.x, 0) / n;
        const meanY = points.reduce((sum, p) => sum + p.y, 0) / n;
        
        let covXX = 0, covXY = 0, covYY = 0;
        
        points.forEach(p => {
            const dx = p.x - meanX;
            const dy = p.y - meanY;
            covXX += dx * dx;
            covXY += dx * dy;
            covYY += dy * dy;
        });
        
        return [
            [covXX / n, covXY / n],
            [covXY / n, covYY / n]
        ];
    }
    
    function eigendecomposition(matrix) {
        // Simple 2x2 eigendecomposition
        const a = matrix[0][0];
        const b = matrix[0][1];
        const c = matrix[1][0];
        const d = matrix[1][1];
        
        const trace = a + d;
        const det = a * d - b * c;
        
        const discriminant = Math.sqrt(trace * trace - 4 * det);
        const lambda1 = (trace + discriminant) / 2;
        const lambda2 = (trace - discriminant) / 2;
        
        const eigenvectors = [
            [b, lambda1 - a],
            [b, lambda2 - a]
        ];
        
        // Normalize eigenvectors
        eigenvectors.forEach(v => {
            const norm = Math.sqrt(v[0] * v[0] + v[1] * v[1]);
            v[0] /= norm;
            v[1] /= norm;
        });
        
        return {
            eigenvalues: [lambda1, lambda2],
            eigenvectors
        };
    }
    
    function updatePoints() {
        dataPoints.innerHTML = '';
        points.forEach(p => {
            const point = document.createElement('div');
            point.className = 'data-point';
            point.style.left = `${p.x * 100}%`;
            point.style.top = `${p.y * 100}%`;
            dataPoints.appendChild(point);
        });
    }
    
    // Dimension controls
    dimBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            dimBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const dim = btn.dataset.dim;
            if (dim === '3d') {
                // Initialize 3D visualization
                init3DVisualization();
            } else {
                // Reset to 2D
                resetTo2D();
            }
        });
    });
    
    function init3DVisualization() {
        // Add 3D points
        points = points.map(p => ({
            x: p.x,
            y: p.y,
            z: Math.random() * 0.8 + 0.1
        }));
        
        // Update visualization
        update3DPoints();
    }
    
    function resetTo2D() {
        // Remove z-coordinate
        points = points.map(p => ({
            x: p.x,
            y: p.y
        }));
        
        // Update visualization
        updatePoints();
    }
    
    function update3DPoints() {
        // Simple 3D to 2D projection
        dataPoints.innerHTML = '';
        points.forEach(p => {
            const point = document.createElement('div');
            point.className = 'data-point';
            point.style.left = `${p.x * 100}%`;
            point.style.top = `${p.y * 100}%`;
            point.style.opacity = p.z;
            dataPoints.appendChild(point);
        });
    }
    
    // Initialize point cloud
    initPointCloud();
    
    // Scree Plot & Variance Explained
    const screeBars = document.querySelector('.scree-bars');
    const varianceLine = document.querySelector('.variance-line');
    const varianceSlider = document.querySelector('.variance-slider');
    const varianceValue = document.querySelector('.variance-value');
    
    let eigenvalues = [];
    
    function updateScreePlot() {
        // Calculate eigenvalues
        const cov = calculateCovarianceMatrix();
        const { eigenvalues: evals } = eigendecomposition(cov);
        eigenvalues = evals;
        
        // Sort eigenvalues
        eigenvalues.sort((a, b) => b - a);
        
        // Calculate total variance
        const totalVariance = eigenvalues.reduce((sum, val) => sum + val, 0);
        
        // Update scree bars
        screeBars.innerHTML = '';
        eigenvalues.forEach((val, i) => {
            const bar = document.createElement('div');
            bar.className = 'scree-bar';
            bar.style.height = `${(val / totalVariance) * 100}%`;
            screeBars.appendChild(bar);
        });
        
        // Update variance line
        const threshold = parseFloat(varianceSlider.value) / 100;
        let cumulativeVariance = 0;
        let components = 0;
        
        for (let i = 0; i < eigenvalues.length; i++) {
            cumulativeVariance += eigenvalues[i] / totalVariance;
            if (cumulativeVariance >= threshold) {
                components = i + 1;
                break;
            }
        }
        
        varianceLine.style.top = `${(1 - threshold) * 100}%`;
    }
    
    if (varianceSlider) {
        varianceSlider.addEventListener('input', () => {
            varianceValue.textContent = `${varianceSlider.value}%`;
            updateScreePlot();
        });
    }
    
    // Initialize scree plot
    updateScreePlot();
    
    // PCA Your Selfie Tool
    const selfieUpload = document.getElementById('selfieUpload');
    const originalImage = document.querySelector('.pca-selfie .original .image-container');
    const compressedImage = document.querySelector('.pca-selfie .compressed .image-container');
    const originalSize = document.querySelector('.pca-selfie .compression-stats .stat-value:first-child');
    const compressedSize = document.querySelector('.pca-selfie .compression-stats .stat-value:last-child');
    
    let currentImage = null;
    
    if (selfieUpload) {
        selfieUpload.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    currentImage = new Image();
                    currentImage.src = event.target.result;
                    currentImage.onload = () => {
                        originalImage.innerHTML = '';
                        originalImage.appendChild(currentImage.cloneNode());
                        originalSize.textContent = `${(file.size / 1024).toFixed(1)} KB`;
                        updateCompression();
                    };
                };
                reader.readAsDataURL(file);
            }
        });
    }
    
    function updateCompression() {
        if (!currentImage) return;
        
        // Simulate PCA compression
        const variance = parseFloat(varianceSlider.value) / 100;
        const compressionFactor = 1 - variance;
        const newSize = parseFloat(originalSize.textContent) * compressionFactor;
        
        compressedSize.textContent = `${newSize.toFixed(1)} KB`;
        
        // Update compressed image
        compressedImage.innerHTML = '';
        const compressed = currentImage.cloneNode();
        compressed.style.filter = `blur(${(1 - variance) * 5}px)`;
        compressedImage.appendChild(compressed);
    }
    
    // Biplot Explorer
    const biplot = document.querySelector('.biplot');
    const featureArrows = document.querySelector('.feature-arrows');
    const featureList = document.querySelector('.feature-list');
    
    const features = [
        { name: 'Height', contribution: 0.8 },
        { name: 'Weight', contribution: 0.6 },
        { name: 'Age', contribution: 0.4 }
    ];
    
    function updateBiplot() {
        // Update feature arrows
        featureArrows.innerHTML = '';
        features.forEach((feature, i) => {
            const angle = (i * 120) * (Math.PI / 180);
            const arrow = document.createElement('div');
            arrow.className = 'feature-arrow';
            arrow.style.transform = `rotate(${angle * (180 / Math.PI)}deg)`;
            arrow.style.opacity = feature.contribution;
            featureArrows.appendChild(arrow);
        });
        
        // Update feature list
        featureList.innerHTML = '';
        features.forEach(feature => {
            const item = document.createElement('div');
            item.className = 'feature-item';
            item.innerHTML = `
                <div class="feature-color" style="background-color: var(--accent-color); opacity: ${feature.contribution}"></div>
                <span>${feature.name}</span>
            `;
            featureList.appendChild(item);
        });
    }
    
    // Initialize biplot
    updateBiplot();
});

// Performance Metrics Section
document.addEventListener('DOMContentLoaded', () => {
    // Confusion Matrix Demo
    const matrixCells = document.querySelectorAll('.matrix-cell');
    const sliders = document.querySelectorAll('.matrix-controls input[type="range"]');
    const metricValues = document.querySelectorAll('.metric-value .value');
    
    function updateMetrics() {
        const tp = parseInt(document.querySelector('.tp-slider').value);
        const fp = parseInt(document.querySelector('.fp-slider').value);
        const fn = parseInt(document.querySelector('.fn-slider').value);
        const tn = parseInt(document.querySelector('.tn-slider').value);
        
        // Update matrix cells
        document.querySelector('.tp').textContent = tp;
        document.querySelector('.fp').textContent = fp;
        document.querySelector('.fn').textContent = fn;
        document.querySelector('.tn').textContent = tn;
        
        // Calculate metrics
        const accuracy = (tp + tn) / (tp + tn + fp + fn);
        const precision = tp / (tp + fp) || 0;
        const recall = tp / (tp + fn) || 0;
        const f1 = 2 * (precision * recall) / (precision + recall) || 0;
        
        // Update metric displays
        document.querySelector('.accuracy-value').textContent = `${(accuracy * 100).toFixed(1)}%`;
        document.querySelector('.precision-value').textContent = `${(precision * 100).toFixed(1)}%`;
        document.querySelector('.recall-value').textContent = `${(recall * 100).toFixed(1)}%`;
        document.querySelector('.f1-value').textContent = `${(f1 * 100).toFixed(1)}%`;
        
        // Update PR curve
        updatePRCurve(precision, recall);
        
        // Update ROC curve
        updateROCCurve(tp, fp, tn, fn);
    }
    
    sliders.forEach(slider => {
        slider.addEventListener('input', () => {
            const value = slider.value;
            slider.nextElementSibling.textContent = value;
            updateMetrics();
        });
    });
    
    // PR & ROC Curves
    const prCurve = document.querySelector('.pr-curve .curve-area');
    const rocCurve = document.querySelector('.roc-curve .curve-area');
    const thresholdSlider = document.querySelector('.threshold-slider');
    const thresholdLine = document.querySelector('.threshold-line');
    
    function updatePRCurve(precision, recall) {
        // Generate points for PR curve
        const points = [];
        for (let i = 0; i <= 1; i += 0.1) {
            const p = precision * i;
            const r = recall * i;
            points.push({ x: r, y: p });
        }
        
        // Draw PR curve
        const path = points.map((p, i) => 
            `${i === 0 ? 'M' : 'L'} ${p.x * 100} ${(1 - p.y) * 100}`
        ).join(' ');
        
        prCurve.innerHTML = `<path d="${path}" stroke="var(--accent-color)" fill="none" stroke-width="2"/>`;
    }
    
    function updateROCCurve(tp, fp, tn, fn) {
        const tpr = tp / (tp + fn) || 0;
        const fpr = fp / (fp + tn) || 0;
        
        // Generate points for ROC curve
        const points = [];
        for (let i = 0; i <= 1; i += 0.1) {
            const t = tpr * i;
            const f = fpr * i;
            points.push({ x: f, y: t });
        }
        
        // Draw ROC curve
        const path = points.map((p, i) => 
            `${i === 0 ? 'M' : 'L'} ${p.x * 100} ${(1 - p.y) * 100}`
        ).join(' ');
        
        rocCurve.innerHTML = `<path d="${path}" stroke="var(--accent-color)" fill="none" stroke-width="2"/>`;
        
        // Calculate and display AUC
        const auc = calculateAUC(points);
        document.querySelector('.auc-value').textContent = `AUC: ${auc.toFixed(2)}`;
    }
    
    function calculateAUC(points) {
        let auc = 0;
        for (let i = 1; i < points.length; i++) {
            const x1 = points[i-1].x;
            const y1 = points[i-1].y;
            const x2 = points[i].x;
            const y2 = points[i].y;
            auc += (x2 - x1) * (y1 + y2) / 2;
        }
        return auc;
    }
    
    if (thresholdSlider) {
        thresholdSlider.addEventListener('input', () => {
            const value = thresholdSlider.value;
            thresholdSlider.nextElementSibling.textContent = (value / 100).toFixed(2);
            thresholdLine.style.left = `${value}%`;
        });
    }
    
    // Real-World Scenarios
    const scenarioCards = document.querySelectorAll('.scenario-card');
    
    scenarioCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            const bars = card.querySelectorAll('.metric-bar');
            bars.forEach(bar => {
                bar.style.transform = 'scaleY(1.2)';
            });
        });
        
        card.addEventListener('mouseleave', () => {
            const bars = card.querySelectorAll('.metric-bar');
            bars.forEach(bar => {
                bar.style.transform = 'scaleY(1)';
            });
        });
    });
    
    // Metric Comparison
    const model1Polygon = document.querySelector('.model1-polygon');
    const model2Polygon = document.querySelector('.model2-polygon');
    
    function updateModelComparison() {
        // Generate random metrics for demonstration
        const model1Metrics = {
            accuracy: 0.8 + Math.random() * 0.2,
            precision: 0.7 + Math.random() * 0.3,
            recall: 0.75 + Math.random() * 0.25,
            f1: 0.72 + Math.random() * 0.28
        };
        
        const model2Metrics = {
            accuracy: 0.8 + Math.random() * 0.2,
            precision: 0.7 + Math.random() * 0.3,
            recall: 0.75 + Math.random() * 0.25,
            f1: 0.72 + Math.random() * 0.28
        };
        
        // Update polygons
        updatePolygon(model1Polygon, model1Metrics);
        updatePolygon(model2Polygon, model2Metrics);
    }
    
    function updatePolygon(polygon, metrics) {
        const points = [
            { x: 0.5, y: 0.5 - metrics.accuracy * 0.5 },
            { x: 0.5 + metrics.precision * 0.5, y: 0.5 },
            { x: 0.5, y: 0.5 + metrics.recall * 0.5 },
            { x: 0.5 - metrics.f1 * 0.5, y: 0.5 }
        ];
        
        const path = points.map((p, i) => 
            `${i === 0 ? 'M' : 'L'} ${p.x * 100} ${p.y * 100}`
        ).join(' ');
        
        polygon.style.clipPath = `polygon(${points.map(p => `${p.x * 100}% ${p.y * 100}%`).join(', ')})`;
    }
    
    // Build Your Metric Game
    const gameContainer = document.querySelector('.game-container');
    const resetBtn = document.querySelector('.reset-btn');
    const checkBtn = document.querySelector('.check-btn');
    const gameFeedback = document.querySelector('.game-feedback');
    
    let gameState = {
        tp: 0,
        fp: 0,
        fn: 0,
        tn: 0
    };
    
    function resetGame() {
        gameState = {
            tp: 0,
            fp: 0,
            fn: 0,
            tn: 0
        };
        updateGameMetrics();
        gameFeedback.className = 'game-feedback';
    }
    
    function updateGameMetrics() {
        const accuracy = (gameState.tp + gameState.tn) / (gameState.tp + gameState.tn + gameState.fp + gameState.fn) || 0;
        const precision = gameState.tp / (gameState.tp + gameState.fp) || 0;
        const recall = gameState.tp / (gameState.tp + gameState.fn) || 0;
        const f1 = 2 * (precision * recall) / (precision + recall) || 0;
        
        return { accuracy, precision, recall, f1 };
    }
    
    function checkSolution() {
        const metrics = updateGameMetrics();
        const fpRate = gameState.fp / (gameState.fp + gameState.tn) || 0;
        
        if (fpRate < 0.1 && metrics.f1 > 0.8) {
            gameFeedback.className = 'game-feedback correct';
            gameFeedback.textContent = 'Great job! You achieved high F1-score while keeping false positives low.';
        } else {
            gameFeedback.className = 'game-feedback incorrect';
            gameFeedback.textContent = 'Try again! Remember to maximize F1-score while keeping false positives below 10%.';
        }
    }
    
    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }
    
    if (checkBtn) {
        checkBtn.addEventListener('click', checkSolution);
    }
    
    // Imbalance Simulator
    const ratioSlider = document.querySelector('.ratio-slider');
    const accuracyChart = document.querySelector('.accuracy-chart .chart-bar');
    const f1Chart = document.querySelector('.f1-chart .chart-bar');
    
    function updateImbalanceSimulator() {
        const ratio = parseInt(ratioSlider.value);
        const majorityClass = ratio > 50 ? 'positive' : 'negative';
        const majorityRatio = ratio > 50 ? ratio : 100 - ratio;
        
        // Update ratio display
        ratioSlider.nextElementSibling.textContent = `${ratio}:${100 - ratio}`;
        
        // Simulate metrics for imbalanced data
        const accuracy = majorityRatio / 100;
        const precision = majorityClass === 'positive' ? 0.9 : 0.1;
        const recall = majorityClass === 'positive' ? 0.1 : 0.9;
        const f1 = 2 * (precision * recall) / (precision + recall);
        
        // Update charts
        accuracyChart.style.width = `${accuracy * 100}%`;
        f1Chart.style.width = `${f1 * 100}%`;
    }
    
    if (ratioSlider) {
        ratioSlider.addEventListener('input', updateImbalanceSimulator);
        updateImbalanceSimulator();
    }
    
    // Initialize
    updateMetrics();
    updateModelComparison();
    setInterval(updateModelComparison, 5000); // Update comparison every 5 seconds
});

// McCulloch-Pitts Neuron Model Section
document.addEventListener('DOMContentLoaded', () => {
    // Neuron Simulator
    const inputToggles = document.querySelectorAll('.toggle-switch input');
    const weightSliders = document.querySelectorAll('.weight-slider');
    const thresholdSlider = document.querySelector('.threshold-slider');
    const inputNodes = document.querySelectorAll('.input-node');
    const connections = document.querySelectorAll('.connection');
    const neuronBody = document.querySelector('.neuron-body');
    const outputNode = document.querySelector('.output-node');
    
    function updateNeuron() {
        const x1 = document.querySelector('#x1-toggle').checked ? 1 : 0;
        const x2 = document.querySelector('#x2-toggle').checked ? 1 : 0;
        const w1 = parseFloat(document.querySelector('[data-weight="w1"]').value);
        const w2 = parseFloat(document.querySelector('[data-weight="w2"]').value);
        const theta = parseFloat(thresholdSlider.value);
        
        // Update input nodes
        inputNodes[0].querySelector('.node-value').textContent = x1;
        inputNodes[1].querySelector('.node-value').textContent = x2;
        
        // Update connections
        connections[0].style.transform = `scaleX(${w1})`;
        connections[1].style.transform = `scaleX(${w2})`;
        
        // Calculate activation
        const activation = w1 * x1 + w2 * x2;
        const output = activation >= theta ? 1 : 0;
        
        // Update neuron body
        neuronBody.querySelector('.activation-value').textContent = activation.toFixed(1);
        neuronBody.style.backgroundColor = output ? 'var(--accent-color)' : 'var(--bg-color)';
        
        // Update output node
        outputNode.querySelector('.node-value').textContent = output;
        outputNode.style.backgroundColor = output ? 'var(--accent-color)' : 'var(--bg-color)';
        
        // Update decision boundary
        updateDecisionBoundary(w1, w2, theta);
    }
    
    inputToggles.forEach(toggle => {
        toggle.addEventListener('change', updateNeuron);
    });
    
    weightSliders.forEach(slider => {
        slider.addEventListener('input', () => {
            slider.nextElementSibling.textContent = parseFloat(slider.value).toFixed(1);
            updateNeuron();
        });
    });
    
    if (thresholdSlider) {
        thresholdSlider.addEventListener('input', () => {
            thresholdSlider.nextElementSibling.textContent = parseFloat(thresholdSlider.value).toFixed(1);
            updateNeuron();
        });
    }
    
    // Decision Boundary
    const plotArea = document.querySelector('.plot-area');
    const decisionLine = document.querySelector('.decision-line');
    const dataPoints = document.querySelectorAll('.data-point');
    
    function updateDecisionBoundary(w1, w2, theta) {
        // Calculate line equation: w1*x1 + w2*x2 = theta
        const slope = -w1 / w2;
        const intercept = theta / w2;
        
        // Update decision line
        decisionLine.style.transform = `rotate(${Math.atan(slope) * (180 / Math.PI)}deg)`;
        decisionLine.style.top = `${(1 - intercept) * 100}%`;
        
        // Update data points
        dataPoints.forEach(point => {
            const x = parseFloat(point.dataset.x);
            const y = parseFloat(point.dataset.y);
            const activation = w1 * x + w2 * y;
            const output = activation >= theta ? 1 : 0;
            
            point.style.backgroundColor = output ? 'var(--accent-color)' : 'var(--bg-color)';
        });
    }
    
    // Logic Gate Implementation
    const gateCards = document.querySelectorAll('.gate-card');
    
    gateCards.forEach(card => {
        card.addEventListener('click', () => {
            const gate = card.dataset.gate;
            let w1, w2, theta;
            
            switch (gate) {
                case 'and':
                    w1 = 1;
                    w2 = 1;
                    theta = 2;
                    break;
                case 'or':
                    w1 = 1;
                    w2 = 1;
                    theta = 1;
                    break;
                case 'not':
                    w1 = -1;
                    w2 = 0;
                    theta = 0;
                    break;
            }
            
            // Update sliders
            document.querySelector('[data-weight="w1"]').value = w1;
            document.querySelector('[data-weight="w2"]').value = w2;
            thresholdSlider.value = theta;
            
            // Update displays
            document.querySelector('[data-weight="w1"]').nextElementSibling.textContent = w1.toFixed(1);
            document.querySelector('[data-weight="w2"]').nextElementSibling.textContent = w2.toFixed(1);
            thresholdSlider.nextElementSibling.textContent = theta.toFixed(1);
            
            // Update neuron
            updateNeuron();
        });
    });
    
    // Gate Challenge
    const challengeFeedback = document.querySelector('.challenge-feedback');
    
    function checkXORSolution() {
        const w1 = parseFloat(document.querySelector('[data-weight="w1"]').value);
        const w2 = parseFloat(document.querySelector('[data-weight="w2"]').value);
        const theta = parseFloat(thresholdSlider.value);
        
        // XOR truth table
        const inputs = [
            [0, 0], [0, 1], [1, 0], [1, 1]
        ];
        const expectedOutputs = [0, 1, 1, 0];
        
        let correct = true;
        for (let i = 0; i < inputs.length; i++) {
            const [x1, x2] = inputs[i];
            const activation = w1 * x1 + w2 * x2;
            const output = activation >= theta ? 1 : 0;
            
            if (output !== expectedOutputs[i]) {
                correct = false;
                break;
            }
        }
        
        if (correct) {
            challengeFeedback.className = 'challenge-feedback correct';
            challengeFeedback.textContent = 'Congratulations! You\'ve discovered why XOR requires multiple neurons.';
        } else {
            challengeFeedback.className = 'challenge-feedback incorrect';
            challengeFeedback.textContent = 'Try again! Remember that XOR cannot be implemented with a single MCP neuron.';
        }
    }
    
    // Neuron Evolution
    const neuronToggles = document.querySelectorAll('.toggle-btn');
    const mcpNeuron = document.querySelector('.mcp-neuron');
    const modernNeuron = document.querySelector('.modern-neuron');
    
    neuronToggles.forEach(toggle => {
        toggle.addEventListener('click', () => {
            neuronToggles.forEach(t => t.classList.remove('active'));
            toggle.classList.add('active');
            
            const neuronType = toggle.dataset.neuron;
            if (neuronType === 'mcp') {
                mcpNeuron.style.display = 'block';
                modernNeuron.style.display = 'none';
            } else {
                mcpNeuron.style.display = 'none';
                modernNeuron.style.display = 'block';
            }
        });
    });
    
    // Initialize
    updateNeuron();
}); 