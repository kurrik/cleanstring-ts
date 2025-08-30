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
    > This is a markdown quote
    > with multiple lines
`,
  { prefix: '>' },
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
2. **Stripping pipe prefixes** - Lines with whitespace followed by `|` have the prefix removed
3. **Removing trailing blank lines** - Any whitespace-only lines at the end are stripped
4. **Preserving internal structure** - Whitespace lines between content are maintained

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
// Result: "This is a quote\nfrom someone famous"

// Shell comments with # prefix
const script = cleanstring(
  `
    # This is a shell script
    # with multiple comment lines
`,
  { prefix: '#' },
);
// Result: "This is a shell script\nwith multiple comment lines"

// List items with * prefix
const list = cleanstring(
  `
    * First item
    * Second item
    * Third item
`,
  { prefix: '*' },
);
// Result: "First item\nSecond item\nThird item"
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

### Publishing

```bash
# Update version and publish
npm version patch  # 1.0.0 -> 1.0.1
npm version minor  # 1.0.1 -> 1.1.0
npm version major  # 1.1.0 -> 2.0.0

npm publish
```

## License

MIT License - see [LICENSE](LICENSE) file for details.
