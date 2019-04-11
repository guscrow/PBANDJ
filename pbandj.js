var datapbandj = d3.json("https://ghibliapi.herokuapp.com/films")

datapbandj.then(function(data)
{
  drawTablename(data);
  drawGraph(data,600,600,"svg");
  legend(data,"svg")
},
function(err)
{
  console.log(err);
})

var drawTablename = function(data)
{
  d3.select(".one")
    .selectAll("td")
    .data(data)
    .enter()
    .append("td")
    .text(function(d,i){
      return d.title
    })
    d3.select(".two")
      .selectAll("td")
      .data(data)
      .enter()
      .append("td")
      .text(function(d,i){
        return data[i].director
      })
      d3.select(".three")
        .selectAll("td")
        .data(data)
        .enter()
        .append("td")
        .text(function(d,i){
          return data[i].producer
        })
      d3.select(".four")
        .selectAll("td")
        .data(data)
        .enter()
        .append("td")
        .text(function(d,i){
          return data[i].rt_score
        })
}

var drawGraph = function(data,w,h,c)
{

  var screen =
  {
    width:w,
    height:h
  };

var svg = d3.select(c)
             .attr("width",screen.width)
             .attr("height",screen.height)
             .attr("fill","#AACOAA");

var margins =
{
  top:20,
  bottom:10,
  left:20,
  right:10
}

var width = screen.width -margins.left -margins.right;
var height = screen.height- margins.top -margins.bottom;

//scales usually go here
var xScale = d3.scaleLinear()
                .domain([0,20])
                .range([0,width]);
var yScale = d3.scaleLinear()
                .domain([0,100])
                .range([height,0]);
var xAxis = d3.axisBottom()
              .scale(xScale)
var yAxis = d3.axisLeft()
              .scale(yScale)
svg.append('g').classed("yAxis",true)
              .call(yAxis)
              .attr("transform","translate("+margins.left+","+(margins.top)+ ")")

var colors = d3.scaleOrdinal(d3.schemeSet3);


//plot land
var barLand = svg.append("g")
                  .classed("barLand",true)
                  .attr("transform","translate("+margins.left+","+margins.top+ ")");


barLand.selectAll("rect")
  .data(data)
  .enter()
  .append("rect")
  .attr("x",function(d,i){
    return xScale(i);
  })
  .attr("y",function(d){
    return yScale(d.rt_score);
  })
  .attr("height", function(d){
    return height+50;
  })
  .attr("width", (width/20)-2)
  .attr("fill",function(d){
    if(d.rt_score >= 90 && d.rt_score<100)
    {return "#1341E9"}
    if(d.rt_score >= 80 && d.rt_score<90)
    {return "#1387E9"}
    if(d.rt_score >= 70 && d.rt_score<80)
    {return "#13B6E9"}
    if(d.rt_score >= 60 && d.rt_score<70)
    {return "#48F0F7"}
    if(d.rt_score >= 50 && d.rt_score<60)
    {return "#F6A2A2"}
    if(d.rt_score >= 40 && d.rt_score<50)
    {return "#E36E6E"}
    if(d.rt_score >= 30 && d.rt_score<40)
    {return "#D53434"}
    if(d.rt_score >= 20 && d.rt_score<30)
    {return "#DD1010"}
    if(d.rt_score >= 10 && d.rt_score<20)
    {return "#DD1010"}
    if(d.rt_score >= 0 && d.rt_score<10)
    {return "#DD1010"}
  })
  .on("mouseover",function(d,i){
      d3.select(this).attr("fill","orange")
      var xPosition = parseFloat(d3.select(this).attr("x"))+27;
      var yPosition = parseFloat(d3.select(this).attr("y"))+10;
      svg.append("text")
      .attr("id", "tooltip")
      .attr("x", xPosition)
      .attr("y", yPosition)
      .attr("text-anchor", "middle")
      .attr("font-family", "sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "bold")
      .attr("fill", "black")
      .text(d.rt_score + d.title);


  })
  .on("mouseout",function(d,i){
    d3.select(this).attr("fill",function(d){
      if(d.rt_score >= 90 && d.rt_score<100)
      {return "#1341E9"}
      if(d.rt_score >= 80 && d.rt_score<90)
      {return "#1387E9"}
      if(d.rt_score >= 70 && d.rt_score<80)
      {return "#13B6E9"}
      if(d.rt_score >= 60 && d.rt_score<70)
      {return "#48F0F7"}
      if(d.rt_score >= 50 && d.rt_score<60)
      {return "#F6A2A2"}
      if(d.rt_score >= 40 && d.rt_score<50)
      {return "#E36E6E"}
      if(d.rt_score >= 30 && d.rt_score<40)
      {return "#D53434"}
      if(d.rt_score >= 20 && d.rt_score<30)
      {return "#DD1010"}
      if(d.rt_score >= 10 && d.rt_score<20)
      {return "#DD1010"}
      if(d.rt_score >= 0 && d.rt_score<10)
      {return "#DD1010"}
    })
    d3.select("#tooltip")
      .remove()
  })

}



var legend = function(data,c)
{
  // var margins =
  // {
  //   top:20,
  //   bottom:10,
  //   left:10,
  //   right:10
  // }

  // var width = screen.width -margins.left -margins.right;
  // var height = screen.height- margins.top -margins.bottom;

  //scales usually go here
  var xScale = d3.scaleLinear()
                  .domain([0,20])
                  .range([0,width]);
  var yScale = d3.scaleLinear()
                  .domain([0,100])
                  .range([height,0]);

  var colors = d3.scaleOrdinal(d3.schemeSet3);

  var legend = d3.select(c).append("g")
                  .classed("legend",true)
                  //.attr("transform","translate(" + (width+margins.left+20)+"," + margins.top+")" );

   // var legendLines = legend.selectAll("g")
  //                         .classed("legendLine",true)
  //                         .attr("transform",function(d,i) {return "translate(0," +(i*20)+")"; })

  legend.selectAll("rect")
             .data(data)
             .enter()
             .append("rect")
             .attr("x",function(d,i){return xScale(i*2.2)+20})
             .attr("y",10)
             .attr("width",10)
             .attr("height",10)
             .attr("fill",function(d,i) {
               if(d.rt_score >= 90 && d.rt_score<100)
               {return "#1341E9"}
               if(d.rt_score >= 80 && d.rt_score<90)
               {return "#1387E9"}
               if(d.rt_score >= 70 && d.rt_score<80)
               {return "#13B6E9"}
               if(d.rt_score >= 60 && d.rt_score<70)
               {return "#48F0F7"}
               if(d.rt_score >= 50 && d.rt_score<60)
               {return "#F6A2A2"}
               if(d.rt_score >= 40 && d.rt_score<50)
               {return "#E36E6E"}
               if(d.rt_score >= 30 && d.rt_score<40)
               {return "#D53434"}
               if(d.rt_score >= 20 && d.rt_score<30)
               {return "#DD1010"}
               if(d.rt_score >= 10 && d.rt_score<20)
               {return "#DD1010"}
               if(d.rt_score >= 0 && d.rt_score<10)
               {return "#DD1010"}
             })

  legend.selectAll("text")
              .data(data)
              .enter()
              .append("text")
              .attr("x",function(d,i){return xScale(i*2.2)+35})
              .attr("y",20)
              .text(function(d) {return "Score: "+d.rt_score})
}
