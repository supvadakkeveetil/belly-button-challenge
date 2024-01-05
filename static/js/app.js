
// URL
const url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Create page with the dropdown menu to select the ID#
function init(){
    //use d3 to select the dropdown menu
    let dropdownmenu = d3.select("#selDataset");
    // Fetch the JSON data and Console log the data 
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        //An array of names
        let names = data.names;

        //Loop through the array
        names.forEach((name) => {
            dropdownmenu.append("option").text(name).property("value", name);
        });
        //Assigning the first name to the variable 
        let name =names[0];

        // Invoke functions to create the demographic info pane , bar chart and bubble chart
        demograph(name);
        barchart(name);
        bubblechart(name);
        
    });
}

//Bubble Chart
function bubblechart(selectedValue){
    d3.json(url).then((data) => {
        console.log(`Data :${data}`);
    

        //creating and array of objects
        let samples = data.samples;
        let filteredData = samples.filter((sample) => sample.id ==selectedValue);
        let obj = filteredData[0];

        //Tracing Bubble chart
        let trace = [{
            type: "bubble",
            text: obj.otu_labels,
            x: obj.otu_ids,
            y: obj.sample_values,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale : "Viridis"
            }
            
        }];
        let layout ={
            xaxis: {title: "OTU ID"}
        };
        //Using Plotly to plot the bubble chart
        Plotly.newPlot("bubble",trace,layout);
    });
 }


// Bar Chart
 function barchart(selectedValue){
    d3.json(url).then((data) => {
        console.log(`Data :${data}`);
    

        //creating an array of objects
        let samples = data.samples;
        let filteredData = samples.filter((sample) => sample.id ==selectedValue);
        let obj = filteredData[0];

        //Tracing Horizontal Bar chart
        let trace = [{
            type: "bar",
            text: obj.otu_labels.slice(0,10).reverse(),
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            marker: {
                color: "rgb(120,150,200)"
            },
            orientation: "h"
        }];
        //Using Plotly to plot the bar chart
        Plotly.newPlot("bar",trace);
    });
 }

// Demographic Information
 function demograph(selectedValue){
    // Fetch the JSON data and Console log the data 
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        
        let metadata = data.metadata;

        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
        
        let obj = filteredData[0]

        d3.select("#sample-metadata").html("");

        let entries = Object.entries(obj);

        //Iterate through each value of the array
        entries.forEach(([key,value]) => {

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        
        });
        console.log(entries);
    });
 }


//Changing the plots
 function optionChanged(selectedValue) {
    demograph(selectedValue);
    barchart(selectedValue);
    bubblechart(selectedValue);
    
 }
init();
