# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

cleanstring-ts is a TypeScript library that cleans multiline string literals by removing leading/trailing blank lines and stripping pipe prefixes. It's a port of the Go library at https://github.com/kurrik/cleanstring.

## Architecture

The library has a simple structure:

- `src/index.ts` - Main implementation with `get()` function and helper `parseLine()`
- `tests/index.test.ts` - Comprehensive Jest test suite
- Single function API that processes strings line-by-line

## Common Commands

```bash
# Build the project
npm run build

# Run tests
npm test

# Lint and format code
npm run check
npm run format
npm run lint

# Prepare for publishing
npm run prepublishOnly
```

## Development Guidelines

- Uses Biome for linting and formatting (configured in `biome.json`)
- TypeScript strict mode enabled
- Jest for testing with ts-jest preset
- Comprehensive test coverage including edge cases
- JSDoc documentation for public functions

## Testing

Run single test file:

```bash
npm test -- tests/index.test.ts
```

The test suite covers:

- Empty/null inputs
- Leading/trailing whitespace removal
- Pipe prefix stripping
- Mixed content scenarios
- Edge cases with various whitespace types

## Publishing

The package is configured for npm publishing with:

- TypeScript declarations generated in `dist/`
- Only `dist/` directory included in published package
- Pre-publish hooks run build, tests, and linting
