<script setup lang="ts">
import { kebabCase } from "scule";
import { withLeadingSlash, withoutTrailingSlash } from "ufo";
import type {
  ContentNavigationItem,
  Collections,
  DocsCollectionItem,
} from "@nuxt/content";
import { findPageHeadline } from "@nuxt/content/utils";
import { addPrerenderPath } from "../../utils/prerender";

definePageMeta({
  layout: "docs",
});

const route = useRoute();
const { locale, isEnabled, t } = useDocusI18n();
const appConfig = useAppConfig();
const navigation = inject<Ref<ContentNavigationItem[]>>("navigation");
const config = useRuntimeConfig().public;

// Normalize the path to ensure it matches content collection paths
// Use route.path directly - it's the most reliable source
const contentPath = computed(() => {
  const path = withoutTrailingSlash(withLeadingSlash(route.path));
  return path;
});

// Redirect locale index routes (e.g., /en) to overview page
const pathSegments = route.path.split("/").filter(Boolean);
const availableLocales = (config.i18n?.locales || []).map(
  (locale: string | { code: string }) =>
    typeof locale === "string" ? locale : locale.code
);
const isLocaleIndexRoute =
  pathSegments.length === 1 && availableLocales.includes(pathSegments[0]);

if (isLocaleIndexRoute) {
  const localeCode =
    pathSegments[0] || (config.i18n?.defaultLocale as string) || "en";
  await navigateTo(`/${localeCode}/overview`, { replace: true });
}

// Check if this is a locale index route (e.g., /en with no slug)
// A locale index route should be exactly /{locale} with no additional segments
const isLocaleIndex = computed(() => {
  const segments = contentPath.value.split("/").filter(Boolean);
  const locales = (config.i18n?.locales || []).map(
    (locale: string | { code: string }) =>
      typeof locale === "string" ? locale : locale.code
  );
  return segments.length === 1 && locales.includes(segments[0]);
});

// Determine collection name - extract locale from route path to ensure it matches
const collectionName = computed(() => {
  if (!isEnabled.value) {
    return isLocaleIndex.value ? "landing" : "docs";
  }

  // Extract locale from route path
  const pathSegments = contentPath.value.split("/").filter(Boolean);
  const firstSegment = pathSegments[0];

  const availableLocales = (config.i18n?.locales || []).map(
    (locale: string | { code: string }) =>
      typeof locale === "string" ? locale : locale.code
  );

  // Use locale from route path if it's valid, otherwise fall back to i18n composable or default locale
  let routeLocale: string;
  if (firstSegment && availableLocales.includes(firstSegment)) {
    routeLocale = firstSegment;
  } else {
    // Fall back to locale from i18n composable, or default locale
    routeLocale =
      locale.value || (config.i18n?.defaultLocale as string) || "en";
  }

  return isLocaleIndex.value ? `landing_${routeLocale}` : `docs_${routeLocale}`;
});

// When prefix is set in collection config, paths are stored WITH the prefix in the collection
// The raw route handler uses the full path with locale prefix, so we do the same
// Example: file at content/en/3.security.md is stored as /en/3.security in docs_en collection
// For landing pages, query with /{locale} path
const queryPath = computed(() => {
  if (isLocaleIndex.value && isEnabled.value) {
    // For locale index routes, use the locale path (e.g., /en)
    const pathSegments = contentPath.value.split("/").filter(Boolean);
    const availableLocales = (config.i18n?.locales || []).map(
      (locale: string | { code: string }) =>
        typeof locale === "string" ? locale : locale.code
    );
    if (pathSegments.length > 0 && availableLocales.includes(pathSegments[0])) {
      return `/${pathSegments[0]}`;
    }
    const currentLocale =
      locale.value || (config.i18n?.defaultLocale as string) || "en";
    return `/${currentLocale}`;
  }
  // Use the full path including locale prefix, matching how the raw route handler works
  // This ensures paths like /en/overview query correctly
  return contentPath.value;
});

const [{ data: page }, { data: surround }] = await Promise.all([
  useAsyncData(
    kebabCase(contentPath.value),
    () =>
      queryCollection(collectionName.value as keyof Collections)
        .path(queryPath.value)
        .first() as Promise<DocsCollectionItem>
  ),
  useAsyncData(`${kebabCase(contentPath.value)}-surround`, () => {
    return queryCollectionItemSurroundings(
      collectionName.value as keyof Collections,
      queryPath.value,
      {
        fields: ["description"],
      }
    );
  }),
]);

if (!page.value) {
  throw createError({
    statusCode: 404,
    statusMessage: "Page not found",
    fatal: true,
  });
}

// Add the page path to the prerender list
addPrerenderPath(`/raw${contentPath.value}.md`);

const title = page.value.seo?.title || page.value.title;
const description = page.value.seo?.description || page.value.description;

useSeoMeta({
  title,
  ogTitle: title,
  description,
  ogDescription: description,
});

const headline = ref(findPageHeadline(navigation?.value, page.value?.path));
watch(
  () => navigation?.value,
  () => {
    headline.value =
      findPageHeadline(navigation?.value, page.value?.path) || headline.value;
  }
);

defineOgImageComponent("Docs", {
  headline: headline.value,
});

const github = computed(() => (appConfig.github ? appConfig.github : null));

const editLink = computed(() => {
  if (!github.value) {
    return;
  }

  return [
    github.value.url,
    "edit",
    github.value.branch,
    github.value.rootDir,
    "content",
    `${page.value?.stem}.${page.value?.extension}`,
  ]
    .filter(Boolean)
    .join("/");
});
</script>

<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
      :headline="headline"
      :ui="{
        wrapper: 'flex-row items-center flex-wrap justify-between',
      }"
    >
      <template #links>
        <UButton
          v-for="(link, index) in (page as DocsCollectionItem).links"
          :key="index"
          size="sm"
          v-bind="link"
        />

        <DocsPageHeaderLinks />
      </template>
    </UPageHeader>

    <UPageBody>
      <ContentRenderer v-if="page" :value="page" />

      <USeparator>
        <div v-if="github" class="flex items-center gap-2 text-sm text-muted">
          <UButton
            variant="link"
            color="neutral"
            :to="editLink"
            target="_blank"
            icon="i-lucide-pen"
            :ui="{ leadingIcon: 'size-4' }"
          >
            {{ t("docs.edit") }}
          </UButton>
          <span>{{ t("common.or") }}</span>
          <UButton
            variant="link"
            color="neutral"
            :to="`${github.url}/issues/new/choose`"
            target="_blank"
            icon="i-lucide-alert-circle"
            :ui="{ leadingIcon: 'size-4' }"
          >
            {{ t("docs.report") }}
          </UButton>
        </div>
      </USeparator>
      <UContentSurround :surround="surround" />
    </UPageBody>

    <template v-if="page?.body?.toc?.links?.length" #right>
      <UContentToc
        highlight
        :title="appConfig.toc?.title || t('docs.toc')"
        :links="page.body?.toc?.links"
      >
        <template #bottom>
          <DocsAsideRightBottom />
        </template>
      </UContentToc>
    </template>
  </UPage>
</template>
