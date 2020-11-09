function init(elements) {


  let svg = d3.select("body").append("svg")
    .attr("width", 600)
    .attr("height", 600)
    .style("background-color", d3.color("rgba(0, 80, 200, 0.5)") )
    ;


  let jsonCircles = elements.filter( e => {  return e.Mood == "1" || e.Mood == "2" || e.Mood == "3" || e.Mood == "4" || e.Mood == "5";  } );


  let circles = svg.selectAll()
    .data(jsonCircles)
    .enter() //when we are seeing new CAT data for the first time
      .append("circle") //append a circle shape for each data point, and set various attributes based on the data
        .attr("fill", d3.color("rgba(0,0,200,0.5)")  )
        .attr("cx", d => { return d.Mood * 60; })
        .attr("cy", d => { return d.SignificanceLVL * 60; })
        .attr("r", 30) 
        .attr("stroke", d3.color("rgba(0,0,0,0.1)") )
        .attr("stroke-width", 3);

const xText = svg.append("text")
  .attr("x", 300)
  .attr("y", 590)
  .attr("text-anchor","middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "24px")
  .attr("fill", "black")
  .text("Significance Level");

 const yText = svg.append("text")
  //.attr("x", 300)
  //.attr("y", 300)
  .attr("text-anchor","middle")
  .attr("font-family", "sans-serif")
  .attr("font-size", "24px")
  .attr("fill", "black")
  //.attr("transform", "translate(0,0) rotate()")
  .attr("transform", "translate(10,300) rotate(90)")
  .text("Mood");




}