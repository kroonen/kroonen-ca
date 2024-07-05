document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('universeCanvas');
    if (canvas) {  // Check if we're on a page with the Game of Life
        const game = new GameOfLife(canvas);
        const ui = new UI(game);
        game.updateStats = () => ui.updateStats();
        ui.initialize();
    }
});
