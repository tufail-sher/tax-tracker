/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,ts,tsx}', 
    './app/**/*.{js,ts,tsx}',
    './src/**/*.{js,ts,tsx}',
    './components/**/*.{js,ts,tsx}'
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#2249E2',
        secondary: '#1E1E1E',
        accent: '#3B82F6',
        background: '#FFFFFF',
        surface: '#F8F9FA',
        error: '#EF4444',
        warning: '#F59E0B',
        success: '#10B981',
        info: '#3B82F6',
      },
      fontFamily: {
        'inter-thin': ['Inter-Thin'],
        'inter-light': ['Inter-Light'],
        'inter': ['Inter-Regular'],
        'inter-medium': ['Inter-Medium'],
        'inter-semibold': ['Inter-SemiBold'],
        'inter-bold': ['Inter-Bold'],
        'inter-extrabold': ['Inter-ExtraBold'],
        'inter-black': ['Inter-Black'],
      },
    },
  },
  plugins: [],
};
