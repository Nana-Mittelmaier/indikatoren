chartOptions['I.18.2.0002'] = {
	"chart": {
		"renderTo": "container-I.18.2.0002"
	},
	"title": {
		"text": "Vermögenssteuer pro Veranlagung"
	},
	"credits": {
		"text": "Quellenangabe: woher kommen die Daten?"
	},
	"legend": {
		"enabled": false
	},
	"series": [{
		"color": "#689199"
	}],
	"yAxis": {
		"labels": {
            "formatter": function(){
                return Highcharts.numberFormat((this.value), 0, ".", " ");                
            }
        }		
    },
	"tooltip": {
        "pointFormatter": function(){
            //rank is calculated from index, thus data needs to be sorted by rank ascending.
            return '<span style="color:{series.color}">' + this.series.data[this.x].name + '</span>: <b>Fr. ' + Highcharts.numberFormat(this.y, 0, "," ," ") + '</b><br/>Rang <b>' + parseInt(this.x + 1) + '</b>'                
        }
    }
};

//Colors of StatA Bereiche: violett3 #923F8D, gruen3 #68AB2B, blau3 #689199