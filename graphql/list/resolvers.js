import { List } from '../../models';
import CreateError from '../../utils/errors';
import To from '../../utils/to';
import * as Model from './arguments';
import { getQuery, getOption, getSave } from '../../utils/tools';
// 查询
const list = async (root, args, context, schema) => {

  const { role } = context;

  let select = {}, err, list, query, options;

  [ err, query ] = getQuery({ args, model: Model.list, role });
  [ err, options ] = getOption({ args, model: Model.list, role });

  // select
  schema.fieldNodes[0].selectionSet.selections.map((item)=>select[item.name.value] = 1);

  // 添加默认排序
  if (!Reflect.has(options, 'sort_by')) {
    options.sort = {
      create_at: -1
    }
  }

  if (!options.populate) options.populate = [];
  
  
  if (query['$or'] && query['$or'].length == 0) {
    list = [];
  } else {
    [ err, list = [] ] = await To(List.find({ query, select, options }));
  }

  if (err) {
    throw CreateError({
      message: '查询失败',
      data: { errorInfo: err.message }
    })
  }

  return list;

}

// 增加
const addList = async (root, args, context, schema) => {

  const { role } = context;
  let err, // 错误
    result, // 结果
    fields; // 字段

  [ err, fields ] = getSave({ args, model: Model.addList, role });

  if (err) throw CreateError({ message: err });

  // 开始逻辑
  let { title, content } = fields;

  // 储存
  [ err, result ] = await To(List.save({
    data: {
      title,
      content
    }
  }));

  if (err) {
    throw CreateError({
      message: '储存失败',
      data: { errorInfo: err.message }
    })
  }

  return {
    success: true,
    _id: result._id
  }
}

// 更新
const updateList = async (root, args, context, schema) => {

  const { role } = context;

  
  let err, query, content;

  // 获取查询条件
  [ err, query ] = getQuery({ args, model: Model.updateList, role });
  if (err) throw CreateError({ message: err });

  // 获取更新内容
  [ err, content ] = getSave({ args, model: Model.updateList, role });
  if (err) throw CreateError({ message: err });

  content.update_at = new Date();

  // 更新
  [ err ] = await To(List.update({ query: {_id: query._id}, update: content }));

  if (err) {
    throw CreateError({
      message: '更新失败',
      data: { errorInfo: err.message }
    });
  }
  
  return { success: true }
}

// 删除
const deleteList = async (root, args, context, schema) => {

  const { role } = context;
  
  let err, query;

  // 获取查询条件
  [ err, query ] = getQuery({ args, model: Model.deleteList, role });
  if (err) throw CreateError({ message: err });

  // 删除
  [ err ] = await To(List.remove({ query }));

  if (err) {
    throw CreateError({
      message: '更新失败',
      data: { errorInfo: err.message }
    });
  }

  return { success: true }
}

export const query = { list }
export const mutation = { addList, updateList, deleteList }
