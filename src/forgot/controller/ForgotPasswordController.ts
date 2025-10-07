import type {
  SendCodePayload,
  VerifyCodePayload,
  ResetPasswordPayload,
} from '../store/forgotPasswordSlice';
import {
  validateForgotPasswordForm,
  validateVerifyCodeForm,
  validateResetPasswordForm,
} from '../utils/validation';

/**
 * Forgot Password Controller
 * Handles business logic for forgot password operations
 */
export class ForgotPasswordController {
  /**
   * Validate email for sending reset code
   */
  static validateEmailForReset(email: string) {
    return validateForgotPasswordForm(email);
  }

  /**
   * Validate verification code
   */
  static validateCode(code: string) {
    return validateVerifyCodeForm(code);
  }

  /**
   * Validate new password and confirmation
   */
  static validateNewPassword(newPassword: string, confirmPassword: string) {
    return validateResetPasswordForm(newPassword, confirmPassword);
  }

  /**
   * Format email for submission
   */
  static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * Prepare send code payload
   */
  static prepareSendCodePayload(email: string): SendCodePayload {
    return {
      email: this.formatEmail(email),
    };
  }

  /**
   * Prepare verify code payload
   */
  static prepareVerifyCodePayload(email: string, code: string): VerifyCodePayload {
    return {
      email: this.formatEmail(email),
      code: code.trim(),
    };
  }

  /**
   * Prepare reset password payload
   */
  static prepareResetPasswordPayload(
    email: string,
    code: string,
    newPassword: string,
    confirmPassword: string
  ): ResetPasswordPayload {
    return {
      email: this.formatEmail(email),
      code: code.trim(),
      newPassword,
      confirmPassword,
    };
  }
}
