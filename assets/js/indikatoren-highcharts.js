"use strict"; 

//parse csv and configure HighCharts object
function parseData(chartOptions, data, completeHandler) {
    try {
      var dataOptions = {
        /*  seriesMapping necessary for charts with error bars. 
            todo: read dataOptions from chart-specific file
        */          
        "seriesMapping": [
          {
            "x": 0
          },
          {
            "x": 0
          },
          {
            "x": 0
          }
        ],
          csv: data
      };
      dataOptions.sort = true
      dataOptions.complete = completeHandler;
      Highcharts.data(dataOptions, chartOptions);
    } catch (error) {
      console.log(error);
      completeHandler(undefined);
    }      
};

//merge series with all options
function createChartConfig(data, chartOptions, chartMetaData, indikatorensetView, callbackFn){                
  parseData(chartOptions, data, function (dataOptions) {
    // Merge series configs
    if (chartOptions.series && dataOptions) {
        Highcharts.each(chartOptions.series, function (series, i) {
          chartOptions.series[i] = Highcharts.merge(series, dataOptions.series[i]);
        });
    }
    //merge all highcharts configs
    var options = Highcharts.merge(true, dataOptions, template, chartOptions);
    //inject metadata to highcharts options 
    var injectedOptions = injectMetadataToChartConfig(options, chartMetaData, indikatorensetView);
    //replace . in labels with spaces - necessary for space between column groups
    var replacedOptions = createEmptyLabels(injectedOptions);
    callbackFn(replacedOptions);
  });        
};



//merge series with all options and draw chart
function drawChart(data, chartOptions, chartMetaData, indikatorensetView, callbackFn){
  createChartConfig(data, chartOptions, chartMetaData, indikatorensetView, function(options){
    var chart = new Highcharts['Chart'](options, callbackFn);
  });
};


//Add data from database to chart config
function injectMetadataToChartConfig(options, data, indikatorensetView){
  options['title']['text'] = (indikatorensetView) ? data.kuerzelKunde + ' ' + data.title : data.kuerzel + ' ' + data.title;
  options['subtitle']['text'] = data.subtitle;    
  options['chart']['renderTo'] = 'container-' + data.kuerzel;
  options['credits']['text'] = 'Quelle: ' + data.quellenangabe.join(';<br/>');
  //add 10 px space for each line of credits plus -5px for the first line (if not stated otherwise)
  options['credits']['position']['y'] = (options['credits']['position']['y'] || -5) + (-10 * data.quellenangabe.length);
  //make sure node exists before deferencing it
  options['exporting'] = (options['exporting'] || {});
  options['exporting']['filename'] = data.kuerzel;
  return options;
};


//get empty labels: replace series data names that only contain dots (.) with spaces
function createEmptyLabels(options){
  var newOptions = options;
  newOptions.series.forEach(function(serie){
    serie.data.forEach(function(dataItem){
      var re = /^[.]+$/; 
      //test if string contains only dots (.), see http://stackoverflow.com/questions/18358480/regular-expression-to-check-contains-only
      if (re.test(dataItem[0])){
        //perform global replace of . with /g, see http://www.w3schools.com/jsref/jsref_replace.asp
        dataItem[0] = dataItem[0].replace(/./g, ' ')
      };
    });
  });
  return newOptions;
}


//todo: create new function that uses the pre-created chart configs from /charts/configs
//load global options, template, chartOptions from external scripts, load csv data from external file, and render chart to designated div
function renderChart(globalOptionsUrl, templateUrl, chartUrl, csvUrl, kuerzel, indikatorensetView, callbackFn){
  var chartMetaData = findChartByKuerzel(indikatoren, kuerzel);   
  //load scripts one after the other, then load csv and draw the chart
  $.when(        
      $.getScript(globalOptionsUrl),
      $.getScript(templateUrl),
      $.getScript(chartUrl),
      $.Deferred(function( deferred ){
          $(deferred.resolve);
      })
  ).done(function(){
      //load csv and draw chart      
      $.get(csvUrl, function(data){
        drawChart(data, chartOptions[kuerzel], chartMetaData, indikatorensetView, callbackFn)
      });
  });  
};


//find chart metadata by kuerzel from json database 
function findChartByKuerzel(data, kuerzel){
  var matchingChart;
  for (var i = 0; i < data.length; i++){
    if (data[i].kuerzel == kuerzel){
      matchingChart = data[i];
      break;
    }     
  }
  return matchingChart;
};


//construct urls by chart kuerzel and render to designated div
function lazyRenderChartByKuerzel(kuerzel, indikatorensetView, callbackFn){
  var container = $(escapeCssChars('#container-' + kuerzel));
  //check if a highcharts-container below the container is already present. 
  //no highcharts container yet: load data and draw chart. 
  if (!container.find('div.highcharts-container').length) {      
    var chartUrl = 'charts/templates/' + kuerzel + '.js';
    var csvUrl = 'data/' + kuerzel + '.csv';    
    //get template for requested chart
    var chartMetaData = findChartByKuerzel(indikatoren, kuerzel); 
    var templateUrl = 'charts/templates/' + chartMetaData.template + '.js';
        
    renderChart('charts/templates/options001.js', templateUrl, chartUrl, csvUrl, kuerzel, indikatorensetView, callbackFn);
  }
  //highcharts container exists already: redraw chart without reloading data from network
  else { 
    //find chart in highchart's array of charts
    var chartIndex = container.attr("data-highcharts-chart");
    //get chartOptions, destroy and recreate
    var currentChartOptions = Highcharts.charts[chartIndex].options;
    //destroy and redraw in order to get nice animation
    Highcharts.charts[chartIndex].destroy();
    container.highcharts(currentChartOptions, callbackFn);
  };
}


//dom ids may contain . or :, if used in jquery these must be escaped. http://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
function escapeCssChars(myid) {
    return myid.replace( /(:|\.|\[|\]|,)/g, "\\$1" );
}


//create chart as image
function exportThumbnail(kuerzel, exportType, offline){    
  var chart = $(escapeCssChars('#container-' + kuerzel)).highcharts();
  //remove callback - otherwise end up in infinite loop
  delete chart.callback;
  //scale chart in order to receive 150px width
  chart.options.exporting.scale = 0.31;
  if (offline){     
    chart.exportChartLocal({
      type: exportType, 
      filename: kuerzel
    });  
  }
  else {
    chart.exportChart({
      type: exportType, 
      filename: kuerzel
    });      
  }
};

