<script setup lang="ts">
const { locale, isEnabled } = useDocusI18n();
const config = useRuntimeConfig().public;

// Redirect root path to overview page
const currentLocale =
  locale.value || (config.i18n?.defaultLocale as string) || "en";
const overviewPath = isEnabled.value
  ? `/${currentLocale}/0.overview`
  : "/0.overview";

await navigateTo(overviewPath, { replace: true });
</script>

<template>
  <div />
</template>
