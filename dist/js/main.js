"use strict";

require(["esri/Map", "esri/views/MapView", "esri/widgets/BasemapToggle", "esri/widgets/Zoom", "esri/widgets/Home", "esri/widgets/Search", "esri/layers/FeatureLayer", "esri/tasks/Locator", "esri/geometry/Extent", "esri/renderers/smartMapping/creators/color", "esri/widgets/Legend"], function (Map, MapView, BasemapToggle, Zoom, Home, Search, FeatureLayer, Locator, Extent, colorRendererCreator, Legend) {
  //===========================
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

  var tractTemplate = {
    title: "{Tract} in {County}",
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "Household_Population_2018",
        label: "Household Population (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Household_Population_2045",
        label: "Household Populations (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Households_2018",
        label: "Households (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Households_2045",
        label: "Households (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Jobs_2018",
        label: "Jobs (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Jobs_2045",
        label: "Jobs (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }]
    }]
  };
  var tazTemplate = {
    title: "{Taz} in {County}",
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "Household_Population_2018",
        label: "Household Population (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Household_Population_2045",
        label: "Household Populations (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Households_2018",
        label: "Households (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Households_2045",
        label: "Households (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Jobs_2018",
        label: "Jobs (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Jobs_2045",
        label: "Jobs (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }]
    }]
  };
  var gridTemplate = {
    title: "{H3M}",
    content: [{
      type: "fields",
      fieldInfos: [{
        fieldName: "Household_Population_2018",
        label: "Household Population (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Household_Population_2045",
        label: "Household Populations (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Households_2018",
        label: "Households (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Households_2045",
        label: "Households (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Jobs_2018",
        label: "Jobs (2018)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }, {
        fieldName: "Jobs_2045",
        label: "Jobs (2045)",
        format: {
          digitSeparator: true,
          places: 0
        }
      }]
    }]
  };
  var tracts = new FeatureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/Census_Tracts/MapServer/0",
    popupTemplate: tractTemplate
  });
  map.add(tracts);
  var taz = new FeatureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/TAZ_5217/MapServer/0",
    visible: false,
    popupTemplate: tazTemplate
  });
  map.add(taz);
  var grid = new FeatureLayer({
    url: "https://gis.h-gac.com/arcgis/rest/services/Forecast/H3M/MapServer/0",
    visible: false,
    popupTemplate: gridTemplate,
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
      console.log("tracts year");
      countyRenderer(fieldDropdown, yrDropdown);
    } else if ($("input:checked").val() == "taz") {
      console.log("taz yr");
      tazRenderer(fieldDropdown, yrDropdown);
    } else if ($("input:checked").val() == "grid") {
      console.log("grid yr");
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
        colors: [[145, 207, 96, 0.7], [217, 239, 139, 0.6], [255, 255, 191, 0.7], [254, 224, 139, 0.6], [252, 141, 89, 0.6]],
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
        width: "1px"
      }
    };
    var params = {
      layer: grid,
      field: field,
      basemap: map.basemap,
      classificationMethod: "natural-breaks",
      colorScheme: scheme,
      numClasses: 7,
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
  }
});
//# sourceMappingURL=main.js.map
