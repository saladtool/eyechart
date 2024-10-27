/**********
 * Draw Eye Chart by SVG
 */






function createEShapeByPath(startx, starty, sideLength, direction = "east") {
    // Create a path element
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

  cellWidth = sideLength / 5; 
  path.setAttribute('d', `M ${startx}, ${starty} h ${cellWidth *5} v  ${cellWidth}  h ${cellWidth * (-4)}  \
                          v ${cellWidth}  h ${cellWidth * (4)}  v ${cellWidth}  h ${cellWidth * (-4)} \
                          v ${cellWidth}  h ${cellWidth * (4)}  v ${cellWidth}  h ${cellWidth * (-5)} \
                          Z`);
  path.setAttribute("fill", "black");

  centerX = startx + sideLength / 2
  centerY = starty + sideLength / 2

  if (direction == "east") {
    //do nothing
  } else if (direction == "north") {
    path.setAttribute("transform",`rotate(-90, ${centerX}, ${centerY})`);
  }else if (direction == "south") {
    path.setAttribute("transform",`rotate(90, ${centerX}, ${centerY})`);
  } else if (direction == "west") {
    path.setAttribute("transform",`rotate(1800, ${centerX}, ${centerY})`);
  }
  
  return path;
}

function createNumberPairSet(pairs) {
  const set = new Set();
  for (const pair of pairs) {
    const pairString = `${pair[0]} ${pair[1]}`;
    set.add(pairString);
  }
  return set;
}

function isPairInSet(set, a, b) {
  const pairString = `${a} ${b}`;
  return set.has(pairString);
}



function createEShape(startx, starty, sideLength, direction = "eastShape") {

  const northShape =createNumberPairSet([[0,1], [1,1], [2,1], [3,1], [0,3], [1,3], [2,3], [3,3]]);
  const southShape =createNumberPairSet([[4,1], [1,1], [2,1], [3,1], [4,3], [1,3], [2,3], [3,3]]);
  const eastShape = createNumberPairSet([[1,1], [1,2], [1,3], [1,4], [3,1], [3,2], [3,3], [3,4]]);
  const westShape = createNumberPairSet([[1,1], [1,2], [1,3], [1,0], [3,1], [3,2], [3,3], [3,0]]);

  currentShape = eastShape

  if (direction == "north") {
    currentShape = northShape;
  } else if (direction == "east") {
    currentShape = eastShape;
  }else if (direction == "south") {
    currentShape = southShape;
  } else if (direction == "west") {
    currentShape = westShape;
  }

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  const cellWidth = sideLength  ;
  const cellHeight = cellWidth;

  for (let row = 0; row < 5; row++) {
    for (let col = 0; col < 5; col++) {
      const cell = document.createElementNS("http://www.w3.org/2000/svg", "rect");
      cell.setAttribute("x", col * cellWidth + startx + "mm");
      cell.setAttribute("y", row * cellHeight + starty + "mm");
      cell.setAttribute("width", cellWidth  + "mm");
      cell.setAttribute("height", cellHeight + "mm");
 //     cell.setAttribute("stroke-width", 0); // Set stroke width to 0

      if (isPairInSet(currentShape, row,col)) {
        cell.setAttribute("fill", "white");
      } else {
        cell.setAttribute("fill", "black");
      }
      group.appendChild(cell);
    }
  }

  anotherShape = createNorthEShape( 100, 100, 30)
  group.appendChild(anotherShape)
  return group;
}




function createLineofEShapes ( startx, starty, gap, eshapeList, sideLength, record, viewBox ) {
 
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  for (shapeIndex =0;shapeIndex < eshapeList.length; shapeIndex++ ) {
    shapeX = startx + shapeIndex * (sideLength + gap);
    shapeY = starty;
    shape = createEShapeByPath(shapeX, shapeY, sideLength, eshapeList[shapeIndex]);
    group.appendChild(shape)
  }

  textX = startx +  eshapeList.length * (sideLength + gap * 2);
  textY = starty;
  const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');
  

  // Set attributes for the text element, including font size
  textElement.setAttribute('x', viewBox.x + viewBox.width - 50) ;
  textElement.setAttribute('y', textY + sideLength );
  textElement.setAttribute('fill', 'blue');
  textElement.setAttribute('font-size', '12px'); 
  textElement.textContent = record.toFixed(1);

  group.appendChild(textElement);

  // ruler 10mm x 1mm
  const cell = document.createElementNS("http://www.w3.org/2000/svg", "rect");
  cell.setAttribute("x", viewBox.x + viewBox.width - 50);
  cell.setAttribute("y",  textY + sideLength  );
  ruleWith =   ((10 ) /5 ) * 5
  cell.setAttribute("width", ruleWith  );
  cell.setAttribute("height",   "10");
  cell.setAttribute("fill", "black");
  group.appendChild(cell);
  

  return group;
 
}


function createEyeChart(startx, starty, viewBox) {
  const eycChartStandard = [
    /** line 1 */ {sideLength : 72.72, shapes: ["west", "south"] , record : 4.0},
    /** line 2 */ {sideLength : 57.76, shapes: ["north", "east"] , record : 4.1 },
    {sideLength :45.88, shapes: ["west", "north"] , record : 4.2 },
    {sideLength :36.45, shapes: ["east", "south", "west"] , record : 4.3 },
    {sideLength :28.95, shapes: ["west", "north", "east"] , record : 4.4 },
    {sideLength :23.00, shapes: ["north", "east", "west", "south"] , record : 4.5 },
    {sideLength :18.27, shapes: ["west", "south", "east","north"] , record : 4.6 },
    {sideLength :15.41, shapes: ["north", "west", "north", "south", "east"] , record : 4.7 },
    {sideLength :11.53, shapes: ["west", "north", "east", "west", "north", "south"] , record : 4.8 },
    {sideLength :9.16, shapes: ["north", "west", "east", "south", "east", "south", "north", "south"] , record : 4.9 },
    {sideLength :7.27, shapes: ["south", "east", "north", "east", "west", "south", "north", "west"] , record : 5.0 }
  ]


  console.log (eycChartStandard.length);

  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
  /**
   * first line
   */
  currentX = startx;
  currentY = starty;
  currentLine = eycChartStandard[0]
  sideLength = currentLine.sideLength;
  shapeGap = sideLength/5;
  shapes = currentLine.shapes;
  record = currentLine.record

  lineOfShape = createLineofEShapes(currentX, currentY,  shapeGap, shapes, sideLength, record, viewBox)

  group.appendChild(lineOfShape);


  lastLineX = currentX
  lastLineY = currentY
  lastLine = currentLine

  for (let i = 1; i < eycChartStandard.length; i++) {
    console.log (i);
    currentLine = eycChartStandard[i]
    currentX = lastLineX ;
    currentY = lastLineY + lastLine.sideLength  + currentLine.sideLength ;
    sideLength = currentLine.sideLength;
    shapeGap = sideLength/5;
    shapes = currentLine.shapes;
    record = currentLine.record
    lineOfShape = createLineofEShapes(currentX, currentY,  shapeGap, shapes, sideLength, record, viewBox)
    group.appendChild(lineOfShape);
    lastLineX = currentX
    lastLineY = currentY
    lastLine = currentLine
  }

 return group;
}

function drawEyeChart(svgContainer, scale = 1) {

  let width = 350
  let height = 2000

  let viewBox = { x : 0, y :0, width : width, height : height }


  // Create the SVG element if it doesn't exist
  if (svgContainer.childElementCount  == 0) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
 
      svgContainer.appendChild(svg);
  } else {
    svg = svgContainer.firstElementChild
    // Remove the previous grids
    svg.innerHTML = ""; 
  }

  scaleWidth = width * scale
  scaleHeight = height * scale
  svg.setAttribute("width", scaleWidth + "mm");
  svg.setAttribute("height", scaleHeight + "mm");
  svg.setAttribute("viewBox", `0 0 ${width}  ${height}`);


  const rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');

  // Set the attributes of the rectangle
  rect.setAttribute('width', '100%');
  rect.setAttribute('height', '100%');
  rect.setAttribute('stroke', 'black');
  rect.setAttribute('stroke-width', '1');
  rect.setAttribute('stroke-dasharray', '5,5');
  rect.setAttribute('fill', 'none');

  // Append the rectangle to the SVG container
  //svg.appendChild(rect);

  eyeCharts = createEyeChart (0 , 0, viewBox)
  
  svg.appendChild(eyeCharts);

}

///// Main Program
let svg;
let scale = 1;
// Get the draw button element
const extend = document.getElementById("extend");
const reduce =  document.getElementById("reduce");
const svgContainer = document.getElementById("svgContainer");

drawEyeChart(svgContainer, scale);

// Add a click event listener to the button
extend.addEventListener("click", () => {
  // Get a random side length between 100 and 200 mm
  if (scale > 1.5) {
    scale = scale * 1.05
  } else {
    scale = scale * 1.1
  }
  drawEyeChart(svgContainer, scale)
});

reduce.addEventListener("click", () => {
  // Get a random side length between 100 and 200 mm
  if (scale > 1.5) {
    scale = scale / 1.05
  } else {
    scale = scale / 1.1
  }
  drawEyeChart(svgContainer, scale)
});