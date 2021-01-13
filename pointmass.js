function createPointMass(){
  function checkEdgeBounce(){
    if (point.position.y >= height - pointRadius || point.position.y <= pointRadius)
      point.velocity.y = -point.velocity.y
    else if (point.position.x >= height - pointRadius || point.position.x <= pointRadius)
      point.velocity.x = -point.velocity.x
  }
}
