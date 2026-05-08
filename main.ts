// Bomberman-style game with Aubrey
let aubrey: Sprite
let enemies: Sprite[] = []
let bombs: Sprite[] = []
let speed = 80
let score = 0
let level = 1

// Initialize game
function initGame() {
    // Load the tilemap from your project
    tiles.setTilemap(tilemap`level`)
    
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
    
    aubrey.setPosition(40, 40)
    aubrey.setFlag(SpriteFlag.StayInScreen, true)
    
    // Create initial enemies
    createEnemies(level)
    
    // Update score display
    info.setScore(0)
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
        
        enemy.setPosition(100 + i * 30, 60)
        enemy.setVelocity(randint(-speed / 3, speed / 3), randint(-speed / 3, speed / 3))
        enemies.push(enemy)
    }
}

// Track bomb timers
let bombTimers: number[] = []

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
    
    let bombX = bomb.x
    let bombY = bomb.y
    let timeLeft = 30
    bombTimers.push(timeLeft)
    
    game.onUpdate(function() {
        timeLeft += -1
        if (timeLeft <= 0) {
            sprites.destroy(bomb)
            explodeBomb(bombX, bombY)
        }
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
        if (Math.abs(enemy.x - x) < 20 && Math.abs(enemy.y - y) < 20) {
            sprites.destroy(enemy)
            score += 10
        }
    }
    
    // Remove explosion after 200ms
    pause(200)
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

// Main game loop
game.onUpdate(function() {
    handleControls()
    checkCollisions()
    info.setScore(score)
    
    if (bombCooldown > 0) {
        bombCooldown += -1
    }
})

// Start the game
initGame()
game.showLongText("Bomberman Aubrey! Avoid enemies and defeat them with bombs. Use arrow keys to move, A to bomb!", DialogLayout.Bottom)
