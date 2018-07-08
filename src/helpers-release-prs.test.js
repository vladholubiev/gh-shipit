const {getFirstOpenReleasePR} = require('./helpers-release-prs');
const {valid, invalid} = require('./helpers-release-prs-nodes.fixture');

describe('#getFirstOpenReleasePR', () => {
  it('should export getFirstOpenReleasePR function', () => {
    expect(getFirstOpenReleasePR).toBeInstanceOf(Function);
  });

  it('should skip if no open PRs found', () => {
    const pr = getFirstOpenReleasePR(invalid.noOpenPRs);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: 'No open PRs present'
    });
  });

  it('should skip if PR has no release label', () => {
    const pr = getFirstOpenReleasePR(invalid.noReleaseLabel);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: 'No release label present'
    });
  });

  it('should skip if PR has no approves', () => {
    const pr = getFirstOpenReleasePR(invalid.noApproves);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR has no approves`
    });
  });

  it.skip('should return 1 valid PR w/ title', () => {
    const pr = getFirstOpenReleasePR(valid);

    expect(pr).toEqual({
      isReadyToMerge: true,
      title: 'Release v0.4.0: Some PR title'
    });
  });
});
