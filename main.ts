// Bomberman-style game with Aubrey
let aubrey: Sprite
let enemies: Sprite[] = []
let bombs: Sprite[] = []
let speed = 100
let score = 0
let level = 1

// Initialize game
function initGame() {
    // Set up screen
    scene.setBackgroundColor(1)
    
    // Create Aubrey (player character)
    aubrey = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . 2 2 2 2 2 2 . . . . .
        . . . . . 2 2 f f 2 2 . . . . .
        . . . . . 2 f f f f 2 . . . . .
        . . . . . 2 2 f f 2 2 . . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . 2 2 2 2 2 2 2 2 . . . .
        . . . . . 2 2 2 2 2 2 . . . . .
        . . . . . . 2 2 2 2 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
    
    aubrey.setPosition(75, 75)
    aubrey.setFlag(SpriteFlag.StayInScreen, true)
    
    // Create obstacles (walls)
    createWalls()
    
    // Create initial enemies
    createEnemies(level)
    
    // Update score display
    info.setScore(0)
    
    // Game loop for controls
    game.onUpdate(function() {
        handleControls()
        checkCollisions()
        info.setScore(score)
    })
}

// Handle player movement
function handleControls() {
    if (controller.left.isPressed()) {
        aubrey.vx = -speed
    } else if (controller.right.isPressed()) {
        aubrey.vx = speed
    } else {
        aubrey.vx = 0
    }
    
    if (controller.up.isPressed()) {
        aubrey.vy = -speed
    } else if (controller.down.isPressed()) {
        aubrey.vy = speed
    } else {
        aubrey.vy = 0
    }
    
    // Place bomb with A button
    if (controller.A.isPressed()) {
        placeBomb()
    }
}

// Create wall obstacles
function createWalls() {
    // Create a simple maze pattern with wall tiles
    for (let x = 2; x < 16; x += 2) {
        for (let y = 2; y < 12; y += 2) {
            let wall = sprites.create(img`
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
                f f f f f f f f f f f f f f f f
            `, SpriteKind.Food)
            wall.setPosition(x * 8 + 4, y * 8 + 4)
            wall.setFlag(SpriteFlag.Ghost, false)
        }
    }
}

// Create enemies
function createEnemies(count: number) {
    for (let i = 0; i < count; i++) {
        let enemy = sprites.create(img`
            . . . . . . . . . . . . . . . .
            . . . . . . 5 5 5 5 . . . . . .
            . . . . . 5 5 5 5 5 5 . . . . .
            . . . . . 5 5 7 7 5 5 . . . . .
            . . . . . 5 7 7 7 7 5 . . . . .
            . . . . . 5 5 7 7 5 5 . . . . .
            . . . . 5 5 5 5 5 5 5 5 . . . .
            . . . . 5 5 5 5 5 5 5 5 . . . .
            . . . . 5 5 5 5 5 5 5 5 . . . .
            . . . . . 5 5 5 5 5 5 . . . . .
            . . . . . . 5 5 5 5 . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
            . . . . . . . . . . . . . . . .
        `, SpriteKind.Enemy)
        
        enemy.setPosition(128 - (i + 1) * 25, 32)
        enemy.setVelocity(randint(-speed / 2, speed / 2), randint(-speed / 2, speed / 2))
        enemies.push(enemy)
    }
}

// Place a bomb
let bombCooldown = 0
function placeBomb() {
    if (bombCooldown > 0) return
    
    let bomb = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . 1 1 1 1 . . . . . .
        . . . . . 1 1 1 1 1 1 . . . . .
        . . . . 1 1 1 f f 1 1 1 . . . .
        . . . . 1 1 f f f f 1 1 . . . .
        . . . . 1 1 1 f f 1 1 1 . . . .
        . . . . . 1 1 1 1 1 1 . . . . .
        . . . . . . 1 1 1 1 . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Projectile)
    
    bomb.setPosition(aubrey.x, aubrey.y)
    bombs.push(bomb)
    bombCooldown = 30
    
    // Explode bomb after 1 second
    control.inBackground(function() {
        pause(1000)
        sprites.destroy(bomb)
        explodeBomb(bomb.x, bomb.y)
    })
}

// Explode bomb and damage enemies
function explodeBomb(x: number, y: number) {
    let explosion = sprites.create(img`
        . . . . . f f f f . . . . . . .
        . . . . . f f f f . . . . . . .
        . . . . . f f f f . . . . . . .
        . f f f f f f f f f f f f f . .
        . f f f f f f f f f f f f f . .
        . f f f f f f f f f f f f f . .
        . . . . . f f f f . . . . . . .
        . . . . . f f f f . . . . . . .
        . . . . . f f f f . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Projectile)
    
    explosion.setPosition(x, y)
    
    // Check for enemy hits
    for (let enemy of enemies) {
        if (Math.abs(enemy.x - x) < 15 && Math.abs(enemy.y - y) < 15) {
            sprites.destroy(enemy)
            score += 10
        }
    }
    
    sprites.destroy(explosion)
}

// Check collisions with enemies
function checkCollisions() {
    for (let enemy of enemies) {
        if (aubrey.overlapsWith(enemy)) {
            game.over(false)
        }
    }
}

// Start the game
initGame()
game.showLongText("Bomberman Aubrey! Avoid enemies and defeat them with bombs. Use arrow keys to move, A to bomb!", DialogLayout.Bottom)
