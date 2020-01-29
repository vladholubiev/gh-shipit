const {getNextVersionOptions} = require('./semver');

it('should return array of 3 options', () => {
  expect(getNextVersionOptions('1.0.0')).toEqual([
    {name: 'patch  v1.0.1', value: expect.any(String)},
    {name: 'minor  v1.1.0', value: expect.any(String)},
    {name: 'major  v2.0.0', value: expect.any(String)}
  ]);
});

it('should clean v version prefix', () => {
  expect(getNextVersionOptions('v1.0.0')).toEqual(
    expect.arrayContaining([{name: 'patch  v1.0.1', value: expect.any(String)}])
  );
});
