document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('universeCanvas');
    const game = new GameOfLife(canvas);
    const ui = new UI(game);

    // Override the updateStats method in the game
    game.updateStats = () => ui.updateStats();

    // Initialize the UI
    ui.initialize();
});
