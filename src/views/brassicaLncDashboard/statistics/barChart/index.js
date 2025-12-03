import PropTypes from 'prop-types';

import ReactApexChart from 'react-apexcharts';

import colors from 'assets/scss/_themes-vars.module.scss';

function MyResponsiveBar({ chartType, chartTitle, chartDescription, dataCategories, dataSeries, dataUnit }) {
    // console.log(dataSeries);
    try {
        const data = {
            series: dataSeries,

            options: {
                chart: {
                    height: 500,
                    type: 'bar',
                    toolbar: {
                        show: true,
                        tools: {
                            download: true,
                            selection: false,
                            zoom: false,
                            zoomin: false,
                            zoomout: false,
                            pan: false
                        }
                    }
                },

                legend: {
                    show: true,
                    floating: false,
                    horizontalAlign: 'bottom',
                    showForSingleSeries: true,
                    offsetX: 0,
                    offsetY: 0,
                    onItemClick: {
                        toggleDataSeries: true
                    },
                    itemMargin: {
                        horizontal: 6,
                        vertical: 0
                    }
                },
                colors: [
                    '#FF6633',
                    '#FFB399',
                    '#FF33FF',
                    '#FFFF99',
                    '#00B3E6',
                    '#E6B333',
                    '#3366E6',
                    '#999966',
                    '#99FF99',
                    '#B34D4D',
                    '#80B300',
                    '#809900',
                    '#E6B3B3',
                    '#6680B3',
                    '#66991A',
                    '#FF99E6',
                    '#CCFF1A',
                    '#FF1A66',
                    '#E6331A',
                    '#33FFCC',
                    '#66994D',
                    '#B366CC',
                    '#4D8000',
                    '#B33300',
                    '#CC80CC',
                    '#66664D',
                    '#991AFF',
                    '#E666FF',
                    '#4DB3FF',
                    '#1AB399',
                    '#E666B3',
                    '#33991A',
                    '#CC9999',
                    '#B3B31A',
                    '#00E680',
                    '#4D8066',
                    '#809980',
                    '#E6FF80',
                    '#1AFF33',
                    '#999933',
                    '#FF3380',
                    '#CCCC00',
                    '#66E64D',
                    '#4D80CC',
                    '#9900B3',
                    '#E64D66',
                    '#4DB380',
                    '#FF4D4D',
                    '#99E6E6',
                    '#6666FF'
                ],
                plotOptions: {
                    bar: {
                        borderRadius: 10,
                        distributed: false,
                        horizontal: false,
                        barHeight: '100%',

                        columnWidth: dataSeries.length < 12 ? '30%' : '96%',
                        dataLabels: {
                            enabled: true,
                            position: 'top',
                            maxItems: 100,
                            hideOverflowingLabels: true
                            // orientation: horizontal
                        }
                    }
                },
                dataLabels: {
                    colors: [
                        '#FF6633',
                        '#FFB399',
                        '#FF33FF',
                        '#FFFF99',
                        '#00B3E6',
                        '#E6B333',
                        '#3366E6',
                        '#999966',
                        '#99FF99',
                        '#B34D4D',
                        '#80B300',
                        '#809900',
                        '#E6B3B3',
                        '#6680B3',
                        '#66991A',
                        '#FF99E6',
                        '#CCFF1A',
                        '#FF1A66',
                        '#E6331A',
                        '#33FFCC',
                        '#66994D',
                        '#B366CC',
                        '#4D8000',
                        '#B33300',
                        '#CC80CC',
                        '#66664D',
                        '#991AFF',
                        '#E666FF',
                        '#4DB3FF',
                        '#1AB399',
                        '#E666B3',
                        '#33991A',
                        '#CC9999',
                        '#B3B31A',
                        '#00E680',
                        '#4D8066',
                        '#809980',
                        '#E6FF80',
                        '#1AFF33',
                        '#999933',
                        '#FF3380',
                        '#CCCC00',
                        '#66E64D',
                        '#4D80CC',
                        '#9900B3',
                        '#E64D66',
                        '#4DB380',
                        '#FF4D4D',
                        '#99E6E6',
                        '#6666FF'
                    ],
                    enabled: true,
                    fformatter(val) {
                        return `${val}${dataUnit}`;
                    },
                    offsetY: -24,
                    style: {
                        fontSize: '12px',
                        colors: [colors.secondary800]
                    }
                },

                xaxis: {
                    categories: dataCategories,
                    colors: ['#000'],

                    position: 'button',
                    axisBorder: {
                        show: true
                    },
                    labels: {
                        show: true,
                        formatter(val) {
                            return `${val}${dataUnit}`;
                        }
                    },
                    axisTicks: {
                        show: false
                    },

                    tooltip: {
                        enabled: false
                    }
                }
            }
        };

        const pieData = {
            series: dataSeries,
            options: {
                chart: {
                    width: dataSeries.length > 3 ? 900 : 500,
                    type: 'pie'
                },
                labels: dataCategories
            }
        };

        return (
            <div id="chart">
                <h3 style={{ marginTop: '36px' }}>{chartTitle}</h3>
                {chartType === 'bar' && <ReactApexChart options={data.options} series={data.series} type={chartType} height="500" />}
                {chartType === 'pie' && (
                    <ReactApexChart
                        options={pieData.options}
                        series={pieData.series}
                        type={chartType}
                        width={dataSeries.length > 3 ? '900' : '500'}
                    />
                )}
            </div>
        );
    } catch (error) {
        return <h4>to see chart, choose expression</h4>;
    }
}

MyResponsiveBar.propTypes = {
    chartType: PropTypes.string.isRequired,
    chartTitle: PropTypes.string.isRequired,
    chartDescription: PropTypes.string,
    dataCategories: PropTypes.array.isRequired,
    dataSeries: PropTypes.array.isRequired,
    dataUnit: PropTypes.string.isRequired
};

export default MyResponsiveBar;
