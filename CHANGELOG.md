# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## 1.4.0 - 2023-02-10

### Added

- New setting `too-long-line-limit.enabledIn`, which specifies which languages should be checked for line length.

## 1.3.1 - 2023-02-07

### Changed

- Added 3 new file types that are ignored by extension by default (compose, blade, svelte)
- Updated dependencies

### Fixed

- The way of reporting the location of the problem has been improved. Previously the first letter of the line where the problem was marked, from now on the last letter will be marked, which makes more sense

## 1.3.0 - 2023-01-05

### Added

- Settings to change how exceeding the limit should be marked

### Changed

- Updated README to reflect the new changes
- The way the extension retrieves limit information has been improved

## 1.2.0 - 2023-01-04

### Added

- Setting to disable line length checking in specified languages

### Changed

- Removed default settings for markdown, jsonc and json from package.json
- Updated README to reflect the new changes

### Fixed

- The configuration is no longer overwritten when changing the document if the settings have not been changed

## 1.1.0 - 2023-01-03

### Added

- Display rulers
- Rulers are tied to soft and hard line length limit
- Setting to toggle rulers

### Changed

- Improved way of downloading settings from VS Code

### Fixed

- Rulers did not disappear after deactivating the extension

## 1.0.0 - 2023-01-03

### Added

- Initial release
- Basic line length validator
- License
- README
