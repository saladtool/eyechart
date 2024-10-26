


function createSetofEShapes ( startx, starty, gap, eshapeList, sideLength, scale =1, extend = 0 ) {
  // eshape is list of ["eastShape", "northshape", ...]


  const realCellWith = (sideLength + extend) /5 *  scale  ;
  const realSideLength = realCellWith * 5 ;
  const group = document.createElementNS("http://www.w3.org/2000/svg", "g");

  for (i =0; i < eshapeList.length; i++ ) {
    shapeX = startx +  i * (realSideLength + gap);
    shapeY = starty;
    shape = createEShape(shapeX, shapeY, realCellWith, eshapeList[i], scale, extend);
    group.appendChild(shape)
  }

  textX = startx +  eshapeList.length * (realSideLength + gap);
  textY = starty;
  const textElement = document.createElementNS('http://www.w3.org/2000/svg', 'text');

  // Set attributes for the text element, including font size
  textElement.setAttribute('x', textX);
  textElement.setAttribute('y', textY + realSideLength);
  textElement.setAttribute('fill', 'blue');
  textElement.setAttribute('font-size', '12px'); 
  textElement.textContent = '5.0';

  group.appendChild(textElement);

  
  return group;
 
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
      cell.setAttribute("x", col * cellWidth + startx);
      cell.setAttribute("y", row * cellHeight + starty);
      cell.setAttribute("width", cellWidth);
      cell.setAttribute("height", cellHeight);
 //     cell.setAttribute("stroke-width", 0); // Set stroke width to 0

      if (isPairInSet(currentShape, row,col)) {
        cell.setAttribute("fill", "white");
      } else {
        cell.setAttribute("fill", "black");
      }
      group.appendChild(cell);
    }
  }

  return group;
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


function drawEyeChart(svgContainer, scale = 1, extend = 0) {

  let sideLength = 500

  // Create the SVG element if it doesn't exist
  if (svgContainer.childElementCount  == 0) {
      svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
      svg.setAttribute("width", sideLength + "mm");
      svg.setAttribute("height", sideLength + "mm");
      svgContainer.appendChild(svg);
  } else {
    svg = svgContainer.firstElementChild
    // Remove the previous grids
    svg.innerHTML = "";

    // Update the SVG element's dimensions
    svg.setAttribute("width", sideLength + "mm");
    svg.setAttribute("height", sideLength + "mm");

  }

  const eshapeList = ["north", "east", "south", "west","north", "east", "south", "west"]
  group = createSetofEShapes(0, 0, 5, eshapeList, 10, scale, extend );
  
  svg.appendChild(group);
  group = createSetofEShapes(0, 100 , 5, eshapeList, 10, scale, extend );
  
  svg.appendChild(group);

}

///// Main Program
let svg;
let scale = 1;
let extendLength = 0;
// Get the draw button element
const extend = document.getElementById("extend");
const reduce =  document.getElementById("reduce");
const svgContainer = document.getElementById("svgContainer");


// Add a click event listener to the button
extend.addEventListener("click", () => {
  // Get a random side length between 100 and 200 mm
  extendLength += 1
  drawEyeChart(svgContainer, scale, extendLength)
});

reduce.addEventListener("click", () => {
  // Get a random side length between 100 and 200 mm
  extendLength -= 1
  drawEyeChart(svgContainer, scale, extendLength)
});