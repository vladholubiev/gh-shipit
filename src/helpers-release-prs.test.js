const {getOpenReleasePRForVersion} = require('./helpers-release-prs');
const {valid, invalid} = require('./helpers-release-prs-nodes.fixture');

describe('#getFirstOpenReleasePR', () => {
  it('should export getOpenReleasePRForVersion function', () => {
    expect(getOpenReleasePRForVersion).toBeInstanceOf(Function);
  });

  it('should skip if no open PRs found', () => {
    const pr = getOpenReleasePRForVersion(invalid.noOpenPRs);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: 'No open PRs present'
    });
  });

  it('should skip if PR has no release label', () => {
    const pr = getOpenReleasePRForVersion(invalid.noReleaseLabel);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: 'No release label present'
    });
  });

  it('should skip if PR has no approves', () => {
    const pr = getOpenReleasePRForVersion(invalid.noApproves);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR has no approves`
    });
  });

  it('should skip if PR has do not merge label', () => {
    const pr = getOpenReleasePRForVersion(invalid.hasDontMergeLabel);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR has a "don't merge" label`
    });
  });

  it('should skip if PR is not targeted at master branch', () => {
    const pr = getOpenReleasePRForVersion(invalid.notToMaster);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR is not targeted to master branch`
    });
  });

  it('should skip if PR is not originated from release branch', () => {
    const pr = getOpenReleasePRForVersion(invalid.notFromReleaseBranch);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR is not originated from release/hotfix branch`
    });
  });

  it('should skip if PR is not mergeable', () => {
    const pr = getOpenReleasePRForVersion(invalid.notMergeable);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR has merge conflicts`
    });
  });

  it('should skip if user has no permissions to merge', () => {
    const pr = getOpenReleasePRForVersion(invalid.noAccessToMerge);

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `You don't have permissions to merge this PR. Ask someone why`
    });
  });

  it('should return 1 valid PR w/ title', () => {
    const pr = getOpenReleasePRForVersion(valid);

    expect(pr).toEqual({
      isReadyToMerge: true,
      title: 'Release v0.4.0: Some PR title'
    });
  });
});
