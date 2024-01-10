
// You can write more code here

/* START OF COMPILED CODE */

class Level extends Phaser.Scene {

	constructor() {
		super("Level");

		/* START-USER-CTR-CODE */
		// Write your code here.
		/* END-USER-CTR-CODE */
	}

	/** @returns {void} */
	editorCreate() {

		// bglayer
		this.add.image(540, 960, "bglayer");

		// scoreText
		const scoreText = this.add.text(540, 960, "", {});
		scoreText.scaleX = 3;
		scoreText.scaleY = 3;
		scoreText.setOrigin(0.5, 0.5);
		scoreText.alpha = 0.1;
		scoreText.alphaTopLeft = 0.1;
		scoreText.alphaTopRight = 0.1;
		scoreText.alphaBottomLeft = 0.1;
		scoreText.alphaBottomRight = 0.1;
		scoreText.text = "0";
		scoreText.setStyle({ "fontSize": "250px" });

		// container_wall
		const container_wall = this.add.container(0, 0);

		// tap_text
		const tap_text = this.add.text(559, 1354, "", {});
		tap_text.setOrigin(0.5, 0.5);
		tap_text.alpha = 0.8;
		tap_text.alphaTopLeft = 0.8;
		tap_text.alphaTopRight = 0.8;
		tap_text.alphaBottomLeft = 0.8;
		tap_text.alphaBottomRight = 0.8;
		tap_text.text = "TAP TO PLAY";
		tap_text.setStyle({ "fontSize": "80px" });

		this.scoreText = scoreText;
		this.container_wall = container_wall;
		this.tap_text = tap_text;

		this.events.emit("scene-awake");
	}

	/** @type {Phaser.GameObjects.Text} */
	scoreText;
	/** @type {Phaser.GameObjects.Container} */
	container_wall;
	/** @type {Phaser.GameObjects.Text} */
	tap_text;

	/* START-USER-CODE */

	// Write more your code here

	create() {
		this.editorCreate();
		this.leftWall = [];
		this.rightWall = [];
		this.currentLevel = 1;
		this.isFirstClick = false;
		this.score = 0;
		this.starCount = 0;
		this.obstacleTimeout;
		this.options = {
			wallArray: ["yellow", "green", "red", "blue", 'dark-purple'],
			ballArray: ["yellow-ball", "green-ball", "red-ball", "blue-ball", 'dark-purple-ball'],
			gravity: 4,
			ballSpeed: 6,
			jumpForce: 25,
		}
		this.clonedArray = [...this.options.wallArray];
		this.isGameStart = false;
		this.levelConfig = {
			1: {
				wallCount: 2,
				gravity: 4,
				ballSpeed: 6,
				jumpForce: 25,
			},
			2: {
				wallCount: 3,
				gravity: 4,
				ballSpeed: 8,
				jumpForce: 31,
			},
			3: {
				wallCount: 3,
				gravity: 4,
				ballSpeed: 8,
				jumpForce: 31,
			},
			4: {
				wallCount: 4,
				gravity: 4,
				ballSpeed: 10,
				jumpForce: 31,
			},
			5: {
				wallCount: 4,
				gravity: 4,
				ballSpeed: 10,
				jumpForce: 31,
			},
			6: {
				wallCount: 5,
				gravity: 4,
				ballSpeed: 6,
				jumpForce: 25,
			},
			7: {
				wallCount: 5,
				gravity: 4,
				ballSpeed: 6,
				jumpForce: 25,
			},
		}

		this.matter.world.pause();
		this.createWalls();
		this.addStar();
		this.addBall();
		this.placestar();
		const particleConfig = {
			x: this.ball.x,
			y: this.ball.y,
			speed: 50,
			lifespan: 1000,
			blendMode: 'SCREEN',
			scale: { start: 1, end: 0 },
			frequency: 100,
			follow: this.ball,
			followOffset: { x: 0, y: 0 },
		};
		this.tapToPlayTween();
		this.followPartical = this.particles.createEmitter(particleConfig);
		this.matter.world.on("collisionstart", function (events, bodyA, bodyB) {
			if (bodyA.name === "blue-ball" && bodyB.label === "blue" || bodyA.label === "blue" && bodyB.name === "blue-ball" || bodyA.label === "blue" && bodyB.name === "blue" || bodyA.name === "blue" && bodyB.label === "blue") {
				this.handleCollision((bodyB.lable2 == undefined) ? bodyA.lable2 : bodyB.lable2)
			} else if (bodyA.name == "yellow-ball" && bodyB.label == "yellow" || bodyA.label == "yellow" && bodyB.name == "yellow-ball" || bodyA.label === "yellow" && bodyB.name === "yellow" || bodyA.name === "yellow" && bodyB.label === "yellow") {
				this.handleCollision((bodyB.lable2 == undefined) ? bodyA.lable2 : bodyB.lable2)
			} else if (bodyA.name == "green-ball" && bodyB.label == "green" || bodyA.label == "green" && bodyB.name == "green-ball" || bodyA.label === "green" && bodyB.name === "green" || bodyA.name === "green" && bodyB.label === "green") {
				this.handleCollision((bodyB.lable2 == undefined) ? bodyA.lable2 : bodyB.lable2)
			} else if (bodyA.name == "red-ball" && bodyB.label == "red" || bodyA.label == "red" && bodyB.name == "red-ball" || bodyA.label === "red" && bodyB.name === "red" || bodyA.name === "red" && bodyB.label === "red") {
				this.handleCollision((bodyB.lable2 == undefined) ? bodyA.lable2 : bodyB.lable2)
			} else if (bodyA.label == "star" || bodyB.label == "star") {
				this.handleStarCollision();
			} else if (bodyA.label == "star" && bodyB.label == "Rectangle Body" || bodyA.label == "Rectangle Body" && bodyB.label == "star") {
			} else if (bodyA.name == "dark-purple-ball" && bodyB.name == "dark-purple" || bodyA.label == "dark-purple" && bodyB.name == "dark-purple-ball" || bodyA.label === "dark-purple" && bodyB.name === "dark-purple" || bodyA.name === "dark-purple" && bodyB.label === "dark-purple") {
				this.handleCollision((bodyB.lable2 == undefined) ? bodyA.lable2 : bodyB.lable2)
			} else {
				this.checkGameOver(bodyA, bodyB);
			}

		}, this);
		this.input.on("pointerdown", this.jumpBall);
		this.input.on("pointerdown", () => {
			if (!this.isFirstClick) {
				this.isFirstClick = true;
				this.starTween();
				this.tap_text.visible = false;
				this.matter.world.resume();
				this.addObstacleTimer();
			}
		});
	}
	tapToPlayTween = () => {
		const tween = this.tweens.create({
			targets: this.tap_text,
			duration: 500,
			scaleX: 1.08,
			scaleY: 1.08,
			yoyo: true,
			repeat: -1
		});
		tween.play();
	}
	checkGameOver(bodyA, bodyB) {
		console.log(this.ball.body.name);
		switch (this.ball.body.name) {
			case "blue-ball":
				this.particles = this.add.particles("blue-particle");
				break;
			case "green-ball":
				this.particles = this.add.particles("green-particle");
				break;
			case "red-ball":
				this.particles = this.add.particles("red-particle");
				break;
			case "yellow-ball":
				this.particles = this.add.particles("yellow-particle");
				break;
			case "dark-purple-ball":
				this.particles = this.add.particles("dark-purple-particle");
				break;
			default:
				break;
		}
		this.exploreEmitter = this.particles.createEmitter({
			speed: 2000,
			scale: { start: 0.6, end: 0.65 },
			alpha: { start: 1, end: 0 },
			lifespan: 500,
		})
		this.exploreEmitter.start();
		this.exploreEmitter.explode(200, this.ball.x, this.ball.y);
		this.followPartical.remove();
		this.ball.visible = false;
		this.input.enabled = false;
		setTimeout(() => {
			this.scene.start("GameOver");
			this.clearObstacleTimer();
		}, 1500);
	}

	addObstacle() {
		const randomTileIndex = Phaser.Math.Between(0, this.options.wallArray.length - 1);
		const randomX = Phaser.Math.Between(100, 1000);
		const obstacle = this.matter.add.image(randomX, 100, this.options.wallArray[randomTileIndex]);
		obstacle.setFriction(0.5);
		obstacle.setScale(1.5);
		obstacle.setBounce(0.2);
		obstacle.setVelocityY(-1); // Set the velocity of the obstacle
	}

	handleCollision = (wallSide) => {
		this.ball.setVelocity(this.options.ballSpeed, this.ball.body.velocity.y);
		this.updateScore();
		this.updateLevel(wallSide);
		this.paintWalls((wallSide === "left") ? this.rightWall : this.leftWall);
		this.playWallTween(wallSide === "left" ? this.rightWall : this.leftWall);
	}
	playWallTween = (walls) => {
		this.tweens.add({
			targets: walls,
			scaleX: 1.5,
			scaleY: 1.5,
			duration: 200,
			yoyo: true,
		});
	}

	addObstacleTimer = () => {
		const randomTime = Phaser.Math.Between(20000, 50000);
		this.obstacleTimeout = setTimeout(() => {
			this.addObstacle();
		}, randomTime);
	}

	clearObstacleTimer = () => {
		clearTimeout(this.obstacleTimeout);
	}
	updateScore = () => {
		this.score++;
		this.scoreText.text = this.score;
		localStorage.setItem('currentScore', this.score);
		const highScore = localStorage.getItem('highScore');
		if (this.score > highScore) {
			localStorage.setItem('highScore', this.score);
		}
	}
	updateLevel = (side) => {
		//12 , 13,27,28,42,43,57,58
		if (this.score > 57) {
			this.currentLevel = 1;
		}
		if ((this.score == 12 || this.score == 13) || (this.score == 27 || this.score == 28) || (this.score == 42 || this.score == 43) || (this.score == 57 || this.score == 58)) {
			this.currentLevel++;
			this.resetWalls(side);
			this.createWalls();
		}
	}
	resetWalls = (side) => {
		if (side === "right") {
			console.log("right");
			this.leftWall.forEach(wall => wall.destroy());
			this.leftWall = []
		}
		if (side === "left") {
			console.log("left");
			this.rightWall.forEach(wall => wall.destroy());
			this.rightWall = []
		}
	}
	getRandomImages = () => {
		if (this.clonedArray.length === 0) {
			this.clonedArray = [...this.options.wallArray];
		}
		const randomIndex = Math.floor(Math.random() * this.clonedArray.length);
		const randomImage = this.clonedArray[randomIndex];
		this.clonedArray.splice(randomIndex, 1);
		console.log(randomImage);
		return randomImage;
	}
	paintWalls = (walls) => {
		this.placestar();
		const usedImages = []; // Keep track of used images
		walls.forEach((wall) => {
			let randImg;
			do {
				randImg = Phaser.Math.RND.pick(this.options.wallArray);
			} while (usedImages.includes(randImg)); // Select a new image if it has already been used
			usedImages.push(randImg); // Add the selected image to the used images array
			wall.setTexture(randImg);
			wall.body.label = randImg;
			let randomWall = Phaser.Math.RND.pick(walls);
			const wallTextures = {
				"blue": {
					ballTexture: "blue-ball",
					particleTexture: "blue-particle",
					starTexture: "blue-star"
				},
				"green": {
					ballTexture: "green-ball",
					particleTexture: "green-particle",
					starTexture: "green-star"
				},
				"red": {
					ballTexture: "red-ball",
					particleTexture: "red-particle",
					starTexture: "red-star"
				},
				"yellow": {
					ballTexture: "yellow-ball",
					particleTexture: "yellow-particle",
					starTexture: "yellow-star"
				},
				"dark-purple": {
					ballTexture: "dark-purple-ball",
					particleTexture: "dark-purple-particle",
					starTexture: "dark-purple-star"
				}
			};
			const wallLabel = randomWall.body.label;
			if (wallTextures.hasOwnProperty(wallLabel)) {
				const textures = wallTextures[wallLabel];
				this.ball.setTexture(textures.ballTexture);
				this.ball.body.name = wallLabel;
				this.particles.setTexture(textures.particleTexture);
				this.star.setTexture(textures.starTexture);
			}
		});
	}
	createWalls = () => {
		const level = this.levelConfig[this.currentLevel];
		this.wallCount = level.wallCount;
		if (this.leftWall.length === 0 && this.rightWall.length === 0) {
			for (let i = 0; i < this.wallCount; i++) {
				this.leftWall[i] = this.addWall(i, 0, this.wallCount);
				this.rightWall[i] = this.addWall(i, 1, this.wallCount);
			}
		} else {
			if (this.leftWall.length === 0) {
				for (let i = 0; i < this.wallCount; i++) {
					this.leftWall[i] = this.addWall(i, 0, this.wallCount);
				}
			} else {
				for (let i = 0; i < this.wallCount; i++) {
					this.rightWall[i] = this.addWall(i, 1, this.wallCount);
				}
			}
		}
	}
	addWall = (wallNumber, side, noOfWalls) => {
		let WallTexture = this.textures.get("");
		let wallHeight = 1920 / noOfWalls;
		let wallX = side * 1080 + WallTexture.source[0].width / 1 - WallTexture.source[0].width * side * 2;
		let wallY = wallHeight * wallNumber + wallHeight / 2;
		let randomWall = Phaser.Math.RND.pick(this.options.wallArray);
		this.wall = this.matter.add.image(wallX, wallY, randomWall, null, {
			isStatic: true,
			label: randomWall,
			lable2: side == 0 ? "left" : "right",
		});
		this.wall.displayHeight = wallHeight;
		this.container_wall.add(this.wall);
		return this.wall;
	}
	handleStarCollision = () => {
		this.star.visible = false;
		let particleImage = this.star.texture.key;
		this.starParticles = this.add.particles(particleImage);
		let particleEmitter = this.starParticles.createEmitter({
			x: this.star.x,
			y: this.star.y,
			speed: 400,
			angle: { min: 0, max: 360 },
			scale: { start: 1, end: 0 },
			lifespan: 1000,
			gravityY: 400
		});
		particleEmitter.explode(5);
	}
	placestar = () => {
		this.star.visible = true;
		this.star.x = Phaser.Math.Between(1080 * 0.2, 1080 * 0.8);
		this.star.y = Phaser.Math.Between(1920 * 0.2, 1920 * 0.8);
	}
	addBall = () => {
		let randomWall = Phaser.Math.RND.pick(this.leftWall);
		let ballImage = randomWall.body.label + "-ball";
		this.ball = this.matter.add.image(1080 / 2, 1920 / 2, ballImage, null, {});
		this.ball.setScale(0.8);
		this.ball.setCircle(40);
		this.ball.body.name = ballImage;
		let particleImage = randomWall.body.label + "-particle";
		this.particles = this.add.particles(particleImage);
		let starImage = randomWall.body.label + "-star";
		this.star.setTexture(starImage);
	}
	addStar = () => {
		this.star = this.matter.add.image(0, 0, "white", null, {
			label: "star",
			isStatic: true,
			isSensor: true,
		});
	}

	starTween = () => {
		var starTween = this.add.tween({
			targets: this.star,
			scaleX: 1.3,
			scaleY: 1.3,
			duration: 500,
			yoyo: true,
			repeat: -1,
			ease: 'Linear'
		})
	}
	jumpBall = () => {
		const level = this.levelConfig[this.currentLevel];
		if (this.tap_text.visible) {
			this.tap_text.visible = false;
		}
		this.matter.world.resume();
		this.ball.setVelocity((this.ball.body.velocity.x > 0) ? level.ballSpeed : -level.ballSpeed, -level.jumpForce);
	}
	update() {
		const level = this.levelConfig[this.currentLevel];
		this.ball.setVelocity((this.ball.body.velocity.x > 0) ? level.ballSpeed : -level.ballSpeed, this.ball.body.velocity.y)
		if (this.ball.y < -5 || this.ball.y > 1930) {
			this.ball.visible = false
			setTimeout(() => {
				this.scene.start("GameOver");
				this.clearObstacleTimer();
			}, 500);
		}
	}
	/* END-USER-CODE */
}

/* END OF COMPILED CODE */

// You can write more code here
