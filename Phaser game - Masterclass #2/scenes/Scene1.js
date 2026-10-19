class Scene1 extends Phaser.Scene {
    map;
    tiles;
    platforms;
    player;
    cursors;
    keysWASD;
    spaceBar;
    pickups;
    constructor() {
        super("Scene1");
    }
    preload() {
        // Preload every asset
        // Load tile assets - 1st parameter = Phaser 'key', 2nd parameter = Path to file
        this.load.image('platform-tiles', 'Tiles/tiles_1024_128x128.png')
        // Load JSON map, parameters as above
        this.load.tilemapTiledJSON('scene1map', 'Tiled/scene1map.tmj')
        // Load spreadsheet
        this.load.spritesheet('boy-run', 'sprites/boy_run.png', {
            frameWidth: 100,
            frameHeight: 160
        })
        // Load backgrounds and audio
        this.load.image('background1', 'Background_1/Background1_Layer_1.png')
        this.load.image('background2', 'Background_1/Background1_Layer_2.png')
        this.load.image('background3', 'Background_1/Background1_Layer_3.png')
        this.load.image('jewel', 'pickups/Jewel_Purple.png')
        this.load.audio('jewelCollect', 'audio/JewelCollectSound.wav')
        this.load.audio('jumpSound', 'audio/PlatformJump.mp3')
    }
    create() {
        // Place items on screen
        this.cameras.main.setBounds(0, 0, 2816, 1280)
        this.physics.world.setBounds(0, 2816, 1280)
        // Create backgrounds
        this.add.image(1440, 500, 'background1');
        this.add.image(1440, 780, 'background2');
        this.add.image(1440, 750, 'background3');
        // Create map based on tiled JSON file
        this.map = this.make.tilemap({ key: 'scene1map' })
        // Add tileset image, 1st parameter = name of tileset in Titled, 2nd = Phaser key
        this.tiles = this.map.addTilesetImage('Platforms', 'platform-tiles')
        // Create layers, 1st parameter = name of layer in Tiled, 2nd parameter = Phaser key
        this.platforms = this.map.createLayer('platforms', this.tiles)
        // Add collision to platforms/sprite
        this.map.setCollisionBetween(0, 9999);
        this.player = this.physics.add.sprite(192, 1280 - 128 * 4, 'boy-run')
        this.cameras.main.startFollow(this.player, true, 0.05)
        //this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, this.platforms)
        // Animations
        this.anims.create({
            key: 'run',
            frames: this.anims.generateFrameNumbers('boy-run', { start: 0, end: 49 }),
            frameRate: 60,
            repeat: -1
        })
        this.anims.create({
            key: 'idle',
            frames: this.anims.generateFrameNumbers('boy-run', { start: 10, end: 10 }),
            frameRate: 60,
            repeat: -1
        })
        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.keysWASD = this.input.keyboard.addKeys('W,A,S,D');
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // Pickups
        this.pickups = this.physics.add.group();
        const jewels = this.map.createFromObjects('Pickups', {
            key: 'jewel'
        })
        this.pickups.addMultiple(jewels)
        this.physics.add.collider(this.pickups, this.platforms)
        this.physics.add.overlap(this.player, this.pickups, this.collectPickup, null, this);
    }
    update() {
        // Update the game elements each frame
        // Negate player x force
        this.player.body.setVelocityX(0);
        if (this.cursors.left.isDown || this.keysWASD.A.isDown) {
            this.player.body.setVelocityX(-128 * 3)
            this.player.play('run', true);
            this.player.setFlipX(true);
        } else if (this.cursors.right.isDown || this.keysWASD.D.isDown) {
            this.player.body.setVelocityX(128 * 3)
            this.player.play('run', true);
            this.player.setFlipX(false);
        } else {
            this.player.play('idle', true);
        }

        const isTouchingGround = this.player.body.touching.down || this.player.body.blocked.down;
        if (this.spaceBar.isDown && isTouchingGround) {
            this.player.body.setVelocityY(-128 * 9.5)
            this.sound.play('jumpSound');
        }
    }
    collectPickup(player, pickup) {
        this.sound.play('jewelCollect', { volume: 0.5});
        pickup.destroy();
    }
}