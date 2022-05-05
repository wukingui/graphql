import { createError } from 'apollo-errors';

export default ({ message, data = {} }) => {
  let error = createError('error', {
    message,
    data
  })
  return new error(data)
}