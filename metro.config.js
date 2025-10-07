const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');
const path = require('path');

const config = getDefaultConfig(__dirname);

// Configure SVG support
config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
config.resolver.sourceExts = [...config.resolver.sourceExts, 'svg'];

// Configure path mapping for @ alias
config.resolver.alias = {
  '@': path.resolve(__dirname, 'src'),
  '@/src': path.resolve(__dirname, 'src'),
};

module.exports = withNativeWind(config, { input: './global.css' });
