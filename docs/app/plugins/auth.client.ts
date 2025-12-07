export default defineNuxtPlugin(() => {
  addRouteMiddleware(async (to) => {
    const config = useRuntimeConfig().public;
    const locales = (config.i18n?.locales || []) as Array<
      string | { code: string }
    >;
    const availableLocales = locales.map((locale: string | { code: string }) =>
      typeof locale === "string" ? locale : locale.code
    );
    const defaultLocale = (config.i18n?.defaultLocale as string) || "en";

    // Helper function to extract locale from path
    const getLocaleFromPath = (path: string): string => {
      const pathSegments = path.split("/").filter(Boolean);
      const firstSegment = pathSegments[0] || "";
      if (firstSegment && availableLocales.includes(firstSegment)) {
        return firstSegment;
      }
      return defaultLocale;
    };

    // Helper function to check if path is a login path (with or without locale)
    const isLoginPath = (path: string): boolean => {
      if (path === "/login") {
        return true;
      }
      const pathSegments = path.split("/").filter(Boolean);
      const firstSegment = pathSegments[0] || "";
      return (
        pathSegments.length === 2 &&
        availableLocales.includes(firstSegment) &&
        pathSegments[1] === "login"
      );
    };

    // Allow access to login page (with or without locale) and API auth endpoints
    if (
      isLoginPath(to.path) ||
      to.path.startsWith("/api/auth/") ||
      to.path.startsWith("/_nuxt/") ||
      to.path.startsWith("/__nuxt/")
    ) {
      return;
    }

    // Check localStorage first (fast, no API call)
    if (import.meta.client) {
      const token = localStorage.getItem("auth_session_token");
      if (token) {
        // Token exists in localStorage, user is authenticated
        return;
      }
    }

    // Extract locale from current route path
    const locale = getLocaleFromPath(to.path);
    const loginPath = `/${locale}/login`;

    // Fallback to API check if localStorage is empty
    try {
      const response = await $fetch<{ authenticated: boolean }>(
        "/api/auth/check"
      );
      if (!response.authenticated) {
        console.log("Redirecting to login");
        // Redirect to login with the intended destination
        return navigateTo({
          path: loginPath,
          query: {
            redirect: to.fullPath,
          },
        });
      }
    } catch {
      // If check fails, redirect to login
      return navigateTo({
        path: loginPath,
        query: {
          redirect: to.fullPath,
        },
      });
    }
  });
});
