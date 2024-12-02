import { H3Event } from 'h3'

export default eventHandler(async (event: H3Event) => {
  deleteCookie(event, 'authToken')
  deleteCookie(event, 'refreshToken')
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Logged out' }),
  }
})
