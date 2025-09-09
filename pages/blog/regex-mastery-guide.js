import React from 'react';
import {
  Box,
  Typography,
  Container,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function RegexMasteryGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Regular Expressions Mastery: From Beginner to Expert",
    "description": "Master regular expressions with practical examples. Learn regex patterns, performance optimization, and advanced techniques for text processing.",
    "image": "https://yourdevtools.com/logo512.png",
    "author": {
      "@type": "Organization",
      "name": "Developer Tools Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Developer Tools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://yourdevtools.com/logo512.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://yourdevtools.com/blog/regex-mastery-guide"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Regular Expressions Mastery: From Beginner to Expert"
        description="Complete guide to mastering regular expressions. Learn regex patterns, performance optimization, advanced techniques, and practical examples for text processing and validation."
        canonical="/blog/regex-mastery-guide"
        schema={articleSchema}
        keywords={[
          'regular expressions',
          'regex patterns',
          'regex tutorial',
          'text processing',
          'regex optimization',
          'regex examples',
          'pattern matching',
          'string validation'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Regular Expressions Mastery: From Beginner to Expert
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Chip label="Programming" color="primary" sx={{ mr: 1 }} />
          <Chip label="15 min read" variant="outlined" />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          Master regular expressions with practical examples. Learn regex patterns, performance optimization, and advanced techniques for text processing.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          What Are Regular Expressions?
        </Typography>
        <Typography paragraph>
          Regular expressions (regex) are powerful patterns used for searching, matching, and manipulating text. 
          They provide a concise and flexible way to identify strings of text that match specific criteria. 
          Regex is supported in virtually every programming language and text editor, making it an essential 
          skill for developers, data analysts, and anyone working with text processing.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Basic Regex Building Blocks
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Literal Characters
        </Typography>
        <Typography paragraph>
          The simplest regex patterns match literal characters:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`hello    - matches "hello" exactly
cat      - matches "cat" in "category" or "concatenate"
123      - matches the sequence "123"`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Metacharacters
        </Typography>
        <Typography paragraph>
          Special characters with specific meanings in regex:
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Character</TableCell>
                <TableCell>Meaning</TableCell>
                <TableCell>Example</TableCell>
                <TableCell>Matches</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>.</TableCell>
                <TableCell>Any character</TableCell>
                <TableCell>c.t</TableCell>
                <TableCell>cat, cot, c@t</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>*</TableCell>
                <TableCell>Zero or more</TableCell>
                <TableCell>ca*t</TableCell>
                <TableCell>ct, cat, caat</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>+</TableCell>
                <TableCell>One or more</TableCell>
                <TableCell>ca+t</TableCell>
                <TableCell>cat, caat (not ct)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>?</TableCell>
                <TableCell>Zero or one</TableCell>
                <TableCell>ca?t</TableCell>
                <TableCell>ct, cat (not caat)</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>^</TableCell>
                <TableCell>Start of line</TableCell>
                <TableCell>^cat</TableCell>
                <TableCell>cat at beginning</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>$</TableCell>
                <TableCell>End of line</TableCell>
                <TableCell>cat$</TableCell>
                <TableCell>cat at end</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Character Classes
        </Typography>
        <Typography paragraph>
          Character classes match any character from a set:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`[abc]     - matches 'a', 'b', or 'c'
[a-z]     - matches any lowercase letter
[A-Z]     - matches any uppercase letter
[0-9]     - matches any digit
[a-zA-Z]  - matches any letter
[^abc]    - matches any character except 'a', 'b', or 'c'`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Common Predefined Character Classes
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Shorthand</TableCell>
                <TableCell>Equivalent</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Example</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>\d</TableCell>
                <TableCell>[0-9]</TableCell>
                <TableCell>Any digit</TableCell>
                <TableCell>\d{3} matches "123"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>\w</TableCell>
                <TableCell>[a-zA-Z0-9_]</TableCell>
                <TableCell>Word character</TableCell>
                <TableCell>\w+ matches "hello_123"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>\s</TableCell>
                <TableCell>[ \t\n\r\f]</TableCell>
                <TableCell>Whitespace</TableCell>
                <TableCell>\s+ matches spaces/tabs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>\D</TableCell>
                <TableCell>[^0-9]</TableCell>
                <TableCell>Non-digit</TableCell>
                <TableCell>\D+ matches "abc"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>\W</TableCell>
                <TableCell>[^a-zA-Z0-9_]</TableCell>
                <TableCell>Non-word</TableCell>
                <TableCell>\W matches "@", "#"</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>\S</TableCell>
                <TableCell>[^ \t\n\r\f]</TableCell>
                <TableCell>Non-whitespace</TableCell>
                <TableCell>\S+ matches "hello"</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Quantifiers: Controlling Repetition
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Basic Quantifiers
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`*        - 0 or more (greedy)
+        - 1 or more (greedy)
?        - 0 or 1 (greedy)
{n}      - exactly n times
{n,}     - n or more times
{n,m}    - between n and m times`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Greedy vs. Lazy Quantifiers
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="h6">Understanding Greediness</Typography>
          <Typography>Greedy quantifiers match as much as possible, while lazy quantifiers match as little as possible.</Typography>
        </Alert>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`Text: <div>Hello</div><div>World</div>

Greedy:  <.*>     matches: <div>Hello</div><div>World</div>
Lazy:    <.*?>    matches: <div> and </div> separately

*?       - 0 or more (lazy)
+?       - 1 or more (lazy)
??       - 0 or 1 (lazy)
{n,m}?   - between n and m times (lazy)`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Practical Regex Examples
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Email Validation
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// Basic email pattern
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$

// More comprehensive email validation
^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Phone Number Validation
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// US phone numbers (multiple formats)
^(\+1\s?)?(\(?[0-9]{3}\)?[\s.-]?[0-9]{3}[\s.-]?[0-9]{4})$

Matches:
+1 555-123-4567
(555) 123-4567
555.123.4567
555 123 4567
5551234567`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          URL Validation
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// Basic URL validation
^https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$

// More permissive URL pattern
^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Password Strength Validation
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// Strong password requirements:
// - At least 8 characters
// - At least one uppercase letter
// - At least one lowercase letter  
// - At least one digit
// - At least one special character

^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Advanced Regex Techniques
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Capture Groups and Backreferences
        </Typography>
        <Typography paragraph>
          Capture groups allow you to extract parts of matches and reference them later:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// Capture groups with parentheses
(\d{4})-(\d{2})-(\d{2})    // Captures year, month, day

// Named capture groups
(?<year>\d{4})-(?<month>\d{2})-(?<day>\d{2})

// Backreferences
(\w+)\s+\1    // Matches repeated words like "the the"

// Non-capturing groups
(?:https?):\/\/    // Groups without capturing`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Lookahead and Lookbehind Assertions
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// Positive lookahead (?=...)
\d+(?=px)         // Matches digits followed by "px"

// Negative lookahead (?!...)
\d+(?!px)         // Matches digits NOT followed by "px"

// Positive lookbehind (?<=...)
(?<=\$)\d+        // Matches digits preceded by "$"

// Negative lookbehind (?<!...)
(?<!\$)\d+        // Matches digits NOT preceded by "$"`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Regex Performance Optimization
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Avoid Catastrophic Backtracking
        </Typography>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="h6">Performance Warning</Typography>
          <Typography>Poorly written regex can cause exponential time complexity, leading to regex denial of service (ReDoS) attacks.</Typography>
        </Alert>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// BAD: Can cause catastrophic backtracking
^(a+)+$
^(a|a)*$
^(a*)+$

// GOOD: Use possessive quantifiers or atomic groups
^a++$
^a*+$
^(?>a*)+$

// GOOD: Be more specific
^a{1,10}$`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Optimization Tips
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Use Anchors Wisely" 
              secondary="Start patterns with ^ or end with $ when possible to reduce search space."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Make Quantifiers Specific" 
              secondary="Use {n,m} instead of * or + when you know the expected range."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Order Alternatives by Frequency" 
              secondary="In (option1|option2|option3), put the most likely match first."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Use Non-Capturing Groups" 
              secondary="Use (?:...) when you don't need to capture the group."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Common Regex Pitfalls
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          1. Forgetting to Escape Special Characters
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// To match literal special characters, escape them:
\.        // matches literal dot
\*        // matches literal asterisk
\[        // matches literal opening bracket
\\        // matches literal backslash`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          2. Greedy vs. Lazy Confusion
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// Extracting content between quotes
Text: "Hello" and "World"

Wrong: ".*"     // Matches: "Hello" and "World"
Right: ".*?"    // Matches: "Hello" and "World" separately`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          3. Case Sensitivity Issues
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// Use case-insensitive flag or character classes
/hello/i           // Case-insensitive flag
[Hh][Ee][Ll][Ll][Oo]  // Manual case handling`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Regex Testing and Debugging
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Testing Strategies
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Test Edge Cases" 
              secondary="Empty strings, very long strings, special characters, unicode characters."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Use Multiple Test Cases" 
              secondary="Test both positive matches (should match) and negative matches (should not match)."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Performance Testing" 
              secondary="Test with large inputs to identify potential ReDoS vulnerabilities."
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Debugging Techniques
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Break Down Complex Patterns" 
              secondary="Test individual parts of complex regex patterns separately."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Use Visualization Tools" 
              secondary="Regex visualizers help understand pattern flow and capture groups."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Check Escape Sequences" 
              secondary="Verify that backslashes and escape sequences are correct for your language."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Language-Specific Considerations
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          JavaScript
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`// JavaScript regex flags
const regex = /pattern/gimuy;
// g: global, i: ignoreCase, m: multiline
// u: unicode, y: sticky

// Using RegExp constructor
const regex = new RegExp('pattern', 'gi');

// Testing and matching
regex.test(string);     // Returns boolean
string.match(regex);    // Returns matches
string.replace(regex, replacement);`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Python
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{String.raw`import re

# Compile for reuse
pattern = re.compile(r'pattern', re.IGNORECASE | re.MULTILINE)

# Common operations
re.search(pattern, string)    # Find first match
re.findall(pattern, string)   # Find all matches
re.sub(pattern, replacement, string)  # Replace matches`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Test Your Regex Skills
        </Typography>
        <Typography paragraph>
          Ready to practice regex? Use our comprehensive regex tester tool with real-time highlighting, 
          capture group analysis, performance testing, and a built-in pattern library. Perfect for 
          learning, debugging, and optimizing your regular expressions.
        </Typography>
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Link href="/regex" passHref>
            <Typography component="a" variant="h6" color="primary" sx={{ textDecoration: 'none' }}>
              → Use Interactive Regex Tester Tool
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h6" gutterBottom>
          Related Articles
        </Typography>
        <List>
          <ListItem>
            <Link href="/blog/essential-developer-tools-2024" passHref>
              <Typography component="a" color="primary">Developer Productivity: Essential Online Tools Every Programmer Needs</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/blog/json-formatting-guide-2024" passHref>
              <Typography component="a" color="primary">Complete Guide to JSON Formatting and Validation in 2024</Typography>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
