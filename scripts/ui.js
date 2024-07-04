class UI {
    constructor(game) {
        this.game = game;
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('startBtn').addEventListener('click', () => this.startSimulation());
        document.getElementById('pauseBtn').addEventListener('click', () => this.pauseSimulation());
        document.getElementById('resetBtn').addEventListener('click', () => this.resetSimulation());
        document.getElementById('speedSlider').addEventListener('input', (e) => this.setSpeed(e.target.value));
        
        document.getElementById('randomBtn').addEventListener('click', () => this.setRandomPattern());
        document.getElementById('gliderBtn').addEventListener('click', () => this.setGliderPattern());
        document.getElementById('blinkerBtn').addEventListener('click', () => this.setBlinkerPattern());
        document.getElementById('beaconBtn').addEventListener('click', () => this.setBeaconPattern());

        this.game.canvas.addEventListener('click', (event) => this.handleCanvasClick(event));

        // Menu functionality
        document.querySelector('.menu-toggle').addEventListener('click', () => this.toggleMenu());
        document.addEventListener('click', (event) => this.closeMenuOutside(event));

        window.addEventListener('resize', () => this.resizeUniverse());
    }

    startSimulation() {
        this.game.startSimulation();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
    }

    pauseSimulation() {
        this.game.pauseSimulation();
        document.getElementById('startBtn').disabled = false;
        document.getElementById('pauseBtn').disabled = true;
    }

    resetSimulation() {
        this.game.resetSimulation();
        this.pauseSimulation();
    }

    setSpeed(speedPercentage) {
        this.game.setSpeed(speedPercentage);
        document.getElementById('speedValue').textContent = `Speed: ${speedPercentage}%`;
    }

    handleCanvasClick(event) {
        const rect = this.game.canvas.getBoundingClientRect();
        const x = Math.floor((event.clientX - rect.left) / this.game.cellSize);
        const y = Math.floor((event.clientY - rect.top) / this.game.cellSize);
        this.game.toggleCell(x, y);
    }

    setRandomPattern() {
        this.game.initializeUniverse();
        this.game.drawUniverse();
        this.setPatternName('Random');
    }

    setGliderPattern() {
        this.game.clearUniverse();
        const glider = [
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 1]
        ];
        this.game.addPattern(glider, Math.floor(this.game.rows / 2), Math.floor(this.game.columns / 2));
        this.setPatternName('Glider');
    }

    setBlinkerPattern() {
        this.game.clearUniverse();
        const blinker = [
            [1],
            [1],
            [1]
        ];
        this.game.addPattern(blinker, Math.floor(this.game.rows / 2), Math.floor(this.game.columns / 2));
        this.setPatternName('Blinker');
    }

    setBeaconPattern() {
        this.game.clearUniverse();
        const beacon = [
            [1, 1, 0, 0],
            [1, 1, 0, 0],
            [0, 0, 1, 1],
            [0, 0, 1, 1]
        ];
        this.game.addPattern(beacon, Math.floor(this.game.rows / 2), Math.floor(this.game.columns / 2));
        this.setPatternName('Beacon');
    }

    setPatternName(name) {
        document.getElementById('patternName').textContent = `Pattern: ${name}`;
    }

    toggleMenu() {
        document.querySelector('.menu-items').classList.toggle('active');
    }

    closeMenuOutside(event) {
        const menu = document.querySelector('.menu');
        const menuItems = document.querySelector('.menu-items');
        
        if (!menu.contains(event.target) && menuItems.classList.contains('active')) {
            menuItems.classList.remove('active');
        }
    }

    resizeUniverse() {
        this.game.canvas.width = Math.min(800, window.innerWidth - 40);
        this.game.canvas.height = Math.min(600, window.innerHeight - 300);
        this.game.rows = Math.floor(this.game.canvas.height / this.game.cellSize);
        this.game.columns = Math.floor(this.game.canvas.width / this.game.cellSize);
        this.game.initializeUniverse();
        this.game.drawUniverse();
    }

    updateStats() {
        document.getElementById('stats').textContent = `Generation: ${this.game.generation} | Population: ${this.game.population}`;
    }

    setInitialSpeed() {
        const initialSpeedPercentage = document.getElementById('speedSlider').value;
        this.setSpeed(initialSpeedPercentage);
    }

    updateCopyright() {
        const year = new Date().getFullYear();
        document.getElementById('copyright').textContent = `© ${year} Robin Kroonen`;
    }

    initialize() {
        this.resizeUniverse();
        this.game.drawUniverse();
        this.updateCopyright();
        this.setInitialSpeed();
        document.getElementById('startBtn').disabled = true;
        document.getElementById('pauseBtn').disabled = false;
        this.startSimulation();
    }
}
