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

export default function HashFunctionsComparison() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Hash Functions in Web Development: MD5, SHA-1, SHA-256 Comparison",
    "description": "Complete comparison of hash functions for web developers. Learn when to use MD5, SHA-1, SHA-256, and SHA-512, plus security considerations.",
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
      "@id": "https://yourdevtools.com/blog/hash-functions-comparison"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Hash Functions in Web Development: MD5, SHA-1, SHA-256 Comparison"
        description="Complete comparison of cryptographic hash functions for developers. Learn security strengths, use cases, and best practices for MD5, SHA-1, SHA-256, SHA-512, SHA-3, and HMAC."
        canonical="/blog/hash-functions-comparison"
        schema={articleSchema}
        keywords={[
          'hash functions',
          'md5 vs sha256',
          'cryptographic hashing',
          'sha1 sha256 comparison',
          'web security hashing',
          'hmac authentication',
          'hash algorithm security',
          'password hashing'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Hash Functions in Web Development: MD5, SHA-1, SHA-256 Comparison
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Chip label="Security" color="primary" sx={{ mr: 1 }} />
          <Chip label="9 min read" variant="outlined" />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          Complete comparison of hash functions for web developers. Learn when to use MD5, SHA-1, SHA-256, and SHA-512, plus security considerations.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Understanding Cryptographic Hash Functions
        </Typography>
        <Typography paragraph>
          Cryptographic hash functions are mathematical algorithms that convert input data of any size into a 
          fixed-size string of characters. They are fundamental to modern web security, used for data integrity 
          verification, password storage, digital signatures, and blockchain technology. Understanding their 
          strengths and weaknesses is crucial for making informed security decisions.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Essential Properties of Hash Functions
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Deterministic" 
              secondary="The same input always produces the same output."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Fixed Output Size" 
              secondary="Regardless of input size, output length is constant."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Avalanche Effect" 
              secondary="Small input changes cause dramatic output changes."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="One-Way Function" 
              secondary="Computationally infeasible to reverse the process."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Collision Resistant" 
              secondary="Extremely difficult to find two inputs with the same output."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Hash Algorithm Comparison
        </Typography>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Algorithm</TableCell>
                <TableCell>Output Size</TableCell>
                <TableCell>Security Status</TableCell>
                <TableCell>Performance</TableCell>
                <TableCell>Best Use Case</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>MD5</TableCell>
                <TableCell>128 bits</TableCell>
                <TableCell>❌ Broken</TableCell>
                <TableCell>⚡ Very Fast</TableCell>
                <TableCell>Checksums only</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHA-1</TableCell>
                <TableCell>160 bits</TableCell>
                <TableCell>⚠️ Deprecated</TableCell>
                <TableCell>⚡ Fast</TableCell>
                <TableCell>Legacy compatibility</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHA-256</TableCell>
                <TableCell>256 bits</TableCell>
                <TableCell>✅ Secure</TableCell>
                <TableCell>🔄 Moderate</TableCell>
                <TableCell>General purpose</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHA-512</TableCell>
                <TableCell>512 bits</TableCell>
                <TableCell>✅ Very Secure</TableCell>
                <TableCell>🔄 Moderate</TableCell>
                <TableCell>High security needs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHA-3</TableCell>
                <TableCell>224-512 bits</TableCell>
                <TableCell>✅ Newest Standard</TableCell>
                <TableCell>🐌 Slower</TableCell>
                <TableCell>Future-proofing</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Detailed Algorithm Analysis
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          MD5 (Message Digest 5)
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Security Warning</Typography>
          <Typography>MD5 is cryptographically broken and should never be used for security purposes.</Typography>
        </Alert>

        <Typography paragraph>
          <strong>Introduced:</strong> 1992 by Ronald Rivest<br/>
          <strong>Output Size:</strong> 128 bits (32 hexadecimal characters)<br/>
          <strong>Block Size:</strong> 512 bits
        </Typography>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`MD5("hello") = 5d41402abc4b2a76b9719d911017c592`}</pre>
        </Paper>

        <Typography paragraph sx={{ mt: 2 }}>
          <strong>Vulnerabilities:</strong>
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Collision Attacks" 
              secondary="Practical collision attacks demonstrated since 2004."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Preimage Attacks" 
              secondary="Faster than brute force attacks are possible."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Birthday Attacks" 
              secondary="2^64 operations to find collisions (not 2^128)."
            />
          </ListItem>
        </List>

        <Typography paragraph>
          <strong>Current Usage:</strong> Only for non-security applications like file integrity checksums 
          where speed is prioritized over security.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          SHA-1 (Secure Hash Algorithm 1)
        </Typography>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="h6">Deprecated</Typography>
          <Typography>SHA-1 is deprecated and should be migrated away from for new applications.</Typography>
        </Alert>

        <Typography paragraph>
          <strong>Introduced:</strong> 1995 by NSA<br/>
          <strong>Output Size:</strong> 160 bits (40 hexadecimal characters)<br/>
          <strong>Block Size:</strong> 512 bits
        </Typography>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`SHA-1("hello") = aaf4c61ddcc5e8a2dabede0f3b482cd9aea9434d`}</pre>
        </Paper>

        <Typography paragraph sx={{ mt: 2 }}>
          <strong>Security Status:</strong>
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Theoretical Collision Attacks" 
              secondary="Google demonstrated practical collision in 2017 (SHAttered attack)."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Industry Phase-out" 
              secondary="Major browsers stopped trusting SHA-1 certificates in 2017."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Git Migration" 
              secondary="Git is transitioning from SHA-1 to SHA-256 for commit hashes."
            />
          </ListItem>
        </List>

        <Typography paragraph>
          <strong>Migration Timeline:</strong> Plan to replace SHA-1 usage by 2025 at the latest.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          SHA-256 (SHA-2 Family)
        </Typography>
        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="h6">Recommended</Typography>
          <Typography>SHA-256 is currently the gold standard for general-purpose cryptographic hashing.</Typography>
        </Alert>

        <Typography paragraph>
          <strong>Introduced:</strong> 2001 by NSA<br/>
          <strong>Output Size:</strong> 256 bits (64 hexadecimal characters)<br/>
          <strong>Block Size:</strong> 512 bits
        </Typography>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`SHA-256("hello") = 2cf24dba4f21d4288094c32f4de6f269
                     e9e36d7b43e34e9c3dc7a1b8c3f5d9e6`}</pre>
        </Paper>

        <Typography paragraph sx={{ mt: 2 }}>
          <strong>Advantages:</strong>
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="No Known Vulnerabilities" 
              secondary="No practical attacks against SHA-256 have been discovered."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Wide Industry Adoption" 
              secondary="Used in Bitcoin, TLS certificates, and major security protocols."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Hardware Acceleration" 
              secondary="Supported by modern CPUs with dedicated instructions."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Regulatory Compliance" 
              secondary="Approved by NIST and meets FIPS 140-2 requirements."
            />
          </ListItem>
        </List>

        <Typography paragraph>
          <strong>Use Cases:</strong> Digital signatures, certificate fingerprints, blockchain, password hashing 
          (with salt), and general data integrity verification.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          SHA-512 (SHA-2 Family)
        </Typography>
        <Typography paragraph>
          <strong>Introduced:</strong> 2001 by NSA<br/>
          <strong>Output Size:</strong> 512 bits (128 hexadecimal characters)<br/>
          <strong>Block Size:</strong> 1024 bits
        </Typography>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`SHA-512("hello") = 9b71d224bd62f3785d96d46ad3ea3d73
                     319bfbc2890caadae2dff72519673ca7
                     2323c3d99ba5c11d7c7acc6e14b8c5da
                     0c4663475c2e5c3adef46f73bcdec043`}</pre>
        </Paper>

        <Typography paragraph sx={{ mt: 2 }}>
          <strong>When to Use SHA-512:</strong>
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Long-term Security" 
              secondary="When data needs to remain secure for decades."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="High-Value Assets" 
              secondary="Protecting critical infrastructure or sensitive data."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Compliance Requirements" 
              secondary="Some regulations require 512-bit hash lengths."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="64-bit Architectures" 
              secondary="Often faster than SHA-256 on 64-bit systems."
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          SHA-3 (Keccak)
        </Typography>
        <Typography paragraph>
          <strong>Introduced:</strong> 2015 by NIST<br/>
          <strong>Output Size:</strong> 224, 256, 384, or 512 bits<br/>
          <strong>Algorithm:</strong> Sponge construction (different from SHA-1/SHA-2)
        </Typography>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`SHA-3-256("hello") = 3338be694f50c5f338814986cdf0686453a888b8
                         4f424d792af4b9202398f392`}</pre>
        </Paper>

        <Typography paragraph sx={{ mt: 2 }}>
          <strong>Advantages of SHA-3:</strong>
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Different Construction" 
              secondary="Uses sponge construction, immune to length-extension attacks."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Future-Proof" 
              secondary="Backup in case SHA-2 family is compromised."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Provable Security" 
              secondary="Strong theoretical security foundations."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Flexible Output" 
              secondary="Can produce arbitrary output lengths."
            />
          </ListItem>
        </List>

        <Typography paragraph>
          <strong>Current Adoption:</strong> Growing slowly due to performance considerations and SHA-2's 
          continued security.
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          HMAC: Hash-based Message Authentication
        </Typography>

        <Typography paragraph>
          HMAC (Hash-based Message Authentication Code) combines a hash function with a secret key to provide 
          both data integrity and authentication. It's crucial for API security, JWT tokens, and secure communications.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          HMAC Construction
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`HMAC(K, m) = H((K ⊕ opad) || H((K ⊕ ipad) || m))

Where:
- K is the secret key
- m is the message  
- H is the hash function (SHA-256, SHA-512, etc.)
- opad and ipad are padding constants
- ⊕ is XOR operation
- || is concatenation`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          HMAC Variants Comparison
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>HMAC Variant</TableCell>
                <TableCell>Output Size</TableCell>
                <TableCell>Security Level</TableCell>
                <TableCell>Common Use Cases</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>HMAC-MD5</TableCell>
                <TableCell>128 bits</TableCell>
                <TableCell>❌ Weak</TableCell>
                <TableCell>Legacy systems only</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HMAC-SHA1</TableCell>
                <TableCell>160 bits</TableCell>
                <TableCell>⚠️ Declining</TableCell>
                <TableCell>OAuth 1.0, legacy APIs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HMAC-SHA256</TableCell>
                <TableCell>256 bits</TableCell>
                <TableCell>✅ Strong</TableCell>
                <TableCell>JWT, AWS Signature, APIs</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>HMAC-SHA512</TableCell>
                <TableCell>512 bits</TableCell>
                <TableCell>✅ Very Strong</TableCell>
                <TableCell>High-security applications</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Use Case Guidelines
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Password Hashing
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="h6">Important Note</Typography>
          <Typography>Don't use general-purpose hash functions for password hashing. Use specialized algorithms like bcrypt, scrypt, or Argon2.</Typography>
        </Alert>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`// DON'T: Use SHA-256 for passwords
const hash = sha256(password + salt);

// DO: Use bcrypt, scrypt, or Argon2
const hash = bcrypt.hashSync(password, 12);
const hash = scrypt(password, salt, 32768, 8, 1, 64);
const hash = argon2.hash(password, { type: argon2.argon2id });`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          File Integrity Verification
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Software Downloads" 
              secondary="SHA-256 or SHA-512 for verifying downloaded files haven't been tampered with."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Backup Verification" 
              secondary="Ensure backup files are identical to originals."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Version Control" 
              secondary="Git uses SHA-1 (migrating to SHA-256) for commit integrity."
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          API Security
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`// JWT tokens use HMAC for symmetric key signatures
const token = jwt.sign(payload, secret, { algorithm: 'HS256' });

// AWS API requests use HMAC-SHA256 for authentication
const signature = hmacSha256(stringToSign, secretKey);

// Webhook verification
const computedSignature = hmacSha256(payload, webhookSecret);
const providedSignature = request.headers['x-signature'];`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Performance Considerations
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Benchmarking Results (Approximate)
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Algorithm</TableCell>
                <TableCell>Speed (MB/s)</TableCell>
                <TableCell>Relative Performance</TableCell>
                <TableCell>CPU Instructions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>MD5</TableCell>
                <TableCell>~400</TableCell>
                <TableCell>Fastest</TableCell>
                <TableCell>Software only</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHA-1</TableCell>
                <TableCell>~350</TableCell>
                <TableCell>Very Fast</TableCell>
                <TableCell>Hardware accelerated</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHA-256</TableCell>
                <TableCell>~150</TableCell>
                <TableCell>Moderate</TableCell>
                <TableCell>Hardware accelerated</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHA-512</TableCell>
                <TableCell>~200*</TableCell>
                <TableCell>Moderate</TableCell>
                <TableCell>Hardware accelerated</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>SHA-3-256</TableCell>
                <TableCell>~100</TableCell>
                <TableCell>Slower</TableCell>
                <TableCell>Software only</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
        <Typography variant="caption" sx={{ fontStyle: 'italic', mt: 1, display: 'block' }}>
          *SHA-512 can be faster than SHA-256 on 64-bit systems due to larger word size
        </Typography>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Security Recommendations 2024
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Current Best Practices
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Default Choice: SHA-256" 
              secondary="Use SHA-256 for general-purpose hashing needs unless specific requirements dictate otherwise."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="High Security: SHA-512" 
              secondary="Use SHA-512 for long-term security or high-value data protection."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Future-Proofing: SHA-3" 
              secondary="Consider SHA-3 for new systems that will operate for many years."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Authentication: HMAC-SHA256" 
              secondary="Use HMAC-SHA256 for message authentication and API security."
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Migration Timeline
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Immediate: Stop using MD5" 
              secondary="Replace MD5 with SHA-256 in all security contexts."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="By 2025: Phase out SHA-1" 
              secondary="Complete migration from SHA-1 to SHA-256 or SHA-3."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Plan for post-quantum" 
              secondary="Monitor NIST's post-quantum cryptography standards for future migration."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Test Hash Functions Yourself
        </Typography>
        <Typography paragraph>
          Experiment with different hash algorithms using our professional hash generator tool. 
          Compare output formats, test HMAC variants, analyze security properties, and see performance 
          differences across 10+ algorithms including MD5, SHA family, SHA-3, and RIPEMD-160.
        </Typography>
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Link href="/hash" passHref>
            <Typography component="a" variant="h6" color="primary" sx={{ textDecoration: 'none' }}>
              → Use Professional Hash Generator Tool
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h6" gutterBottom>
          Related Articles
        </Typography>
        <List>
          <ListItem>
            <Link href="/blog/jwt-security-best-practices" passHref>
              <Typography component="a" color="primary">JWT Tokens: Security Best Practices and Common Vulnerabilities</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/blog/base64-encoding-explained" passHref>
              <Typography component="a" color="primary">Base64 Encoding Explained: When and How to Use It</Typography>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
