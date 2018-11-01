//Biểu đồ nhiệt độ
Highcharts.chart('chartContainer', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Biểu đồ nhiệt độ'
    },
    subtitle: {
        //text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
    },
    yAxis: {
        title: {
            text: 'Nhiệt độ (°C)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Ngày hôm qua',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'Ngày hôm nay',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});
//Biểu đồ không khí
Highcharts.chart('chartContainer1', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Biểu đồ không khí'
    },
    subtitle: {
        //text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
    },
    yAxis: {
        title: {
            text: 'Độ ẩm không khí (%)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Ngày hôm qua',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'Ngày hôm nay',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});
//Biểu đồ ánh sáng
Highcharts.chart('chartContainer2', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Biểu đồ ánh sáng'
    },
    subtitle: {
        //text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
    },
    yAxis: {
        title: {
            text: 'Cường độ ánh sáng (%)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Ngày hôm qua',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'Ngày hôm nay',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});
//Biểu đồ độ ẩm đất
Highcharts.chart('chartContainer3', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Biểu đồ độ ẩm đất'
    },
    subtitle: {
        //text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
    },
    yAxis: {
        title: {
            text: 'Độ ẩm đất (%)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Ngày hôm qua',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'Ngày hôm nay',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});
//Biểu đồ nồng độ CO2
Highcharts.chart('chartContainer4', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Biểu đồ nồng độ CO2'
    },
    subtitle: {
        //text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
    },
    yAxis: {
        title: {
            text: 'Nồng độ CO2 (%)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Ngày hôm qua',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'Ngày hôm nay',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});
//Biểu đồ nồng độ O2
Highcharts.chart('chartContainer5', {
    chart: {
        type: 'line'
    },
    title: {
        text: 'Biểu đồ nồng độ O2'
    },
    subtitle: {
        //text: 'Source: WorldClimate.com'
    },
    xAxis: {
        categories: ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
    },
    yAxis: {
        title: {
            text: 'Nồng độ O2 (%)'
        }
    },
    plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
    },
    series: [{
        name: 'Ngày hôm qua',
        data: [7.0, 6.9, 9.5, 14.5, 18.4, 21.5, 25.2, 26.5, 23.3, 18.3, 13.9, 9.6]
    }, {
        name: 'Ngày hôm nay',
        data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8]
    }]
});