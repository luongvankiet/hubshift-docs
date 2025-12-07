---
name: Implement logout button with icon
overview: Enhance the logout button in AppHeader component with an icon, proper styling consistent with other header buttons, loading state, and connect it to the useAuth logout function.
todos: []
---

# Implement Logout Button with Icon

The logout button in `AppHeader.vue` needs to be enhanced with:

- An icon (using Lucide icons like other components)
- Consistent styling with other header buttons
- Loading state during logout
- Proper connection to the `useAuth` composable

## Changes Required

### 1. Update `layer/app/components/app/AppHeader.vue`

- Import and use the `logout` function and `isLoading` state from `useAuth()`
- Add logout icon (`i-lucide-log-out` or `i-lucide-logout`)
- Style the button consistently with other header buttons (ghost variant, neutral color)
- Add loading state to disable button during logout
- Position it appropriately in the header layout

## Implementation Details

- Use Lucide icon format: `i-lucide-log-out` (or similar logout icon)
- Match styling of other buttons: `variant="ghost"`, `color="neutral"`
- Use `isLoading` from `useAuth()` to show loading state
- Ensure button is properly integrated in the ClientOnly block with other header actions