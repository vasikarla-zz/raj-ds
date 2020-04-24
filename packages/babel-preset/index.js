const importPlugin = require('@design-systems/babel-plugin-include-styles');

module.exports = function(api) {
  const env = api.env();
  const isTest = env === 'test';

  return {
    // The plugin should not be loaded in test environments. If it is it could
    // mess with imports inside tests.
    plugins: [!isTest && [importPlugin, { scope: 'raj-ds' }]].filter(Boolean)
  };
};
