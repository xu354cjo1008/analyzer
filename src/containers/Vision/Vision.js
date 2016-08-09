import React, {Component, PropTypes} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import rd3 from 'rd3';
import {load} from 'redux/modules/vision';
import {DataTable} from 'components';

@connect(
  state => ({plotData: state.vision.data}),
  dispatch => bindActionCreators({load}, dispatch))
export default class Vision extends Component {

  static propTypes = {
    plotData: PropTypes.array,
    load: PropTypes.func.isRequired
  };

  render() {
    const {plotData, load} = this.props; // eslint-disable-line no-shadow
    const LineChart = rd3.LineChart;
    return (
      <div className="container">
        <h1>
          Visions
          <button className="btn btn-primary" onClick={load}>{' '} Load plat data</button>
        </h1>
        <LineChart
          legend
          data={plotData}
          width="100%"
          height={400}
          viewBoxObject={{
            x: 0,
            y: 0,
            width: 500,
            height: 400
          }}
          title="Line Chart"
          yAxisLabel="Altitude"
          xAxisLabel="Elapsed Time (sec)"
          domain={{
            x: [undefined, 6],
            y: [ -10, undefined]
          }}
          gridHorizontal
        />
        <DataTable>aa</DataTable>
      </div>
    );
  }
}
