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

// Helper: read a Vector3 from two input boxes
function readVector(xId, yId) {
  const x = parseFloat(document.getElementById(xId).value);
  const y = parseFloat(document.getElementById(yId).value);
  return new Vector3([x, y, 0]);
}

// Step 3–4 draw button: just draw v1 (red) and v2 (blue)
function handleDrawEvent() {
  clearCanvas();

  const v1 = readVector('v1x', 'v1y');
  const v2 = readVector('v2x', 'v2y');

  drawVector(v1, "red");
  drawVector(v2, "blue");
}

// Step 5+ operation button: draw v1/v2, then perform selected op
function handleDrawOperationEvent() {
  clearCanvas();

  const v1 = readVector('v1x', 'v1y');
  const v2 = readVector('v2x', 'v2y');

  // Always draw originals
  drawVector(v1, "red");
  drawVector(v2, "blue");

  const op = document.getElementById('op').value;
  const s = parseFloat(document.getElementById('scalar').value);

  if (op === "add") {
    const v3 = new Vector3([v1.elements[0], v1.elements[1], 0]).add(v2);
    drawVector(v3, "green");
  }
  else if (op === "sub") {
    const v3 = new Vector3([v1.elements[0], v1.elements[1], 0]).sub(v2);
    drawVector(v3, "green");
  }
  else if (op === "mul") {
    const v3 = new Vector3([v1.elements[0], v1.elements[1], 0]).mul(s);
    const v4 = new Vector3([v2.elements[0], v2.elements[1], 0]).mul(s);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (op === "div") {
    const v3 = new Vector3([v1.elements[0], v1.elements[1], 0]).div(s);
    const v4 = new Vector3([v2.elements[0], v2.elements[1], 0]).div(s);
    drawVector(v3, "green");
    drawVector(v4, "green");
  }
  else if (op === "magnitude") {
    console.log("v1 magnitude:", v1.magnitude());
    console.log("v2 magnitude:", v2.magnitude());

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
  cosA = Math.min(1, Math.max(-1, cosA));

  const radians = Math.acos(cosA);
  const degrees = radians * (180 / Math.PI);
  return degrees;
}

function areaTriangle(v1, v2) {
  const cross = Vector3.cross(v1, v2);
  return cross.magnitude() / 2;
}
