<script setup lang="ts">
definePageMeta({
  layout: false, // Use no layout for login page
});

const route = useRoute();
const router = useRouter();
const { login, isLoading } = useAuth();

const email = ref("");
const password = ref("");
const error = ref("");
const isSubmitting = ref(false);

// Get redirect URL from query params
const redirectTo = computed(() => {
  const redirect = route.query.redirect as string;
  return redirect || "/";
});

const handleSubmit = async () => {
  error.value = "";

  if (!email.value || !password.value) {
    error.value = "Please enter both email and password";
    return;
  }

  isSubmitting.value = true;

  try {
    const result = await login(email.value, password.value);

    if (result.success) {
      // Redirect to the intended page or home
      await router.push(redirectTo.value);
    } else {
      error.value = result.error || "Invalid email or password";
    }
  } catch (err: any) {
    error.value = err.message || "An error occurred during login";
  } finally {
    isSubmitting.value = false;
  }
};

// Check if already authenticated
onMounted(async () => {
  const { checkAuth } = useAuth();
  const authenticated = await checkAuth();
  if (authenticated) {
    await router.push(redirectTo.value);
  }
});
</script>

<template>
  <div
    class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4"
  >
    <UCard class="w-full max-w-md">
      <template #header>
        <div class="text-center">
          <h1 class="text-2xl font-bold text-gray-900 dark:text-white">
            Hubshift Documentation
          </h1>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Sign in to access the documentation
          </p>
        </div>
      </template>

      <form class="space-y-4 w-full" @submit.prevent="handleSubmit">
        <UAlert
          v-if="error"
          color="red"
          variant="soft"
          :title="error"
          icon="i-lucide-alert-circle"
          class="mb-4"
        />

        <div>
          <label
            for="email"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Email
          </label>
          <UInput
            id="email"
            v-model="email"
            class="w-full"
            type="email"
            placeholder="Enter email"
            required
            autocomplete="email"
            :disabled="isSubmitting || isLoading"
            size="lg"
          />
        </div>

        <div class="w-full">
          <label
            for="password"
            class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Password
          </label>
          <UInput
            id="password"
            class="w-full"
            v-model="password"
            type="password"
            placeholder="Enter your password"
            required
            autocomplete="current-password"
            :disabled="isSubmitting || isLoading"
            size="lg"
          />
        </div>

        <UButton
          type="submit"
          block
          size="lg"
          :loading="isSubmitting || isLoading"
          :disabled="isSubmitting || isLoading"
        >
          Sign In
        </UButton>
      </form>
    </UCard>
  </div>
</template>
