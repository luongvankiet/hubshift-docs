<script setup lang="ts">
import type { Collections } from '@nuxt/content'

const route = useRoute()
const { locale, isEnabled } = useDocusI18n()
const config = useRuntimeConfig().public

// Landing page should only handle index routes (/ or /en)
// Check if this is actually an index route by examining the path
const pathSegments = route.path.split('/').filter(Boolean)
const availableLocales = (config.i18n?.locales || []).map(
  (locale: string | { code: string }) =>
    typeof locale === 'string' ? locale : locale.code,
)

// Check if route has more segments than expected for an index route
// If route.path is /en/3.security, pathSegments will be ['en', '3.security']
// which means it's not an index route
const isIndexRoute
  = pathSegments.length === 0
    || (pathSegments.length === 1 && availableLocales.includes(pathSegments[0]))

// If this is not an index route, this route shouldn't have matched
// The slug route [[lang]]/[...slug] should handle paths like /en/3.security
// For now, we'll throw an error - this indicates a routing configuration issue
if (!isIndexRoute) {
  throw createError({
    statusCode: 404,
    statusMessage: `Page not found: ${route.path}. This should be handled by the slug route.`,
    fatal: true,
  })
}

// Dynamic collection name based on i18n status
const collectionName = computed(() =>
  isEnabled.value ? `landing_${locale.value}` : 'landing',
)

// Normalize the path to match the landing collection structure
const landingPath = computed(() => {
  if (!isEnabled.value) {
    return '/'
  }

  // For i18n, the landing collection includes {code}/index.md
  // So we query with the locale path
  if (pathSegments.length > 0 && availableLocales.includes(pathSegments[0])) {
    return `/${pathSegments[0]}`
  }

  // Otherwise use the current locale
  const currentLocale
    = locale.value || (config.i18n?.defaultLocale as string) || 'en'
  return `/${currentLocale}`
})

const { data: page } = await useAsyncData(collectionName.value, () =>
  queryCollection(collectionName.value as keyof Collections)
    .path(landingPath.value)
    .first(),
)
if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
})

if (page.value?.seo?.ogImage) {
  useSeoMeta({
    ogImage: page.value.seo.ogImage,
    twitterImage: page.value.seo.ogImage,
  })
}
else {
  defineOgImageComponent('Landing', {
    title,
    description,
  })
}
</script>

<template>
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
