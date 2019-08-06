"use strict";

require(["esri/Map", "esri/views/MapView", "esri/widgets/BasemapToggle", "esri/widgets/Zoom", "esri/widgets/Home", "esri/widgets/Search", "esri/layers/FeatureLayer", "esri/tasks/Locator", "esri/geometry/Extent", "esri/renderers/smartMapping/creators/color", "esri/widgets/Legend", "esri/tasks/QueryTask", "esri/tasks/support/Query", "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.js"], function (Map, MapView, BasemapToggle, Zoom, Home, Search, FeatureLayer, Locator, Extent, colorRendererCreator, Legend, QueryTask, Query, Chart) {
  var myChart; //===========================
  //Create the basic requirements

  var map = new Map({
    basemap: "streets-navigation-vector"
  });
  var view = new MapView({
    container: "viewDiv",
    map: map,
    center: [-95.444, 29.756],
    zoom: 8
  });
  view.ui.remove("zoom");
  var basemapToggle = new BasemapToggle({
    view: view,
    nextBasemap: "satellite"
  });
  view.ui.add(basemapToggle, "bottom-right");
  var zoom = new Zoom({
    view: view
  });
  view.ui.add(zoom, "bottom-right");
  var home = new Home({
    view: view
  });
  view.ui.add(home, "bottom-right");
  var searchWidget = new Search({
    view: view,
    includeDefaultSources: false,
    sources: [{
      locator: new Locator({
        url: "https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer"
      }),
      singleLineFieldName: "SingleLine",
      outFields: ["Addr_type"],
      searchExtent: new Extent({
        xmax: -97.292800,
        ymax: 30.797600,
        xmin: -93.236100,
        ymin: 28.460500
      }),
      placeholder: "3555 Timmons Ln, Houston, TX"
    }]
  });
  view.ui.add(searchWidget, "bottom-right");
  var legendWidget = new Legend({
    view: view
  });
  view.ui.add(legendWidget, "top-right"); //============================================
  //Add the different layers to the map
  //Create the popup templates
  // var tractTemplate = {
  //     title: "{Tract} in {County}",
  //     content: [
  //         {
  //             type: "fields",
  //             fieldInfos: [
  //                 {
  //                     fieldName: "Household_Population_2018",
  //                     label: "Household Population (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Household_Population_2045",
  //                     label: "Household Populations (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Households_2018",
  //                     label: "Households (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Households_2045",
  //                     label: "Households (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Jobs_2018",
  //                     label: "Jobs (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Jobs_2045",
  //                     label: "Jobs (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 }
  //             ]
  //         }, {
  //             type: "media",
  //             mediaInfos: [
  //                 {
  //                     type: "line-chart",
  //                     value: {
  //                         fields: ["Household_Population_2018", "Household_Population_2045"],
  //                         normalizeField: null,
  //                         tooltipField: ""
  //                     }
  //                 }
  //             ]
  //         }
  //     ]
  // };
  // var tazTemplate = {
  //     title: "{Taz} in {County}",
  //     content: [
  //         {
  //             type: "fields",
  //             fieldInfos: [
  //                 {
  //                     fieldName: "Household_Population_2018",
  //                     label: "Household Population (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Household_Population_2045",
  //                     label: "Household Populations (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Households_2018",
  //                     label: "Households (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Households_2045",
  //                     label: "Households (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Jobs_2018",
  //                     label: "Jobs (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Jobs_2045",
  //                     label: "Jobs (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 }
  //             ]
  //         }
  //     ]
  // };
  // var gridTemplate = {
  //     title: "{H3M}",
  //     content: [
  //         {
  //             type: "fields",
  //             fieldInfos: [
  //                 {
  //                     fieldName: "Household_Population_2018",
  //                     label: "Household Population (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Household_Population_2045",
  //                     label: "Household Populations (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Households_2018",
  //                     label: "Households (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Households_2045",
  //                     label: "Households (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Jobs_2018",
  //                     label: "Jobs (2018)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 },
  //                 {
  //                     fieldName: "Jobs_2045",
  //                     label: "Jobs (2045)",
  //                     format: {
  //                         digitSeparator: true,
  //                         places: 0
  //                     }
  //                 }
  //             ]
  //         }
  //     ]
  // };

  var tracts = new FeatureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/Census_Tracts/MapServer/0"
  });
  map.add(tracts);
  var taz = new FeatureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/TAZ_5217/MapServer/0",
    visible: false
  });
  map.add(taz);
  var grid = new FeatureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/H3M/MapServer/0",
    visible: false,
    title: "3 Square Mile Grid"
  });
  map.add(grid); //===========================================
  //Determine how to symbolize the data

  var fieldDropdown = $("#fldDropdown").val();
  var yrDropdown = $("#yrDropdown").val();
  $("#fldDropdown").change(function () {
    fieldDropdown = $("#fldDropdown").val();

    if ($("input:checked").val() == "tracts") {
      console.log("tracts");
      countyRenderer(fieldDropdown, yrDropdown);
    } else if ($("input:checked").val() == "taz") {
      console.log("taz");
      tazRenderer(fieldDropdown, yrDropdown);
    } else if ($("input:checked").val() == "grid") {
      console.log("grid");
      gridRenderer(fieldDropdown, yrDropdown);
    }
  });
  $("#yrDropdown").change(function () {
    yrDropdown = $("#yrDropdown").val();

    if ($("input:checked").val() == "tracts") {
      countyRenderer(fieldDropdown, yrDropdown);
    } else if ($("input:checked").val() == "taz") {
      tazRenderer(fieldDropdown, yrDropdown);
    } else if ($("input:checked").val() == "grid") {
      gridRenderer(fieldDropdown, yrDropdown);
    }
  }); //Call function for the initial renderer

  countyRenderer(fieldDropdown, yrDropdown);
  $("#tractsStyle").click(function () {
    countyRenderer(fieldDropdown, yrDropdown);
  });
  $("#tazStyle").click(function () {
    tazRenderer(fieldDropdown, yrDropdown);
  });
  $("#gridStyle").click(function () {
    gridRenderer(fieldDropdown, yrDropdown);
  });

  function countyRenderer(fieldDropdown, yrDropdown) {
    var field = fieldDropdown + "_" + yrDropdown;
    var scheme = {
      name: "div-blue-red",
      tags: "Custom color scheme",
      id: "above-and-below/streets-navigation-vector/div-blue-red",
      colors: [[254, 229, 217], [252, 174, 145], [251, 106, 74], [222, 45, 38], [165, 15, 21]],
      noDataColor: [0, 0, 0],
      colorsForClassBreaks: [{
        colors: [[254, 229, 217, 0.7]],
        numClasses: 1
      }, {
        colors: [[254, 229, 217, 0.7], [252, 174, 145, 0.7]],
        numClasses: 2
      }, {
        colors: [[254, 229, 217, 0.7], [252, 174, 145, 0.7], [251, 106, 74, 0.7]],
        numClasses: 3
      }, {
        colors: [[254, 229, 217, 0.7], [252, 174, 145, 0.7], [251, 106, 74, 0.7], [222, 45, 38, 0.7]],
        numClasses: 4
      }, {
        colors: [[254, 229, 217, 0.7], [252, 174, 145, 0.7], [251, 106, 74, 0.7], [222, 45, 38, 0.7], [165, 15, 21, 0.7]],
        numClasses: 5
      }],
      outline: {
        color: {
          r: 0,
          g: 0,
          b: 0,
          a: 0.25
        },
        width: "1px"
      }
    };
    var params = {
      layer: tracts,
      field: field,
      basemap: map.basemap,
      classificationMethod: "quantile",
      colorScheme: scheme,
      legendOptions: {
        title: yrDropdown + " - " + fieldDropdown
      }
    };
    colorRendererCreator.createClassBreaksRenderer(params).then(function (response) {
      tracts.renderer = response.renderer;

      if (!tracts.visible) {
        taz.visible = false;
        tracts.visible = true;
        grid.visible = false;
      }
    });
  }

  function tazRenderer(fieldDropdown, yrDropdown) {
    var field = fieldDropdown + "_" + yrDropdown;
    var scheme = {
      name: "div-blue-red",
      tags: "Custom color scheme",
      id: "above-and-below/streets-navigation-vector/div-blue-red",
      colors: [[254, 229, 217], [252, 174, 145], [251, 106, 74], [222, 45, 38], [165, 15, 21]],
      noDataColor: [0, 0, 0],
      colorsForClassBreaks: [{
        colors: [[254, 229, 217, 0.7]],
        numClasses: 1
      }, {
        colors: [[254, 229, 217, 0.7], [252, 174, 145, 0.7]],
        numClasses: 2
      }, {
        colors: [[254, 229, 217, 0.7], [252, 174, 145, 0.7], [251, 106, 74, 0.7]],
        numClasses: 3
      }, {
        colors: [[254, 229, 217, 0.7], [252, 174, 145, 0.7], [251, 106, 74, 0.7], [222, 45, 38, 0.7]],
        numClasses: 4
      }, {
        colors: [[254, 229, 217, 0.7], [252, 174, 145, 0.7], [251, 106, 74, 0.7], [222, 45, 38, 0.7], [165, 15, 21, 0.7]],
        numClasses: 5
      }],
      outline: {
        color: {
          r: 0,
          g: 0,
          b: 0,
          a: 0.25
        },
        width: "1px"
      }
    };
    var params = {
      layer: taz,
      field: field,
      basemap: map.basemap,
      classificationMethod: "quantile",
      colorScheme: scheme,
      legendOptions: {
        title: yrDropdown + " - " + fieldDropdown
      }
    };
    colorRendererCreator.createClassBreaksRenderer(params).then(function (response) {
      taz.renderer = response.renderer;

      if (!taz.visible) {
        taz.visible = true;
        tracts.visible = false;
        grid.visible = false;
      }
    });
  }

  function gridRenderer(fieldDropdown, yrDropdown) {
    var field = fieldDropdown + "_" + yrDropdown;
    var scheme = {
      name: "div-blue-red",
      tags: "Custom color scheme",
      id: "above-and-below/streets-navigation-vector/div-blue-red",
      colors: [[26, 152, 80], [145, 207, 96], [217, 239, 139], [255, 255, 191], [254, 224, 139], [252, 141, 89], [215, 48, 39]],
      noDataColor: [0, 0, 0],
      colorsForClassBreaks: [{
        colors: [[26, 152, 80, 0.7]],
        numClasses: 1
      }, {
        colors: [[26, 152, 80, 0.7], [145, 207, 96, 0.7]],
        numClasses: 2
      }, {
        colors: [[26, 152, 80, 0.7], [145, 207, 96, 0.7], [217, 239, 139, 0.7]],
        numClasses: 3
      }, {
        colors: [[26, 152, 80, 0.7], [145, 207, 96, 0.7], [217, 239, 139, 0.7], [255, 255, 191, 0.7]],
        numClasses: 4
      }, {
        colors: [[26, 150, 65, 0.7], [166, 217, 106, 0.7], [255, 255, 191, 0.7], [253, 174, 97, 0.7], [215, 25, 28, 0.7]],
        numClasses: 5
      }, {
        colors: [[26, 152, 80, 0.6], [145, 207, 96, 0.6], [255, 255, 191, 0.6], [254, 224, 139, 0.6], [252, 141, 89, 0.6], [215, 48, 39, 0.6]],
        numClasses: 6
      }, {
        colors: [[26, 152, 80, 0.6], [145, 207, 96, 0.6], [217, 239, 139, 0.6], [255, 255, 191, 0.6], [254, 224, 139, 0.6], [252, 141, 89, 0.6], [215, 48, 39, 0.6]],
        numClasses: 7
      }],
      outline: {
        color: {
          r: 0,
          g: 0,
          b: 0,
          a: 0.25
        },
        width: "0px"
      }
    };
    var params = {
      layer: grid,
      field: field,
      basemap: map.basemap,
      classificationMethod: "natural-breaks",
      colorScheme: scheme,
      numClasses: 5,
      legendOptions: {
        title: yrDropdown + " - " + fieldDropdown
      }
    };
    colorRendererCreator.createClassBreaksRenderer(params).then(function (response) {
      grid.renderer = response.renderer;

      if (!grid.visible) {
        taz.visible = false;
        tracts.visible = false;
        grid.visible = true;
      }
    });
  } //Create the query that will populate the report popup
  // var tractsTask = new QueryTask({
  //     url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/Census_Tracts/MapServer/0"
  // });
  // var tazTask = new QueryTask({
  //     url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/TAZ_5217/MapServer/0"
  // });
  // var gridTask = new QueryTask({
  //     url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/H3M/MapServer/0"
  // });


  view.on("click", function (event) {
    if ($("input:checked").val() == "tracts") {
      executeTractQueryTask(event.mapPoint);
    } else if ($("input:checked").val() == "taz") {
      executeTazQueryTask(event.mapPoint);
    } else if ($("input:checked").val() == "grid") {
      executeGridQueryTask(event.mapPoint);
    }
  });
  $("#reportModal").on("hidden.bs.modal", function () {
    $("#Population_chart").remove();
    $("#Household_chart").remove();
    $("#Job_chart").remove();
  }); //function to start the queryTask

  function executeTractQueryTask(point) {
    var query = {
      geometry: point,
      outFields: ["*"],
      returnGeometry: false
    };
    tracts.queryFeatures(query).then(function (result) {
      setPopulationInfo(result.features["0"].attributes);
      setHouseholdInfo(result.features["0"].attributes);
      setJobInfo(result.features["0"].attributes);
    });
    $("#reportModal").modal("show");
  }

  function executeTazQueryTask(point) {
    var query = {
      geometry: point,
      outFields: ["*"],
      returnGeometry: false
    };
    taz.queryFeatures(query).then(function (result) {
      setPopulationInfo(result.features["0"].attributes);
      setHouseholdInfo(result.features["0"].attributes);
      setJobInfo(result.features["0"].attributes);
    });
    $("#reportModal").modal("show");
  }

  function executeGridQueryTask(point) {
    var query = {
      geometry: point,
      outFields: ["*"],
      returnGeometry: false
    };
    grid.queryFeatures(query).then(function (result) {
      setPopulationInfo(result.features["0"].attributes);
      setHouseholdInfo(result.features["0"].attributes);
      setJobInfo(result.features["0"].attributes);
    });
    $("#reportModal").modal("show");
  } //Function to create the chart


  function setPopulationInfo(results) {
    $("#Population").append("<canvas id='Population_chart'></canvas>");
    var canvas = $("#Population_chart");
    var data = {
      datasets: [{
        data: [results.Household_Population_2018, results.Household_Population_2045],
        backgroundColor: ["#d73347"],
        borderColor: "#d73347",
        fill: false,
        label: "Household Population",
        pointBackgroundColor: "#d73347"
      }],
      labels: ["2018", "2045"]
    };
    myChart = new Chart(canvas, {
      type: "line",
      data: data,
      options: {
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Year"
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Household Population"
            },
            ticks: {
              callback: function callback(value) {
                return parseFloat(value).toLocaleString();
              }
            }
          }]
        }
      }
    });
    return canvas;
  }

  function setHouseholdInfo(results) {
    $("#Household").append("<canvas id='Household_chart'></canvas>");
    var canvas = $("#Household_chart");
    var data = {
      datasets: [{
        data: [results.Households_2018, results.Households_2045],
        backgroundColor: ["#d73347"],
        borderColor: "#d73347",
        fill: false,
        label: "Number of Households",
        pointBackgroundColor: "#d73347"
      }],
      labels: ["2018", "2045"]
    };
    myChart = new Chart(canvas, {
      type: "line",
      data: data,
      options: {
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Year"
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Number of Households"
            },
            ticks: {
              callback: function callback(value) {
                return parseFloat(value).toLocaleString();
              }
            }
          }]
        }
      }
    });
    return canvas;
  }

  function setJobInfo(results) {
    $("#Job").append("<canvas id='Job_chart'></canvas>");
    var canvas = $("#Job_chart");
    var data = {
      datasets: [{
        data: [results.Jobs_2018, results.Jobs_2045],
        backgroundColor: ["#d73347"],
        borderColor: "#d73347",
        fill: false,
        label: "Number of Jobs",
        pointBackgroundColor: "#d73347"
      }],
      labels: ["2018", "2045"]
    };
    myChart = new Chart(canvas, {
      type: "line",
      data: data,
      options: {
        tooltips: {
          mode: "index",
          intersect: false
        },
        hover: {
          mode: "nearest",
          intersect: true
        },
        scales: {
          xAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Year"
            }
          }],
          yAxes: [{
            display: true,
            scaleLabel: {
              display: true,
              labelString: "Number of Jobs"
            },
            ticks: {
              callback: function callback(value) {
                return parseFloat(value).toLocaleString();
              }
            }
          }]
        }
      }
    });
    return canvas;
  }
});
//# sourceMappingURL=main.js.map
