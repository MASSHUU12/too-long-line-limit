# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

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
