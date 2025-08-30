/**
 * Configuration options for cleanstring function.
 */
export interface CleanstringOptions {
  /**
   * The prefix character to strip from lines. Defaults to '|'.
   */
  prefix?: string;
}

/**
 * Processes a multiline string by removing leading and trailing blank lines,
 * and stripping prefix characters from each line.
 *
 * @param input - The input string to clean
 * @param options - Configuration options
 * @returns The cleaned string
 *
 * @example
 * ```typescript
 * import cleanstring from 'cleanstring-ts';
 *
 * const result = cleanstring(`
 *     |Any literal
 *     |which needs to be split
 *     |on multiple lines for readability.
 * `);
 * // Result: "Any literal\nwhich needs to be split\non multiple lines for readability."
 *
 * // Custom prefix example
 * const markdown = cleanstring(`
 *     > This is a quote
 *     > with multiple lines
 * `, { prefix: '>' });
 * // Result: "This is a quote\nwith multiple lines"
 * ```
 */
function cleanstring(input: string, options?: CleanstringOptions): string {
  if (!input) {
    return '';
  }

  const prefix = options?.prefix ?? '|';
  const lines = input.split('\n');
  const output: string[] = [];
  let seenNonWhitespace = false;
  const whitespaceBuffer: string[] = [];

  for (const line of lines) {
    const { isWhitespace, prefixLength } = parseLine(line, prefix);

    if (!seenNonWhitespace) {
      if (!isWhitespace) {
        seenNonWhitespace = true;
        output.push(line.slice(prefixLength));
      }
      continue;
    }

    if (isWhitespace) {
      whitespaceBuffer.push(line);
    } else {
      // Flush any buffered whitespace lines
      output.push(...whitespaceBuffer);
      whitespaceBuffer.length = 0;
      output.push(line.slice(prefixLength));
    }
  }

  return output.join('\n');
}

/**
 * Analyzes a line to determine if it's whitespace-only and the length of any prefix.
 * @param line - The line to analyze
 * @param prefix - The prefix character to look for
 */
function parseLine(line: string, prefix: string): { isWhitespace: boolean; prefixLength: number } {
  let prefixLength = 0;

  // Skip leading whitespace
  while (prefixLength < line.length && /\s/.test(line[prefixLength])) {
    prefixLength++;
  }

  // Check if line is all whitespace
  if (prefixLength === line.length) {
    return { isWhitespace: true, prefixLength: 0 };
  }

  // Check for prefix after whitespace
  if (line.substring(prefixLength, prefixLength + prefix.length) === prefix) {
    prefixLength += prefix.length;
  } else {
    // No prefix found, don't strip any whitespace
    prefixLength = 0;
  }

  return { isWhitespace: false, prefixLength };
}

// Default export
export default cleanstring;
