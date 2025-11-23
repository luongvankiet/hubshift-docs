export default defineNuxtPlugin(() => {
  // Hide content initially to prevent FOUC
  if (import.meta.client) {
    document.documentElement.style.visibility = 'hidden'

    const checkStylesLoaded = () => {
      const stylesheets = Array.from(document.styleSheets)
      const allLoaded = stylesheets.every((sheet) => {
        try {
          return sheet.cssRules || sheet.rules
        }
        catch {
          // Cross-origin stylesheet, assume loaded
          return true
        }
      })

      if (allLoaded) {
        document.documentElement.style.visibility = 'visible'
      }
      else {
        // Fallback: show after a short delay if stylesheets aren't detected
        setTimeout(() => {
          document.documentElement.style.visibility = 'visible'
        }, 100)
      }
    }

    // Check immediately and also on load
    if (document.readyState === 'complete') {
      checkStylesLoaded()
    }
    else {
      window.addEventListener('load', checkStylesLoaded)
      // Also check after DOM is ready
      if (document.readyState === 'interactive' || document.readyState === 'complete') {
        setTimeout(checkStylesLoaded, 0)
      }
      else {
        document.addEventListener('DOMContentLoaded', checkStylesLoaded)
      }
    }
  }
})

