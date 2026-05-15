// Rome Game - One minute to escape!
// Character makes noise when it dies, wins, gets blown up at dead ends, and collects coins on victory

let player: Sprite
let gameRunning = true
let gameWon = false
let timeRemaining = 60
let score = 0

function initializeGame() {
    // Create scene with Rome theme
    scene.setBackgroundColor(9) // Light color for sky
    
    // Create player sprite (your image)
    player = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
        . . . . . f f f f . . . . . . .
        . . . . f f f f f f . . . . . .
        . . . . f f 1 1 f f . . . . . .
        . . . . f 1 1 1 1 f . . . . . .
        . . . . f f 1 1 f f . . . . . .
        . . . f f f f f f f f . . . . .
        . . f f f f f f f f f f . . . .
        . . f f f f f f f f f f . . . .
        . f f f f f f f f f f f f . . .
        . f f f f f f f f f f f f . . .
        . . . . f f f f f f . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.Player)
    
    player.setPosition(80, 110)
    controller.moveSprite(player, 100, 100)
    player.ay = 0 // No gravity for this game
    
    // Create win zone (goal)
    let winZone = sprites.create(img`
        . . . . . . . . . . . . . . . .
        . c c c c c c c c c c c c c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c . . . . . . . . . . . c . .
        . c c c c c c c c c c c c c . .
        . . . . . . . . . . . . . . . .
        . . . . . . . . . . . . . . . .
    `, SpriteKind.HitZone)
    winZone.setPosition(150, 30)
    winZone.setFlag(SpriteFlag.Ghost, true)
    
    // Create obstacles/dead ends
    createObstacles()
    
    // Start timer
    startTimer()
    
    // Update HUD
    updateHUD()
}

function createObstacles() {
    // Create dead end zones (walls)
    let deadEnd1 = sprites.create(img`
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
        c c c c c c c c
    `, SpriteKind.Enemy)
    deadEnd1.setPosition(40, 60)
}

function startTimer() {
    game.onUpdateInterval(1000, function () {
        if (gameRunning) {
            timeRemaining = timeRemaining - 1
            updateHUD()
            
            if (timeRemaining <= 0) {
                endGameLose("Time's up!")
            }
        }
    })
}

function updateHUD() {
    info.setScore(score)
    info.setLife(timeRemaining)
}

function playDeathSound() {
    music.playTone(100, music.beat(BeatFraction.Half))
    music.playTone(80, music.beat(BeatFraction.Half))
    music.playTone(60, music.beat(BeatFraction.Half))
}

function playWinSound() {
    music.playTone(523, music.beat(BeatFraction.Quarter))
    music.playTone(659, music.beat(BeatFraction.Quarter))
    music.playTone(784, music.beat(BeatFraction.Quarter))
    music.playTone(1047, music.beat(BeatFraction.Half))
}

function playExplosion() {
    for (let i = 0; i < 3; i++) {
        music.playTone(200 - i * 30, music.beat(BeatFraction.Eighth))
    }
}

function createExplosion(x: number, y: number) {
    playExplosion()
    for (let i = 0; i < 4; i++) {
        let particle = sprites.createProjectile(img`
            . . f . .
            . f f f .
            f f f f f
            . f f f .
            . . f . .
        `, randint(-100, 100), randint(-100, 50))
        particle.setPosition(x, y)
    }
}

function createCoins(x: number, y: number) {
    for (let i = 0; i < 5; i++) {
        let coin = sprites.create(img`
            . . . f f . . .
            . . f f f f . .
            . f f 5 5 f f .
            . f 5 5 5 5 f .
            . f f 5 5 f f .
            . . f f f f . .
            . . . f f . . .
        `, SpriteKind.Food)
        coin.setPosition(x + randint(-20, 20), y + randint(-20, 20))
        coin.vx = randint(-50, 50)
        coin.vy = randint(-100, -30)
    }
}

function endGameWin() {
    gameRunning = false
    gameWon = true
    playWinSound()
    createCoins(player.x, player.y)
    score = score + 1000
    updateHUD()
    game.showLongText("YOU WIN! Made it to Roma!", DialogLayout.Bottom)
    game.over(GAME_OVER_WIN)
}

function endGameLose(reason: string) {
    gameRunning = false
    playDeathSound()
    game.showLongText(reason, DialogLayout.Bottom)
    game.over(GAME_OVER_LOSE)
}

// Collision detection
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    // Hit a dead end - explosion!
    createExplosion(player.x, player.y)
    endGameLose("Hit a dead end! Blown up!")
})

sprites.onOverlap(SpriteKind.Player, SpriteKind.Food, function (sprite, otherSprite) {
    otherSprite.destroy()
    score = score + 50
    updateHUD()
})

// Win condition - reach top right area (Roma!)
game.onUpdateInterval(100, function () {
    if (gameRunning) {
        // Check if player reached the win zone
        if (player.x > 130 && player.x < 170 && player.y < 50) {
            endGameWin()
        }
    }
})

// Initialize the game
initializeGame()
