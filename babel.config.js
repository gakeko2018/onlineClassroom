module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'], 
    //['babel-preset-react-native'], ['babel-preset-react-native-stage-0'],
 
  };
};
