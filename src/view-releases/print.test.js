const {print1Release} = require('./print');

describe('print1Release', () => {
  beforeAll(() => {
    process.env.CLI_WIDTH = '500';
  });

  afterAll(() => {
    delete process.env.CLI_WIDTH;
  });

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

    expect(releaseTable).toEqual(`┌───────────────────┬──────────┬─────────┬─────────────────┐
│ repo              │ date     │ version │ name            │
├───────────────────┼──────────┼─────────┼─────────────────┤
│ some-example-repo │ 2010-1-1 │ 0.1.1   │ Initial Release │
└───────────────────┴──────────┴─────────┴─────────────────┘`);
  });
});
