<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { useDocusI18n } from "../../composables/useDocusI18n";
import { useAuth } from "../../composables/useAuth";

const appConfig = useAppConfig();
const site = useSiteConfig();

const { localePath, isEnabled, locales } = useDocusI18n();
const { logout: logoutAuth, getToken } = useAuth();
const route = useRoute();

const authToken = useStorage<string | null>("auth_session_token", null);
const isAuthenticated = computed(() => !!authToken.value);

// Sync with localStorage when route changes (e.g., after login redirect)
watch(
  () => route.path,
  () => {
    if (import.meta.client) {
      const token = getToken();
      if (token !== authToken.value) {
        authToken.value = token;
      }
    }
  },
  { immediate: true }
);

// Also listen to storage events for cross-tab/component updates
if (import.meta.client) {
  window.addEventListener("storage", (e) => {
    if (e.key === "auth_session_token") {
      authToken.value = e.newValue as string | null;
    }
  });
}

const handleLogout = async () => {
  // Clear the reactive token immediately so the button disappears
  authToken.value = null;
  // Then call the actual logout function
  await logoutAuth();
};

const links = computed(() =>
  appConfig.github && appConfig.github.url ? [] : []
);
</script>

<template>
  <UHeader
    :ui="{ center: 'flex-1' }"
    :to="localePath('/')"
    :title="appConfig.header?.title || site.name"
  >
    <AppHeaderCenter />

    <template #title>
      <AppHeaderLogo class="h-6 w-auto shrink-0" />
    </template>

    <template #right>
      <AppHeaderCTA />

      <template v-if="isEnabled && locales.length > 1">
        <ClientOnly>
          <LanguageSelect />

          <template #fallback>
            <div
              class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md"
            />
          </template>
        </ClientOnly>

        <USeparator orientation="vertical" class="h-8" />
      </template>

      <UContentSearchButton class="lg:hidden" />

      <ClientOnly>
        <UColorModeButton />
        <UButton
          v-if="isAuthenticated"
          icon="i-lucide-log-out"
          color="neutral"
          variant="ghost"
          size="sm"
          @click="handleLogout"
        >
          Logout
        </UButton>

        <template #fallback>
          <div
            class="h-8 w-8 animate-pulse bg-neutral-200 dark:bg-neutral-800 rounded-md"
          />
        </template>
      </ClientOnly>

      <template v-if="links?.length">
        <UButton
          v-for="(link, index) of links"
          :key="index"
          v-bind="{ color: 'neutral', variant: 'ghost', ...link }"
        />
      </template>
    </template>

    <template #toggle="{ open, toggle }">
      <IconMenuToggle :open="open" class="lg:hidden" @click="toggle" />
    </template>

    <template #body>
      <AppHeaderBody />
    </template>
  </UHeader>
</template>
