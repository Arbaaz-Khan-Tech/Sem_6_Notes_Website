// Theme Toggle
const themeToggle = document.querySelector('.theme-toggle button');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use system preference
const currentTheme = localStorage.getItem('theme') || 
    (prefersDarkScheme.matches ? 'dark' : 'light');
document.documentElement.setAttribute('data-theme', currentTheme);
themeToggle.innerHTML = currentTheme === 'dark' ? '☀️' : '🌙';

themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    themeToggle.innerHTML = newTheme === 'dark' ? '☀️' : '🌙';
});

// Intersection Observer for Scroll Animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.activity-card, .mnemonic-bubbles, .quiz-widget, .cheatsheet').forEach(el => {
    observer.observe(el);
});

// Keyword Tooltips
document.querySelectorAll('.keyword').forEach(keyword => {
    const tooltip = keyword.getAttribute('data-tooltip');
    if (tooltip) {
        keyword.setAttribute('title', tooltip);
    }
});

// Activity Cards Hover Effect
document.querySelectorAll('.activity-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
    });
});

// Mnemonic Device Interaction
document.querySelectorAll('.bubble').forEach(bubble => {
    bubble.addEventListener('click', () => {
        const activity = bubble.getAttribute('data-activity');
        const explanation = document.querySelector(`.mnemonic-explanation p[data-activity="${activity}"]`);
        
        if (explanation) {
            explanation.style.display = explanation.style.display === 'none' ? 'block' : 'none';
        }
    });
});

// Quiz Widget
const quizContainer = document.querySelector('.quiz-container');
const quizQuestion = document.querySelector('.quiz-question');
const quizOptions = document.querySelector('.quiz-options');
const quizResult = document.querySelector('.quiz-result');
const resultText = document.querySelector('.result-text');
const tryAgainBtn = document.querySelector('.try-again-btn');

const quizData = [
    {
        question: "Which of the following is NOT an Umbrella Activity in Software Engineering?",
        options: [
            "Project Management",
            "Quality Assurance",
            "Code Implementation",
            "Risk Management"
        ],
        correct: 2
    },
    {
        question: "What is the primary purpose of Umbrella Activities?",
        options: [
            "To write better code",
            "To manage and support the entire software development process",
            "To create user interfaces",
            "To optimize database queries"
        ],
        correct: 1
    },
    {
        question: "Which Umbrella Activity focuses on identifying and mitigating potential project risks?",
        options: [
            "Quality Assurance",
            "Risk Management",
            "Process Improvement",
            "Technical Reviews"
        ],
        correct: 1
    }
];

let currentQuizIndex = 0;
let score = 0;

function loadQuiz() {
    const currentQuiz = quizData[currentQuizIndex];
    quizQuestion.textContent = currentQuiz.question;
    quizOptions.innerHTML = '';
    
    currentQuiz.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.innerHTML = `
            <span class="option-label">${String.fromCharCode(65 + index)}</span>
            <span>${option}</span>
        `;
        
        optionElement.addEventListener('click', () => checkAnswer(index));
        quizOptions.appendChild(optionElement);
    });
    
    quizResult.style.display = 'none';
    quizOptions.style.display = 'flex';
}

function checkAnswer(selectedIndex) {
    const currentQuiz = quizData[currentQuizIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    options.forEach(option => option.style.pointerEvents = 'none');
    
    if (selectedIndex === currentQuiz.correct) {
        score++;
        options[selectedIndex].style.backgroundColor = 'var(--quiz-correct)';
    } else {
        options[selectedIndex].style.backgroundColor = 'var(--quiz-incorrect)';
        options[currentQuiz.correct].style.backgroundColor = 'var(--quiz-correct)';
    }
    
    setTimeout(() => {
        currentQuizIndex++;
        
        if (currentQuizIndex < quizData.length) {
            loadQuiz();
        } else {
            showResult();
        }
    }, 1500);
}

function showResult() {
    quizOptions.style.display = 'none';
    quizResult.style.display = 'block';
    resultText.textContent = `You scored ${score} out of ${quizData.length}!`;
}

tryAgainBtn.addEventListener('click', () => {
    currentQuizIndex = 0;
    score = 0;
    loadQuiz();
});

// Initialize Quiz
loadQuiz();

// Downloadable Cheatsheet
const downloadBtn = document.querySelector('.download-btn');
downloadBtn.addEventListener('click', () => {
    const cheatsheetContent = `
Software Engineering Umbrella Activities Cheatsheet

1. Project Management
   - Planning and tracking
   - Resource allocation
   - Risk assessment
   - Timeline management

2. Quality Assurance
   - Code reviews
   - Testing strategies
   - Quality metrics
   - Standards compliance

3. Risk Management
   - Risk identification
   - Impact analysis
   - Mitigation strategies
   - Contingency planning

4. Technical Reviews
   - Code inspection
   - Design review
   - Architecture assessment
   - Performance evaluation

5. Process Improvement
   - Best practices
   - Methodology refinement
   - Tool selection
   - Team training

Mnemonic: PQRST
P - Project Management
Q - Quality Assurance
R - Risk Management
S - Technical Reviews
T - Process Improvement
    `;
    
    const blob = new Blob([cheatsheetContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sepm-umbrella-activities-cheatsheet.txt';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
});

// Initialize Mermaid.js Diagram
mermaid.initialize({
    startOnLoad: true,
    theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'default',
    securityLevel: 'loose',
    flowchart: {
        curve: 'basis'
    }
});

// Update Mermaid theme when theme changes
themeToggle.addEventListener('click', () => {
    const newTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    mermaid.initialize({
        theme: newTheme === 'dark' ? 'dark' : 'default'
    });
    mermaid.init(undefined, '.mermaid');
});

// Functional vs. Non-Functional Requirements Section
document.addEventListener('DOMContentLoaded', () => {
    // Interactive Demo Button
    const demoButton = document.querySelector('.demo-button');
    const demoResult = document.querySelector('.demo-result');
    
    if (demoButton && demoResult) {
        demoButton.addEventListener('click', () => {
            demoResult.style.opacity = '1';
            demoResult.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                demoResult.style.opacity = '0';
                demoResult.style.transform = 'translateY(10px)';
            }, 3000);
        });
    }
    
    // Comparison Table Hover Effects
    const tableRows = document.querySelectorAll('.comparison-table tr[data-row]');
    
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', () => {
            const rowType = row.getAttribute('data-row');
            const cells = row.querySelectorAll('td');
            
            cells.forEach(cell => {
                if (rowType === 'focus') {
                    if (cell === cells[1]) {
                        cell.style.backgroundColor = 'rgba(74, 108, 247, 0.1)';
                    } else if (cell === cells[2]) {
                        cell.style.backgroundColor = 'rgba(138, 122, 255, 0.1)';
                    }
                } else if (rowType === 'testing') {
                    if (cell === cells[1]) {
                        cell.style.backgroundColor = 'rgba(74, 108, 247, 0.1)';
                    } else if (cell === cells[2]) {
                        cell.style.backgroundColor = 'rgba(138, 122, 255, 0.1)';
                    }
                }
            });
        });
        
        row.addEventListener('mouseleave', () => {
            const cells = row.querySelectorAll('td');
            cells.forEach(cell => {
                cell.style.backgroundColor = '';
            });
        });
    });
    
    // Example Cell Tooltips
    const exampleCells = document.querySelectorAll('.example-cell');
    
    exampleCells.forEach(cell => {
        const exampleType = cell.getAttribute('data-example');
        let tooltipContent = '';
        
        if (exampleType === 'fr') {
            tooltipContent = `
                <div class="tooltip-content">
                    <h4>Functional Requirement Example</h4>
                    <p>The "Add to cart" button is a functional requirement because it defines a specific action the system must perform.</p>
                    <p>When clicked, the system must:</p>
                    <ul>
                        <li>Add the selected item to the user's cart</li>
                        <li>Update the cart count in the UI</li>
                        <li>Show a confirmation message</li>
                    </ul>
                </div>
            `;
        } else if (exampleType === 'nfr') {
            tooltipContent = `
                <div class="tooltip-content">
                    <h4>Non-Functional Requirement Example</h4>
                    <p>"Page loads in 1.5s" is a non-functional requirement because it defines a quality attribute of the system.</p>
                    <p>This requirement:</p>
                    <ul>
                        <li>Specifies a performance metric</li>
                        <li>Can be measured and tested</li>
                        <li>Applies to the entire system, not just one feature</li>
                    </ul>
                </div>
            `;
        }
        
        cell.addEventListener('click', () => {
            // Remove any existing tooltips
            const existingTooltip = document.querySelector('.example-tooltip');
            if (existingTooltip) {
                existingTooltip.remove();
            }
            
            // Create and show new tooltip
            const tooltip = document.createElement('div');
            tooltip.className = 'example-tooltip';
            tooltip.innerHTML = tooltipContent;
            
            // Position the tooltip
            const rect = cell.getBoundingClientRect();
            tooltip.style.position = 'absolute';
            tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;
            tooltip.style.left = `${rect.left + window.scrollX}px`;
            
            document.body.appendChild(tooltip);
            
            // Close tooltip when clicking outside
            document.addEventListener('click', function closeTooltip(e) {
                if (!tooltip.contains(e.target) && e.target !== cell) {
                    tooltip.remove();
                    document.removeEventListener('click', closeTooltip);
                }
            });
        });
    });
    
    // Drag and Drop Quiz
    const dragItems = document.querySelectorAll('.drag-item');
    const dropZones = document.querySelectorAll('.drop-zone');
    const checkAnswersBtn = document.querySelector('.check-answers-btn');
    const quizFeedback = document.querySelector('.quiz-feedback');
    
    if (dragItems.length && dropZones.length && checkAnswersBtn && quizFeedback) {
        // Drag and drop functionality
        dragItems.forEach(item => {
            item.addEventListener('dragstart', () => {
                item.classList.add('dragging');
            });
            
            item.addEventListener('dragend', () => {
                item.classList.remove('dragging');
            });
        });
        
        dropZones.forEach(zone => {
            zone.addEventListener('dragover', e => {
                e.preventDefault();
                zone.classList.add('drag-over');
            });
            
            zone.addEventListener('dragleave', () => {
                zone.classList.remove('drag-over');
            });
            
            zone.addEventListener('drop', e => {
                e.preventDefault();
                zone.classList.remove('drag-over');
                
                const draggedItem = document.querySelector('.dragging');
                if (draggedItem) {
                    const droppedItems = zone.querySelector('.dropped-items');
                    droppedItems.appendChild(draggedItem);
                }
            });
        });
        
        // Check answers functionality
        checkAnswersBtn.addEventListener('click', () => {
            let correctCount = 0;
            const totalItems = dragItems.length;
            
            dropZones.forEach(zone => {
                const category = zone.getAttribute('data-category');
                const droppedItems = zone.querySelectorAll('.dropped-items .drag-item');
                
                droppedItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory === category) {
                        correctCount++;
                        item.style.backgroundColor = 'rgba(32, 191, 107, 0.2)';
                    } else {
                        item.style.backgroundColor = 'rgba(252, 92, 101, 0.2)';
                    }
                });
            });
            
            // Show feedback
            if (correctCount === totalItems) {
                quizFeedback.textContent = 'Perfect! All requirements are correctly categorized.';
                quizFeedback.className = 'quiz-feedback correct';
            } else {
                quizFeedback.textContent = `You got ${correctCount} out of ${totalItems} correct. Try again!`;
                quizFeedback.className = 'quiz-feedback incorrect';
            }
        });
    }
    
    // Industry Examples Tabs
    const industryTabs = document.querySelectorAll('.industry-tab');
    const industryPanels = document.querySelectorAll('.industry-panel');
    
    if (industryTabs.length && industryPanels.length) {
        industryTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                const industry = tab.getAttribute('data-industry');
                
                // Update active tab
                industryTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                
                // Show corresponding panel
                industryPanels.forEach(panel => {
                    if (panel.getAttribute('data-industry') === industry) {
                        panel.classList.add('active');
                    } else {
                        panel.classList.remove('active');
                    }
                });
            });
        });
    }
}); 