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
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function WebSecurityEssentials2025() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Web Security Essentials: UUID Generation, Hash Functions, and Password Management",
    "description": "Master web security fundamentals: UUID generation for unique identifiers, cryptographic hash functions, secure password management, and authentication best practices.",
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
    "datePublished": "2025-09-23",
    "dateModified": "2025-09-23",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://app4a.github.io/devtools/blog/web-security-essentials-2025"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Web Security Essentials: UUID Generation, Hash Functions, and Password Management"
        description="Master web security fundamentals: UUID generation for unique identifiers, cryptographic hash functions, secure password management, and authentication best practices."
        canonical="/blog/web-security-essentials-2025"
        schema={articleSchema}
        keywords={[
          'web security',
          'uuid generation',
          'hash functions',
          'password security',
          'cryptography',
          'authentication',
          'security best practices',
          'data protection'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom>
          Web Security Essentials: UUID Generation, Hash Functions, and Password Management
        </Typography>
        
        <Box sx={{ mb: 3, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
          <Chip label="Security" color="primary" />
          <Chip label="13 min read" variant="outlined" />
          <Chip label="2025 Guide" color="secondary" />
        </Box>

        <Typography variant="h6" color="text.secondary" paragraph>
          Master essential web security concepts including UUID generation, cryptographic hash functions, 
          password management, and authentication best practices for secure application development.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          Table of Contents
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. Understanding Security Fundamentals" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. UUID Generation and Unique Identifiers" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Cryptographic Hash Functions" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Password Security and Management" />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. Authentication and Authorization" />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. Security Implementation Best Practices" />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          1. Understanding Security Fundamentals
        </Typography>
        
        <Typography paragraph>
          Web security is built on several core principles: confidentiality, integrity, and availability (CIA triad). 
          Understanding these fundamentals helps make informed decisions about security implementations.
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>🔐 Confidentiality</Typography>
                <Typography variant="body2">
                  Ensuring that sensitive information is only accessible to authorized users through 
                  encryption, access controls, and secure transmission.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>🛡️ Integrity</Typography>
                <Typography variant="body2">
                  Protecting data from unauthorized modification through hash functions, digital signatures, 
                  and validation mechanisms.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>⚡ Availability</Typography>
                <Typography variant="body2">
                  Ensuring systems and data are accessible when needed through redundancy, monitoring, 
                  and DDoS protection.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Alert severity="warning" sx={{ my: 3 }}>
          <Typography variant="h6">Security is Not Optional</Typography>
          <Typography variant="body2">
            Security breaches can result in data theft, financial losses, legal liability, and damaged reputation. 
            Implement security measures from the beginning, not as an afterthought.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          2. UUID Generation and Unique Identifiers
        </Typography>

        <Typography paragraph>
          UUIDs (Universally Unique Identifiers) provide a way to generate unique identifiers without 
          central coordination. They're essential for distributed systems, database records, and API resources.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          UUID Versions and Use Cases:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>UUID v1 - Time-based</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Structure:</strong> Timestamp + MAC address
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Use case:</strong> When you need temporal ordering
                </Typography>
                <Typography variant="body2">
                  <strong>Security:</strong> ⚠️ Can leak MAC address and timestamp
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>UUID v4 - Random</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Structure:</strong> 122 random bits
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Use case:</strong> General purpose, most common
                </Typography>
                <Typography variant="body2">
                  <strong>Security:</strong> ✅ Cryptographically secure
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>UUID v5 - Name-based</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Structure:</strong> SHA-1 hash of namespace + name
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Use case:</strong> Deterministic IDs from data
                </Typography>
                <Typography variant="body2">
                  <strong>Security:</strong> ✅ Reproducible and secure
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>ULID - Sortable</Typography>
                <Typography variant="body2" paragraph>
                  <strong>Structure:</strong> Timestamp + randomness
                </Typography>
                <Typography variant="body2" paragraph>
                  <strong>Use case:</strong> Database primary keys
                </Typography>
                <Typography variant="body2">
                  <strong>Security:</strong> ✅ Secure and lexicographically sortable
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>UUID Security Considerations:</Typography>
          <List>
            <ListItem><ListItemText primary="🎲 Use UUID v4 for session tokens and API keys" /></ListItem>
            <ListItem><ListItemText primary="🔍 Don't use sequential IDs for sensitive resources" /></ListItem>
            <ListItem><ListItemText primary="⚡ Consider ULIDs for database performance" /></ListItem>
            <ListItem><ListItemText primary="🔐 Validate UUID format in APIs" /></ListItem>
          </List>
        </Paper>

        <Alert severity="success" sx={{ my: 3 }}>
          <Typography variant="body2">
            <strong>🆔 UUID Generator:</strong> Use our{' '}
            <Link href="/uuid-generator" passHref>
              <Button variant="text" color="primary" sx={{ p: 0, textTransform: 'none' }}>
                UUID/GUID Generator
              </Button>
            </Link>{' '}
            to generate secure UUIDs for your applications.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          3. Cryptographic Hash Functions
        </Typography>

        <Typography paragraph>
          Hash functions are one-way mathematical functions that convert input data into fixed-size strings. 
          They're essential for password storage, data integrity verification, and digital signatures.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Hash Function Comparison:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="error">❌ Deprecated Algorithms</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="MD5" 
                      secondary="Vulnerable to collision attacks, only use for checksums"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="SHA-1" 
                      secondary="Deprecated for cryptographic use, vulnerable to attacks"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">✅ Recommended Algorithms</Typography>
                <List dense>
                  <ListItem>
                    <ListItemText 
                      primary="SHA-256/SHA-512" 
                      secondary="Secure for most applications, widely supported"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="SHA-3" 
                      secondary="Latest standard, quantum-resistant design"
                    />
                  </ListItem>
                  <ListItem>
                    <ListItemText 
                      primary="BLAKE2" 
                      secondary="Faster than SHA-2, secure and efficient"
                    />
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom>
          Hash Function Use Cases:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Data Integrity Verification" 
              secondary="Verify file downloads, detect data corruption"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Digital Signatures" 
              secondary="Create and verify digital signatures for documents"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Proof of Work" 
              secondary="Blockchain mining and consensus mechanisms"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Cache Keys" 
              secondary="Generate consistent cache keys from input data"
            />
          </ListItem>
        </List>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>HMAC (Hash-based Message Authentication):</Typography>
          <Typography variant="body2" paragraph>
            HMAC combines a hash function with a secret key to provide both integrity and authenticity. 
            Perfect for API signatures and secure communications.
          </Typography>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`// API signature example
const signature = HMAC-SHA256(
  secret_key, 
  method + url + timestamp + body_hash
);`}
          </Typography>
        </Paper>

        <Alert severity="info" sx={{ my: 3 }}>
          <Typography variant="body2">
            <strong>🔐 Hash Generator:</strong> Use our{' '}
            <Link href="/hash" passHref>
              <Button variant="text" color="primary" sx={{ p: 0, textTransform: 'none' }}>
                Hash Generator
              </Button>
            </Link>{' '}
            to generate secure hashes with multiple algorithms.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          4. Password Security and Management
        </Typography>

        <Typography paragraph>
          Password security remains critical despite advances in biometric and multi-factor authentication. 
          Proper password handling protects user accounts and prevents credential-based attacks.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Password Storage Best Practices:
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="error">❌ Never Do This</Typography>
                <List dense>
                  <ListItem><ListItemText primary="• Store passwords in plain text" /></ListItem>
                  <ListItem><ListItemText primary="• Use simple MD5 or SHA hashing" /></ListItem>
                  <ListItem><ListItemText primary="• Hash without salt" /></ListItem>
                  <ListItem><ListItemText primary="• Log passwords in any form" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="success.main">✅ Best Practices</Typography>
                <List dense>
                  <ListItem><ListItemText primary="• Use bcrypt, scrypt, or Argon2" /></ListItem>
                  <ListItem><ListItemText primary="• Generate unique salts" /></ListItem>
                  <ListItem><ListItemText primary="• Set appropriate work factors" /></ListItem>
                  <ListItem><ListItemText primary="• Implement rate limiting" /></ListItem>
                </List>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom>
          Password Generation Guidelines:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="h6" gutterBottom>Strong Password Characteristics:</Typography>
          <List>
            <ListItem><ListItemText primary="📏 Minimum 12 characters (16+ recommended)" /></ListItem>
            <ListItem><ListItemText primary="🔤 Mix of uppercase, lowercase, numbers, symbols" /></ListItem>
            <ListItem><ListItemText primary="🚫 Avoid dictionary words and personal information" /></ListItem>
            <ListItem><ListItemText primary="🔄 Unique for each account/service" /></ListItem>
            <ListItem><ListItemText primary="🎲 Use cryptographically secure random generation" /></ListItem>
          </List>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Password Strength Calculation:
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`Entropy = log2(character_set_size ^ password_length)

Examples:
• 8 char alphanumeric: log2(62^8) ≈ 48 bits (weak)
• 12 char mixed: log2(94^12) ≈ 79 bits (strong)
• 16 char mixed: log2(94^16) ≈ 105 bits (very strong)`}
          </Typography>
        </Paper>

        <Alert severity="success" sx={{ my: 3 }}>
          <Typography variant="body2">
            <strong>🔐 Password Generator:</strong> Use our{' '}
            <Link href="/password-generator" passHref>
              <Button variant="text" color="primary" sx={{ p: 0, textTransform: 'none' }}>
                Secure Password Generator
              </Button>
            </Link>{' '}
            to create strong, unique passwords with customizable options.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          5. Authentication and Authorization
        </Typography>

        <Typography paragraph>
          Authentication verifies identity, while authorization controls access to resources. Modern applications 
          require robust implementations of both concepts with multiple layers of security.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Multi-Factor Authentication (MFA):
        </Typography>

        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>🧠 Something You Know</Typography>
                <Typography variant="body2">
                  Passwords, PINs, security questions, passphrases
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>📱 Something You Have</Typography>
                <Typography variant="body2">
                  Phone, hardware token, smart card, authenticator app
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>👤 Something You Are</Typography>
                <Typography variant="body2">
                  Fingerprint, face recognition, voice, retina scan
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom>
          JWT Token Security:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Use Strong Signing Algorithms" 
              secondary="RS256 or ES256 for asymmetric, HS256 with long secrets for symmetric"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Set Appropriate Expiration" 
              secondary="Short-lived access tokens (15 minutes), longer refresh tokens"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Validate All Claims" 
              secondary="Check issuer, audience, expiration, and custom claims"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Implement Token Rotation" 
              secondary="Rotate refresh tokens and invalidate on suspicious activity"
            />
          </ListItem>
        </List>

        <Alert severity="info" sx={{ my: 3 }}>
          <Typography variant="body2">
            <strong>🔍 JWT Analyzer:</strong> Use our{' '}
            <Link href="/jwt" passHref>
              <Button variant="text" color="primary" sx={{ p: 0, textTransform: 'none' }}>
                JWT Decoder & Validator
              </Button>
            </Link>{' '}
            to analyze and validate JWT tokens securely.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          6. Security Implementation Best Practices
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom>
          Secure Development Lifecycle:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Security by Design" 
              secondary="Consider security requirements from the planning phase"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Threat Modeling" 
              secondary="Identify potential attack vectors and mitigation strategies"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Code Reviews" 
              secondary="Review code for security vulnerabilities and best practices"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Security Testing" 
              secondary="Automated scanning, penetration testing, and vulnerability assessments"
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom>
          Common Security Vulnerabilities (OWASP Top 10):
        </Typography>

        <Paper sx={{ p: 3, mb: 3, backgroundColor: 'action.hover' }}>
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, md: 6 }}>
              <List dense>
                <ListItem><ListItemText primary="1. Injection Attacks" /></ListItem>
                <ListItem><ListItemText primary="2. Broken Authentication" /></ListItem>
                <ListItem><ListItemText primary="3. Sensitive Data Exposure" /></ListItem>
                <ListItem><ListItemText primary="4. XML External Entities (XXE)" /></ListItem>
                <ListItem><ListItemText primary="5. Broken Access Control" /></ListItem>
              </List>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <List dense>
                <ListItem><ListItemText primary="6. Security Misconfiguration" /></ListItem>
                <ListItem><ListItemText primary="7. Cross-Site Scripting (XSS)" /></ListItem>
                <ListItem><ListItemText primary="8. Insecure Deserialization" /></ListItem>
                <ListItem><ListItemText primary="9. Vulnerable Components" /></ListItem>
                <ListItem><ListItemText primary="10. Insufficient Logging" /></ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom>
          Security Monitoring and Incident Response:
        </Typography>

        <List>
          <ListItem>
            <ListItemText 
              primary="Implement Comprehensive Logging" 
              secondary="Log authentication attempts, access patterns, and security events"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Set Up Alerting" 
              secondary="Alert on suspicious activities, failed logins, and anomalies"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Regular Security Audits" 
              secondary="Periodic reviews of access controls, permissions, and configurations"
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Incident Response Plan" 
              secondary="Documented procedures for security breaches and recovery"
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 6 }}>
          Conclusion
        </Typography>

        <Typography paragraph>
          Web security is a continuous process that requires vigilance, proper tools, and adherence to best practices. 
          Focus on the fundamentals: secure identifiers, strong cryptography, proper authentication, and defense in depth.
        </Typography>

        <Typography paragraph>
          Remember that security is only as strong as its weakest link. Regularly update dependencies, monitor for 
          vulnerabilities, and stay informed about emerging threats and security techniques.
        </Typography>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h5" component="h3" gutterBottom>
          Related Security Tools
        </Typography>

        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/uuid-generator" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      UUID/GUID Generator →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Generate secure unique identifiers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/hash" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      Hash Generator →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Generate cryptographic hashes
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/password-generator" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      Password Generator →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Create secure passwords
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <Link href="/jwt" passHref>
                    <Button color="primary" sx={{ textTransform: 'none' }}>
                      JWT Decoder & Validator →
                    </Button>
                  </Link>
                </Typography>
                <Typography variant="body2">
                  Analyze JWT tokens securely
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
