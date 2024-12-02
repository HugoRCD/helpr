<script setup lang="ts">
definePageMeta({
  title: 'Team',
  name: 'Team',
})
const { t } = useI18n()

const people = [
  {
    id: 2,
    name: 'Hugo Richard',
    role: 'CTO',
    imageUrl: 'hugo-richard.jpeg',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    linkedinUrl: 'https://www.linkedin.com/in/hugo-richard-0801/',
    githubUrl: 'https://github.com/HugoRCD',
  },
  {
    id: 1,
    name: 'Paul Marniquet',
    role: t('team.developer'),
    imageUrl: 'paul-marniquet.jpeg',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    linkedinUrl: 'https://www.linkedin.com/in/paul-marniquet/',
    githubUrl: 'https://github.com/paulmarniquet',
  },
  {
    id: 9,
    name: 'Johann Cavallucci',
    role: t('team.developer'),
    imageUrl: 'johann-cavallucci.jpg',
    bio: 'Ultricies massa malesuada viverra cras lobortis. Tempor orci hac ligula dapibus mauris sit ut eu. Eget turpis urna maecenas cras. Nisl dictum.',
    linkedinUrl: 'https://www.linkedin.com/in/johann-cavallucci/',
    githubUrl: 'https://github.com/cavalluccijohann',
  },
]
</script>

<template>
  <div class="py-24 md:py-32">
    <div class="mx-auto grid max-w-7xl grid-cols-1 gap-y-20 gap-x-8 px-6 lg:px-8 xl:grid-cols-5">
      <div class="max-w-2xl xl:col-span-2">
        <h2 class="text-3xl font-bold tracking-tight text-gradient sm:text-4xl">
          {{ t("team.title") }}<span class="text-primary ml-2">.</span>
        </h2>
        <p class="mt-6 text-lg leading-8 text-muted">
          {{ t("team.description") }}
        </p>
      </div>
      <ul role="list" class="-mt-12 space-y-12 divide-y divide-secondary xl:col-span-3">
        <li v-for="person in people" :key="person.name" class="flex flex-col gap-10 pt-12 sm:flex-row">
          <nuxt-img
            class="aspect-[4/5] w-52 flex-none rounded-2xl object-cover"
            :src="'/assets/team/' + person.imageUrl"
            :alt="person.name"
            sizes="sm:100vw md:50vw lg:400px"
          />
          <div class="max-w-xl flex-auto">
            <NuxtLink :to="`/app/profile/${person.id}`" class="text-primary hover:underline">
              <h3 class="text-lg font-semibold leading-8 tracking-tight cursor-pointer">
                {{ person.name }}
              </h3>
            </NuxtLink>
            <p class="text-base leading-7 text-muted">
              {{ person.role }}
            </p>
            <p class="mt-6 text-base leading-7 text-muted">
              {{ person.bio }}
            </p>
            <ul role="list" class="mt-6 flex gap-x-6">
              <li>
                <NuxtLink v-if="person.linkedinUrl" target="_blank" :to="person.linkedinUrl" class="text-muted">
                  <ProviderLogo provider="linkedin" />
                </NuxtLink>
              </li>
              <NuxtLink v-if="person.githubUrl" target="_blank" :to="person.githubUrl" class="text-muted">
                <ProviderLogo provider="github" />
              </NuxtLink>
            </ul>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
