import React, {Component, PropTypes} from 'react';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import {Table, Column, Cell} from 'fixed-data-table';
// import ExampleImage from './helpers/ExampleImage';
// import FakeObjectDataListStore from './helpers/FakeObjectDataListStore';
import Immutable from 'immutable';

const DateCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.get(rowIndex)[col].toLocaleString()}
  </Cell>
);

// const ImageCell = ({rowIndex, data, col}) => (
//  <ExampleImage
//    src={data.getObjectAt(rowIndex)[col]}
// />
// );

const LinkCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    <a href="#">{data.get(rowIndex)[col]}</a>
  </Cell>
);

const TextCell = ({rowIndex, data, col, ...props}) => (
  <Cell {...props}>
    {data.get(rowIndex)[col]}
  </Cell>
);

@connect(
  state => ({dataList: state.vision.dataList}))
export default class DataTable extends Component {
  static propTypes = {
    dataList: PropTypes.instanceOf(Immutable.Seq)
  }

  render() {
    const {dataList} = this.props;
    console.log(dataList.get(100));
    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={1000}
        width={1000}
        height={500}>
        <Column
          // cell={<ImageCell data={dataList} col="avatar" />}
          fixed={Boolean(true)}
          width={50}
        />
        <Column
          header={<Cell>First Name</Cell>}
          cell={<LinkCell data={dataList} col="firstName" />}
          fixed={Boolean(true)}
          width={100}
        />
        <Column
          header={<Cell>Last Name</Cell>}
          cell={<TextCell data={dataList} col="lastName" />}
          fixed={Boolean(true)}
          width={100}
        />
        <Column
          header={<Cell>City</Cell>}
          cell={<TextCell data={dataList} col="city" />}
          width={100}
        />
        <Column
          header={<Cell>Street</Cell>}
          cell={<TextCell data={dataList} col="street" />}
          width={200}
        />
        <Column
          header={<Cell>Zip Code</Cell>}
          cell={<TextCell data={dataList} col="zipCode" />}
          width={200}
        />
        <Column
          header={<Cell>Email</Cell>}
          cell={<LinkCell data={dataList} col="email" />}
          width={200}
        />
        <Column
          header={<Cell>DOB</Cell>}
          cell={<DateCell data={dataList} col="date" />}
          width={200}
        />
      </Table>
    );
  }
}
