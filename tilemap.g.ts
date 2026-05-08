// Auto-generated code. Do not edit.
namespace myTiles {
    //% fixedInstance jres blockIdentity=images._tile
    export const transparency16 = image.ofBuffer(hex``);

    helpers._registerFactory("tilemap", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "level":
            case "level1":return tiles.createTilemap(hex`14001400020101010101010101010101010101010101010d0310100a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0e030a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0e030a0a0a0a020101010101010c0101010d0a0a0e030a0a0a0a03020101010d0a0a0a0a0a0e0a0a0e0302010c0105030a0a0a0e0a0a0a0a0a0e0a0a0e03030a0a0a0a030a0a0a0401010d0a0a0e0a0a0e03030a0a0a0a0b0a0a0a0a0a0a0e0a0a0e0a0a0e03030a0a0a0a030a0a0a0a0a0a0e0a0a0e0a0a0e030607090a0a030a0a0a0a0a0a0e00110e0a0a0e060709030a0a031013140a0a0a0e11110e0a0a0e0a0a03030a0a030a0a0a0a0a0a0e0a0a0e0a0a0e0a0a03030a0a0312100a0a0a0f0e0a0a0e0a0a0e0a0a03030a0a06070707070707080a0a0e0a0a0e0a0a03030a0a0a0a0a0a0a0a0a0a0a0a0e0a0a0e0a0a03030a0a0a0a0a0a0a0a0a0a0a0a0e0a0a0e0a0a0306070707070707070707070707080a0a0e0a0a030a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0e0a0a0b0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0a0e0a0a060707070707070707070707070707070708`, img`
22222222222222222222
2..................2
2..................2
2....2222222.2222..2
2....222222.....2..2
222.222...2.....2..2
22....2...2222..2..2
22...........2..2..2
22....2......2..2..2
2222..2......2..2..2
2222..2......2..2..2
..22..2......2..2..2
..22..2......2..2..2
..22..22222222..2..2
..22............2..2
..22............2..2
..222222222222222..2
..2................2
...................2
..222222222222222222
`, [myTiles.transparency16,sprites.dungeon.greenOuterNorth0,sprites.dungeon.greenOuterNorthWest,sprites.dungeon.greenOuterWest0,sprites.dungeon.greenInnerSouthWest,sprites.dungeon.greenInnerSouthEast,sprites.dungeon.greenOuterSouthEast,sprites.dungeon.greenOuterSouth1,sprites.dungeon.greenOuterSouthWest,sprites.dungeon.greenInnerNorthEast,sprites.dungeon.floorLight0,sprites.dungeon.stairWest,sprites.dungeon.stairNorth,sprites.dungeon.greenOuterNorthEast,sprites.dungeon.greenOuterEast0,sprites.dungeon.floorLight1,sprites.dungeon.floorLight4,sprites.dungeon.doorOpenEast,sprites.dungeon.chestOpen,sprites.builtin.crowd2,sprites.builtin.crowd1], TileScale.Sixteen);
        }
        return null;
    })

    helpers._registerFactory("tile", function(name: string) {
        switch(helpers.stringTrim(name)) {
            case "baseTransparency16":
            case "transparency16":return transparency16;
        }
        return null;
    })

}
// Auto-generated code. Do not edit.
