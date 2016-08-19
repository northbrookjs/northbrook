# Contributing to Northbrook

First of all, thank you so much, we need your help.

## Contributing a fix or feature

1. Fork the repository
2. Switch to a new branch `git checkout -b [branchName]`
3. Produce your fix or feature
4. Use `npm run commit` instead of `git commit` PLEASE!
5. Submit a pull request for review

## Releasing a new version

Run `npm run release:type` where `type` is one of the following:

- patch
- minor
- major

that corresponds to the type of changes following semantic versioning.
