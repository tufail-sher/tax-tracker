export class RegisterController {
  static async createAccount(data: {
    fullName: string;
    email: string;
    password: string;
  }) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          fullName: data.fullName,
          email: data.email,
          taxFilingStatus: '',
          profileImage: '',
          cnic: '',
          phoneNumber: '',
          address: '',
        });
      }, 1500);
    });
  }

  static async verifyEmail(code: string) {
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (code === '123456') {
          resolve({ verified: true });
        } else {
          reject(new Error('Invalid verification code'));
        }
      }, 1500);
    });
  }

  static async resendVerificationCode() {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ sent: true });
      }, 1000);
    });
  }

  static async updateTaxFilingStatus(status: string) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({ taxFilingStatus: status });
      }, 1000);
    });
  }

  static async createProfile(data: {
    profileImage: string;
    phoneNumber: string;
    city: string;
  }) {
    // Simulate API call
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, 1500);
    });
  }
}
