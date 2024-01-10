
// You can write more code here

/* START OF COMPILED CODE */

class GameOver extends Phaser.Scene {

	constructor() {
		super("GameOver");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bglayer
		this.add.image(540, 960, "bglayer");

		// score_Board
		const score_Board = this.add.image(540, 960, "score-Board");
		score_Board.scaleX = 1.5;
		score_Board.scaleY = 1.5;

		// reply_btn
		const reply_btn = this.add.image(680, 1275, "reply_btn");
		reply_btn.scaleX = 1.5;
		reply_btn.scaleY = 1.5;

		// home_btn
		const home_btn = this.add.image(400, 1263, "home_btn");
		home_btn.scaleX = 1.5;
		home_btn.scaleY = 1.5;

		// game_over_text
		const game_over_text = this.add.image(540, 565, "game-over-text");
		game_over_text.scaleX = 1.2;
		game_over_text.scaleY = 1.2;

		// container_gameOver
		const container_gameOver = this.add.container(0, 0);

		// score_text
		const score_text = this.add.text(540, 881, "", {});
		score_text.setOrigin(0.5, 0.5);
		score_text.text = "0";
		score_text.setStyle({ "fontSize": "110px" });

		// highScore_txt
		const highScore_txt = this.add.text(540, 1114, "", {});
		highScore_txt.setOrigin(0.5, 0.5);
		highScore_txt.text = "0";
		highScore_txt.setStyle({ "fontSize": "110px" });

		this.score_Board = score_Board;
		this.reply_btn = reply_btn;
		this.home_btn = home_btn;
		this.game_over_text = game_over_text;
		this.container_gameOver = container_gameOver;
		this.score_text = score_text;
		this.highScore_txt = highScore_txt;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Image} */
	score_Board;
	/** @type {Phaser.GameObjects.Image} */
	reply_btn;
	/** @type {Phaser.GameObjects.Image} */
	home_btn;
	/** @type {Phaser.GameObjects.Image} */
	game_over_text;
	/** @type {Phaser.GameObjects.Container} */
	container_gameOver;
	/** @type {Phaser.GameObjects.Text} */
	score_text;
	/** @type {Phaser.GameObjects.Text} */
	highScore_txt;

	/* START-USER-CODE */

	// Write your code here

	create() {

		this.editorCreate();
		const highScore = localStorage.getItem("highScore");
		const currentScore = localStorage.getItem("currentScore");

		this.home_btn.on("pointerup", () => {
			localStorage.setItem("currentScore", 0);
			this.tweens.add({
				targets: this.home_btn,
				scaleX: 1.2,
				scaleY: 1.2,
				duration: 200,
				yoyo: true,
				onComplete: () => {
					this.scene.start("Splash");
				}
			});
		});
		this.reply_btn.on("pointerup", () => {
			localStorage.setItem("currentScore", 0);
			this.tweens.add({
				targets: this.reply_btn,
				scaleX: 1.2,
				scaleY: 1.2,
				duration: 200,
				yoyo: true,
				onComplete: () => {
					this.scene.start("Level");
				}
			});
		});
		this.highScore_txt.text = highScore;
		this.score_text.text = currentScore;

		this.reply_btn.setInteractive();
		this.reply_btn.on("pointerover", () => {
			this.input.setDefaultCursor("pointer");
			// this.tweens.add({
			// 	targets: this.reply_btn,
			// 	scaleX: 1.8,
			// 	scaleY: 1.8,
			// 	duration: 200,
			// 	ease: "Linear"
			// });

		});
		this.reply_btn.on("pointerout", () => {
			this.input.setDefaultCursor("default");
			// this.tweens.add({
			// 	targets: this.reply_btn,
			// 	scaleX: 1.5,
			// 	scaleY: 1.5,
			// 	duration: 200,
			// 	ease: "Linear"
			// });
		});

		this.home_btn.setInteractive();
		this.home_btn.on("pointerover", () => {
			// this.tweens.add({
			// 	targets: this.home_btn,
			// 	scaleX: 1.8,
			// 	scaleY: 1.8,
			// 	duration: 200,
			// 	ease: "Linear"
			// });
			this.input.setDefaultCursor("pointer");
		});
		this.home_btn.on("pointerout", () => {
			// this.tweens.add({
			// 	targets: this.home_btn,
			// 	scaleX: 1.5,
			// 	scaleY: 1.5,
			// 	duration: 200,
			// 	ease: "Linear"
			// });
			this.input.setDefaultCursor("default");
		});

	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
