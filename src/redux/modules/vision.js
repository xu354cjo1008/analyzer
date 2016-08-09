import Immutable from 'immutable';
import faker from 'faker';
const LOAD = 'vision/LOAD';
const LOAD_SUCCESS = 'vision/LOAD_SUCCESS';
const LOAD_FAIL = 'vision/LOAD_FAIL';

const lineData = [
  {
    name: 'series1',
    values: [ { x: 0, y: 20 }, { x: 1, y: 30 }, { x: 2, y: 10 }, { x: 3, y: 5 }, { x: 4, y: 8 }, { x: 5, y: 15 }, { x: 6, y: 10 } ],
    strokeWidth: 3,
    strokeDashArray: '5,5',
  },
  {
    name: 'series2',
    values: [ { x: 0, y: 8 }, { x: 1, y: 5 }, { x: 2, y: 20 }, { x: 3, y: 12 }, { x: 4, y: 4 }, { x: 5, y: 6 }, { x: 6, y: 2 } ]
  },
  {
    name: 'series3',
    values: [ { x: 0, y: 0 }, { x: 1, y: 5 }, { x: 2, y: 8 }, { x: 3, y: 2 }, { x: 4, y: 6 }, { x: 5, y: 4 }, { x: 6, y: 2 } ]
  }
];

const fakeObjectData = new Immutable.Range(0, 1000);
const fakeObjectDataList = fakeObjectData.map((value) => (
  {
    id: value,
    avatar: faker.image.avatar(),
    city: faker.address.city(),
    email: faker.internet.email(),
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    street: faker.address.streetName(),
    zipCode: faker.address.zipCode(),
    date: faker.date.past(),
    bs: faker.company.bs(),
    catchPhrase: faker.company.catchPhrase(),
    companyName: faker.company.companyName(),
    words: faker.lorem.words(),
    sentence: faker.lorem.sentence(),
  }
));

console.log(fakeObjectDataList.get(10));

const initialState = {
  loaded: false,
  data: lineData,
  dataList: fakeObjectDataList
};

function createLineData(data) {
  console.log(data);
  const rdata = {
    names: 'serial8',
    values: data.map((node) => {
      console.log(node);
      const rNode = {
        x: node.number,
        y: node.cpu,
      };
      console.log(rNode);
      return rNode;
    })
  };
  console.log(rdata);
  return rdata;
}

export default function vision(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      console.log(state.dataList);
      return {
        ...state,
        loading: false,
        loaded: true,
        data: [createLineData(action.result)]
      };
    case LOAD_FAIL:
      console.log(state.dataList);
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.vision && globalState.vision.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/vision/load')
  };
}

export function loadDataList() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL]
    // promise: (client) => client.get('/vision/loadDataList')
  };
}
