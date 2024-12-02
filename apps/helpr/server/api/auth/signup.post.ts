import { H3Event } from 'h3'
import { createUser } from '~/server/app/userService'
import { createUserInput } from '~/server/api/user/user.dto'

export default eventHandler(async (event: H3Event) => {
  const body = await readBody(event)
  const createUserInput: createUserInput = {
    username: body.username,
    password: body.password,
    email: body.email,
    firstname: body.firstname,
    lastname: body.lastname,
  }
  return await createUser(createUserInput)
})
