import kaboom from "kaboom"

const k = kaboom()

k.loadSprite("bean", "sprites/bean.png")

const bean = k.add([
	sprite("bean"),
	pos(80, 40),
	area(),
	body(),
])

k.onKeyPress("space", () => {
	bean.jump()
})