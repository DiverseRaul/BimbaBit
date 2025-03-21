// DOM Elements
const textInput = document.getElementById('text-input');
const byteSize = document.getElementById('byte-size');
const kilobyteSize = document.getElementById('kilobyte-size');
const megabyteSize = document.getElementById('megabyte-size');
const characterCount = document.getElementById('character-count');
const wordCount = document.getElementById('word-count');
const comparison1 = document.getElementById('comparison-1').querySelector('span');
const comparison2 = document.getElementById('comparison-2').querySelector('span');
const comparison3 = document.getElementById('comparison-3').querySelector('span');
const comparison4 = document.getElementById('comparison-4').querySelector('span');
const comparison5 = document.getElementById('comparison-5').querySelector('span');
const comparison6 = document.getElementById('comparison-6').querySelector('span');
const themeToggle = document.getElementById('theme-toggle');
const convertBinaryBtn = document.getElementById('convert-binary');
const downloadBinaryBtn = document.getElementById('download-binary');
const downloadTextBtn = document.getElementById('download-text');
const clearTextBtn = document.getElementById('clear-text');
const fileUpload = document.getElementById('file-upload');
const binarySection = document.getElementById('binary-section');
const binaryOutput = document.getElementById('binary-output');
const sizeBar = document.getElementById('size-bar');
const showMoreComparisonsBtn = document.getElementById('show-more-comparisons');
const sizeFact = document.getElementById('size-fact');

// Constants for fun comparisons
const TWEET_SIZE = 280; // characters in a tweet
const FLOPPY_DISK_SIZE = 1.44 * 1024 * 1024; // bytes in a 1.44MB floppy disk
const COST_PER_MB_2000 = 0.10; // approximate cost per MB in early 2000s in dollars
const SMS_SIZE = 160; // characters in a standard SMS
const NOVEL_SIZE = 1 * 1024 * 1024; // average novel size in bytes (1MB)
const MP3_BITRATE = 128 * 1024 / 8; // 128kbps in bytes per second
const ADDITIONAL_COMPARISONS = [
    { id: 'comparison-7', icon: 'fas fa-envelope', text: '0 emails' },
    { id: 'comparison-8', icon: 'fas fa-image', text: '0% of a JPEG image' },
    { id: 'comparison-9', icon: 'fas fa-file-code', text: '0 lines of code' },
    { id: 'comparison-10', icon: 'fas fa-file-pdf', text: '0% of a PDF document' }
];

// Size facts for the rotating facts display
const SIZE_FACTS = [
    "Did you know? Text is one of the most efficient data formats.",
    "The entire works of Shakespeare is about 5MB of text.",
    "A single emoji can take up to 4 bytes of storage.",
    "The first hard drive (1956) could store only 3.75MB and weighed over a ton!",
    "The average email is about 75KB in size.",
    "The entire text of the Bible is approximately 4.5MB.",
    "A 1TB drive can store about 200 million pages of text.",
    "The first text message was sent in 1992 and said 'Merry Christmas'.",
    "Unicode supports over 143,000 characters, each requiring 1-4 bytes.",
    "The average person types about 40 words per minute, or roughly 200 bytes.",
    "The world generates about 2.5 quintillion bytes of data every day.",
    "The first computer bug was an actual moth found in a relay in 1947.",
    "In the 1980s, a 10MB hard drive cost around $3,000!",
    "The first website went live on August 6, 1991.",
    "The '@' symbol was chosen for email addresses because it was rarely used."
];

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    }
    
    // Set up event listeners
    textInput.addEventListener('input', calculateSize);
    themeToggle.addEventListener('click', toggleTheme);
    convertBinaryBtn.addEventListener('click', convertToBinary);
    downloadBinaryBtn.addEventListener('click', downloadBinary);
    downloadTextBtn.addEventListener('click', downloadText);
    clearTextBtn.addEventListener('click', clearText);
    fileUpload.addEventListener('change', handleFileUpload);
    showMoreComparisonsBtn.addEventListener('click', showMoreComparisons);
    
    // Initial calculation (in case there's default text)
    calculateSize();
    
    // Create initial particles
    createParticles(15);
    
    // Start rotating size facts
    startRotatingSizeFacts();
});

/**
 * Calculates the size of the text input and updates the display
 */
function calculateSize() {
    const text = textInput.value;
    
    // Calculate sizes
    const bytes = new Blob([text]).size;
    const kilobytes = bytes / 1024;
    const megabytes = kilobytes / 1024;
    
    // Calculate character and word counts
    const chars = text.length;
    const words = text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
    
    // Update size displays with animations
    animateValue(byteSize, extractNumber(byteSize.textContent), bytes, 500, ' bytes');
    animateValue(kilobyteSize, extractNumber(kilobyteSize.textContent), kilobytes, 500, ' KB');
    animateValue(megabyteSize, extractNumber(megabyteSize.textContent), megabytes, 500, ' MB');
    animateValue(characterCount, extractNumber(characterCount.textContent), chars, 500, ' characters');
    animateValue(wordCount, extractNumber(wordCount.textContent), words, 500, ' words');
    
    // Update size bar
    const percentage = Math.min(bytes / 10000 * 100, 100); // Max at 10KB for visual purposes
    sizeBar.style.width = `${percentage}%`;
    
    // Update fun comparisons
    updateComparisons(bytes, kilobytes, megabytes);
    
    // Create particles for large inputs
    if (bytes > 1000 && bytes % 1000 < 10) {
        createParticles(5);
    }
    
    // Add special effects for milestone sizes
    if (bytes > 0) {
        // Show special messages for certain size milestones
        if (bytes === 42) {
            showToast("The answer to life, the universe, and everything! 🌌");
            createParticles(10);
        } else if (bytes === 1024) {
            showToast("You've reached exactly 1 kilobyte! 🎯");
            createParticles(15);
        } else if (bytes === 1337) {
            showToast("1337! You're elite now! 😎");
            createParticles(20);
        } else if (bytes === 8008) {
            showToast("Hehe... nice. 😏");
            createParticles(8);
        } else if (bytes === 12345) {
            showToast("1-2-3-4-5! That's the kind of combination an idiot would have on his luggage! 🧳");
            createParticles(12);
        } else if (bytes > 1000000) {
            showToast("Over 1MB! That's a lot of text! 🤯");
            createParticles(30);
        }
    }
    
    // Add special effects for word count milestones
    if (words > 0) {
        if (words === 7) {
            showToast("7 words - the length of a haiku! 🍃");
        } else if (words === 42) {
            showToast("42 words - the answer, in word form! 🔍");
        } else if (words === 100) {
            showToast("100 words - you've written a decent paragraph! 📝");
        } else if (words === 500) {
            showToast("500 words - that's a solid blog post! 📊");
        } else if (words === 1000) {
            showToast("1000 words - you've written about 4 pages! 📄");
        }
    }
    
    // Add special effects for character count milestones
    if (chars > 0) {
        if (chars === 140) {
            showToast("140 characters - the original Twitter limit! 🐦");
        } else if (chars === 280) {
            showToast("280 characters - the current Twitter limit! 🐦");
        } else if (chars === 500) {
            showToast("500 characters - the length of a good text message! 📱");
        }
    }
}

/**
 * Starts rotating through size facts every few seconds
 */
function startRotatingSizeFacts() {
    let currentFactIndex = 0;
    
    // Update the fact every 10 seconds
    setInterval(() => {
        // Fade out
        sizeFact.style.opacity = 0;
        
        // Wait for fade out, then change text and fade in
        setTimeout(() => {
            currentFactIndex = (currentFactIndex + 1) % SIZE_FACTS.length;
            sizeFact.textContent = SIZE_FACTS[currentFactIndex];
            sizeFact.style.opacity = 1;
        }, 500);
    }, 10000);
    
    // Add hover behavior to pause rotation
    const sizeFactContainer = sizeFact.parentElement;
    sizeFactContainer.addEventListener('mouseenter', () => {
        // Show a random fact when hovered
        const randomIndex = Math.floor(Math.random() * SIZE_FACTS.length);
        sizeFact.textContent = SIZE_FACTS[randomIndex];
        
        // Add a subtle animation
        sizeFact.style.transform = 'scale(1.05)';
    });
    
    sizeFactContainer.addEventListener('mouseleave', () => {
        sizeFact.style.transform = 'scale(1)';
    });
}

/**
 * Updates the fun comparison texts based on the calculated sizes
 */
function updateComparisons(bytes, kilobytes, megabytes) {
    // Number of tweets
    const tweets = Math.round((bytes / TWEET_SIZE) * 10) / 10;
    comparison1.textContent = `Equivalent to ${tweets} tweet${tweets !== 1 ? 's' : ''}`;
    
    // Cost in the 2000s
    const cost2000 = Math.round(megabytes * COST_PER_MB_2000 * 100) / 100;
    comparison2.textContent = `Would cost $${cost2000.toFixed(2)} in the 2000s`;
    
    // Number of floppy disks needed
    const floppyDisks = Math.ceil(bytes / FLOPPY_DISK_SIZE);
    const floppyText = floppyDisks === 0 ? 'Less than 1 floppy disk' : 
                       `${floppyDisks} floppy disk${floppyDisks !== 1 ? 's' : ''} needed`;
    comparison3.textContent = floppyText;
    
    // Number of SMS messages
    const smsCount = Math.ceil(bytes / SMS_SIZE);
    comparison4.textContent = `${smsCount} SMS message${smsCount !== 1 ? 's' : ''}`;
    
    // Percentage of a novel
    const novelPercentage = Math.round((bytes / NOVEL_SIZE) * 10000) / 100;
    comparison5.textContent = `${novelPercentage}% of a novel`;
    
    // Seconds of MP3 audio
    const mp3Seconds = Math.round((bytes / MP3_BITRATE) * 10) / 10;
    comparison6.textContent = `${mp3Seconds} second${mp3Seconds !== 1 ? 's' : ''} of MP3 audio`;
    
    // Update additional comparisons if they exist in the DOM
    updateAdditionalComparisons(bytes);
    
    // Add visual indicators based on size
    setComparisonStyle(comparison1.parentElement, tweets);
    setComparisonStyle(comparison2.parentElement, cost2000);
    setComparisonStyle(comparison3.parentElement, floppyDisks);
    setComparisonStyle(comparison4.parentElement, smsCount);
    setComparisonStyle(comparison5.parentElement, novelPercentage);
    setComparisonStyle(comparison6.parentElement, mp3Seconds);
    
    // Add special effects for comparison milestones
    if (floppyDisks >= 10 && floppyDisks < 11) {
        showToast("That's a stack of floppy disks taller than your coffee mug! ☕️");
    } else if (smsCount >= 100 && smsCount < 101) {
        showToast("100 SMS messages! Your thumbs would be sore typing all that! 📱");
    } else if (novelPercentage >= 50 && novelPercentage < 51) {
        showToast("You're halfway to writing a novel! Keep going! 📚");
    } else if (mp3Seconds >= 60 && mp3Seconds < 61) {
        showToast("That's a full minute of music! 🎵");
    }
}

/**
 * Updates additional comparisons if they exist in the DOM
 */
function updateAdditionalComparisons(bytes) {
    // Email size (average 75KB)
    const emailElement = document.getElementById('comparison-7');
    if (emailElement) {
        const emailCount = Math.round((bytes / (75 * 1024)) * 10) / 10;
        emailElement.querySelector('span').textContent = `${emailCount} email${emailCount !== 1 ? 's' : ''}`;
        setComparisonStyle(emailElement, emailCount);
    }
    
    // JPEG image (average 2MB)
    const jpegElement = document.getElementById('comparison-8');
    if (jpegElement) {
        const jpegPercentage = Math.round((bytes / (2 * 1024 * 1024)) * 10000) / 100;
        jpegElement.querySelector('span').textContent = `${jpegPercentage}% of a JPEG image`;
        setComparisonStyle(jpegElement, jpegPercentage);
    }
    
    // Lines of code (average 50 bytes per line)
    const codeElement = document.getElementById('comparison-9');
    if (codeElement) {
        const codeLines = Math.round(bytes / 50);
        codeElement.querySelector('span').textContent = `${codeLines} line${codeLines !== 1 ? 's' : ''} of code`;
        setComparisonStyle(codeElement, codeLines);
    }
    
    // PDF document (average 5MB)
    const pdfElement = document.getElementById('comparison-10');
    if (pdfElement) {
        const pdfPercentage = Math.round((bytes / (5 * 1024 * 1024)) * 10000) / 100;
        pdfElement.querySelector('span').textContent = `${pdfPercentage}% of a PDF document`;
        setComparisonStyle(pdfElement, pdfPercentage);
    }
}

/**
 * Shows more comparison options
 */
function showMoreComparisons() {
    const comparisonCard = document.getElementById('comparison-card');
    
    // Check if additional comparisons are already added
    if (document.getElementById('comparison-7')) {
        // Toggle visibility of additional comparisons
        const additionalComparisons = document.querySelectorAll('[id^="comparison-"][id$="-7"], [id^="comparison-"][id$="-8"], [id^="comparison-"][id$="-9"], [id^="comparison-"][id$="-10"]');
        let isHidden = additionalComparisons[0].style.display === 'none';
        
        additionalComparisons.forEach(comp => {
            comp.style.display = isHidden ? 'flex' : 'none';
        });
        
        showMoreComparisonsBtn.querySelector('span').textContent = isHidden ? 'Show Less' : 'Show More';
        showMoreComparisonsBtn.querySelector('i').className = isHidden ? 'fas fa-minus' : 'fas fa-plus';
        
        // Add a little animation when toggling
        if (isHidden) {
            createParticles(3);
            showToast("More comparisons revealed! 🎉");
        }
        
        return;
    }
    
    // Add additional comparisons
    ADDITIONAL_COMPARISONS.forEach(comp => {
        const compElement = document.createElement('p');
        compElement.id = comp.id;
        compElement.className = 'comparison-item';
        compElement.innerHTML = `<i class="${comp.icon}"></i><span>${comp.text}</span>`;
        
        // Insert before the show more button
        comparisonCard.insertBefore(compElement, showMoreComparisonsBtn);
    });
    
    // Update the button text and icon
    showMoreComparisonsBtn.querySelector('span').textContent = 'Show Less';
    showMoreComparisonsBtn.querySelector('i').className = 'fas fa-minus';
    
    // Update the new comparisons with actual data
    updateAdditionalComparisons(new Blob([textInput.value]).size);
    
    // Add animation to new elements
    document.querySelectorAll('[id^="comparison-7"], [id^="comparison-8"], [id^="comparison-9"], [id^="comparison-10"]').forEach(el => {
        el.style.animation = 'fadeIn 0.5s ease-in-out';
    });
    
    // Show a toast and create particles
    createParticles(5);
    showToast("More comparisons revealed! 🎉");
}

/**
 * Toggles between light and dark themes
 */
function toggleTheme() {
    const isDarkMode = document.body.classList.toggle('dark-mode');
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Add a subtle animation to the page when changing themes
    document.body.style.opacity = '0.98';
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 300);
    
    // Create particles for theme change
    createParticles(10);
}

/**
 * Converts text to binary and displays it
 */
function convertToBinary() {
    const text = textInput.value;
    if (!text) {
        showToast("Please enter some text first!");
        return;
    }
    
    // Convert text to binary
    let binary = '';
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        const binaryChar = charCode.toString(2).padStart(8, '0');
        binary += binaryChar + ' ';
        
        // Add line breaks for readability
        if ((i + 1) % 8 === 0) {
            binary += '\n';
        }
    }
    
    // Display binary
    binaryOutput.textContent = binary;
    binarySection.classList.add('show');
    
    // Scroll to binary section
    binarySection.scrollIntoView({ behavior: 'smooth' });
    
    // Create particles for conversion
    createParticles(5);
    
    // Show success toast
    showToast("Text converted to binary! 🎉");
}

/**
 * Downloads the binary output as a .bin file
 */
function downloadBinary() {
    if (!binaryOutput.textContent) {
        showToast("Convert to binary first!");
        return;
    }
    
    // Create blob and download
    const blob = new Blob([binaryOutput.textContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text_binary.bin';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success toast
    showToast("Binary file downloaded! 🎉");
}

/**
 * Downloads the text input as a .txt file
 */
function downloadText() {
    if (!textInput.value) {
        showToast("Please enter some text first!");
        return;
    }
    
    // Create blob and download
    const blob = new Blob([textInput.value], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'text_content.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    // Show success toast
    showToast("Text file downloaded! 🎉");
}

/**
 * Clears the text input and resets displays
 */
function clearText() {
    if (!textInput.value) {
        showToast("Text is already empty!");
        return;
    }
    
    // Add a fun clearing animation
    textInput.classList.add('clearing');
    setTimeout(() => {
        textInput.value = '';
        calculateSize();
        binarySection.classList.remove('show');
        binaryOutput.textContent = '';
        textInput.classList.remove('clearing');
        showToast("Text cleared! 🎉");
    }, 300);
}

/**
 * Handles file upload and reads content
 */
function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    
    // Check file size
    if (file.size > 1024 * 1024) { // 1MB limit
        showToast("File too large! Please upload a smaller file.");
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(event) {
        textInput.value = event.target.result;
        calculateSize();
        showToast(`File "${file.name}" loaded successfully! 🎉`);
        
        // Create particles for upload
        createParticles(8);
    };
    reader.readAsText(file);
}

/**
 * Animates a value change for smoother transitions
 */
function animateValue(element, start, end, duration, suffix = '') {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        
        if (suffix.includes('KB') || suffix.includes('MB')) {
            element.textContent = value.toFixed(2) + suffix;
        } else {
            element.textContent = value + suffix;
        }
        
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/**
 * Extracts the numeric value from a string
 */
function extractNumber(text) {
    const match = text.match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
}

/**
 * Sets a visual style for comparison elements based on their values
 */
function setComparisonStyle(element, value) {
    // Reset classes
    element.classList.remove('small', 'medium', 'large');
    
    // Add appropriate class based on value
    if (value > 50) {
        element.classList.add('large');
    } else if (value > 10) {
        element.classList.add('medium');
    } else {
        element.classList.add('small');
    }
}

/**
 * Creates particle elements for visual effects
 */
function createParticles(count) {
    const particlesContainer = document.querySelector('.particles');
    
    for (let i = 0; i < count; i++) {
        const particle = document.createElement('div');
        particle.classList.add('confetti');
        
        // Random properties
        const size = Math.random() * 8 + 5;
        const posX = Math.random() * window.innerWidth;
        const posY = Math.random() * window.innerHeight;
        const rotation = Math.random() * 360;
        const duration = Math.random() * 2 + 2;
        
        // Random color
        const colors = [
            'var(--accent-color)',
            'var(--accent-secondary)',
            'var(--accent-tertiary)',
            'var(--success-color)',
            'var(--warning-color)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random shape (add variety)
        const shapes = ['square', 'circle', 'triangle'];
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        
        // Apply styles
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${posX}px`;
        particle.style.top = `${posY}px`;
        particle.style.backgroundColor = color;
        particle.style.transform = `rotate(${rotation}deg)`;
        particle.style.animation = `confetti-fall ${duration}s linear forwards`;
        
        // Apply shape-specific styles
        if (shape === 'circle') {
            particle.style.borderRadius = '50%';
        } else if (shape === 'triangle') {
            particle.style.width = '0';
            particle.style.height = '0';
            particle.style.backgroundColor = 'transparent';
            particle.style.borderLeft = `${size/2}px solid transparent`;
            particle.style.borderRight = `${size/2}px solid transparent`;
            particle.style.borderBottom = `${size}px solid ${color}`;
        }
        
        // Add to container
        particlesContainer.appendChild(particle);
        
        // Remove after animation
        setTimeout(() => {
            particle.remove();
        }, duration * 1000);
    }
}

/**
 * Shows a temporary toast message
 */
function showToast(message) {
    // Create toast element if it doesn't exist
    let toast = document.getElementById('toast-notification');
    if (!toast) {
        toast = document.createElement('div');
        toast.id = 'toast-notification';
        toast.className = 'toast';
        
        // Add icon
        const icon = document.createElement('i');
        icon.className = 'fas fa-info-circle';
        toast.appendChild(icon);
        
        // Add message container
        const messageContainer = document.createElement('span');
        toast.appendChild(messageContainer);
        
        document.body.appendChild(toast);
    }
    
    // Set message and show
    const messageContainer = toast.querySelector('span');
    messageContainer.textContent = message;
    toast.classList.add('show');
    
    // Hide after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

// Add some easter eggs and fun interactions
textInput.addEventListener('keydown', (e) => {
    // Easter egg: When user types "floppy", show a fun fact
    if (textInput.value.toLowerCase().endsWith('floppy') && e.key !== 'Backspace') {
        showToast("Fun fact: The first floppy disks were 8 inches in diameter!");
    }
    
    // Easter egg: When user types "2000", show Y2K reference
    if (textInput.value.toLowerCase().endsWith('2000') && e.key !== 'Backspace') {
        showToast("Remember Y2K? Good times...");
    }
    
    // Easter egg: When user types "binary", show binary joke
    if (textInput.value.toLowerCase().endsWith('binary') && e.key !== 'Backspace') {
        showToast("There are 10 types of people in the world: those who understand binary and those who don't!");
    }
    
    // Easter egg: When user types "bit", show bit fact
    if (textInput.value.toLowerCase().endsWith('bit') && e.key !== 'Backspace') {
        showToast("A bit is the smallest unit of data in computing: either a 0 or a 1!");
        createParticles(3);
    }
    
    // Easter egg: When user types "bimba", show celebration
    if (textInput.value.toLowerCase().endsWith('bimba') && e.key !== 'Backspace') {
        showToast("Bimba Bit: Calculating text sizes with style since 2025! 🎉");
        createParticles(10);
    }
    
    // Additional easter eggs
    if (textInput.value.toLowerCase().endsWith('hello world') && e.key !== 'Backspace') {
        showToast("Every programmer's first program! 🎉");
        createParticles(8);
    }
    
    if (textInput.value.toLowerCase().endsWith('konami') && e.key !== 'Backspace') {
        showToast("");
        document.body.style.animation = "shake 0.5s";
        setTimeout(() => {
            document.body.style.animation = "";
        }, 500);
        createParticles(30);
    }
    
    if (textInput.value.toLowerCase().endsWith('matrix') && e.key !== 'Backspace') {
        showToast("There is no spoon... 🥄");
        // Create matrix-like effect
        const matrix = document.createElement('div');
        matrix.style.position = 'fixed';
        matrix.style.top = '0';
        matrix.style.left = '0';
        matrix.style.width = '100%';
        matrix.style.height = '100%';
        matrix.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
        matrix.style.color = '#00FF00';
        matrix.style.fontSize = '20px';
        matrix.style.fontFamily = 'monospace';
        matrix.style.zIndex = '9999';
        matrix.style.overflow = 'hidden';
        matrix.style.pointerEvents = 'none';
        
        // Add random characters
        for (let i = 0; i < 50; i++) {
            const char = document.createElement('div');
            char.style.position = 'absolute';
            char.style.left = `${Math.random() * 100}%`;
            char.style.top = `${Math.random() * 100}%`;
            char.textContent = String.fromCharCode(33 + Math.floor(Math.random() * 94));
            char.style.animation = `fadeIn 0.5s, fadeOut 0.5s ${Math.random() * 2 + 1}s forwards`;
            matrix.appendChild(char);
        }
        
        document.body.appendChild(matrix);
        
        // Remove after 3 seconds
        setTimeout(() => {
            matrix.style.animation = 'fadeOut 0.5s forwards';
            setTimeout(() => {
                matrix.remove();
            }, 500);
        }, 3000);
    }
    
    if (textInput.value.toLowerCase().endsWith('42') && e.key !== 'Backspace') {
        showToast("The Answer to the Ultimate Question of Life, the Universe, and Everything! 🤔");
        createParticles(15);
    }
    
    if (textInput.value.toLowerCase().endsWith('pizza') && e.key !== 'Backspace') {
        showToast("Did you know the first pizza website was created in 1994? 🍕");
        createParticles(5);
    }
    
    if (textInput.value.toLowerCase().endsWith('rickroll') && e.key !== 'Backspace') {
        showToast("Never gonna give you up, never gonna let you down... 🎶");
        createParticles(10);
    }
});

// Add CSS for clearing animation and fadeIn animation
const style = document.createElement('style');
style.textContent = `
    #text-input.clearing {
        opacity: 0.5;
        transform: scale(0.98);
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
    }
`;
document.head.appendChild(style);
