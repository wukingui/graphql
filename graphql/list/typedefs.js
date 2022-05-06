
import { list, addList, updateList, deleteList } from './arguments';
import { getArguments } from '../../utils/tools';

export const Schema = `
  # 查询
  type list {
    _id: String
    # 标题
    title: String
    # 内容
    content: String,
    # 创建日期
    create_at: String
    # 最近一次更新日期
    update_at: String
  }

  # 添加
  type addList {
    # 结果
    success: Boolean
    # list id
    _id: ID
  }

  # 更新
  type updateList {
    success: Boolean
  }

  # 删除
  type deleteList {
    success: Boolean
  }

`
export const Query = `

  # 查询
  list(${getArguments(list)}): [list]

`

export const Mutation = `

  # 添加
  addList(${getArguments(addList)}): addList

  # 更新
  updateList(${getArguments(updateList)}): updateList

  # 更新
  deleteList(${getArguments(deleteList)}): deleteList

`
