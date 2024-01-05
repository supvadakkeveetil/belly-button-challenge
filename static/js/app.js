
// URL
const url= "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//Function to create the default page with the dropdown menu
function init(){
    //use d3 to select the dropdown 
    let dropdownmenu = d3.select("#selDataset");
    // Fetching the data from the URL and Console log the data
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        //An array of names
        let names = data.names;

        //Iterate through the array names
        names.forEach((name) => {
            dropdownmenu.append("option").text(name).property("value", name);
        });
        //Assign first name to the variable name
        let name =names[0];

        // Call functions inorder to make the demographic panel , bar chart and bubble chart
        demograph(name);
        barchart(name);
        bubblechart(name);
        
    });
}


// Demographic Panel
 function demograph(selectedValue){
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        let metadata = data.metadata;

        let filteredData = metadata.filter((meta) => meta.id == selectedValue);
        //Assign object to variable
        let obj = filteredData[0]

        d3.select("#sample-metadata").html("");

        let entries = Object.entries(obj);

        //Iterate through the entries array
        entries.forEach(([key,value]) => {

            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        
        });
        console.log(entries);
    });
 }

//Bubble Chart
function bubblechart(selectedValue){
    d3.json(url).then((data) => {
        console.log(`Data :${data}`);
    

        //array of objects
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
    

        //array of objects
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


//Toggling the plots
function optionChanged(selectedValue) {
    demograph(selectedValue);
    barchart(selectedValue);
    bubblechart(selectedValue);
    
}
init();
