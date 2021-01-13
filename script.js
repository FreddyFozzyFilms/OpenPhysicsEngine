const width = 800
const height = 800
const canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d")
canvas.width = width
canvas.height = height
canvas.style.transform = 'scale(${1/zoom})'
canvas.style.transformOrigin = 'top left'

function drawCircle(x, y, r, color){
  ctx.fillStyle = color
  ctx.beginPath()
  ctx.arc(x, y, r, 0, 2 * Math.PI)
  ctx.fill()
}

function clearCanvas(){
  ctx.clearRect(0, 0, width, height)
}

function drawPoint(x, y){
  drawCircle(x, y, pointRadius, color)
}

const dt = 10
const pointRadius = 15
const color = 'rgb(206, 48, 48)'
let pointmass1 = {
  position: V(100, 100),
  velocity: V(0, 0),
  force: V(0,0),
  mass: 5
}
let pointmass2 = {
  position: V(100, 300),
  velocity: V(0, 0),
  force: V(0,0),
  mass: 1
}
let pointmass3 = {
  position: V(200, 300),
  velocity: V(0, 0),
  force: V(0,0),
  mass: 1
}
let pointmass4 = {
  position: V(100, 400),
  velocity: V(0, 0),
  force: V(0,0),
  mass: 1
}

let spring1 = createSpring(pointmass1, pointmass2)
let spring2 = createSpring(pointmass3, pointmass2)
let spring3 = createSpring(pointmass1, pointmass3)

let points = [pointmass1, pointmass2, pointmass3, pointmass4]
let springs = [spring1, spring2, spring3]

function checkEdgeBounce(point){
  let overlap
  if (point.position.y >= height - pointRadius){
    point.velocity.y = -point.velocity.y
    point.position.y = height - pointRadius
  }
  else if (point.position.y <= pointRadius){
    point.velocity.y = -point.velocity.y
    point.position.y = pointRadius
  }
  else if (point.position.x >= height - pointRadius){
    point.velocity.x = -point.velocity.x
    point.position.x = height - pointRadius
  }
  else if(point.position.x <= pointRadius){
    point.velocity.x = -point.velocity.x
    point.position.x = pointRadius
  }
}

function updatePoints(){
  for (let i = 0; i < points.length; i++){
    checkEdgeBounce(points[i])
    points[i].velocity.add(points[i].force.times(dt / points[i].mass)) // v = a*dt = F/m * dt = F * dt/m
    points[i].velocity.add(V(0, 0.00098 * dt))
    points[i].position.add(points[i].velocity.times(dt))
    drawPoint(points[i].position.x, points[i].position.y)

    points[i].force = V(0, 0)
  }
}

function drawSpring(spring){
  let displacement = spring.point2.position.minus(spring.point1.position)
  displacement.debugDraw(ctx, spring.point1.position)
}

function updateSprings(){
  for (let i = 0; i < springs.length; i++){
    displacement = springs[i].point2.position.minus(springs[i].point1.position)
    f = -springs[i].k * (displacement.norm() - springs[i].l)

    displacement.normalize()

    springs[i].point2.force.add(displacement.times(f))
    springs[i].point1.force.add(displacement.times(-f))

    drawSpring(springs[i])
  }
}
// game loop
function update(){
  clearCanvas()
  updateSprings()
  updatePoints()
}

function animate(){
  setTimeout(animate, dt)
  update()
}

animate()
//pointmass1.position = V(100, 120)
// game loop
