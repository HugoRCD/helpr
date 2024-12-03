import { H3Event } from 'h3'
import { updateUser } from '~~/server/app/userService'

export default eventHandler(async (event: H3Event) => {
  const { userId } = getRouterParams(event)
  console.log('userId', userId)
  const updateUserInput = await readBody(event)
  console.log('updateUserInput', updateUserInput)
  delete updateUserInput.subscription
  return await updateUser(userId, updateUserInput)
})
