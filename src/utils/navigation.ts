import { router } from 'expo-router';

/**
 * Navigation utility functions for the Tax Tracker app
 */
export class AppNavigator {
  /**
   * Navigate to the main tabs (home screen)
   */
  static navigateToHome() {
    router.replace('/(tabs)');
  }

  /**
   * Navigate to splash screen
   */
  static navigateToSplash() {
    router.replace('/splash');
  }

  /**
   * Navigate to intro screen
   */
  static navigateToIntro() {
    router.replace('/intro');
  }

  /**
   * Navigate to a specific tab
   */
  static navigateToTab(tab: 'index' | 'expenses' | 'reports') {
    router.replace(`/(tabs)/${tab}`);
  }

  /**
   * Navigate back
   */
  static goBack() {
    router.back();
  }

  /**
   * Navigate to any route
   */
  static navigate(route: string) {
    router.push(route);
  }

  /**
   * Replace current route
   */
  static replace(route: string) {
    router.replace(route);
  }
}

/**
 * App Routes - Define all routes in the application
 */
export const AppRoutes = {
  SPLASH: '/splash',
  INTRO: '/intro',
  HOME: '/(tabs)',
  HOME_TAB: '/(tabs)/index',
  EXPENSES: '/(tabs)/expenses',
  REPORTS: '/(tabs)/reports',
  NOT_FOUND: '/+not-found',
} as const;

export type AppRoute = typeof AppRoutes[keyof typeof AppRoutes];
