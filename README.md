# cleanstring-ts

[![npm version](https://badge.fury.io/js/cleanstring-ts.svg)](https://www.npmjs.com/package/cleanstring-ts)

Clean multiline TypeScript string literals by removing leading/trailing blank lines and stripping pipe prefixes.

## Installation

```bash
npm install cleanstring-ts
```

## Usage

```typescript
import cleanstring from 'cleanstring-ts';

const result = cleanstring(`
    |Any literal
    |which needs to be split
    |on multiple lines for readability.
`);
// Result: "Any literal\nwhich needs to be split\non multiple lines for readability."

// Custom prefix example
const markdown = cleanstring(
  `
    >This is a markdown quote
    >with multiple lines
`,
  { prefix: '>' },
);
// Result: "This is a markdown quote\nwith multiple lines"

// Custom prefix with trailing space example (note the prefix contains a space)
const markdown = cleanstring(
  `
    > This is a markdown quote
    > with multiple lines
`,
  { prefix: '> ' },
);
// Result: "This is a markdown quote\nwith multiple lines"
```

### CommonJS

```javascript
const cleanstring = require('cleanstring-ts');
```

## How it works

The `cleanstring()` function processes multiline strings by:

1. **Removing leading blank lines** - Any whitespace-only lines at the start are stripped
2. **Stripping prefixes** - Lines with whitespace followed by a prefix character (default `|`) have the prefix removed, **preserving all content after the prefix**
3. **Removing trailing blank lines** - Any whitespace-only lines at the end are stripped
4. **Preserving internal structure** - Whitespace lines between content are maintained

**Important**: Content after the prefix is preserved exactly as-is. If you want to strip a space after the prefix, include the space as part of the prefix (e.g., `{ prefix: '> ' }` instead of `{ prefix: '>' }`).

## Examples

### Basic usage with pipe prefix (default)

```typescript
import cleanstring from 'cleanstring-ts';

const sql = cleanstring(`
    |SELECT *
    |FROM users
    |WHERE active = true
`);
// Result: "SELECT *\nFROM users\nWHERE active = true"
```

### Custom prefix characters

```typescript
// Markdown quotes with > prefix
const quote = cleanstring(
  `
    > This is a quote
    > from someone famous
`,
  { prefix: '>' },
);
// Result: " This is a quote\n from someone famous"

// Shell comments with # prefix
const script = cleanstring(
  `
    # This is a shell script
    # with multiple comment lines
`,
  { prefix: '#' },
);
// Result: " This is a shell script\n with multiple comment lines"

// List items with * prefix
const list = cleanstring(
  `
    * First item
    * Second item
    * Third item
`,
  { prefix: '*' },
);
// Result: " First item\n Second item\n Third item"
```

### Multi-character prefixes for space stripping

If you want to strip a space after the prefix (reproducing the old behavior), include the space as part of the prefix:

```typescript
// Using "> " (greater than + space) strips the space after >
const cleanQuote = cleanstring(
  `
    > This is a quote
    > with multiple lines
`,
  { prefix: '> ' },
);
// Result: "This is a quote\nwith multiple lines"

// Using "| " (pipe + space) strips the space after |
const cleanCode = cleanstring(
  `
    | function example() {
    |   return 'hello world';
    | }
`,
  { prefix: '| ' },
);
// Result: "function example() {\n  return 'hello world';\n}"
```

### Mixed content with prefix

```typescript
const script = cleanstring(`
    |#!/bin/bash
    |
    |echo "Hello World"
    |exit 0
`);
// Result: "#!/bin/bash\n\necho \"Hello World\"\nexit 0"
```

### Without prefixes

```typescript
const text = cleanstring(`

    This is a multiline string
    with some content

`);
// Result: "    This is a multiline string\n    with some content"
```

## Development

### Common commands

```bash
# Run tests
npm test

# Run linting and formatting checks
npm run ci

# Build the project
npm run build

# Format code
npm run format
```

### Releases

Releases are automated via GitHub Actions. Only the repository owner can create releases.

#### Prerequisites (one-time setup)

1. **Create Fine-Grained Personal Access Token**:
   - Go to GitHub.com → Settings → Developer settings → Personal access tokens → Fine-grained tokens
   - Click "Generate new token"
   - Set Resource owner to your account
   - Set Repository access to "Selected repositories" and choose this repo
   - Set expiration (recommend 1 year)
   - **Required permissions**:
     - Contents: Read and write
     - Metadata: Read
     - Pull requests: Read
     - Actions: Read

2. **Add Repository Secrets**:
   - Go to repository → Settings → Secrets and variables → Actions
   - Add `ADMIN_TOKEN` with your personal access token
   - Add `NPM_TOKEN` with your npm automation token

#### Creating a Release

1. Go to your repository on GitHub
2. Navigate to **Actions** tab
3. Click on **"Release"** workflow in the left sidebar
4. Click **"Run workflow"** button
5. Select the version bump type from the dropdown:
   - **patch**: 1.0.0 → 1.0.1 (bug fixes)
   - **minor**: 1.0.0 → 1.1.0 (new features)
   - **major**: 1.0.0 → 2.0.0 (breaking changes)
6. Click **"Run workflow"** to start the release process

The automated release process:

1. **Runs all CI checks** (lint, test, build)
2. **Updates package.json version**
3. **Commits and pushes to main** (bypasses branch protection)
4. **Creates and pushes git tag**
5. **Creates GitHub release**
6. **Automatically publishes to npm** (triggered by release creation)

## License

MIT License - see [LICENSE](LICENSE) file for details.
