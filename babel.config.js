const rajDs = require('./packages/babel-preset');

module.exports = api => {
  const env = api.env();
  // Only apply the preset in storybook because want to ship CSS-less
  // javascript. It is up to the user to include the babel-preset to
  // include the CSS. If we include the CSS it has the potential to
  // break any node based code that imports our components.
  const isStorybook = env === 'storybook';

  api.cache(true);

  return {
    presets: [isStorybook && rajDs].filter(Boolean) 
  };
};
