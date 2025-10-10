export const texts = {
  // App Name
  appName: 'Tax Tracker',
  
  // Intro Screen Texts
  intro: {
    slide1: {
      title: "SCAN ANY INVOICE INSTANTLY",
      subtitle: "Just Take A Photo Of Your Bill Our Smart",
      description: "AI Extracts Tax Details Like GST, FED, And WHT In Seconds"
    },
    slide2: {
      title: "TRACK YOUR TAXES EFFORTLESSLY", 
      subtitle: "Auto-Categorize Your Taxes By Type And See How Much You've Paid Each",
      description: "Month Across All Purchases."
    },
    slide3: {
      title: "DISCOVER YOUR TAX REFUND POTENTIAL",
      subtitle: "Our AI Tells You Which Taxes Can Be",
      description: "Claimed Back From FBR And Helps You Stay Refund-Ready All Year Long."
    },
    buttons: {
      getStarted: "Get Started"
    }
  },
  
  // Splash Screen Texts
  splash: {
    tagline: "Manage Your Finances"
  },

  // Login Screen Texts
  login: {
    title: "Login to your account",
    subtitle: "Track and analyze your taxes",
    emailLabel: "Email",
    emailPlaceholder: "email@example.com",
    passwordLabel: "Password",
    passwordPlaceholder: "••••••••••",
    forgotPassword: "Forgot?",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    createAccountButton: "Create account",
    footer: "© 2025 Tax Tracker. All rights reserved."
  },

  // Forgot Password Screens
  forgotPassword: {
    // Forgot Password Screen
    forgotTitle: "Forgot Password",
    forgotDescription: "Enter your email address and we'll send you a code to reset your password.",
    emailLabel: "Email",
    emailPlaceholder: "email@example.com",
    sendCodeButton: "Send Reset Code",
    backToLogin: "Back to Login",
    
    // Verify Code Screen
    verifyTitle: "Verify Code",
    verifyDescription: "Reset code sent! We've sent a verification code to",
    verificationCodeLabel: "Verification Code",
    verificationCodePlaceholder: "Enter 6-digit code",
    didntReceive: "Didn't receive the code?",
    resend: "Resend",
    verifyButton: "Verify Code",
    
    // Reset Password Screen
    resetTitle: "Reset Password",
    resetDescription: "Create a new password for your account.",
    newPasswordLabel: "New Password",
    newPasswordPlaceholder: "••••••••••",
    confirmPasswordLabel: "Confirm New Password",
    confirmPasswordPlaceholder: "••••••••••",
    resetButton: "Reset Password",
    
    // Success messages
    successTitle: "Password Reset Successfully",
    successDescription: "Your password has been reset successfully. You can now login with your new password.",
    
    footer: "© 2025 Tax Tracker. All rights reserved."
  },

  // Register Screens
  register: {
    // Create Account Screen
    createAccount: {
      title: "Create your account",
      subtitle: "Track and analyze your taxes",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "John Doe",
      emailLabel: "Email",
      emailPlaceholder: "email@example.com",
      passwordLabel: "Password",
      passwordPlaceholder: "Create a strong password",
      passwordHint: "Password must be at least 8 characters",
      createAccountButton: "Continue",
      haveAccount: "Already have an account?",
      loginButton: "Login Now",
      footer: "© 2025 Tax Tracker. All rights reserved."
    },

    // Verify Email Screen
    verifyEmail: {
      title: "Verify Your Email",
      description: "We've sent a verification code to",
      verificationCodeLabel: "Verification Code",
      verificationCodePlaceholder: "Enter 6-digit code",
      didntReceive: "Didn't receive the code?",
      resend: "Resend",
      createAccountButton: "Create Account",
      termsText: "By continuing, you agree to our",
      termsLink: "Terms & Conditions",
      and: "and",
      privacyLink: "Privacy Policy"
    },

    // Welcome Screen
    welcome: {
      title: "Welcome!",
      subtitle: "Let's get to know you better",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "John Doe",
      cnicLabel: "CNIC",
      cnicPlaceholder: "12345-1234567-1",
      ntnLabel: "NTN",
      ntnPlaceholder: "1234567-8",
      nextButton: "Next"
    },

    // Tax Filing Status Screen
    taxFilingStatus: {
      title: "Tax Filing Status",
      subtitle: "Please select your filing status",
      options: {
        salaried: "Salaried Individual",
        business: "Business Owner",
        both: "Both",
        nonFiler: "Non-Filer"
      },
      continueButton: "Continue"
    },

    // Create Profile Screen
    createProfile: {
      title: "Create Your Profile",
      subtitle: "Add a profile picture and complete your account setup.",
      uploadPicture: "Upload Profile Picture",
      optionalText: "Optional but recommended",
      phoneNumberLabel: "Phone Number",
      phoneNumberPlaceholder: "+92 300 1234567",
      cityLabel: "City",
      cityPlaceholder: "Select your city",
      getStartedButton: "Get Started",
      selectPictureTitle: "Select Profile Picture",
      selectPictureSubtitle: "Choose an option",
      cameraOption: "Camera",
      galleryOption: "Gallery",
      cancelOption: "Cancel",
      selectCityTitle: "Select City"
    }
  },

  // Home Screen
  home: {
    greeting: "Hello",
    status: "Awaiting Input",
    scanTitle: "Take a photo of your invoice to extract tax information",
    scanButton: "Start Scanning",
    tabs: {
      home: "Home",
      invoices: "Invoices",
      add: "Add",
      categories: "Categories",
      profile: "Profile"
    }
  },

  // Camera Scanner Screen
  scanner: {
    permissionRequest: "Requesting camera permission...",
    permissionDenied: "Camera access is required to scan receipts and invoices",
    goBackButton: "Go Back",
    instruction: "Position your receipt or invoice within the frame",
    captureButton: "Tap to capture receipt or invoice",
    capturing: "Capturing...",
    successTitle: "Photo Captured!",
    successMessage: "Receipt photo has been captured successfully.",
    errorTitle: "Error",
    errorMessage: "Failed to capture photo. Please try again.",
    retryButton: "Retry",
    doneButton: "Done"
  },

  // Invoice Details Screen
  invoiceDetails: {
    title: "Invoice Details",
    totalAmount: "Total Amount",
    totalTax: "Total Tax",
    taxBreakdown: "Tax Breakdown",
    totalRefundable: "TOTAL REFUNDABLE",
    processing: "Processing invoice...",
    extractionError: "Failed to extract invoice details. Please try again."
  }
};
