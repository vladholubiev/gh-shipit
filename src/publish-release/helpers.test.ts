const {valid, invalid} = require('./release-prs.fixture');
const {getOpenReleasePRForVersion} = require('./helpers');

describe('#getFirstOpenReleasePR', () => {
  it('should export getOpenReleasePRForVersion function', () => {
    expect(getOpenReleasePRForVersion).toBeInstanceOf(Function);
  });

  it('should skip if no open PRs found at all', () => {
    const pr = getOpenReleasePRForVersion(invalid.noOpenPRs, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: 'No open PRs present in this repo'
    });
  });

  it('should skip if no open PRs found for this version', () => {
    const pr = getOpenReleasePRForVersion(invalid.noPRForThisVersion, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: 'No PRs found for version v0.4.0. Make sure PR title is correct'
    });
  });

  it('should skip if PR has no release label', () => {
    const pr = getOpenReleasePRForVersion(invalid.noReleaseLabel, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: 'No release label present'
    });
  });

  it('should skip if PR has no approves', () => {
    const pr = getOpenReleasePRForVersion(invalid.noApproves, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR has no approves`
    });
  });

  it('should skip if PR has do not merge label', () => {
    const pr = getOpenReleasePRForVersion(invalid.hasDontMergeLabel, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR has a "don't merge" label`
    });
  });

  it('should skip if PR is not targeted at master branch', () => {
    const pr = getOpenReleasePRForVersion(invalid.notToMaster, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR is not targeted to master branch`
    });
  });

  it('should skip if PR is not originated from release branch', () => {
    const pr = getOpenReleasePRForVersion(invalid.notFromReleaseBranch, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR is not originated from release/hotfix branch`
    });
  });

  it('should skip if PR is not mergeable', () => {
    const pr = getOpenReleasePRForVersion(invalid.notMergeable, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `Release PR has merge conflicts`
    });
  });

  it('should skip if user has no permissions to merge', () => {
    const pr = getOpenReleasePRForVersion(invalid.noAccessToMerge, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: false,
      reason: `You don't have permissions to merge this PR. Ask someone why`
    });
  });

  it('should return 1 valid PR w/ title & number', () => {
    const pr = getOpenReleasePRForVersion(valid, 'v0.4.0');

    expect(pr).toEqual({
      isReadyToMerge: true,
      prTitle: 'Release v0.4.0: Some PR title',
      prNumber: 1
    });
  });
});
