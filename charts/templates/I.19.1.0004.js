 chartOptions['I.19.1.0004'] = {
  "plotOptions": {
    "series": {
      "dataLabels": {
        "enabled": true,
          //display label at first or last point: https://gist.github.com/jeremywrowe/3506869
          formatter: function() {
            var last  = this.series.data[this.series.data.length - 1];
            var first  = this.series.data[0];
            if (this.point.x === first.x || this.point.x === last.x) {
              return Highcharts.numberFormat(this.point.y, 1, ",", " ");
            }
            return "";
          }
      }
    }
  },
  "yAxis": {
    "labels": {
      "format": "{value:,.0f}",
    },
  },
  "xAxis": {
    "tickInterval": 1
  },
  "legend": {
    "enabled": false
  },
  "series": [
    {
    "color": "#73BA7C"
    }
  ],
  "tooltip": {
    "shared": false
  },
  "chart": {
    "marginBottom": 65,
    "marginTop": 75,
    "type": "column"
  }
};