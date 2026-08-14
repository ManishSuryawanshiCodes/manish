import { lazy } from 'react';

/**
 * Enhanced React.lazy that catches chunk loading / 404 errors during deployment updates
 * or temporary network failures, retrying automatically or reloading the page cleanly.
 */
export const lazyWithRetry = (componentImport) =>
  lazy(async () => {
    const pageHasAlreadyBeenForceRefreshed = JSON.parse(
      window.sessionStorage.getItem('page-has-been-force-refreshed') || 'false'
    );

    try {
      return await componentImport();
    } catch (error) {
      console.warn('Lazy chunk load failed (potential 404 or network drop):', error);

      if (!pageHasAlreadyBeenForceRefreshed) {
        // Sets a flag in sessionStorage so we don't end up in an infinite reload loop
        window.sessionStorage.setItem('page-has-been-force-refreshed', 'true');
        window.location.reload();
        return { default: () => null };
      }

      // If already reloaded once and still failed, throw error for ErrorBoundary to catch
      throw error;
    }
  });
