// Free Roam Game with Character and Level Map
// Author: aubreyavitia

// Create your character sprite (myImage)
let myImage = img`
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
`;

// Create the level tilemap
let level = tilemap`
    level
`;

// Create the character sprite using myImage
let character = sprites.create(myImage);
character.setPosition(80, 60);
character.setFlag(SpriteFlag.StayInScreen, true);

// Set the tilemap as the background
tiles.setTilemap(level);

// Camera follows the character
camera.followSprite(character);

// Game loop for free roam movement
game.onUpdate(function () {
    // Handle character movement with arrow keys
    if (controller.left.isPressed()) {
        character.vx = -60;
    } else if (controller.right.isPressed()) {
        character.vx = 60;
    } else {
        character.vx = 0;
    }

    if (controller.up.isPressed()) {
        character.vy = -60;
    } else if (controller.down.isPressed()) {
        character.vy = 60;
    } else {
        character.vy = 0;
    }
});

// Display game info
game.showLongText("Welcome to Aubrey's Land! Use arrow keys to move around and explore.", DialogLayout.Bottom);
