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

export default function JwtSecurityBestPractices() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "JWT Tokens: Security Best Practices and Common Vulnerabilities",
    "description": "Comprehensive guide to JWT token security. Learn about common vulnerabilities, best practices, and how to implement secure JWT authentication.",
    "image": "https://app4a.github.io/devtools/logo512.png",
    "author": {
      "@type": "Organization",
      "name": "Developer Tools Team"
    },
    "publisher": {
      "@type": "Organization",
      "name": "Developer Tools",
      "logo": {
        "@type": "ImageObject",
        "url": "https://app4a.github.io/devtools/logo512.png"
      }
    },
    "datePublished": "2024-01-01",
    "dateModified": "2024-01-01",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://app4a.github.io/devtools/blog/jwt-security-best-practices"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="JWT Tokens: Security Best Practices and Common Vulnerabilities"
        description="Comprehensive guide to JWT token security. Learn about common vulnerabilities, best practices, signature verification, and how to implement secure JWT authentication systems."
        canonical="/blog/jwt-security-best-practices"
        schema={articleSchema}
        keywords={[
          'jwt security',
          'jwt vulnerabilities',
          'token authentication',
          'jwt best practices',
          'web security',
          'oauth security',
          'jwt signature verification',
          'authentication security'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          JWT Tokens: Security Best Practices and Common Vulnerabilities
        </Typography>
        
        <Box sx={{ mb: 3 }}>
          <Chip label="Security" color="primary" sx={{ mr: 1 }} />
          <Chip label="12 min read" variant="outlined" />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          Comprehensive guide to JWT token security. Learn about common vulnerabilities, best practices, and how to implement secure JWT authentication.
        </Typography>

        <Divider sx={{ my: 3 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Understanding JWT Structure
        </Typography>
        <Typography paragraph>
          JSON Web Tokens (JWT) consist of three parts separated by dots: Header.Payload.Signature. 
          Understanding this structure is crucial for implementing secure JWT systems and identifying potential vulnerabilities.
        </Typography>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c

Header:    {"alg":"HS256","typ":"JWT"}
Payload:   {"sub":"1234567890","name":"John Doe","iat":1516239022}
Signature: HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Critical Security Vulnerabilities
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          1. Algorithm Confusion Attack (CVE-2016-10555)
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Critical: "none" Algorithm Attack</Typography>
          <Typography>Attackers can change the algorithm to "none" and remove the signature, creating valid tokens without knowing the secret.</Typography>
        </Alert>
        
        <Typography paragraph>
          <strong>Vulnerable Code:</strong>
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`// BAD: Accepts any algorithm
jwt.verify(token, secret);

// GOOD: Explicitly specify algorithm
jwt.verify(token, secret, { algorithms: ['HS256'] });`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          2. Asymmetric to Symmetric Algorithm Confusion
        </Typography>
        <Alert severity="error" sx={{ mb: 2 }}>
          <Typography variant="h6">Critical: RS256 to HS256 Attack</Typography>
          <Typography>Attackers can change RS256 to HS256 and use the public key as the HMAC secret to forge tokens.</Typography>
        </Alert>

        <Typography paragraph>
          <strong>Secure Implementation:</strong>
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`// Always verify with the expected algorithm
const verifyToken = (token, publicKey) => {
  return jwt.verify(token, publicKey, { 
    algorithms: ['RS256'],
    issuer: 'your-app',
    audience: 'your-api'
  });
};`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          3. Weak Secret Keys
        </Typography>
        <Alert severity="warning" sx={{ mb: 2 }}>
          <Typography variant="h6">High Risk: Weak HMAC Secrets</Typography>
          <Typography>Short or predictable secrets can be brute-forced, allowing attackers to forge tokens.</Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          JWT Security Best Practices
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          1. Use Strong Secrets and Key Management
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Generate Cryptographically Strong Secrets" 
              secondary="Use at least 256 bits of entropy for HMAC secrets. Use crypto.randomBytes() or equivalent."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Rotate Keys Regularly" 
              secondary="Implement key rotation strategies and support multiple active keys during transitions."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Store Keys Securely" 
              secondary="Use environment variables, key management services, or hardware security modules (HSMs)."
            />
          </ListItem>
        </List>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`// Generate a strong secret
const crypto = require('crypto');
const secret = crypto.randomBytes(64).toString('hex');

// Use environment variables
const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET || JWT_SECRET.length < 32) {
  throw new Error('JWT_SECRET must be at least 32 characters');
}`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          2. Implement Proper Token Validation
        </Typography>
        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Claim</TableCell>
                <TableCell>Purpose</TableCell>
                <TableCell>Validation</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>iss (Issuer)</TableCell>
                <TableCell>Token issuer identity</TableCell>
                <TableCell>Verify against expected issuer</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>aud (Audience)</TableCell>
                <TableCell>Intended token recipient</TableCell>
                <TableCell>Verify against your service identifier</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>exp (Expiration)</TableCell>
                <TableCell>Token expiration time</TableCell>
                <TableCell>Verify token hasn't expired</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>iat (Issued At)</TableCell>
                <TableCell>Token issuance time</TableCell>
                <TableCell>Verify token isn't from the future</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>nbf (Not Before)</TableCell>
                <TableCell>Token activation time</TableCell>
                <TableCell>Verify current time is after nbf</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          3. Set Appropriate Expiration Times
        </Typography>
        <Typography paragraph>
          Token lifetime should balance security and user experience:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Access Tokens: 15-30 minutes" 
              secondary="Short-lived tokens reduce impact if compromised."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Refresh Tokens: 7-30 days" 
              secondary="Longer-lived but stored securely and revocable."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Admin Tokens: 5-15 minutes" 
              secondary="Privileged operations should have shorter expiration."
            />
          </ListItem>
        </List>

        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`const createToken = (payload, type = 'access') => {
  const expiresIn = type === 'access' ? '15m' : 
                    type === 'refresh' ? '7d' : '5m';
  
  return jwt.sign(payload, secret, {
    expiresIn,
    issuer: 'your-app',
    audience: 'your-api',
    algorithm: 'HS256'
  });
};`}</pre>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Advanced Security Measures
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          1. Token Blacklisting/Revocation
        </Typography>
        <Typography paragraph>
          Implement token revocation for compromised or logged-out users:
        </Typography>
        <Paper sx={{ p: 2, backgroundColor: '#2d2d2d', color: '#ffffff', fontFamily: 'monospace' }}>
          <pre>{`// Redis-based token blacklist
const blacklistToken = async (tokenId, expiresAt) => {
  const ttl = Math.floor((expiresAt - Date.now()) / 1000);
  await redis.setex(\`blacklist:\${tokenId}\`, ttl, '1');
};

const isTokenBlacklisted = async (tokenId) => {
  return await redis.exists(\`blacklist:\${tokenId}\`);
};`}</pre>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          2. Rate Limiting and Monitoring
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Failed Authentication Attempts" 
              secondary="Monitor and rate-limit failed JWT validation attempts."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Token Usage Patterns" 
              secondary="Detect unusual token usage patterns that might indicate compromise."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Algorithm Manipulation" 
              secondary="Log and alert on tokens with unexpected algorithms."
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          3. Secure Token Storage
        </Typography>
        <Alert severity="info" sx={{ mb: 2 }}>
          <Typography variant="h6">Client-Side Storage</Typography>
          <Typography>Never store JWTs in localStorage. Use httpOnly cookies or secure token storage mechanisms.</Typography>
        </Alert>

        <TableContainer component={Paper} sx={{ mt: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Storage Method</TableCell>
                <TableCell>Security Level</TableCell>
                <TableCell>XSS Protection</TableCell>
                <TableCell>CSRF Protection</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>localStorage</TableCell>
                <TableCell>❌ Low</TableCell>
                <TableCell>❌ Vulnerable</TableCell>
                <TableCell>✅ Protected</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>httpOnly Cookie</TableCell>
                <TableCell>✅ High</TableCell>
                <TableCell>✅ Protected</TableCell>
                <TableCell>⚠️ Needs CSRF protection</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Secure Memory</TableCell>
                <TableCell>✅ Highest</TableCell>
                <TableCell>✅ Protected</TableCell>
                <TableCell>✅ Protected</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          JWT Security Checklist
        </Typography>

        <Alert severity="success" sx={{ mb: 2 }}>
          <Typography variant="h6">Pre-Production Security Checklist</Typography>
          <Typography>Use this checklist to verify your JWT implementation before going live.</Typography>
        </Alert>

        <List>
          <ListItem>
            <ListItemText 
              primary="✅ Algorithm Whitelist" 
              secondary="Explicitly specify allowed algorithms in verification."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="✅ Strong Secrets" 
              secondary="Use cryptographically strong secrets (256+ bits)."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="✅ Claim Validation" 
              secondary="Validate iss, aud, exp, iat, and nbf claims."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="✅ Short Expiration" 
              secondary="Use appropriate token lifetimes (15-30 min for access tokens)."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="✅ Secure Storage" 
              secondary="Store tokens securely (httpOnly cookies or secure memory)."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="✅ Token Revocation" 
              secondary="Implement token blacklisting for logout/compromise scenarios."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="✅ Rate Limiting" 
              secondary="Monitor and rate-limit authentication attempts."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="✅ HTTPS Only" 
              secondary="Always transmit JWTs over HTTPS in production."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Testing JWT Security
        </Typography>
        <Typography paragraph>
          Regular security testing helps identify vulnerabilities:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Algorithm Confusion Tests" 
              secondary="Test with 'none' algorithm and RS256 to HS256 conversions."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Signature Verification" 
              secondary="Attempt to use tokens with modified signatures."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Expired Token Handling" 
              secondary="Verify expired tokens are properly rejected."
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Claim Manipulation" 
              secondary="Test with modified claims (role escalation attempts)."
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Analyze JWTs with Our Security Tool
        </Typography>
        <Typography paragraph>
          Use our advanced JWT analyzer to decode tokens, verify signatures, perform security analysis, 
          and test for common vulnerabilities. Our tool supports multiple algorithms including HMAC, RSA, 
          and ECDSA, with comprehensive security checking features.
        </Typography>
        
        <Box sx={{ textAlign: 'center', mt: 3 }}>
          <Link href="/jwt" passHref>
            <Typography component="a" variant="h6" color="primary" sx={{ textDecoration: 'none' }}>
              → Use JWT Security Analyzer Tool
            </Typography>
          </Link>
        </Box>

        <Divider sx={{ my: 4 }} />
        
        <Typography variant="h6" gutterBottom>
          Related Articles
        </Typography>
        <List>
          <ListItem>
            <Link href="/blog/base64-encoding-explained" passHref>
              <Typography component="a" color="primary">Base64 Encoding Explained: When and How to Use It</Typography>
            </Link>
          </ListItem>
          <ListItem>
            <Link href="/blog/hash-functions-comparison" passHref>
              <Typography component="a" color="primary">Hash Functions in Web Development: MD5, SHA-1, SHA-256 Comparison</Typography>
            </Link>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}
