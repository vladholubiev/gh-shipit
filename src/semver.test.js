const {getNextVersionOptions} = require('./semver');

it('should export getNextVersionOptions function', () => {
  expect(getNextVersionOptions).toBeInstanceOf(Function);
});

it('should return array of 3 options', () => {
  expect(getNextVersionOptions('1.0.0')).toEqual([
    {name: 'patch  1.0.1', value: expect.any(String)},
    {name: 'minor  1.1.0', value: expect.any(String)},
    {name: 'major  2.0.0', value: expect.any(String)}
  ]);
});
