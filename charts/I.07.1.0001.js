﻿chartOptions["I.07.1.0001"] = {
  "yAxis": [{
    "title": {
      "style": {
        "color": "#000000",
        "fontSize": null
      },
      "text": null
    },
    "labels": {
      "format": "{value:,.0f}",
      "style": {
        "color": "#000000"
      }
    },
    "min": 0
  },
  {
    "title": {
      "style": {
        "color": "#000000",
        "fontSize": null
      },
      "text": null
    },
    "labels": {
      "format": "{value:,.0f}",
      "style": {
        "color": "#000000"
      }
    },
    "min": 0,
    "opposite": true
  }
  ],
  "xAxis": {
    "tickInterval": 2
  },
  "legend": {
    "enabled": true,
    "layout": "horizontal",
    "verticalAlign": "top",
    "align": "left",
		"y": 25,
    "itemStyle": {
      "fontWeight": "normal"
    }
  },
  "series": [
    {
      "color": "#cd9c00",
      "index": 0,
      "type": "line",
      "pointWidth": "10"
    },
    {
      "color": "#73b97c",
      "index": 1,
      "type": "line",
      "yAxis": 1
    }
  ],  
  "tooltip": {
    "shared": true
  },
  "chart": {
    "marginBottom": 65,
    "marginTop": 75,
    "type": "line"
  }
};