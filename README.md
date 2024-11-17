# SimplyMaid

## Version Management

### Commands

```bash
# Major version (breaking changes)
npm run version:major "Description of breaking changes"

# Minor version (new features)
npm run version:minor "Description of new features"

# Patch version (bug fixes)
npm run version:patch "Description of fixes"

# Create pre-release
npm run version:pre
```

### Git Hooks

- **pre-commit**: Runs environment validation, type checking, and linting
- **post-commit**: Creates environment variable backups

### Version Format

- **Major**: Breaking changes (x.0.0)
- **Minor**: New features (0.x.0)
- **Patch**: Bug fixes (0.0.x)
- **Pre-release**: Beta versions (0.0.0-beta.1)

### Changelog

The CHANGELOG.md file is automatically updated with:
- Version number
- Date of change
- Type of change
- Description
- Git commit history