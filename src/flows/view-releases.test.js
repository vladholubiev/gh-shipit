const {viewReleases} = require('./view-releases');

it('should export viewReleases function', () => {
  expect(viewReleases).toBeInstanceOf(Function);
});
