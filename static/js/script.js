// Form validation and enhancement
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('predictionForm');
    const submitBtn = form.querySelector('.predict-btn');
    
    // Add loading state to submit button
    form.addEventListener('submit', function(e) {
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing...';
        submitBtn.disabled = true;
    });
    
    // Form validation
    const requiredFields = form.querySelectorAll('[required]');
    
    requiredFields.forEach(field => {
        field.addEventListener('blur', validateField);
        field.addEventListener('input', validateField);
    });
    
    function validateField(e) {
        const field = e.target;
        const value = field.value.trim();
        
        // Remove existing error styling
        field.classList.remove('error');
        
        // Check if field is empty
        if (!value) {
            showFieldError(field, 'This field is required');
            return false;
        }
        
        // Specific validations
        switch(field.name) {
            case 'age':
                if (value < 1 || value > 120) {
                    showFieldError(field, 'Age must be between 1 and 120');
                    return false;
                }
                break;
                
            case 'resting_bp':
                if (value < 80 || value > 200) {
                    showFieldError(field, 'Resting BP should be between 80-200 mmHg');
                    return false;
                }
                break;
                
            case 'cholesterol':
                if (value < 0 || value > 600) {
                    showFieldError(field, 'Cholesterol should be between 0-600 mg/dL');
                    return false;
                }
                break;
                
            case 'max_hr':
                if (value < 60 || value > 220) {
                    showFieldError(field, 'Max HR should be between 60-220 bpm');
                    return false;
                }
                break;
                
            case 'oldpeak':
                if (value < 0 || value > 10) {
                    showFieldError(field, 'Oldpeak should be between 0-10');
                    return false;
                }
                break;
        }
        
        // Clear error if validation passes
        clearFieldError(field);
        return true;
    }
    
    function showFieldError(field, message) {
        field.classList.add('error');
        
        // Remove existing error message
        const existingError = field.parentNode.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
        
        // Add new error message
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentNode.appendChild(errorDiv);
    }
    
    function clearFieldError(field) {
        field.classList.remove('error');
        const errorMessage = field.parentNode.querySelector('.error-message');
        if (errorMessage) {
            errorMessage.remove();
        }
    }
    
    // Form submission validation
    form.addEventListener('submit', function(e) {
        let isValid = true;
        
        requiredFields.forEach(field => {
            if (!validateField({target: field})) {
                isValid = false;
            }
        });
        
        if (!isValid) {
            e.preventDefault();
            submitBtn.innerHTML = '<i class="fas fa-stethoscope"></i> Predict Heart Disease Risk';
            submitBtn.disabled = false;
            
            // Scroll to first error
            const firstError = form.querySelector('.error');
            if (firstError) {
                firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
                firstError.focus();
            }
        }
    });
    
    // Add helpful tooltips
    addTooltips();
    
    // Add smooth scrolling for better UX
    addSmoothScrolling();
    
    // Add form progress indicator
    addProgressIndicator();
});

function addTooltips() {
    const tooltips = {
        'chest_pain_type': 'ATA: Atypical Angina, NAP: Non-Anginal Pain, ASY: Asymptomatic, TA: Typical Angina',
        'resting_ecg': 'Normal: Normal ECG, ST: ST-T wave abnormality, LVH: Left ventricular hypertrophy',
        'st_slope': 'The slope of the peak exercise ST segment',
        'oldpeak': 'ST depression induced by exercise relative to rest'
    };
    
    Object.keys(tooltips).forEach(fieldName => {
        const field = document.getElementById(fieldName);
        if (field) {
            field.title = tooltips[fieldName];
        }
    });
}

function addSmoothScrolling() {
    // Smooth scroll to form when page loads
    const form = document.getElementById('predictionForm');
    if (form) {
        setTimeout(() => {
            form.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 500);
    }
}

function addProgressIndicator() {
    const form = document.getElementById('predictionForm');
    const requiredFields = form.querySelectorAll('[required]');
    
    // Create progress bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    progressContainer.innerHTML = `
        <div class="progress-bar">
            <div class="progress-fill"></div>
        </div>
        <div class="progress-text">0% Complete</div>
    `;
    
    // Insert progress bar after header
    const header = document.querySelector('header');
    header.insertAdjacentElement('afterend', progressContainer);
    
    const progressFill = progressContainer.querySelector('.progress-fill');
    const progressText = progressContainer.querySelector('.progress-text');
    
    function updateProgress() {
        const filledFields = Array.from(requiredFields).filter(field => 
            field.value.trim() !== ''
        ).length;
        
        const percentage = Math.round((filledFields / requiredFields.length) * 100);
        
        progressFill.style.width = percentage + '%';
        progressText.textContent = percentage + '% Complete';
        
        // Change color based on progress
        if (percentage < 50) {
            progressFill.style.background = 'linear-gradient(90deg, #e74c3c, #c0392b)';
        } else if (percentage < 80) {
            progressFill.style.background = 'linear-gradient(90deg, #f39c12, #e67e22)';
        } else if (percentage < 100) {
            progressFill.style.background = 'linear-gradient(90deg, #f1c40f, #f39c12)';
        } else {
            progressFill.style.background = 'linear-gradient(90deg, #27ae60, #2ecc71)';
        }
    }
    
    // Update progress on field changes
    requiredFields.forEach(field => {
        field.addEventListener('input', updateProgress);
        field.addEventListener('change', updateProgress);
    });
    
    // Initial progress calculation
    updateProgress();
}

// Add CSS for error styling and progress bar
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #e74c3c !important;
        background-color: #fdf2f2 !important;
    }
    
    .error-message {
        color: #e74c3c;
        font-size: 0.9em;
        margin-top: 5px;
        font-weight: 500;
    }
    
    .progress-container {
        background: rgba(255, 255, 255, 0.95);
        padding: 20px;
        border-radius: 15px;
        margin-bottom: 20px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
        backdrop-filter: blur(10px);
    }
    
    .progress-bar {
        width: 100%;
        height: 10px;
        background: #ecf0f1;
        border-radius: 5px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    
    .progress-fill {
        height: 100%;
        width: 0%;
        background: linear-gradient(90deg, #e74c3c, #c0392b);
        border-radius: 5px;
        transition: all 0.3s ease;
    }
    
    .progress-text {
        text-align: center;
        color: #2c3e50;
        font-weight: 600;
        font-size: 1.1em;
    }
    
    @media (max-width: 768px) {
        .progress-container {
            padding: 15px;
        }
        
        .progress-text {
            font-size: 1em;
        }
    }
`;

document.head.appendChild(style);

// Add interactive features for result pages
if (window.location.pathname.includes('result')) {
    // Add animation to result cards
    const resultCard = document.querySelector('.result-card');
    if (resultCard) {
        resultCard.style.opacity = '0';
        resultCard.style.transform = 'translateY(30px)';
        
        setTimeout(() => {
            resultCard.style.transition = 'all 0.6s ease';
            resultCard.style.opacity = '1';
            resultCard.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add click to copy functionality for important information
    const emergencyInfo = document.querySelector('.emergency-info');
    if (emergencyInfo) {
        emergencyInfo.style.cursor = 'pointer';
        emergencyInfo.title = 'Click to copy emergency information';
        
        emergencyInfo.addEventListener('click', function() {
            const text = this.textContent;
            navigator.clipboard.writeText(text).then(() => {
                // Show copied notification
                const notification = document.createElement('div');
                notification.textContent = 'Emergency info copied to clipboard!';
                notification.style.cssText = `
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: #27ae60;
                    color: white;
                    padding: 15px 20px;
                    border-radius: 10px;
                    z-index: 1000;
                    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                `;
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.remove();
                }, 3000);
            });
        });
    }
}