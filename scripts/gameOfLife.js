class GameOfLife {
    constructor(canvas, cellSize = 4) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.cellSize = cellSize;
        this.rows = Math.floor(canvas.height / cellSize);
        this.columns = Math.floor(canvas.width / cellSize);
        this.universe = [];
        this.nextUniverse = [];
        this.generation = 0;
        this.population = 0;
        this.isRunning = false;
        this.speed = 100;
        this.lastUpdateTime = 0;

        this.initializeUniverse();
    }

    initializeUniverse() {
        this.universe = Array(this.rows).fill().map(() => 
            Array(this.columns).fill().map(() => Math.random() < 0.2)
        );
        this.nextUniverse = Array(this.rows).fill().map(() => Array(this.columns).fill(false));
        this.generation = 0;
        this.updateStats();
    }

    drawUniverse() {
        this.ctx.fillStyle = 'rgba(0, 8, 16, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--life-color');
        this.population = 0;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                if (this.universe[y][x]) {
                    this.ctx.fillRect(x * this.cellSize, y * this.cellSize, this.cellSize - 1, this.cellSize - 1);
                    this.population++;
                }
            }
        }
        this.updateStats();
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;
                const x = (col + j + this.columns) % this.columns;
                const y = (row + i + this.rows) % this.rows;
                if (this.universe[y][x]) count++;
            }
        }
        return count;
    }

    updateUniverse() {
        let changed = false;
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                const neighbors = this.countNeighbors(y, x);
                this.nextUniverse[y][x] = neighbors === 3 || (this.universe[y][x] && neighbors === 2);
                if (this.nextUniverse[y][x] !== this.universe[y][x]) {
                    changed = true;
                }
            }
        }
        [this.universe, this.nextUniverse] = [this.nextUniverse, this.universe];
        if (changed) {
            this.generation++;
        }
        return changed;
    }

    simulationLoop(timestamp) {
        if (this.isRunning) {
            if (timestamp - this.lastUpdateTime > this.speed) {
                const changed = this.updateUniverse();
                if (changed) {
                    this.drawUniverse();
                } else {
                    this.pauseSimulation();
                    alert("The simulation has reached a stable state or died out.");
                }
                this.lastUpdateTime = timestamp;
            }
            requestAnimationFrame(this.simulationLoop.bind(this));
        }
    }

    startSimulation() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.lastUpdateTime = 0;
            requestAnimationFrame(this.simulationLoop.bind(this));
        }
    }

    pauseSimulation() {
        this.isRunning = false;
    }

    resetSimulation() {
        this.pauseSimulation();
        this.initializeUniverse();
        this.drawUniverse();
    }

    updateStats() {
        // This method will be implemented in ui.js
    }

    setSpeed(speedPercentage) {
        this.speed = this.calculateSpeed(speedPercentage);
    }

    calculateSpeed(percentage) {
        return Math.round(500 * Math.pow(0.02, percentage / 100));
    }

    toggleCell(x, y) {
        this.universe[y][x] = !this.universe[y][x];
        this.drawUniverse();
    }

    addPattern(pattern, startRow, startCol) {
        for (let i = 0; i < pattern.length; i++) {
            for (let j = 0; j < pattern[i].length; j++) {
                this.universe[(startRow + i) % this.rows][(startCol + j) % this.columns] = pattern[i][j] === 1;
            }
        }
        this.drawUniverse();
    }

    clearUniverse() {
        for (let y = 0; y < this.rows; y++) {
            for (let x = 0; x < this.columns; x++) {
                this.universe[y][x] = false;
            }
        }
    }
}
