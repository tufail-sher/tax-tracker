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
   * Navigate to login screen
   */
  static navigateToLogin() {
    router.replace('/login' as any);
  }

  /**
   * Navigate to forgot password screen
   */
  static navigateToForgotPassword() {
    router.push('/forgot' as any);
  }

  /**
   * Navigate to verify code screen
   */
  static navigateToVerifyCode() {
    router.push('/forgot/verify' as any);
  }

  /**
   * Navigate to reset password screen
   */
  static navigateToResetPassword() {
    router.push('/forgot/reset' as any);
  }

  /**
   * Navigate to register/create account screen
   */
  static navigateToRegister() {
    router.push('/register' as any);
  }

  /**
   * Navigate to verify email screen
   */
  static navigateToVerifyEmail() {
    router.push('/register/verify-email' as any);
  }

  /**
   * Navigate to welcome screen
   */
  static navigateToWelcome() {
    router.push('/register/welcome' as any);
  }

  /**
   * Navigate to tax filing status screen
   */
  static navigateToTaxFilingStatus() {
    router.push('/register/tax-filing-status' as any);
  }

  /**
   * Navigate to create profile screen
   */
  static navigateToCreateProfile() {
    router.push('/register/create-profile' as any);
  }

  /**
   * Navigate to scanner screen
   */
  static navigateToScanner() {
    router.push('/scanner' as any);
  }

  /**
   * Navigate to invoice details screen
   */
  static navigateToInvoiceDetails() {
    router.push('/invoice-details' as any);
  }

  /**
   * Navigate to personal information screen
   */
  static navigateToPersonalInformation() {
    router.push('/profile/personal-information' as any);
  }

  /**
   * Navigate to reports screen
   */
  static navigateToReports() {
    router.push('/profile/reports' as any);
  }

  /**
   * Navigate to subscription screen (profile module)
   */
  static navigateToSubscription() {
    router.push('/profile/subscription' as any);
  }

  /**
   * Navigate to change password screen (profile module)
   */
  static navigateToPassword() {
    router.push('/profile/password' as any);
  }

  /**
   * Navigate to change password screen (alias)
   */
  static navigateToChangePassword() {
    router.push('/profile/password' as any);
  }

  /**
   * Navigate to notifications screen
   */
  static navigateToNotifications() {
    router.push('/profile/notifications' as any);
  }

  /**
   * Navigate to help & support screen
   */
  static navigateToHelpSupport() {
    router.push('/profile/help-support' as any);
  }

  /**
   * Navigate to a specific tab
   */
  static navigateToTab(tab: 'index' | 'expenses' | 'reports') {
    router.replace(`/(tabs)/${tab}` as any);
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
    router.push(route as any);
  }

  /**
   * Replace current route
   */
  static replace(route: string) {
    router.replace(route as any);
  }
}

/**
 * App Routes - Define all routes in the application
 */
export const AppRoutes = {
  SPLASH: '/splash',
  INTRO: '/intro',
  LOGIN: '/login',
  FORGOT_PASSWORD: '/forgot',
  VERIFY_CODE: '/forgot/verify',
  RESET_PASSWORD: '/forgot/reset',
  REGISTER: '/register',
  VERIFY_EMAIL: '/register/verify-email',
  WELCOME: '/register/welcome',
  TAX_FILING_STATUS: '/register/tax-filing-status',
  CREATE_PROFILE: '/register/create-profile',
  HOME: '/(tabs)',
  HOME_TAB: '/(tabs)/index',
  EXPENSES: '/(tabs)/expenses',
  REPORTS_TAB: '/(tabs)/reports',
  SCANNER: '/scanner',
  INVOICE_DETAILS: '/invoice-details',
  PERSONAL_INFORMATION: '/profile/personal-information',
  PROFILE_REPORTS: '/profile/reports',
  SUBSCRIPTION: '/profile/subscription',
  PASSWORD: '/profile/password',
  NOTIFICATIONS: '/profile/notifications',
  HELP_SUPPORT: '/profile/help-support',
  NOT_FOUND: '/+not-found',
} as const;

export type AppRoute = typeof AppRoutes[keyof typeof AppRoutes];
