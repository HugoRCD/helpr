import { prisma } from '../../../seed'

export async function every10MinutesTrigger(providerId: number) {
  return await prisma.trigger.create({
    data: {
      title: 'Every 10 minutes',
      key: 'every_10_minutes',
      description: 'Trigger every 10 minutes',
      value: 'every_10_minutes',
      providerId: providerId,
      provider: 'helpr',
      premium: true,
    },
  })
}

export async function everyHourTrigger(providerId: number) {
  return await prisma.trigger.create({
    data: {
      title: 'Every hour',
      key: 'every_hour',
      description: 'Trigger every hour',
      value: 'every_hour',
      providerId: providerId,
      provider: 'helpr',
    },
  })
}

export async function everyDayTrigger(providerId: number) {
  return await prisma.trigger.create({
    data: {
      title: 'Every day',
      key: 'every_day',
      description: 'Trigger every day',
      value: 'every_day',
      providerId: providerId,
      provider: 'helpr',
      premium: true,
    },
  })
}
