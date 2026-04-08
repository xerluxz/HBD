const container = document.getElementById('container');
    const imgClosed = document.getElementById('img-closed');
    const imgOpen = document.getElementById('img-open');
    const counter = document.getElementById('counter');
    const popSound = document.getElementById('pop-sound');

    let count = 0;
    let popTimeout; // Variable to store the timer

    function triggerPop() {
        // 1. Update Counter
        count++;
        counter.innerText = count;

        // 2. Play Sound (cloned for fast spamming)
        const playSound = popSound.cloneNode();
        playSound.volume = 0.5; // Optional: Adjust volume
        playSound.play();

        // 3. Show Open Mouth
        imgClosed.style.display = 'none';
        imgOpen.style.display = 'block';

        // 4. Animation Reset
        container.classList.remove('pop-animation');
        void container.offsetWidth; 
        container.classList.add('pop-animation');

        // 5. THE STAY LONGER LOGIC
        // Clear any existing timer so it doesn't close too early if spamming
        clearTimeout(popTimeout);
        
        // Keep mouth open for 200ms (adjust this number to make it stay longer/shorter)
        popTimeout = setTimeout(() => {
            releasePop();
        }, 100); 
    }

    function releasePop() {
        imgClosed.style.display = 'block';
        imgOpen.style.display = 'none';
    }

    // --- Listeners ---

    // Desktop
    container.addEventListener('mousedown', (e) => {
        triggerPop();
    });

    // Mobile
    container.addEventListener('touchstart', (e) => {
        e.preventDefault();
        triggerPop();
    });

    // Keyboard (Spacebar)
    window.addEventListener('keydown', (e) => {
        if (e.code === "Space" && !e.repeat) {
            triggerPop();
        }
    });