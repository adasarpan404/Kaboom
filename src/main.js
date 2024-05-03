import kaboom from "kaboom";
const FLOOR_HEIGHT = 48;
const JUMP_FORCE = 800;
const SPEED = 480;

const k = kaboom();

k.loadSprite("bean", "sprites/bean.png");

k.scene("game", () => {

	k.setGravity(1600);

	const player = k.add([
		k.sprite("bean"),
		k.pos(80, 40),
		k.area(),
		k.body(),
	]);

	k.add([
		k.rect(k.width(), FLOOR_HEIGHT),
		k.outline(4),
		k.pos(0, height()),
		k.anchor("botleft"),
		k.area(),
		k.body({ isStatic: true }),
		k.color(127, 200, 255),
	]);

	function jump() {
		if (player.isGrounded()) {
			player.jump(JUMP_FORCE);
		}
	}

	k.onKeyPress("space", jump);
	k.onClick(jump);

	function spawnTree() {

		k.add([
			k.rect(48, rand(32, 96)),
			k.area(),
			k.outline(4),
			k.pos(k.width(), k.height() - FLOOR_HEIGHT),
			k.anchor("botleft"),
			k.color(255, 180, 255),
			k.move(LEFT, SPEED),
			"tree",
		]);

		k.wait(k.rand(0.5, 1.5), spawnTree);
	}

	spawnTree();

	player.onCollide("tree", () => {
		k.go("lose", score);
		k.burp();
		k.addKaboom(player.pos);
	});

	let score = 0;

	const scoreLabel = k.add([
		k.text(score),
		k.pos(24, 24),
	]);

	k.onUpdate(() => {
		score++;
		scoreLabel.text = score;
	});

});

k.scene("lose", (score) => {

	k.add([
		k.sprite("bean"),
		k.pos(k.width() / 2, k.height() / 2 - 80),
		k.scale(2),
		k.anchor("center"),
	]);

	k.add([
		k.text(score),
		k.pos(k.width() / 2, k.height() / 2 + 80),
		k.scale(2),
		k.anchor("center"),
	]);

	k.onKeyPress("space", () => k.go("game"));
	k.onClick(() => k.go("game"));

});

k.go("game");