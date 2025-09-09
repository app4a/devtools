import React, { useState } from 'react';
import {
  Box,
  Typography,
  Container,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Grid,
  Card,
  CardContent
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Link from 'next/link';
import SEO from '../components/SEO';

const faqData = [
  {
    category: "General",
    questions: [
      {
        question: "Are your developer tools completely free?",
        answer: "Yes, all our developer tools are 100% free to use. No registration required, no usage limits, and no hidden costs. You can access all tools without creating an account."
      },
      {
        question: "Do you store or upload my data?",
        answer: "No, we prioritize your privacy. All processing happens locally in your browser using JavaScript. Your data never leaves your device or gets uploaded to our servers."
      },
      {
        question: "Can I use these tools offline?",
        answer: "Yes, once you load the page, most tools work offline since they run entirely in your browser. However, you'll need an internet connection to initially access the website."
      },
      {
        question: "Are these tools mobile-friendly?",
        answer: "Absolutely! All our tools are responsive and work perfectly on desktop, tablet, and mobile devices. The interface adapts to your screen size for optimal usability."
      }
    ]
  },
  {
    category: "JSON Formatter",
    questions: [
      {
        question: "How do I format JSON online?",
        answer: "Simply paste your JSON data into our JSON formatter, and it will automatically format, validate, and beautify your JSON with proper indentation and syntax highlighting."
      },
      {
        question: "Can your JSON formatter fix syntax errors?",
        answer: "Our JSON formatter will identify and highlight syntax errors, but you'll need to manually fix them. Common errors include missing commas, unescaped quotes, and trailing commas."
      },
      {
        question: "What's the maximum JSON file size supported?",
        answer: "Since processing happens in your browser, the limit depends on your device's memory. Most browsers can handle JSON files up to several megabytes without issues."
      },
      {
        question: "Does the JSON formatter support JSON5 or comments?",
        answer: "Our formatter supports standard JSON specification. For JSON5 or files with comments, you'll need to remove comments before formatting."
      }
    ]
  },
  {
    category: "Base64 Encoder/Decoder",
    questions: [
      {
        question: "What is Base64 encoding used for?",
        answer: "Base64 encoding is used to encode binary data into ASCII characters. Common uses include encoding images for HTML/CSS, email attachments, and transmitting binary data over text-based protocols."
      },
      {
        question: "Is Base64 encoding secure?",
        answer: "Base64 is NOT encryption or security. It's simply encoding for data transmission. Anyone can easily decode Base64 data. Never use it to hide sensitive information."
      },
      {
        question: "Can I encode files with your Base64 tool?",
        answer: "Our tool currently supports text encoding/decoding. For file encoding, you can copy the file content as text or use browser APIs to read file contents first."
      },
      {
        question: "Why is my Base64 encoded data longer than the original?",
        answer: "Base64 encoding increases data size by approximately 33% because it represents 3 bytes of binary data using 4 ASCII characters."
      }
    ]
  },
  {
    category: "Hash Generator",
    questions: [
      {
        question: "Which hash algorithm should I use?",
        answer: "For security: Use SHA-256 or SHA-512. For checksums: MD5 or SHA-1 are acceptable. For passwords: Use bcrypt, scrypt, or Argon2 (not available in our tool)."
      },
      {
        question: "Are MD5 and SHA-1 still secure?",
        answer: "MD5 and SHA-1 have known vulnerabilities and shouldn't be used for security purposes. They're acceptable for checksums and non-security applications."
      },
      {
        question: "Can I hash files with your tool?",
        answer: "Our tool currently hashes text input. For file hashing, you'd need to read the file content first or use command-line tools like 'shasum' or 'md5sum'."
      },
      {
        question: "What's the difference between MD5, SHA-1, and SHA-256?",
        answer: "MD5 produces 128-bit hashes, SHA-1 produces 160-bit hashes, and SHA-256 produces 256-bit hashes. Longer hashes are generally more secure and collision-resistant."
      }
    ]
  },
  {
    category: "JWT Decoder",
    questions: [
      {
        question: "Is it safe to decode JWT tokens online?",
        answer: "Our JWT decoder runs entirely in your browser, so tokens aren't sent to servers. However, never decode production tokens containing sensitive data on any online tool."
      },
      {
        question: "Can your tool verify JWT signatures?",
        answer: "Our tool decodes and displays JWT contents but doesn't verify signatures since that requires the secret key. It's primarily for inspecting token structure and claims."
      },
      {
        question: "What information is in a JWT token?",
        answer: "JWT tokens contain three parts: header (algorithm info), payload (claims/data), and signature (verification). Our tool shows the decoded header and payload."
      },
      {
        question: "Why can't I see the JWT signature?",
        answer: "The signature is used for verification and doesn't contain readable data. It's a cryptographic hash that requires the secret key to verify."
      }
    ]
  },
  {
    category: "Regular Expressions",
    questions: [
      {
        question: "How do I test regex patterns online?",
        answer: "Use our regex tester to input your pattern and test string. The tool will highlight matches, show capture groups, and help debug your regular expressions."
      },
      {
        question: "What regex flavor do you support?",
        answer: "Our regex tester uses JavaScript regex flavor (ECMAScript), which is widely used in web development and supports most common regex features."
      },
      {
        question: "Why isn't my regex pattern working?",
        answer: "Common issues include unescaped special characters, incorrect quantifiers, or wrong anchors. Our tester helps identify these issues with real-time feedback."
      },
      {
        question: "Can I save and share regex patterns?",
        answer: "Currently, patterns aren't saved automatically. Copy your working patterns to save them. We may add pattern saving features in future updates."
      }
    ]
  }
];

export default function FAQ() {
  const [expanded, setExpanded] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.flatMap(category => 
      category.questions.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    )
  };

  return (
    <Container maxWidth="lg">
      <SEO
        title="Frequently Asked Questions - Developer Tools Help & Support"
        description="Get answers to common questions about our free online developer tools including JSON formatter, Base64 encoder, hash generator, JWT decoder, and more."
        canonical="/faq"
        schema={faqSchema}
        keywords={[
          'developer tools faq',
          'json formatter help',
          'base64 encoder questions',
          'jwt decoder help',
          'hash generator faq',
          'regex tester help',
          'free developer tools support'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Typography variant="h3" component="h1" gutterBottom align="center">
          Frequently Asked Questions
        </Typography>
        <Typography variant="h6" component="h2" align="center" color="text.secondary" sx={{ mb: 6 }}>
          Get help with our free online developer tools
        </Typography>

        <Grid container spacing={4}>
          <Grid size={{ xs: 12, md: 8 }}>
            {faqData.map((category, categoryIndex) => (
              <Box key={categoryIndex} sx={{ mb: 4 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{ mb: 3 }}>
                  {category.category}
                </Typography>
                {category.questions.map((faq, questionIndex) => {
                  const panelId = `${categoryIndex}-${questionIndex}`;
                  return (
                    <Accordion
                      key={questionIndex}
                      expanded={expanded === panelId}
                      onChange={handleChange(panelId)}
                      sx={{ mb: 1 }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls={`panel${panelId}-content`}
                        id={`panel${panelId}-header`}
                      >
                        <Typography variant="h6" component="h3">
                          {faq.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography>
                          {faq.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  );
                })}
              </Box>
            ))}
          </Grid>

          <Grid size={{ xs: 12, md: 4 }}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Need More Help?
                </Typography>
                <Typography paragraph>
                  Can't find what you're looking for? Check out our comprehensive guides and tutorials.
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Link href="/blog" passHref>
                    <Typography component="a" color="primary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
                      → Read Developer Blog
                    </Typography>
                  </Link>
                  <Link href="/blog/json-formatting-guide-2024" passHref>
                    <Typography component="a" color="primary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
                      → JSON Formatting Guide
                    </Typography>
                  </Link>
                  <Link href="/blog/jwt-security-best-practices" passHref>
                    <Typography component="a" color="primary" display="block" sx={{ mb: 1, textDecoration: 'none' }}>
                      → JWT Security Guide
                    </Typography>
                  </Link>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Popular Tools
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Link href="/json" passHref>
                    <Chip label="JSON Formatter" component="a" clickable color="primary" />
                  </Link>
                  <Link href="/base64" passHref>
                    <Chip label="Base64 Encoder" component="a" clickable color="primary" />
                  </Link>
                  <Link href="/jwt" passHref>
                    <Chip label="JWT Decoder" component="a" clickable color="primary" />
                  </Link>
                  <Link href="/hash" passHref>
                    <Chip label="Hash Generator" component="a" clickable color="primary" />
                  </Link>
                  <Link href="/regex" passHref>
                    <Chip label="Regex Tester" component="a" clickable color="primary" />
                  </Link>
                  <Link href="/color" passHref>
                    <Chip label="Color Converter" component="a" clickable color="primary" />
                  </Link>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
