import { H3Event } from 'h3'
import { updateUser } from '~/server/app/userService'

export default eventHandler(async (event: H3Event) => {
  const userId = parseInt(event.context.params.userId)
  const updateUserInput = await readBody(event)
  delete updateUserInput.subscription
  return await updateUser(userId, updateUserInput)
})
