import React, { Component } from 'react'
import { bitcoinService } from '../../services/bitcoinService'
import { Sparklines, SparklinesLine } from 'react-sparklines';
import { Line } from 'react-chartjs-2';
import numeral from 'numeral';

export default class ChartCMP extends Component {
    state = {
        chartData: null
    }

    componentDidMount() {
        this.getMarketPrice()
    }

    async getMarketPrice(timestamp) {
        console.log('timestamp:', timestamp)
        let marketPrice = await bitcoinService.getMarketPrice(timestamp)
        let times = marketPrice.values.map(val => this.formatDateToString(val))
        let rates = marketPrice.values.map(val => val.y)
        let chartData = this.getChartData({
            labels: times,
            label: 'BTC Price',
            data: rates,
            backgroundColor: 'rgba(255, 217, 0, 0.2)',
            borderColor: 'rgba(255, 217, 0, 0.8)'
        })
        this.setState({ chartData })
    }
    getChartData({ labels, label, data, backgroundColor, borderColor }) {
        var data = {
            labels: labels,
            datasets: [{
                label: label,
                data: data,
                fill: true,
                backgroundColor: backgroundColor,
                borderColor: borderColor,
                borderWidth: 2,
                pointBackgroundColor: borderColor,
                pointRadius: 0
            }],
            options: {
                tooltips: {
                    axis: 'x',
                    mode: 'index',
                    intersect: false,
                    callbacks: {
                        label: function (tooltipItem, data) {
                            var label = data.datasets[tooltipItem.datasetIndex].label || '';

                            if (label) {
                                label += ': ';
                            }
                            label += numeral(tooltipItem.yLabel).format('$0,0')
                            return label;
                        }
                    }
                },
                hover: {
                    mode: 'index',
                    intersect: true
                },
                legend: {
                    display: false
                },
                scales: {
                    xAxes: [{
                        display: true,
                        ticks: {
                            maxTicksLimit: 10
                        }
                    }],
                    yAxes: [{

                        display: true,
                        ticks: {
                            // suggestedMax: 13000,
                            // Include a dollar sign in the ticks
                            callback: function (value) {
                                return numeral(value).format('$0.0a');
                            }
                        }
                    }]
                }
            }
        }
        return data
    }

    formatDateToString(val) {
        let date = new Date(val.x * 1000)
        let dateFormat = date.toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' })
        return dateFormat
    }

    render() {
        const { chartData } = this.state
        if (!chartData) return <p>Loading...</p>
        return (
            <div>
                <h1>Charts</h1>
                <p>BTC PRICE</p>
                <button onClick={() => this.getMarketPrice('2days')}>2D</button>
                <button onClick={() => this.getMarketPrice('3days')}>3D</button>
                <button onClick={() => this.getMarketPrice('7days')}>1W</button>
                <button onClick={() => this.getMarketPrice('30days')}>30D</button>
                <button onClick={() => this.getMarketPrice('3months')}>3M</button>
                <button onClick={() => this.getMarketPrice('1years')}>1Y</button>
                <button onClick={() => this.getMarketPrice('all')}>all</button>

                <Line
                    data={chartData}
                    options={chartData.options}
                />
                <hr />
            </div>
        )
    }
}
