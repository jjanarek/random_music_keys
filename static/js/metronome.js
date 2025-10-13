document.addEventListener('DOMContentLoaded', () => {
    const bpmInput = document.getElementById('bpm');
    const startStopBtn = document.getElementById('start-stop-btn');
    const beatIndicator = document.getElementById('beat-indicator');

    let audioContext;
    let isRunning = false;
    let timerId = null;
    let nextNoteTime = 0.0;
    const lookahead = 25.0; // How frequently to call scheduling function (in milliseconds)
    const scheduleAheadTime = 0.1; // How far ahead to schedule audio (in seconds)

    function scheduleNote(beatNumber, time) {
        // Create a simple oscillator for the beep sound
        const osc = audioContext.createOscillator();
        const gain = audioContext.createGain();
        osc.connect(gain);
        gain.connect(audioContext.destination);

        osc.type = 'sine';
        osc.frequency.setValueAtTime(660.0, time);
        gain.gain.setValueAtTime(1, time);
        gain.gain.exponentialRampToValueAtTime(0.001, time + 0.1);

        osc.start(time);
        osc.stop(time + 0.05);

        // Visual indicator flash
        setTimeout(() => {
            beatIndicator.classList.add('active');
            setTimeout(() => beatIndicator.classList.remove('active'), 100);
        }, (time - audioContext.currentTime) * 1000);
    }

    function scheduler() {
        while (nextNoteTime < audioContext.currentTime + scheduleAheadTime) {
            scheduleNote(1, nextNoteTime);
            const secondsPerBeat = 60.0 / parseFloat(bpmInput.value);
            nextNoteTime += secondsPerBeat;
        }
        timerId = window.setTimeout(scheduler, lookahead);
    }

    function toggleMetronome() {
        if (isRunning) {
            // Stop the metronome
            window.clearTimeout(timerId);
            isRunning = false;
            startStopBtn.textContent = 'Start';
            startStopBtn.classList.remove('btn-danger');
            startStopBtn.classList.add('btn-success');
        } else {
            // Start the metronome
            if (!audioContext) {
                audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            isRunning = true;
            nextNoteTime = audioContext.currentTime + 0.1;
            scheduler();
            startStopBtn.textContent = 'Stop';
            startStopBtn.classList.remove('btn-success');
            startStopBtn.classList.add('btn-danger');
        }
    }

    startStopBtn.addEventListener('click', toggleMetronome);
});