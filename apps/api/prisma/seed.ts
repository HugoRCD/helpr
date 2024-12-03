import { PrismaClient } from '@prisma/client'
import { createLinearProvider } from './seed/providers/linear/linearProvider'
import { createGithubProvider } from './seed/providers/github/githubProvider'
import { createDeeplProvider } from './seed/providers/deepl/deeplProvider'
import { createOpenaiProvider } from './seed/providers/openai/openaiProvider'
import { createLinkedinProvider } from './seed/providers/linkedin/linkedinProvider'
import { createNotionProvider } from './seed/providers/notion/notionProvider'
import { createStripeProvider } from './seed/providers/stripe/stripeProvider'
import { createHelprProvider } from './seed/providers/helpr/helprProvider'
import { createSlackProvider } from './seed/providers/slack/slackProvider'
import { createCalendarProvider } from './seed/providers/calendar/calendarProvider'
import { createGmailProvider } from './seed/providers/gmail/gmailProvider'
import { createSheetsProvider } from './seed/providers/sheets/sheetsProvider'

export const prisma = new PrismaClient()

async function main() {
  try {
    await createLinearProvider()
    await createGithubProvider()
    await createDeeplProvider()
    await createOpenaiProvider()
    await createLinkedinProvider()
    await createNotionProvider()
    await createStripeProvider()
    await createHelprProvider()
    await createSlackProvider()
    await createCalendarProvider()
    await createGmailProvider()
    await createSheetsProvider()
  } catch (e) {
    console.error(e)
  }
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
