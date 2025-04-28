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

    // Interactive Regularization Demo
    const lambdaSlider = document.getElementById('lambdaSlider');
    const lambdaValue = document.querySelector('.lambda-value');
    const beforePlot = document.getElementById('beforePlot');
    const afterPlot = document.getElementById('afterPlot');

    // Initialize plots
    const beforeCtx = beforePlot.getContext('2d');
    const afterCtx = afterPlot.getContext('2d');

    // Generate sample data
    const generateData = () => {
        const data = [];
        for (let i = 0; i < 20; i++) {
            const x = i * 0.5;
            const y = 2 * x + Math.random() * 4 - 2;
            data.push({ x, y });
        }
        return data;
    };

    const data = generateData();

    // Draw scatter plot
    function drawScatterPlot(ctx, data, lambda = 0) {
        ctx.clearRect(0, 0, beforePlot.width, beforePlot.height);
        
        // Set up coordinate system
        const padding = 40;
        const width = beforePlot.width - 2 * padding;
        const height = beforePlot.height - 2 * padding;
        
        // Draw axes
        ctx.beginPath();
        ctx.strokeStyle = '#666';
        ctx.moveTo(padding, padding);
        ctx.lineTo(padding, beforePlot.height - padding);
        ctx.lineTo(beforePlot.width - padding, beforePlot.height - padding);
        ctx.stroke();
        
        // Draw data points
        data.forEach(point => {
            ctx.beginPath();
            ctx.fillStyle = '#3498db';
            ctx.arc(
                padding + point.x * width / 10,
                beforePlot.height - padding - point.y * height / 20,
                4, 0, 2 * Math.PI
            );
            ctx.fill();
        });
        
        // Calculate and draw regression line
        const n = data.length;
        let sumX = 0, sumY = 0, sumXY = 0, sumX2 = 0;
        
        data.forEach(point => {
            sumX += point.x;
            sumY += point.y;
            sumXY += point.x * point.y;
            sumX2 += point.x * point.x;
        });
        
        const slope = (n * sumXY - sumX * sumY) / (n * sumX2 - sumX * sumX);
        const intercept = (sumY - slope * sumX) / n;
        
        // Apply regularization
        const regularizedSlope = slope / (1 + lambda);
        const regularizedIntercept = intercept / (1 + lambda);
        
        // Draw line
        ctx.beginPath();
        ctx.strokeStyle = '#e74c3c';
        ctx.lineWidth = 2;
        ctx.moveTo(padding, beforePlot.height - padding - (regularizedIntercept * height / 20));
        ctx.lineTo(
            beforePlot.width - padding,
            beforePlot.height - padding - ((regularizedSlope * 10 + regularizedIntercept) * height / 20)
        );
        ctx.stroke();
    }

    // Update plots when lambda changes
    lambdaSlider.addEventListener('input', (e) => {
        const lambda = parseFloat(e.target.value);
        lambdaValue.textContent = lambda;
        
        drawScatterPlot(beforeCtx, data, 0);
        drawScatterPlot(afterCtx, data, lambda);
    });

    // Initial draw
    drawScatterPlot(beforeCtx, data, 0);
    drawScatterPlot(afterCtx, data, 0);

    // Ridge vs Lasso tabs
    const regTabs = document.querySelectorAll('.reg-tab');
    const regPanels = document.querySelectorAll('.reg-panel');

    regTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            regTabs.forEach(t => t.classList.remove('active'));
            regPanels.forEach(p => p.classList.remove('active'));

            tab.classList.add('active');
            const panelId = tab.getAttribute('data-tab');
            document.getElementById(panelId).classList.add('active');
        });
    });

    // House price prediction demo
    const houseSlider = document.querySelector('.house-slider input');
    const sizeValue = document.querySelector('.size-value');
    const predictedPrice = document.querySelector('.predicted-price');

    houseSlider.addEventListener('input', (e) => {
        const size = e.target.value;
        sizeValue.textContent = `${size} sq ft`;
        
        const price = 5000 * size;
        predictedPrice.textContent = `$${price.toLocaleString()}`;
    });

    // Factor weights demo
    const weightBars = document.querySelectorAll('.weight-bar');
    let currentWeights = [0.7, 0.5, 0.3];

    function updateWeights() {
        weightBars.forEach((bar, index) => {
            const width = currentWeights[index] * 100;
            bar.style.width = `${width}%`;
        });
    }

    setInterval(() => {
        currentWeights = currentWeights.map(w => {
            const change = (Math.random() - 0.5) * 0.1;
            return Math.max(0, Math.min(1, w + change));
        });
        updateWeights();
    }, 2000);

    // Quiz functionality
    const quizOptions = document.querySelectorAll('.quiz-option input');
    const resultText = document.querySelector('.result-text');
    const tryAgainBtn = document.querySelector('.try-again-btn');

    quizOptions.forEach(option => {
        option.addEventListener('change', (e) => {
            const selectedValue = e.target.value;
            if (selectedValue === 'lasso') {
                resultText.textContent = 'Correct! Lasso is better for feature selection.';
                resultText.style.color = '#2ecc71';
            } else {
                resultText.textContent = 'Incorrect. Lasso is better for feature selection.';
                resultText.style.color = '#e74c3c';
            }
        });
    });

    tryAgainBtn.addEventListener('click', () => {
        quizOptions.forEach(option => option.checked = false);
        resultText.textContent = '';
    });

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