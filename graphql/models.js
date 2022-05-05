import * as List from './List';

const list = [
  List
]

export const typeDefs = [ `
  ${getTypeDefs(list, 'Schema')}


  # 查询
  type Query {
    ${getTypeDefs(list, 'Query')}
  }

  # 增、删、改
  type Mutation {
    ${getTypeDefs(list, 'Mutation')}
  }

  schema {
    mutation: Mutation
    query: Query
  }

`]

export const resolvers = {
  // 查询
  Query: objAssign(list, 'query'),
  // 修改
  Mutation: objAssign(list, 'mutation')
}

function getTypeDefs(arr, type) {
  let str = '';
  for (let i = 0; i < arr.length; i++) {
    str += arr[i].typedefs[type];
  }
  return str;
}

function objAssign(arr, type) {
  let obj = {};
  for (let i = 0; i < arr.length; i++) {
    obj = Object.assign(obj, arr[i].resolvers[type]);
  }
  return obj
}
