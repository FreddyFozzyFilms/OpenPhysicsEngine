function createSpring(pointmass1, pointmass2){
  let displacement = pointmass2.position.minus(pointmass1.position)
  let spring = {
    point1: pointmass1,
    point2: pointmass2,
    k: 0.00001,
    l: displacement.norm()
  }
  return spring
}
