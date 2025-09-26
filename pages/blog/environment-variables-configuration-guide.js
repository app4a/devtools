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
  Card,
  CardContent,
  Grid
} from '@mui/material';
import Link from 'next/link';
import SEO from '../../components/SEO';

export default function EnvironmentVariablesConfigurationGuide() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Environment Variables and Configuration Management: Complete DevOps Guide",
    "description": "Master environment variables management with comprehensive guide covering .env files, Docker configs, Kubernetes secrets, security best practices, and configuration strategies for modern applications.",
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
    "datePublished": "2025-09-25",
    "dateModified": "2025-09-25",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://app4a.github.io/devtools/blog/environment-variables-configuration-guide"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Environment Variables and Configuration Management: Complete DevOps Guide"
        description="Master environment variables management with comprehensive guide covering .env files, Docker configs, Kubernetes secrets, security best practices, and configuration strategies for modern applications."
        canonical="/blog/environment-variables-configuration-guide"
        schema={articleSchema}
        keywords={[
          'environment variables',
          'configuration management',
          'devops',
          'docker environment',
          'kubernetes secrets',
          'env files',
          'application configuration',
          'deployment security',
          'config validation',
          'secrets management'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Chip label="DevOps" color="primary" sx={{ mr: 1, mb: 2 }} />
          <Chip label="14 min read" variant="outlined" sx={{ mb: 2 }} />
        </Box>

        <Typography variant="h3" component="h1" gutterBottom>
          Environment Variables and Configuration Management
        </Typography>
        
        <Typography variant="h6" component="h2" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Complete guide to managing application configuration securely across development, staging, and production environments
        </Typography>

        <Typography variant="body1" paragraph>
          Environment variables are the cornerstone of modern application configuration. They enable the same codebase to run in different environments while keeping sensitive information secure. Whether you're deploying to Docker containers, Kubernetes clusters, or traditional servers, proper environment variable management is crucial for security, scalability, and maintainability.
        </Typography>

        <Typography variant="body1" paragraph>
          This comprehensive guide covers everything from basic .env file management to advanced secrets handling in production environments, helping you build robust configuration systems that grow with your application.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>Pro Tip:</strong> Use our <Link href="/env-manager" style={{ color: 'inherit', textDecoration: 'underline' }}>Environment Variables Manager</Link> to validate, compare, and export .env files with security analysis and multi-format support.
          </Typography>
        </Alert>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Table of Contents
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. Environment Variables Fundamentals" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. .env Files and Local Development" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Security Best Practices" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Docker Configuration" />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. Kubernetes Secrets Management" />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. Cloud Platform Configuration" />
          </ListItem>
          <ListItem>
            <ListItemText primary="7. Configuration Validation" />
          </ListItem>
          <ListItem>
            <ListItemText primary="8. Deployment Strategies" />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          1. Environment Variables Fundamentals
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          What Are Environment Variables?
        </Typography>
        <Typography variant="body1" paragraph>
          Environment variables are key-value pairs that exist outside your application code but can be accessed by your application at runtime. They provide a way to configure your application without hardcoding values into your source code.
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Why Use Environment Variables?
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Security" 
              secondary="Keep sensitive data like API keys and passwords out of source code" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Flexibility" 
              secondary="Same codebase runs in different environments with different configurations" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Deployment" 
              secondary="Change configuration without rebuilding or redeploying code" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Compliance" 
              secondary="Meet security standards by separating config from code" 
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Common Environment Variables
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Application Configuration
NODE_ENV=production
PORT=3000
APP_URL=https://myapp.com

# Database Configuration
DATABASE_URL=postgresql://user:pass@localhost:5432/mydb
REDIS_URL=redis://localhost:6379

# API Keys and Secrets
JWT_SECRET=your-super-secure-secret-key
STRIPE_SECRET_KEY=sk_live_...
SENDGRID_API_KEY=SG.abc123...

# External Services
AWS_ACCESS_KEY_ID=AKIA...
AWS_SECRET_ACCESS_KEY=...
AWS_REGION=us-east-1`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          2. .env Files and Local Development
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Creating .env Files
        </Typography>
        <Typography variant="body1" paragraph>
          .env files provide a convenient way to manage environment variables during development. They should be in your project root and follow this format:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# .env file structure
# Comments start with #
DATABASE_URL=postgresql://localhost:5432/myapp_dev
API_KEY=dev-api-key-123
DEBUG=true

# Use quotes for values with spaces
APP_NAME="My Awesome App"

# Multi-line values use escaped newlines
PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC7...\\n-----END PRIVATE KEY-----"`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Environment-Specific Files
        </Typography>
        <Typography variant="body1" paragraph>
          Create separate .env files for different environments:
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary=".env" 
              secondary="Default values and non-sensitive configuration" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary=".env.local" 
              secondary="Local development overrides (gitignored)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary=".env.development" 
              secondary="Development environment specific" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary=".env.production" 
              secondary="Production environment template" 
            />
          </ListItem>
        </List>

        <Alert severity="warning" sx={{ mb: 3 }}>
          <Typography variant="body2">
            <strong>Security Warning:</strong> Never commit .env files containing sensitive data to version control. Add them to .gitignore and use .env.example as a template.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          3. Security Best Practices
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Identifying Sensitive Variables
        </Typography>
        <Typography variant="body1" paragraph>
          Some environment variables contain sensitive information that requires special handling:
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', backgroundColor: 'error.light', color: 'error.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🔐 Sensitive
                </Typography>
                <Typography variant="body2">
                  • API keys and tokens<br/>
                  • Database passwords<br/>
                  • JWT secrets<br/>
                  • Private keys<br/>
                  • OAuth credentials
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', backgroundColor: 'success.light', color: 'success.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  ✅ Safe
                </Typography>
                <Typography variant="body2">
                  • Application names<br/>
                  • Public URLs<br/>
                  • Feature flags<br/>
                  • Timeout values<br/>
                  • Debug settings
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Secret Management Best Practices
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Use a secrets manager" 
              secondary="AWS Secrets Manager, Azure Key Vault, HashiCorp Vault" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Rotate secrets regularly" 
              secondary="Implement automatic rotation for API keys and tokens" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Principle of least privilege" 
              secondary="Grant minimal access required for each environment" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Audit access" 
              secondary="Log and monitor who accesses sensitive configuration" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          4. Docker Configuration
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Docker Environment Variables
        </Typography>
        <Typography variant="body1" paragraph>
          Docker provides several ways to pass environment variables to containers:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Method 1: Command line
docker run -e NODE_ENV=production -e PORT=3000 myapp

# Method 2: Environment file
docker run --env-file .env.production myapp

# Method 3: Docker Compose
version: '3.8'
services:
  app:
    build: .
    environment:
      - NODE_ENV=production
      - PORT=3000
    env_file:
      - .env.production
    ports:
      - "3000:3000"`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Docker Secrets
        </Typography>
        <Typography variant="body1" paragraph>
          For sensitive data in Docker Swarm, use Docker secrets:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Create a secret
echo "my-secret-password" | docker secret create db_password -

# Use in docker-compose.yml
version: '3.8'
services:
  app:
    image: myapp
    secrets:
      - db_password
    environment:
      - DB_PASSWORD_FILE=/run/secrets/db_password

secrets:
  db_password:
    external: true`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          5. Kubernetes Secrets Management
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Kubernetes ConfigMaps vs Secrets
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  ConfigMaps
                </Typography>
                <Typography variant="body2">
                  For non-sensitive configuration data like application settings, feature flags, and public configuration.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  Secrets
                </Typography>
                <Typography variant="body2">
                  For sensitive data like passwords, API keys, and certificates. Base64 encoded and encrypted at rest.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Creating Kubernetes Secrets
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Create secret from literal values
kubectl create secret generic app-secrets \\
  --from-literal=database-password=secretpassword \\
  --from-literal=api-key=abc123

# Create secret from .env file
kubectl create secret generic app-config --from-env-file=.env.production

# Secret YAML manifest
apiVersion: v1
kind: Secret
metadata:
  name: app-secrets
type: Opaque
data:
  database-password: c2VjcmV0cGFzc3dvcmQ=  # base64 encoded
  api-key: YWJjMTIz  # base64 encoded`}
          </Typography>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Use our <Link href="/k8s-yaml-generator" style={{ color: 'inherit', textDecoration: 'underline' }}>Kubernetes YAML Generator</Link> to create ConfigMaps and Secrets with validation and best practices built-in.
          </Typography>
        </Alert>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Using Secrets in Deployments
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`apiVersion: apps/v1
kind: Deployment
metadata:
  name: myapp
spec:
  template:
    spec:
      containers:
      - name: app
        image: myapp:latest
        env:
        # From ConfigMap
        - name: NODE_ENV
          valueFrom:
            configMapKeyRef:
              name: app-config
              key: environment
        # From Secret
        - name: DATABASE_PASSWORD
          valueFrom:
            secretKeyRef:
              name: app-secrets
              key: database-password
        # Mount entire secret as volume
        volumeMounts:
        - name: secret-volume
          mountPath: /etc/secrets
      volumes:
      - name: secret-volume
        secret:
          secretName: app-secrets`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          6. Cloud Platform Configuration
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          AWS Configuration
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="AWS Systems Manager Parameter Store" 
              secondary="Hierarchical storage with encryption and versioning" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="AWS Secrets Manager" 
              secondary="Automatic rotation and fine-grained access control" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="ECS Task Definitions" 
              secondary="Environment variables in container definitions" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Lambda Environment Variables" 
              secondary="Built-in encryption with AWS KMS" 
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Azure Configuration
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Azure Key Vault" 
              secondary="Centralized secrets and certificate management" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="App Configuration" 
              secondary="Feature flags and dynamic configuration" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Container Apps Environment Variables" 
              secondary="Secret and non-secret configuration" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          7. Configuration Validation
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Runtime Validation
        </Typography>
        <Typography variant="body1" paragraph>
          Always validate environment variables at application startup:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`// Node.js validation example
const requiredEnvVars = [
  'DATABASE_URL',
  'JWT_SECRET',
  'STRIPE_SECRET_KEY'
];

function validateEnvironment() {
  const missing = requiredEnvVars.filter(varName => !process.env[varName]);
  
  if (missing.length > 0) {
    console.error('Missing required environment variables:', missing);
    process.exit(1);
  }
  
  // Validate formats
  if (process.env.PORT && isNaN(parseInt(process.env.PORT))) {
    console.error('PORT must be a number');
    process.exit(1);
  }
  
  if (process.env.DATABASE_URL && !process.env.DATABASE_URL.startsWith('postgresql://')) {
    console.error('DATABASE_URL must be a valid PostgreSQL connection string');
    process.exit(1);
  }
}

// Run validation on startup
validateEnvironment();`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Configuration Schema
        </Typography>
        <Typography variant="body1" paragraph>
          Define a schema for your configuration to catch errors early:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`// Using Joi for validation
const Joi = require('joi');

const configSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
  PORT: Joi.number().port().default(3000),
  DATABASE_URL: Joi.string().uri().required(),
  JWT_SECRET: Joi.string().min(32).required(),
  REDIS_URL: Joi.string().uri().optional(),
  LOG_LEVEL: Joi.string().valid('error', 'warn', 'info', 'debug').default('info')
});

const { error, value } = configSchema.validate(process.env, {
  allowUnknown: true,
  abortEarly: false
});

if (error) {
  console.error('Configuration validation error:', error.details);
  process.exit(1);
}

module.exports = value;`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          8. Deployment Strategies
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Configuration Deployment Pipeline
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Development" 
              secondary="Local .env files with default values" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Staging" 
              secondary="CI/CD pipeline injects staging secrets" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Production" 
              secondary="Secrets manager or encrypted storage" 
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          GitOps Configuration Management
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Repository structure for GitOps
config/
├── base/
│   ├── configmap.yaml
│   └── kustomization.yaml
├── environments/
│   ├── development/
│   │   ├── configmap.yaml
│   │   ├── secrets.yaml (encrypted)
│   │   └── kustomization.yaml
│   ├── staging/
│   │   ├── configmap.yaml
│   │   ├── secrets.yaml (encrypted)
│   │   └── kustomization.yaml
│   └── production/
│       ├── configmap.yaml
│       ├── secrets.yaml (encrypted)
│       └── kustomization.yaml`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Zero-Downtime Configuration Updates
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Rolling Updates" 
              secondary="Gradually replace instances with new configuration" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Configuration Reload" 
              secondary="Hot-reload configuration without restart (where possible)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Canary Deployments" 
              secondary="Test configuration changes with subset of traffic" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Rollback Strategy" 
              secondary="Quick rollback mechanism for configuration issues" 
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          Conclusion
        </Typography>
        <Typography variant="body1" paragraph>
          Effective environment variable management is crucial for secure, scalable applications. By following best practices for local development, implementing proper security measures, and using the right tools for each deployment environment, you can build robust configuration systems that support your application's growth.
        </Typography>

        <Typography variant="body1" paragraph>
          Remember that configuration management is an ongoing process. Regularly audit your environment variables, rotate secrets, and update your configuration strategy as your application and infrastructure evolve.
        </Typography>

        <Alert severity="success" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>Get started:</strong> Manage your environment variables with our <Link href="/env-manager" style={{ color: 'inherit', textDecoration: 'underline' }}>Environment Variables Manager</Link> and create Kubernetes configurations with our <Link href="/k8s-yaml-generator" style={{ color: 'inherit', textDecoration: 'underline' }}>YAML Generator</Link>.
          </Typography>
        </Alert>

        <Box sx={{ mt: 4, p: 3, backgroundColor: 'action.hover', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Related Tools
          </Typography>
          <Typography variant="body2">
            • <Link href="/env-manager">Environment Variables Manager</Link> - Validate and manage .env files<br/>
            • <Link href="/k8s-yaml-generator">Kubernetes YAML Generator</Link> - Create ConfigMaps and Secrets<br/>
            • <Link href="/base64">Base64 Encoder/Decoder</Link> - Encode secrets for Kubernetes<br/>
            • <Link href="/hash">Hash Generator</Link> - Generate secure secret values<br/>
            • <Link href="/password-generator">Password Generator</Link> - Create strong passwords for configs
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
