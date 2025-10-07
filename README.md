# Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   npx expo start
   npx expo start --clear (For clear the app in expo)
npm install && npx expo install --fix
npx expo prebuild --platform android --clean

npx expo prebuild --clean
//Cache issue 

# Stop the current process (Ctrl+C)

# Clear Metro bundler cache
npx expo start -c

# OR if that doesn't work:
rm -rf node_modules/.cache
rm -rf .expo
npx expo start -c

## git commands
git init
git remote -v
git remote add origin ssh
git status