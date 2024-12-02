import { getGoogleInfos } from '~~/server/app/providers/googleService'

export default eventHandler(async (event) => {
  const { code } = await readBody(event)
  console.log(code)
  const { user, tokens } = await getGoogleInfos(code)
  console.log(user, tokens)
  return { message: 'success', data: { user, tokens } }
})
