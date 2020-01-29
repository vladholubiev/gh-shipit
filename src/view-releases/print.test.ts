jest.mock('cli-width');

const getCliWidth = require('cli-width');
const stripColor = require('strip-color');
const {print1Release} = require('./print');

describe('print1Release', () => {
  getCliWidth.mockReturnValue('500');

  it('should export print1Release function', () => {
    expect(print1Release).toBeInstanceOf(Function);
  });

  it('should return formatted table for 1 release', () => {
    const release = {
      repo: 'some-example-repo',
      date: new Date('2010-01-01'),
      version: '0.1.1',
      name: 'Initial Release'
    };

    const releaseTable = print1Release(release);

    expect(stripColor(releaseTable))
      .toEqual(`┌───────────────────┬──────────┬─────────┬─────────────────┐
│ repo              │ date     │ version │ name            │
├───────────────────┼──────────┼─────────┼─────────────────┤
│ some-example-repo │ 1/1/2010 │ 0.1.1   │ Initial Release │
└───────────────────┴──────────┴─────────┴─────────────────┘`);
  });
});
