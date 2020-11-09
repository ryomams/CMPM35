function init(elements) {


  let svg = d3.select("body").append("svg")
    .attr("width", 600)
    .attr("height", 600)
    .style("background-color", d3.color("rgba(255, 0, 0, 0.5)") )
    ;


  let jsonCircles = elements.filter( e => {  return e.Type == "cat" && e.Day == "Sunday";  } );

  let jsonRects = elements.filter( e => {  return e.Type == "dog" && e.Day == "Sunday";  } );

  let jsonTexts = elements.filter( e => {  return e.Day == "Sunday";  } );


  let circles = svg.selectAll()
    .data(jsonCircles)
    .enter() //when we are seeing new CAT data for the first time
      .append("circle") //append a circle shape for each data point, and set various attributes based on the data
        .attr("fill", d3.color("rgba(0,255,0,0.5)")  )
        .attr("cx", d => { return d.Cuteness * 60; })
        .attr("cy", d => { return 600 - d.Size * 60; })
        .attr("r", 30) 
        .attr("stroke", d3.color("rgba(0,0,0,0.5)") )
        .attr("stroke-width", 3)
    ;   
    
    
  let rects = svg.selectAll()
    .data(jsonRects)
    .enter() //when we are seeing new DOG data for the first time
      .append("rect") //append a rect shape for each data point, and set various attributes based on the data
        .attr("fill", d3.color("rgba(0,0,255,0.5)")  )
        .attr("x", d => { return -30 + d.Cuteness * 60; })
        .attr("y", d => { return -30 + 600 - d.Size * 60; })
        .attr("width", d => { return 60; }) 
        .attr("height", d => { return 60; }) 
        .attr("stroke", d3.color("rgba(0,0,0,0.5)") )
        .attr("stroke-width", 3)
    ;    


let text = svg.selectAll()
  .data(jsonTexts)
  .enter()
  .append("text")
  .attr("text-anchor","middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "16px")
  .attr("fill", "black")
  .attr("x", d => { return -30 + (d.Cuteness * 60) + 30; })
  .attr("y", d => { return -30 + 600 - (d.Size * 60) + 80; })
  .text(d => {return d.Name})


const xText = svg.append("text")
  .attr("x", 300)
  .attr("y", 590)
  .attr("text-anchor","middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "24px")
  .attr("fill", "black")
  .text("Cuteness of Pet");

 const yText = svg.append("text")
  //.attr("x", 300)
  //.attr("y", 300)
  .attr("text-anchor","middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "24px")
  .attr("fill", "black")
  //.attr("transform", "translate(0,0) rotate()")
  .attr("transform", "translate(10,300) rotate(90)")
  .text("Size of Pet");




}