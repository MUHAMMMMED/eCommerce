// ApexChart_Location_country.js
import React from 'react';
import ReactApexChart from 'react-apexcharts';

class ApexChart_Location_country extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [],
      options: {
        chart: {
          type: 'bar',
          height: 380
        },
        plotOptions: {
          bar: {
            barHeight: '100%',
            distributed: true,
            horizontal: true,
            dataLabels: {
              position: 'bottom'
            }
          }
        },
        colors: ['#33b2df', '#546E7A', '#d4526e', '#13d8aa', '#A5978B', '#2b908f', '#f9a3a4', '#90ee7e', '#f48024', '#69d2e7'],
        dataLabels: {
          enabled: true,
          textAnchor: 'start',
          style: {
            colors: ['#fff']
          },
          formatter: function (val, opt) {
            return opt.w.globals.labels[opt.dataPointIndex] + ":  " + val;
          },
          offsetX: 0,
          dropShadow: {
            enabled: true
          }
        },
        stroke: {
          width: 1,
          colors: ['#fff']
        },
        xaxis: {
          categories: [], // Categories will be set dynamically based on data
        },
        yaxis: {
          labels: {
            show: false
          }
        },
        title: {
          // text: 'Custom DataLabels',
          align: 'center',
          floating: true
        },
        subtitle: {
          // text: 'Category Names as DataLabels inside bars',
          align: 'center',
        },
        tooltip: {
          theme: 'dark',
          x: {
            show: false
          },
          y: {
            title: {
              formatter: function () {
                return '';
              }
            }
          }
        }
      }
    };
  }

  componentDidMount() {
    this.updateChartData();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.updateChartData();
    }
  }

  updateChartData() {
    const { data } = this.props;
    if (data && Object.keys(data).length > 0) {
      const seriesData = Object.values(data);
      const keys = Object.keys(data);
      this.setState({ series: [{ data: seriesData }], options: { ...this.state.options, xaxis: { categories: keys } } });
    } else {
      this.setState({ series: [], options: { ...this.state.options, xaxis: { categories: [] } } });
    }
  }

  render() {
    const { title } = this.props;
    const { options, series } = this.state;

    return (
      <div>
        <h2 style={{ textAlign: 'center', width: '100', float: 'right' }}>{title}</h2>
        <div id="chart">
          <ReactApexChart options={options} series={series} type="bar" />
        </div>
      </div>
    );
  }
}

export default ApexChart_Location_country;
