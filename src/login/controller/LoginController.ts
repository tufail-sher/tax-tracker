import { LoginCredentials } from '../store/loginSlice';
import { validateLoginForm } from '../utils/validation';

/**
 * Login Controller
 * Handles business logic for login operations
 */
export class LoginController {
  /**
   * Validate and prepare login credentials
   */
  static validateCredentials(email: string, password: string) {
    return validateLoginForm(email, password);
  }

  /**
   * Process login request
   */
  static async processLogin(
    credentials: LoginCredentials,
    loginFn: (creds: LoginCredentials) => Promise<any>
  ) {
    try {
      const result = await loginFn(credentials);
      return { success: true, data: result };
    } catch (error: any) {
      return { success: false, error: error.message || 'Login failed' };
    }
  }

  /**
   * Format email for submission
   */
  static formatEmail(email: string): string {
    return email.trim().toLowerCase();
  }

  /**
   * Prepare login payload
   */
  static prepareLoginPayload(email: string, password: string): LoginCredentials {
    return {
      email: this.formatEmail(email),
      password: password,
    };
  }
}
