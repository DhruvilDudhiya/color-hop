
// You can write more code here

/* START OF COMPILED CODE */

class Splash extends Phaser.Scene {

	constructor() {
		super("Splash");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bglayer
		this.add.image(540, 960, "bglayer");

		// logo
		const logo = this.add.image(540, 675, "logo");
		logo.scaleX = 1.5;
		logo.scaleY = 1.5;

		// play_btn
		const play_btn = this.add.image(540, 1371, "play-btn");
		play_btn.scaleX = 1.5;
		play_btn.scaleY = 1.5;

		// play_btn_text
		const play_btn_text = this.add.image(540, 1499, "play-btn-text");
		play_btn_text.scaleX = 1.5;
		play_btn_text.scaleY = 1.5;

		// volume_on
		const volume_on = this.add.image(96, 138, "volume-on");
		volume_on.name = "volume_on";
		volume_on.scaleX = 1.5;
		volume_on.scaleY = 1.5;

		this.logo = logo;
		this.play_btn = play_btn;
		this.play_btn_text = play_btn_text;
		this.volume_on = volume_on;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	logo;
	/** @type {Phaser.GameObjects.Image} */
	play_btn;
	/** @type {Phaser.GameObjects.Image} */
	play_btn_text;
	/** @type {Phaser.GameObjects.Image} */
	volume_on;

	/* START-USER-CODE */

	// Write your code here

	create() {
		this.editorCreate();
		this.tweens.add({
			targets: this.logo,
			scaleX: 1.8,
			scaleY: 1.8,
			duration: 500,
			yoyo: true,
			repeat: -1
		});
		this.play_btn.setInteractive();
		this.volume_on.setInteractive();
		this.play_btn.on("pointerover", () => {
			this.input.setDefaultCursor('pointer');

		});
		this.play_btn.on("pointerout", () => {
			this.input.setDefaultCursor('default');

		});
		this.play_btn.on("pointerdown", () => {
			this.tweens.add({
				targets: this.play_btn,
				scaleX: 1.2,
				scaleY: 1.2,
				duration: 200,
				yoyo: true,
				onComplete: () => {
					this.scene.start("Level");
				}
			});
		});
		this.play_btn_text.setInteractive();
		this.play_btn_text.on("pointerdown", () => {
			this.scene.start("Level");
		});
		this.play_btn_text.on("pointerover", () => {
			this.tweens.add({
				targets: this.play_btn_text,
				scaleX: 1.8,
				scaleY: 1.8,
				duration: 200,
				ease: "Linear"
			});
		});
		this.play_btn_text.on("pointerout", () => {
			this.tweens.add({
				targets: this.play_btn_text,
				scaleX: 1.5,
				scaleY: 1.5,
				duration: 200,
				ease: "Linear"
			});
		});

		this.volume_on.on("pointerdown", () => {
			this.tweens.add({
				targets: this.volume_on,
				scaleX: 1.2,
				scaleY: 1.2,
				duration: 200,
				yoyo: true,
			});
			if(this.volume_on.texture.key == "volume-on"){
				this.volume_on.setTexture("volume-off");
			}else {
				this.volume_on.setTexture("volume-on");
			}
		});
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
