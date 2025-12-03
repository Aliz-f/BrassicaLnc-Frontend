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
                    height: 700,
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
                        barHeight: '75%',
                        columnWidth: dataSeries.length < 12 ? '18%' : '96%',
                        dataLabels: {
                            enabled: false
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
                    enabled: false,
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
                },

                title: {
                    text: chartTitle,
                    floating: false,
                    offsetY: -6,
                    offsetX: -330,
                    align: 'top',
                    style: {
                        color: '#444'
                    }
                }
            }
        };
        const line = {
            series: dataSeries,

            options: {
                chart: {
                    height: 700,
                    type: 'line',
                    zoom: {
                        enabled: false
                    }
                },
                dataLabels: {
                    enabled: false
                },
                tooltip: {
                    enabled: true,

                    custom({ series, seriesIndex, dataPointIndex, w }) {
                        return `<div style="background: #fff; padding: 12px"><span style="font-weight: bold">${dataCategories[dataPointIndex]}:</span> <span>  ${series[seriesIndex][dataPointIndex]}</span> </div>`;
                    }
                },
                stroke: {
                    show: true,
                    curve: 'straight',
                    lineCap: 'butt',
                    colors: undefined,
                    width: 3.6,
                    dashArray: 0
                },
                title: {
                    text: chartTitle,
                    align: 'left'
                },
                grid: {
                    row: {
                        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                        opacity: 0.5
                    }
                },
                xaxis: {
                    categories: dataCategories,
                    tickPlacement: 'on',

                    position: 'bottom',
                    labels: {
                        show: true,
                        rotate: -86,
                        rotateAlways: true,
                        hideOverlappingLabels: false,
                        showDuplicates: true,
                        trim: false,
                        minHeight: undefined,
                        maxHeight: undefined,
                        style: {
                            colors: [],
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 400,
                            cssClass: 'apexcharts-xaxis-label'
                        },
                        offsetX: 0,
                        offsetY: 0,
                        format: undefined,
                        formatter: undefined,
                        datetimeUTC: true,
                        datetimeFormatter: {
                            year: 'yyyy',
                            month: "MMM 'yy",
                            day: 'dd MMM',
                            hour: 'HH:mm'
                        }
                    },
                    axisBorder: {
                        show: true,
                        color: '#78909C',
                        height: 1,
                        width: '100%',
                        offsetX: 0,
                        offsetY: 0
                    },
                    axisTicks: {
                        show: true,
                        borderType: 'solid',
                        color: '#78909C',
                        height: 6,
                        offsetX: 0,
                        offsetY: 0
                    },

                    title: {
                        text: undefined,
                        offsetX: 0,
                        offsetY: 0,
                        style: {
                            color: undefined,
                            fontSize: '12px',
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight: 600,
                            cssClass: 'apexcharts-xaxis-title'
                        }
                    },
                    crosshairs: {
                        show: true,
                        width: 1,
                        position: 'back',
                        opacity: 0.9,
                        stroke: {
                            color: '#b6b6b6',
                            width: 0,
                            dashArray: 0
                        },
                        fill: {
                            type: 'solid',
                            color: '#B1B9C4',
                            gradient: {
                                colorFrom: '#D8E3F0',
                                colorTo: '#BED1E6',
                                stops: [0, 100],
                                opacityFrom: 0.4,
                                opacityTo: 0.5
                            }
                        },
                        dropShadow: {
                            enabled: false,
                            top: 0,
                            left: 0,
                            blur: 1,
                            opacity: 0.4
                        }
                    },
                    tooltip: {
                        enabled: false,
                        formatter: undefined,
                        offsetY: 0,
                        style: {
                            fontSize: 0,
                            fontFamily: 0
                        }
                    }
                }
            }
        };

        return (
            <div id="chart">
                {chartType === 'line' ? (
                    <ReactApexChart options={line.options} series={line.series} type={chartType} height="700" />
                ) : (
                    <ReactApexChart options={data.options} series={data.series} type={chartType} height="700" />
                )}
                {chartDescription && (
                    <>
                        <h4>Chart Description</h4>
                        <p>{chartDescription}</p>
                    </>
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
