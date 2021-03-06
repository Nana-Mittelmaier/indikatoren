﻿chartOptions['I.04.1.0008'] = {
  "yAxis": {
    "min": 0,
	"labels": {
      "format": "{value:,.0f}",
    }
  },
  "xAxis": {
    "tickInterval": 1
  },
  "series": [
    {
      "marker": {
        "symbol": "circle",
        "enabled": true
      },     
      "color": "#008AC3"
    },
    {
      "marker": {
        "symbol": "circle",
        "enabled": true
      },      
      "color": "#B00000"
    }
  ],
  "tooltip": {
    "shared": false
  },
  "plotOptions": {
    "series": {
      "dataLabels": {
        "enabled": true,
        "allowOverlap": true,
          //display label at first or last point: https://gist.github.com/jeremywrowe/3506869
          formatter: function() {
            var last  = this.series.data[this.series.data.length - 1];
            if (this.point.category === last.category  && this.point.y === last.y) {
              return this.series.name;
            }
            return "";
          }
      }
    }
  }
};
 