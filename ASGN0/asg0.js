var canvas;
var ctx;

function main() {
  canvas = document.getElementById('example');
  if (!canvas) {
    console.log('Failed to retrieve the <canvas> element');
    return;
  }

  ctx = canvas.getContext('2d');
  clearCanvas();
}

function clearCanvas() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleDrawEvent() {
  clearCanvas();

  // Read v1
  const v1x = parseFloat(document.getElementById('v1x').value);
  const v1y = parseFloat(document.getElementById('v1y').value);
  const v1 = new Vector3([v1x, v1y, 0]);

  // Read v2
  const v2x = parseFloat(document.getElementById('v2x').value);
  const v2y = parseFloat(document.getElementById('v2y').value);
  const v2 = new Vector3([v2x, v2y, 0]);

  // Always draw originals
  drawVector(v1, "red");
  drawVector(v2, "blue");

  // Operation selector
  const op = document.getElementById('op').value;

  if (op === "magnitude") {
    console.log("v1 magnitude:", v1.magnitude());
    console.log("v2 magnitude:", v2.magnitude());

    // Draw normalized vectors in green
    const nv1 = new Vector3([v1.elements[0], v1.elements[1], 0]).normalize();
    const nv2 = new Vector3([v2.elements[0], v2.elements[1], 0]).normalize();
    drawVector(nv1, "green");
    drawVector(nv2, "green");
  } 
  else if (op === "normalize") {
    const nv1 = new Vector3([v1.elements[0], v1.elements[1], 0]).normalize();
    const nv2 = new Vector3([v2.elements[0], v2.elements[1], 0]).normalize();
    drawVector(nv1, "green");
    drawVector(nv2, "green");
  } 
  else if (op === "angle") {
    const a = angleBetween(v1, v2);
    console.log("Angle between v1 and v2 (degrees):", a);
  } 
  else if (op === "area") {
    const area = areaTriangle(v1, v2);
    console.log("Area of triangle formed by v1 and v2:", area);
  }
}

function drawVector(v, color) {
  const scale = 20;
  const originX = 200;
  const originY = 200;

  ctx.strokeStyle = color;
  ctx.beginPath();
  ctx.moveTo(originX, originY);
  ctx.lineTo(
    originX + v.elements[0] * scale,
    originY - v.elements[1] * scale
  );
  ctx.stroke();
}

function angleBetween(v1, v2) {
  const dot = Vector3.dot(v1, v2);
  const m1 = v1.magnitude();
  const m2 = v2.magnitude();

  if (m1 === 0 || m2 === 0) return 0;

  let cosA = dot / (m1 * m2);
  cosA = Math.min(1, Math.max(-1, cosA)); // clamp

  const radians = Math.acos(cosA);
  const degrees = radians * (180 / Math.PI);
  return degrees;
}

function areaTriangle(v1, v2) {
  const cross = Vector3.cross(v1, v2);
  const areaParallelogram = cross.magnitude();
  return areaParallelogram / 2;
}
