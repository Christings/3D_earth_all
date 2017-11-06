/**
 * Created by sgz on 07/09/2017.
 */

var app = new Vue({
    el: '#app',
    data: {
        year: '2015'
    },
    methods: {
        search: function () {
            myChart.showLoading();
            alert("HHHHHH");
            var that = this;
            $.ajax({
                url: './year/' + that.year + '.json',
                success: function (data_string) {
                    var markPointStyle = {
                        normal: {
                            color: 'red'
                        }
                    }

                    var data = JSON.parse(data_string);

                    var countries = data.countries.map(function (item) {
                        return {
                            itemStyle: markPointStyle,
                            geoCoord: [item['longitude'], item['latitude']]
                        }
                    });

                    var lineGroupByGrade = {};
                    data.lines.forEach(function (line) {
                        var gradeName;
                        if (line['weight'] < 15) {
                            gradeName = 'low';
                        }
                        else if (line['weight'] < 100) {
                            gradeName = 'middle';
                        }
                        else {
                            gradeName = 'high';
                        }
                        if (!lineGroupByGrade[gradeName]) {
                            lineGroupByGrade[gradeName] = [];
                        }
                        lineGroupByGrade[gradeName].push(line);
                    });


                    var opts = {
                        title: {
                            text: 'Google Scholar Connection',
                            subtext: 'Data from Hazelnut',
                            sublink: 'http://openflights.org/data.html',
                            x: 'center',
                            y: 'top',
                            textStyle: {
                                color: 'white'
                            }
                        },
                        legend: {
                            show: true,
                            data: data.grades.map(function (item) {
                                // Airline name
                                return item[0];
                            }),
                            selected: {},
                            x: 'left',
                            orient: 'vertical',
                            textStyle: {
                                color: 'white'
                            }
                        },
                        tooltip: {
                            formatter: '{b}'
                        },
                        series: [{
                            type: 'map3d',
                            mapType: 'world',
                            baseLayer: {
                                backgroundColor: '',
                                backgroundImage: 'asset/earth.jpg'
                            },
                            itemStyle: {
                                normal: {
                                    borderWidth: 1,
                                    borderColor: 'yellow',
                                    areaStyle: {
                                        color: 'rgba(0, 0, 0, 0)'
                                    }
                                }
                            },
                            markPoint: {
                                effect: {
                                    shadowBlur: 0.2
                                },
                                large: true,
                                symbolSize: 3,
                                data: countries
                            }
                        }]
                    };

                    opts.legend.data.forEach(function (name) {
                        if (name.indexOf('high') >= 0) {
                            opts.legend.selected[name] = true;
                        } else {
                            opts.legend.selected[name] = false;
                        }
                    });


                    var lines_high = lineGroupByGrade['high'];
                    if (lines_high) {
                        opts.series.push({
                            type: 'map3d',
                            name: 'high',
                            markLine: {
                                effect: {
                                    show: true
                                },
                                distance: 0.01,
                                itemStyle: {
                                    normal: {
                                        width: 0.1,
                                        color: 'red',
                                        opacity: 0.1
                                    }
                                },
                                data: lines_high.map(function (item) {
                                    return [{
                                        // Source airport
                                        geoCoord: [item['longitude_1'], item['latitude_1']]
                                    }, {
                                        // Destination Airport
                                        geoCoord: [item['longitude_2'], item['latitude_2']]
                                    }]
                                })
                            }
                        });
                    }

                    var lines_middle = lineGroupByGrade['middle'];
                    if (lines_middle) {
                        opts.series.push({
                            type: 'map3d',
                            name: 'middle',
                            markLine: {
                                effect: {
                                    show: true
                                },
                                distance: 0.01,
                                itemStyle: {
                                    normal: {
                                        width: 0.1,
                                        color: 'pink',
                                        opacity: 0.1
                                    }
                                },
                                data: lines_middle.map(function (item) {
                                    return [{
                                        // Source airport
                                        geoCoord: [item['longitude_1'], item['latitude_1']]
                                    }, {
                                        // Destination Airport
                                        geoCoord: [item['longitude_2'], item['latitude_2']]
                                    }]
                                })
                            }
                        });
                    }

                    var lines_low = lineGroupByGrade['low'];
                    if (lines_low) {
                        opts.series.push({
                            type: 'map3d',
                            name: 'low',
                            markLine: {
                                effect: {
                                    show: true
                                },
                                distance: 0.01,
                                itemStyle: {
                                    normal: {
                                        width: 0.1,
                                        color: '#FFF8DC',
                                        opacity: 0.1
                                    }
                                },
                                data: lines_low.map(function (item) {
                                    return [{
                                        // Source airport
                                        geoCoord: [item['longitude_1'], item['latitude_1']]
                                    }, {
                                        // Destination Airport
                                        geoCoord: [item['longitude_2'], item['latitude_2']]
                                    }]
                                })
                            }
                        });
                    }

                    myChart.setOption(opts);

                    myChart.hideLoading();
                }
            });
        }
    }
});
