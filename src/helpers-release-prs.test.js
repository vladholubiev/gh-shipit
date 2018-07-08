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

  it('should skip if PR has do not merge label', () => {
    const pr = getFirstOpenReleasePR(invalid.hasDontMergeLabel);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR has a "don't merge" label`
    });
  });

  it('should skip if PR is not targeted at master branch', () => {
    const pr = getFirstOpenReleasePR(invalid.notToMaster);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR is not targeted to master branch`
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
