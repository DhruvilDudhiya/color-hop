
// You can write more code here

/* START OF COMPILED CODE */

class Preload extends Phaser.Scene {

	constructor() {
		super("Preload");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorPreload() {

		this.load.pack("asset-pack", "assets/asset-pack.json");
	}

	/** @returns {void} */
	editorCreate() {

		// progress
		const progress = this.add.text(540, 1169, "", {});
		progress.setOrigin(0.5, 0.5);
		progress.visible = false;
		progress.text = "0%";
		progress.setStyle({ "fontSize": "30px" });

		// bglayer
		this.add.image(540, 960, "bglayer");

		// logo
		const logo = this.add.image(540, 675, "logo");
		logo.scaleX = 1.5;
		logo.scaleY = 1.5;

		// progress (components)
		new PreloadText(progress);

		this.events.emit("scene-awake");
	}

	/* START-USER-CODE */

	// Write your code here

	preload() {

		this.editorCreate();

		this.editorPreload();
		this.fakeLoader();

		// this.load.on(Phaser.Loader.Events.COMPLETE, () => this.scene.start("Level"));
	}
	fakeLoader() {
		this.outerBar = this.add.sprite(540 , 1600, "loader-bg");
		this.outerBar.setOrigin(0.5 , 0.5);
		this.outerBar.setScale(1.7 , 1.7);
		this.outerBar.setVisible(false)

		this.innerBar = this.add.sprite(260 , 1590, "loader");
		this.innerBar.setOrigin(0, 0.5);
		this.innerBar.setScale(1.7 , 1.7);
		this.innerBar.setVisible(false)

		this.innerBarWidth = this.innerBar.displayWidth;

		this.maskGraphics = this.make.graphics();
		this.maskGraphics.fillStyle(0xffffff);
		this.maskGraphics.fillRect(
			this.innerBar.x,
			this.innerBar.y - this.innerBar.displayHeight / 2,
			this.innerBar.displayWidth,
			this.innerBar.displayHeight
		);

		this.innerBar.setMask(this.maskGraphics.createGeometryMask());

		const loadingDuration = 3000;
		const intervalDuration = 30;
		const numIntervals = loadingDuration / intervalDuration;
		let currentInterval = 0;
		const progressIncrement = 1 / numIntervals;

		// let loadingCount = 1;
		// let loadingText = setInterval(()=>{
		// 	if(loadingCount % 3 === 0) {
		// 		this.progress.setText('Loading...');
		// 	}
		// 	else if((loadingCount+1) %3 === 0){
		// 		this.progress.setText('Loading..');
		// 	}
		// 	else if((loadingCount+2) %3 ===0){
		// 		this.progress.setText('Loading.');
		// 	}
		// 	loadingCount ++;
		// },300)


		const updateProgressBar = () => {
			this.outerBar.setVisible(true);
			this.innerBar.setVisible(true);
			// this.progress.setVisible(true);
			const currentProgress = currentInterval * progressIncrement;
			// Replace with your game object image
			this.maskGraphics.clear();
			this.maskGraphics.fillStyle(0xffffff);
			this.maskGraphics.fillRect(
				this.innerBar.x,
				this.innerBar.y - this.innerBar.displayHeight / 2,
				this.innerBarWidth * currentProgress,
				this.innerBar.displayHeight
			);
			// this.loadingBall.x = (this.innerBarWidth - 60) * currentProgress + 280;

			// this.progress.setTint("0xfdefb4");

			currentInterval++;

			if (currentProgress >= 1) {
				// clearInterval(loadingText);
				clearInterval(progressInterval);
				this.scene.start("Splash");
			}
		};

		const progressInterval = setInterval(updateProgressBar, intervalDuration);
	}

	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
