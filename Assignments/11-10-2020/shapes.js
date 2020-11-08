//i was too lazy to rename the js file 

function init() {

  const svg = d3.select("body").append("svg")
    .attr("width", 800)
    .attr("height", 500)
    .style("background-color", "#404FCE");

  const STARCOUNT = 60
  let stars = new Array(STARCOUNT);
  let starx = Math.floor(Math.random()*800);
  let stary = Math.floor(Math.random()*500);
  for (i = 0; i < STARCOUNT; i++) {
    stars[i] = svg.append("rect")
      .attr("fill", "white")
      .attr("width", "2")
      .attr("height", "2")
      .attr("x", starx)
      .attr("y", stary);
    starx = Math.floor((Math.random()*810)-10);
    stary = Math.floor((Math.random()*510)-10);
  }

  const polyline1 = svg.append("polygon")
    .attr("fill", "green")
    .attr("stroke", "black")
    .attr("stroke-width", "4")
    .attr("points", "320,390  340,385  802,320  802,502  320,502");

  const ellipse1 = svg.append("ellipse")
    .attr("fill","purple")
    .attr("stroke", "black")
    .attr("stroke-width", "4")
    .attr("cx", "160")
    .attr("cy", "450")
    .attr("rx", "100")
    .attr("ry", "300");

  const ellipse2 = svg.append("ellipse")
    .attr("fill","cyan")
    .attr("stroke", "black")
    .attr("stroke-width", "4")
    .attr("cx", "500")
    .attr("cy", "450")
    .attr("rx", "100")
    .attr("ry", "300");

  const rectum = svg.append("rect")
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "4")
    .attr("x", "40")
    .attr("y", "250")
    .attr("height", "60")
    .attr("width", "130");

  const rectum2 = svg.append("rect")
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", "4")
    .attr("x", "480")
    .attr("y", "250")
    .attr("height", "60")
    .attr("width", "130");

  const text1 = svg.append("text")
    .attr("x", 10)
    .attr("y", 50)
    .attr("font-size", "20px")
    .attr("font-family", "sans-serif")
    .attr("fill", "black")
    .text("Can we pretend that");

  const text2 = svg.append("text")
    .attr("x", 10)
    .attr("y", 70)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .text("airplanes in the night");

  const text3 = svg.append("text")
    .attr("x", 10)
    .attr("y", 90)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .text("sky are like shooting");
    
  const text4 = svg.append("text")
    .attr("x", 10)
    .attr("y", 110)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .text("stars?");
//pee pee butthole
  const text5 = svg.append("text")
    .attr("x", 400)
    .attr("y", 50)
    .attr("font-size", "20px")
    .attr("font-family", "sans-serif")
    .attr("fill", "black")
    .text("I could really use a wish right");

  const text6 = svg.append("text")
    .attr("x", 400)
    .attr("y", 70)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .text("now. wish right now. wish");

  const text7 = svg.append("text")
    .attr("x", 400)
    .attr("y", 90)
    .attr("font-family", "sans-serif")
    .attr("font-size", "20px")
    .attr("fill", "black")
    .text("right now.");

  const line1 = svg.append("line")
    .attr("stroke", "black")
    .attr("stroke-width", "8")
    .attr("fill", "none")
    .attr("x1", 300)
    .attr("y1", 0)
    .attr("x2", 320)
    .attr("y2", 500);

}