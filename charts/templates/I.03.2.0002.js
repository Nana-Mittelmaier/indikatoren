chartOptions['I.03.2.0002'] = {
	"series": [{
		"color": "#689199"
	}],
	"yAxis": {
		"text": "",
        "labels": {
            "formatter": function(){
                return Highcharts.numberFormat((this.value),0);                
            }
        }
    },
	"tooltip": {
        "pointFormatter": function(){
            //rank is calculated from index, thus data needs to be sorted by rank ascending.
            return '<span style="color:{series.color}">' + this.series.data[this.x].name + '</span>: <b>' + Highcharts.numberFormat(this.y,3,",", "") + '</b><br/>Rang <b>' + parseInt(this.x + 1) + '</b>'                
        }
    }
};

//Colors of StatA Bereiche: violett3 #923F8D, gruen3 #68AB2B, blau3 #689199