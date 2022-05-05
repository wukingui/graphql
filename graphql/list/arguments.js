import * as ParseParams from '../../utils/parse-params';

// 查询
export const list = {
  _id: (data) => ({
    typename: 'query',
    name: '_id',
    value: ParseParams.id(data),
    type: 'ID',
    desc:'ID'
  }),
  title: (data) => ({
    typename: 'query',
    name: 'title',
    value: ParseParams.search(data),
    type: 'String',
    desc:'标题'
  }),
  page_number: (data) => ({
    typename: 'option',
    name: 'skip',
    value: data - 1 >= 0 ? data - 1 : 0,
    type: 'Int',
    desc:'第几页'
  }),
  page_size: (data) => ({
    typename: 'option',
    name: 'limit',
    value: data,
    type: 'Int',
    desc:'每页数量'
  })
}

// 储存
export const addList = {
  title: (data) => ({
    typename: 'save',
    name: 'title',
    value: data,
    type: 'String!',
    desc:'标题'
  }),
  content: (data) => ({
    typename: 'save',
    name: 'content',
    value: data,
    type: 'String!',
    desc:'正文'
  })
}

// 更新
export const updateList = {
  _id: (data) => ({
    typename: 'query',
    name: '_id',
    value: ParseParams.id(data),
    type: 'ID',
    desc:'ID'
  }),
  title: (data) => ({
    typename: 'save',
    name: 'title',
    value: data,
    type: 'String',
    desc:'标题'
  }),
  content: (data) => ({
    typename: 'save',
    name: 'content',
    value: data,
    type: 'String',
    desc:'正文'
  })
}

// 删除
export const deleteList = {
  _id: (data) => ({
    typename: 'query',
    name: '_id',
    value: ParseParams.id(data),
    type: 'ID',
    desc:'ID'
  })
}