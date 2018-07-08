const {publishRelease} = require('./publish-release');

it('should export publishRelease function', () => {
  expect(publishRelease).toBeInstanceOf(Function);
});
