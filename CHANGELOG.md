# Change Log
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [unreleased]
### Added
### Changed
### Fixed
### Removed
### BREAKING CHANGES

## [1.2.0] - 2019-10-19
### Changed
- Upgrade dependencies
- Rename server side data methods. Maintain old ones due to retrocompatibility.
- Use mercury ids for identification during server-side-data.

### Fixed
- Fix demo installation

## [1.1.0] - 2019-08-21
### Added
- Add server side data behavior tests and documentation.

## [1.1.0-beta.2] - 2019-08-19
### Added
- Add method for registering sources that should be loaded during server side data rendering.

### Fixed
- Fix server side data connect. Load data in client when no server data is available

## [1.1.0-beta.1] - 2019-08-13
### Added
- Add server side data feature

### Fixed
- Fix Sonar code smells

## [1.0.1] - 2019-06-04
### Fixed
- Upgrade dependencies to fix potential security vulnerabilities.

## [1.0.0] - 2019-06-04
### BREAKING CHANGES
- Forked from xByOrange reactive-data-source v1.7.0 library. (Only react connect plugin is distributed in this library from now)
