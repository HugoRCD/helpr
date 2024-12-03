import { prisma } from '../../../seed'
import {
  every10MinutesTrigger,
  everyDayTrigger,
  everyHourTrigger,
} from './helprTriggers'

export async function createHelprProvider() {
  const provider = await prisma.provider.create({
    data: {
      name: 'Helpr',
      description:
        'Helpr provide many default triggers like every 10 minutes, everyday, etc...',
      logo: 'helpr-logo',
    },
  })
  // Triggers
  await every10MinutesTrigger(provider.id)
  await everyHourTrigger(provider.id)
  await everyDayTrigger(provider.id)
}
