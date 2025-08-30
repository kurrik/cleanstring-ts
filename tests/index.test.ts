import cleanstring from '../src/index';

describe('cleanstring', () => {
  test('handles empty string', () => {
    expect(cleanstring('')).toBe('');
  });

  test('handles string with no changes needed', () => {
    const input = 'simple string';
    expect(cleanstring(input)).toBe('simple string');
  });

  test('removes leading whitespace lines', () => {
    const input = `
        
    hello world`;
    expect(cleanstring(input)).toBe('    hello world');
  });

  test('removes trailing whitespace lines', () => {
    const input = `hello world
    
        `;
    expect(cleanstring(input)).toBe('hello world');
  });

  test('removes both leading and trailing whitespace lines', () => {
    const input = `
        
    hello world
    
        `;
    expect(cleanstring(input)).toBe('    hello world');
  });

  test('strips pipe prefixes', () => {
    const input = `
        |hello
        |world`;
    expect(cleanstring(input)).toBe('hello\nworld');
  });

  test('handles mixed whitespace and pipe prefixes', () => {
    const input = `
        |Any literal
        |which needs to be split
        |on multiple lines for readability.
    `;
    expect(cleanstring(input)).toBe(
      'Any literal\nwhich needs to be split\non multiple lines for readability.',
    );
  });

  test('preserves internal whitespace lines', () => {
    const input = `
        |first line
        |
        |third line
    `;
    expect(cleanstring(input)).toBe('first line\n\nthird line');
  });

  test('handles tabs and spaces in whitespace', () => {
    const input = `\t   
\t   |hello
\t   |world
\t   `;
    expect(cleanstring(input)).toBe('hello\nworld');
  });

  test('handles lines without pipe prefix', () => {
    const input = `
        hello
        world
    `;
    expect(cleanstring(input)).toBe('        hello\n        world');
  });

  test('handles mixed lines with and without pipe prefix', () => {
    const input = `
        |hello
        world
        |goodbye
    `;
    expect(cleanstring(input)).toBe('hello\n        world\ngoodbye');
  });

  test('handles pipe prefix with no leading whitespace', () => {
    const input = `
|hello
|world
    `;
    expect(cleanstring(input)).toBe('hello\nworld');
  });

  test('preserves content after pipe prefix', () => {
    const input = `
        |  hello  world  
        |    indented content
    `;
    expect(cleanstring(input)).toBe(' hello  world  \n   indented content');
  });

  test('handles only whitespace input', () => {
    const input = `
        
            
    `;
    expect(cleanstring(input)).toBe('');
  });

  test('handles single line with pipe', () => {
    const input = '    |hello world';
    expect(cleanstring(input)).toBe('hello world');
  });

  test('handles multiple consecutive whitespace lines in middle', () => {
    const input = `
        |first
        
        
        |last
    `;
    expect(cleanstring(input)).toBe('first\n        \n        \nlast');
  });

  describe('custom prefix characters', () => {
    test('handles > prefix for markdown quotes', () => {
      const input = `
          > This is a quote
          > with multiple lines
          > and proper formatting
      `;
      expect(cleanstring(input, { prefix: '>' })).toBe('This is a quote\nwith multiple lines\nand proper formatting');
    });

    test('handles # prefix for shell comments', () => {
      const input = `
          # This is a comment
          # with multiple lines
      `;
      expect(cleanstring(input, { prefix: '#' })).toBe('This is a comment\nwith multiple lines');
    });

    test('handles * prefix for lists', () => {
      const input = `
          * First item
          * Second item
          * Third item
      `;
      expect(cleanstring(input, { prefix: '*' })).toBe('First item\nSecond item\nThird item');
    });

    test('handles - prefix for dashes', () => {
      const input = `
          - Item one
          - Item two
      `;
      expect(cleanstring(input, { prefix: '-' })).toBe('Item one\nItem two');
    });

    test('handles custom prefix with internal whitespace', () => {
      const input = `
          > First line
          >
          > Third line
      `;
      expect(cleanstring(input, { prefix: '>' })).toBe('First line\n\nThird line');
    });

    test('handles mixed lines with custom prefix', () => {
      const input = `
          > prefixed line
          unprefixed line
          > another prefixed line
      `;
      expect(cleanstring(input, { prefix: '>' })).toBe('prefixed line\n          unprefixed line\nanother prefixed line');
    });

    test('backward compatibility - no options defaults to pipe', () => {
      const input = `
          |original behavior
          |should still work
      `;
      expect(cleanstring(input)).toBe('original behavior\nshould still work');
    });

    test('undefined options defaults to pipe', () => {
      const input = `
          |original behavior
          |should still work
      `;
      expect(cleanstring(input, undefined)).toBe('original behavior\nshould still work');
    });

    test('empty options object defaults to pipe', () => {
      const input = `
          |original behavior
          |should still work
      `;
      expect(cleanstring(input, {})).toBe('original behavior\nshould still work');
    });
  });
});
