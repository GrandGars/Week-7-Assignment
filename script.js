// ===== PART 1: CSS3 ANIMATIONS (Pure CSS - No JS needed for this part) =====
// All animations in this part are handled by CSS only

// ===== PART 2: JAVASCRIPT FUNCTIONS - SCOPE, PARAMETERS & RETURN VALUES =====

// Global scope variable
let globalCounter = 0;
let functionCallCount = 0;

/**
 * Calculator Functions - Demonstrates parameters and return values
 */

// Addition function
function addNumbers(a, b) {
    functionCallCount++;
    return a + b;
}

// Subtraction function
function subtractNumbers(a, b) {
    functionCallCount++;
    return a - b;
}

// Multiplication function
function multiplyNumbers(a, b) {
    functionCallCount++;
    return a * b;
}

// Division function with error handling
function divideNumbers(a, b) {
    functionCallCount++;
    if (b === 0) {
        throw new Error("Cannot divide by zero");
    }
    return a / b;
}

/**
 * Scope Demonstration Functions
 */

// Function demonstrating local scope
function demonstrateScope() {
    // Local scope variable
    let localCounter = 0;
    
    functionCallCount++;
    globalCounter++;
    localCounter++;
    
    return {
        global: globalCounter,
        local: localCounter,
        calls: functionCallCount
    };
}

/**
 * String Manipulation Functions
 */

// Reverse string function
function reverseString(str) {
    functionCallCount++;
    return str.split('').reverse().join('');
}

// Convert to uppercase
function toUpperCase(str) {
    functionCallCount++;
    return str.toUpperCase();
}

// Convert to lowercase
function toLowerCase(str) {
    functionCallCount++;
    return str.toLowerCase();
}

// Count characters
function countCharacters(str) {
    functionCallCount++;
    return str.length;
}

/**
 * Utility function to update UI with function results
 */
function updateFunctionResults() {
    document.getElementById('globalCounter').textContent = globalCounter;
    document.getElementById('functionCalls').textContent = functionCallCount;
}

// ===== PART 3: COMBINING CSS ANIMATIONS WITH JAVASCRIPT =====

/**
 * Animation Controller System
 */
class AnimationController {
    constructor() {
        this.isAnimating = false;
        this.animationBox = document.getElementById('jsAnimatedBox');
        this.statusElement = document.getElementById('animationStatus');
    }
    
    // Start animation
    startAnimation() {
        this.isAnimating = true;
        this.animationBox.classList.add('animated');
        this.statusElement.textContent = 'Running';
        this.statusElement.style.color = '#4ade80';
    }
    
    // Stop animation
    stopAnimation() {
        this.isAnimating = false;
        this.animationBox.classList.remove('animated');
        this.statusElement.textContent = 'Stopped';
        this.statusElement.style.color = '#f87171';
    }
    
    // Reset position
    resetPosition() {
        this.animationBox.style.transform = 'translate(0, 0) rotate(0deg)';
        this.animationBox.style.transition = 'all 0.5s ease';
    }
    
    // Random move animation
    randomMove() {
        const randomX = Math.floor(Math.random() * 200 - 100);
        const randomY = Math.floor(Math.random() * 200 - 100);
        const randomRotate = Math.floor(Math.random() * 360);
        
        this.animationBox.style.transform = 
            `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`;
        this.animationBox.style.transition = 'all 0.5s ease';
    }
}

/**
 * Card Flip Memory Game
 */
class MemoryGame {
    constructor() {
        this.cards = ['A', 'B', 'C', 'D', 'A', 'B', 'C', 'D'];
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.gameStarted = false;
        this.container = document.getElementById('cardContainer');
        this.matchCountElement = document.getElementById('matchCount');
    }
    
    // Initialize game
    initGame() {
        this.container.innerHTML = '';
        this.flippedCards = [];
        this.matchedPairs = 0;
        this.gameStarted = true;
        this.matchCountElement.textContent = '0';
        
        // Shuffle cards
        const shuffledCards = [...this.cards].sort(() => Math.random() - 0.5);
        
        // Create card elements
        shuffledCards.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = 'memory-card';
            cardElement.innerHTML = `
                <div class="card-inner">
                    <div class="card-front">?</div>
                    <div class="card-back">${card}</div>
                </div>
            `;
            
            cardElement.addEventListener('click', () => this.flipCard(cardElement, card));
            this.container.appendChild(cardElement);
        });
    }
    
    // Flip card
    flipCard(cardElement, cardValue) {
        if (!this.gameStarted || cardElement.classList.contains('flipped') || this.flippedCards.length >= 2) {
            return;
        }
        
        cardElement.classList.add('flipped');
        this.flippedCards.push({ element: cardElement, value: cardValue });
        
        if (this.flippedCards.length === 2) {
            this.checkForMatch();
        }
    }
    
    // Check for matching cards
    checkForMatch() {
        const [card1, card2] = this.flippedCards;
        
        if (card1.value === card2.value) {
            // Match found
            card1.element.classList.add('matched');
            card2.element.classList.add('matched');
            this.matchedPairs++;
            this.matchCountElement.textContent = this.matchedPairs;
            this.flippedCards = [];
            
            // Check for game completion
            if (this.matchedPairs === 4) {
                setTimeout(() => {
                    alert('Congratulations! You won the game!');
                }, 500);
            }
        } else {
            // No match - flip back after delay
            setTimeout(() => {
                card1.element.classList.remove('flipped');
                card2.element.classList.remove('flipped');
                this.flippedCards = [];
            }, 1000);
        }
    }
    
    // Reset game
    resetGame() {
        this.gameStarted = false;
        this.initGame();
    }
}

/**
 * Modal System
 */
class ModalSystem {
    constructor() {
        this.modals = {
            success: document.getElementById('successModal'),
            warning: document.getElementById('warningModal'),
            info: document.getElementById('infoModal')
        };
        
        this.initModals();
    }
    
    initModals() {
        // Add click events to modal buttons
        document.querySelectorAll('.modal-btn').forEach(button => {
            button.addEventListener('click', (e) => {
                const modalType = e.target.dataset.modal;
                this.openModal(modalType);
            });
        });
        
        // Add click events to close buttons
        document.querySelectorAll('.close-modal').forEach(button => {
            button.addEventListener('click', (e) => {
                const modal = e.target.closest('.modal');
                this.closeModal(modal);
            });
        });
        
        // Close modal when clicking outside
        Object.values(this.modals).forEach(modal => {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal(modal);
                }
            });
        });
    }
    
    openModal(modalType) {
        const modal = this.modals[modalType];
        if (modal) {
            modal.style.display = 'block';
            modal.classList.add('active');
        }
    }
    
    closeModal(modal) {
        modal.style.display = 'none';
        modal.classList.remove('active');
    }
}

/**
 * Particle System
 */
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.animationId = null;
        
        this.initParticles();
    }
    
    initParticles() {
        // Add initial particles
        for (let i = 0; i < 20; i++) {
            this.addParticle();
        }
        this.animate();
    }
    
    addParticle() {
        const particle = {
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 5 + 2,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            color: `hsl(${Math.random() * 360}, 70%, 60%)`
        };
        this.particles.push(particle);
    }
    
    explodeParticles() {
        this.particles.forEach(particle => {
            particle.speedX = (Math.random() - 0.5) * 10;
            particle.speedY = (Math.random() - 0.5) * 10;
        });
    }
    
    clearParticles() {
        this.particles = [];
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.speedX;
            particle.y += particle.speedY;
            
            // Bounce off walls
            if (particle.x < 0 || particle.x > this.canvas.width) {
                particle.speedX *= -1;
            }
            if (particle.y < 0 || particle.y > this.canvas.height) {
                particle.speedY *= -1;
            }
            
            // Apply friction
            particle.speedX *= 0.99;
            particle.speedY *= 0.99;
            
            // Draw particle
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = particle.color;
            this.ctx.fill();
            
            // Draw connections
            this.particles.forEach((otherParticle, otherIndex) => {
                if (index !== otherIndex) {
                    const dx = particle.x - otherParticle.x;
                    const dy = particle.y - otherParticle.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < 100) {
                        this.ctx.beginPath();
                        this.ctx.strokeStyle = `rgba(255, 255, 255, ${0.2 - distance / 500})`;
                        this.ctx.lineWidth = 1;
                        this.ctx.moveTo(particle.x, particle.y);
                        this.ctx.lineTo(otherParticle.x, otherParticle.y);
                        this.ctx.stroke();
                    }
                }
            });
        });
        
        this.animationId = requestAnimationFrame(() => this.animate());
    }
}

// ===== INITIALIZATION AND EVENT LISTENERS =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize systems
    const animationController = new AnimationController();
    const memoryGame = new MemoryGame();
    const modalSystem = new ModalSystem();
    const particleSystem = new ParticleSystem();
    
    // ===== CALCULATOR EVENT LISTENERS =====
    const calcButtons = document.querySelectorAll('.calc-btn');
    const num1Input = document.getElementById('num1');
    const num2Input = document.getElementById('num2');
    const calcResult = document.getElementById('calcResult');
    
    calcButtons.forEach(button => {
        button.addEventListener('click', function() {
            const operation = this.dataset.operation;
            const num1 = parseFloat(num1Input.value) || 0;
            const num2 = parseFloat(num2Input.value) || 0;
            let result;
            
            try {
                switch(operation) {
                    case 'add':
                        result = addNumbers(num1, num2);
                        break;
                    case 'subtract':
                        result = subtractNumbers(num1, num2);
                        break;
                    case 'multiply':
                        result = multiplyNumbers(num1, num2);
                        break;
                    case 'divide':
                        result = divideNumbers(num1, num2);
                        break;
                    default:
                        result = 0;
                }
                
                calcResult.textContent = result;
                calcResult.style.color = '#27ae60';
                
                // Add visual feedback
                this.style.transform = 'scale(0.95)';
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 150);
                
            } catch (error) {
                calcResult.textContent = 'Error: ' + error.message;
                calcResult.style.color = '#e74c3c';
            }
            
            updateFunctionResults();
        });
    });
    
    // ===== SCOPE DEMONSTRATION EVENT LISTENER =====
    const scopeDemoBtn = document.getElementById('scopeDemoBtn');
    const localCounterElement = document.getElementById('localCounter');
    
    scopeDemoBtn.addEventListener('click', function() {
        const scopeResult = demonstrateScope();
        localCounterElement.textContent = scopeResult.local;
        updateFunctionResults();
        
        // Add visual feedback
        this.style.background = '#4ade80';
        setTimeout(() => {
            this.style.background = '';
        }, 300);
    });
    
    // ===== STRING MANIPULATION EVENT LISTENERS =====
    const stringButtons = document.querySelectorAll('.string-btn');
    const stringInput = document.getElementById('stringInput');
    const stringResult = document.getElementById('stringResult');
    
    stringButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            const inputText = stringInput.value;
            let result;
            
            switch(action) {
                case 'reverse':
                    result = reverseString(inputText);
                    break;
                case 'uppercase':
                    result = toUpperCase(inputText);
                    break;
                case 'lowercase':
                    result = toLowerCase(inputText);
                    break;
                case 'count':
                    result = countCharacters(inputText);
                    break;
                default:
                    result = inputText;
            }
            
            stringResult.textContent = result;
            stringResult.style.color = '#667eea';
            
            // Add visual feedback
            this.style.transform = 'translateY(-3px)';
            setTimeout(() => {
                this.style.transform = 'translateY(0)';
            }, 200);
            
            updateFunctionResults();
        });
    });
    
    // ===== ANIMATION CONTROLLER EVENT LISTENERS =====
    const controlButtons = document.querySelectorAll('.control-btn');
    
    controlButtons.forEach(button => {
        button.addEventListener('click', function() {
            const action = this.dataset.action;
            
            switch(action) {
                case 'start':
                    animationController.startAnimation();
                    break;
                case 'stop':
                    animationController.stopAnimation();
                    break;
                case 'reset':
                    animationController.resetPosition();
                    break;
                case 'random':
                    animationController.randomMove();
                    break;
            }
            
            // Add visual feedback
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
        });
    });
    
    // ===== MEMORY GAME EVENT LISTENERS =====
    document.getElementById('startGame').addEventListener('click', function() {
        memoryGame.initGame();
        this.style.background = '#4ade80';
    });
    
    document.getElementById('resetGame').addEventListener('click', function() {
        memoryGame.resetGame();
        this.style.background = '#f87171';
    });
    
    // ===== PARTICLE SYSTEM EVENT LISTENERS =====
    document.getElementById('addParticles').addEventListener('click', function() {
        for (let i = 0; i < 10; i++) {
            particleSystem.addParticle();
        }
    });
    
    document.getElementById('clearParticles').addEventListener('click', function() {
        particleSystem.clearParticles();
    });
    
    document.getElementById('explodeParticles').addEventListener('click', function() {
        particleSystem.explodeParticles();
    });
    
    // ===== HERO BUTTON EVENT LISTENER =====
    document.getElementById('exploreBtn').addEventListener('click', function() {
        // Scroll to animations section
        document.getElementById('animations').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
        // Add pulse animation to the section
        const animationsSection = document.getElementById('animations');
        animationsSection.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
            animationsSection.style.animation = '';
        }, 1000);
    });
    
    // ===== ADDITIONAL INTERACTIVE EFFECTS =====
    
    // Add hover effects to all buttons
    const allButtons = document.querySelectorAll('button');
    allButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0, 0, 0, 0.15)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '';
        });
    });
    
    // Add click effects to cards in transform gallery
    const transformCards = document.querySelectorAll('.transform-card');
    transformCards.forEach(card => {
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
    
    console.log('All JavaScript functionality loaded successfully!');
    console.log('Available systems:');
    console.log('- Animation Controller: Control CSS animations with JavaScript');
    console.log('- Memory Game: Card matching game with flip animations');
    console.log('- Modal System: Animated modal windows');
    console.log('- Particle System: Interactive particle physics');
    console.log('- Calculator: Mathematical functions with parameters and return values');
    console.log('- String Manipulator: Text transformation functions');
});