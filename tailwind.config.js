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
