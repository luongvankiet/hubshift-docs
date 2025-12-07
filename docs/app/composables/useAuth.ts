const AUTH_TOKEN_KEY = "auth_session_token";

export const useAuth = () => {
  const isLoading = ref(false);

  // Get token from localStorage
  const getToken = (): string | null => {
    if (import.meta.client) {
      return localStorage.getItem(AUTH_TOKEN_KEY);
    }
    return null;
  };

  // Set token in localStorage
  const setToken = (token: string): void => {
    if (import.meta.client) {
      localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
  };

  // Remove token from localStorage
  const removeToken = (): void => {
    if (import.meta.client) {
      localStorage.removeItem(AUTH_TOKEN_KEY);
    }
  };

  const login = async (email: string, password: string) => {
    isLoading.value = true;
    try {
      const response = await $fetch<{
        success: boolean;
        token?: string;
        error?: string;
      }>("/api/auth/login", {
        method: "POST",
        body: {
          email,
          password,
        },
      });

      if (response.success && response.token) {
        // Store token in localStorage
        setToken(response.token);
        return { success: true };
      } else {
        return { success: false, error: response.error || "Login failed" };
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.data?.error || error.message || "An error occurred",
      };
    } finally {
      isLoading.value = false;
    }
  };

  const logout = async () => {
    isLoading.value = true;

    // Get locale-aware login path helper
    const getLoginPath = (): string => {
      const route = useRoute();
      const config = useRuntimeConfig().public;
      const locales = (config.i18n?.locales || []) as Array<
        string | { code: string }
      >;
      const availableLocales = locales.map(
        (locale: string | { code: string }) =>
          typeof locale === "string" ? locale : locale.code
      );
      const defaultLocale = (config.i18n?.defaultLocale as string) || "en";

      // Extract locale from current route path
      const pathSegments = route.path.split("/").filter(Boolean);
      const firstSegment = pathSegments[0] || "";
      const locale =
        firstSegment && availableLocales.includes(firstSegment)
          ? firstSegment
          : defaultLocale;

      return `/${locale}/login`;
    };

    const loginPath = getLoginPath();

    try {
      // Clear token from localStorage
      removeToken();
      await $fetch("/api/auth/logout", {
        method: "POST",
      });
      await navigateTo(loginPath);
    } catch (error) {
      console.error("Logout error:", error);
      // Still clear localStorage even if API call fails
      removeToken();
      await navigateTo(loginPath);
    } finally {
      isLoading.value = false;
    }
  };

  const checkAuth = async () => {
    // Check localStorage first (fast, no API call)
    const token = getToken();
    if (token) {
      // Verify token is still valid by making API call with token
      try {
        const response = await $fetch<{ authenticated: boolean }>(
          "/api/auth/check",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // If token is invalid, remove it from localStorage
        if (!response.authenticated) {
          removeToken();
          return false;
        }
        return true;
      } catch (error) {
        // If API call fails, remove invalid token
        removeToken();
        return false;
      }
    }

    // Fallback to API check if localStorage is empty (checks cookie)
    try {
      const response = await $fetch<{ authenticated: boolean }>(
        "/api/auth/check",
        {
          method: "GET",
        }
      );
      return response.authenticated;
    } catch (error) {
      return false;
    }
  };

  return {
    login,
    logout,
    checkAuth,
    getToken,
    isLoading: readonly(isLoading),
  };
};
