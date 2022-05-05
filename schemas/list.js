import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const ListSchema = new Schema({
  // 标题
  title: { type: String, default: '' },
  // 内容
  content: { type: String, default: '' },
  // 创建日期
  create_at: { type: Date, default: Date.now },
  // 修改日期
  update_at: { type: Date }
});

mongoose.model('List', ListSchema);
