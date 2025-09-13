import React, { useState, useMemo, useRef } from 'react';
import {
  Typography,
  Box,
  IconButton,
  Snackbar,
  Paper,
  Grid,
  ToggleButtonGroup,
  ToggleButton,
  Button,
  Card,
  CardContent,
  Alert,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Tabs,
  Tab,
  FormControlLabel,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails
} from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import DownloadIcon from '@mui/icons-material/Download';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import CompressIcon from '@mui/icons-material/Compress';
import InfoIcon from '@mui/icons-material/Info';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import StorageIcon from '@mui/icons-material/Storage';
import Editor from 'react-simple-code-editor';
import { highlight, languages } from 'prismjs/components/prism-core';
import 'prismjs/components/prism-sql';
import { format as formatSql } from 'sql-formatter';
import Head from 'next/head';

const LineNumberedEditor = ({ value, onValueChange, readOnly, placeholder, error }) => {
  const lineNumbers = useMemo(() => {
    if (!value) {
      return '1';
    }
    
    const lines = value.split('\n');
    const lineCount = lines.length;
    
    // Show line numbers for actual content lines
    // If the last character is a newline, show one additional line for the cursor
    const showExtraLine = value.endsWith('\n');
    const totalLines = showExtraLine ? lineCount + 1 : lineCount;
    
    return Array.from({ length: totalLines }, (_, i) => i + 1).join('\n');
  }, [value]);

  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        display: 'flex', 
        flex: 1, 
        overflow: 'hidden',
        backgroundColor: error ? 'error.light' : 'background.paper',
        border: error ? '1px solid' : undefined,
        borderColor: error ? 'error.main' : undefined,
        minHeight: '400px'
      }}
    >
      <Box
        component="pre"
        sx={{
          textAlign: 'right',
          userSelect: 'none',
          p: 1,
          pr: 2,
          color: '#666',
          borderRight: 1,
          borderColor: 'divider',
          overflow: 'auto',
          fontFamily: 'monospace',
          fontSize: 14,
          lineHeight: '21px',
          margin: 0,
          backgroundColor: '#f5f5f5',
          minWidth: '40px'
        }}
      >
        {lineNumbers}
      </Box>
      <Editor
        value={value}
        onValueChange={onValueChange}
        highlight={(code) => highlight(code, languages.sql, 'sql')}
        padding={10}
        readOnly={readOnly}
        placeholder={placeholder}
        style={{
          flex: 1,
          fontFamily: 'monospace',
          fontSize: 14,
          lineHeight: '21px',
          minHeight: '400px',
          overflow: 'auto',
          backgroundColor: 'transparent'
        }}
      />
    </Paper>
  );
};

const SqlValidator = ({ sql }) => {
  const issues = useMemo(() => {
    const problems = [];
    
    try {
      const lines = sql.split('\n');
      const upperCaseSql = sql.toUpperCase();
      
      // Basic SQL validation checks
      lines.forEach((line, index) => {
        const lineNum = index + 1;
        const trimmed = line.trim();
        const upperTrimmed = trimmed.toUpperCase();
        
        // Check for common SQL syntax issues
        if (trimmed && !trimmed.endsWith(';') && !trimmed.endsWith(',') && 
            !upperTrimmed.includes('SELECT') && !upperTrimmed.includes('FROM') &&
            !upperTrimmed.includes('WHERE') && !upperTrimmed.includes('ORDER') &&
            !upperTrimmed.includes('GROUP') && !upperTrimmed.includes('HAVING') &&
            !upperTrimmed.includes('JOIN') && !upperTrimmed.includes('INSERT') &&
            !upperTrimmed.includes('UPDATE') && !upperTrimmed.includes('DELETE') &&
            !upperTrimmed.includes('CREATE') && !upperTrimmed.includes('DROP') &&
            !upperTrimmed.includes('ALTER') && !trimmed.includes('(') && 
            !trimmed.includes(')') && !trimmed.includes('--')) {
          // This might be incomplete
        }
        
        // Check for missing semicolons at statement ends
        if (upperTrimmed.match(/^(SELECT|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)/) && 
            !trimmed.endsWith(';') && index === lines.length - 1) {
          problems.push({
            line: lineNum,
            type: 'warning',
            message: 'Consider adding semicolon at end of statement',
            code: trimmed
          });
        }
        
        // Check for SQL injection patterns
        if (trimmed.includes("'") && !trimmed.includes("''")) {
          const singleQuotes = (trimmed.match(/'/g) || []).length;
          if (singleQuotes % 2 !== 0) {
            problems.push({
              line: lineNum,
              type: 'error',
              message: 'Unmatched single quote - potential syntax error',
              code: trimmed
            });
          }
        }
        
        // Check for common typos and invalid keywords
        const commonTypos = [
          { wrong: 'SELCT', correct: 'SELECT' },
          { wrong: 'FORM', correct: 'FROM' },
          { wrong: 'WHRE', correct: 'WHERE' },
          { wrong: 'GROPU', correct: 'GROUP' },
          { wrong: 'OERDER', correct: 'ORDER' },
          { wrong: 'INSS', correct: 'INNER' },
          { wrong: 'INNNER', correct: 'INNER' },
          { wrong: 'OUTTER', correct: 'OUTER' },
          { wrong: 'LEFFT', correct: 'LEFT' },
          { wrong: 'RIGTH', correct: 'RIGHT' },
          { wrong: 'RGHT', correct: 'RIGHT' },
          { wrong: 'JION', correct: 'JOIN' },
          { wrong: 'JOING', correct: 'JOIN' },
          { wrong: 'UPDTE', correct: 'UPDATE' },
          { wrong: 'DELTE', correct: 'DELETE' },
          { wrong: 'CRATE', correct: 'CREATE' },
          { wrong: 'CRAETE', correct: 'CREATE' },
          { wrong: 'ALTR', correct: 'ALTER' },
          { wrong: 'HAVIG', correct: 'HAVING' },
          { wrong: 'HAVNG', correct: 'HAVING' },
          { wrong: 'ORDR', correct: 'ORDER' },
          { wrong: 'ORDDER', correct: 'ORDER' },
          { wrong: 'GROOP', correct: 'GROUP' },
          { wrong: 'INSRT', correct: 'INSERT' },
          { wrong: 'VALUS', correct: 'VALUES' }
        ];
        
        commonTypos.forEach(typo => {
          if (upperTrimmed.includes(typo.wrong)) {
            problems.push({
              line: lineNum,
              type: 'error',
              message: `Possible typo: "${typo.wrong}" should be "${typo.correct}"`,
              code: trimmed
            });
          }
        });

        // Check for invalid JOIN syntax patterns
        const joinPattern = /\b(\w+)\s+JOIN\b/gi;
        const joinMatches = trimmed.match(joinPattern);
        if (joinMatches) {
          joinMatches.forEach(match => {
            const joinType = match.split(' ')[0].toUpperCase();
            const validJoinTypes = ['INNER', 'LEFT', 'RIGHT', 'FULL', 'CROSS', 'OUTER'];
            if (!validJoinTypes.includes(joinType) && joinType !== 'JOIN') {
              problems.push({
                line: lineNum,
                type: 'error',
                message: `Invalid JOIN type: "${joinType}". Valid types are: ${validJoinTypes.join(', ')}`,
                code: trimmed
              });
            }
          });
        }

        // Check for malformed keywords
        const invalidKeywordPatterns = [
          /\bINSS\b/i,
          /\bSELCT\b/i,
          /\bFORM\b(?!\s+(SELECT|VALUES))/i,
          /\bWHRE\b/i,
          /\bGROPU\b/i,
          /\bORDR\b/i,
          /\bJION\b/i,
          /\bUPDTE\b/i,
          /\bDELTE\b/i,
          /\bCRATE\b/i,
          /\bALTR\b/i
        ];

        invalidKeywordPatterns.forEach(pattern => {
          if (pattern.test(trimmed)) {
            const match = trimmed.match(pattern);
            if (match) {
              problems.push({
                line: lineNum,
                type: 'error',
                message: `Invalid SQL keyword: "${match[0]}"`,
                code: trimmed
              });
            }
          }
        });
        
        // Check for deprecated syntax (basic)
        if (upperTrimmed.includes('!=')) {
          problems.push({
            line: lineNum,
            type: 'info',
            message: 'Consider using standard "<>" instead of "!="',
            code: trimmed
          });
        }
      });
      
      // Check for balanced parentheses
      const openParens = (sql.match(/\(/g) || []).length;
      const closeParens = (sql.match(/\)/g) || []).length;
      
      if (openParens !== closeParens) {
        problems.push({
          line: 0,
          type: 'error',
          message: `Mismatched parentheses: ${openParens} opening, ${closeParens} closing`,
          code: ''
        });
      }
      
      // Check for basic SELECT structure
      if (upperCaseSql.includes('SELECT') && !upperCaseSql.includes('FROM') && 
          !upperCaseSql.includes('DUAL')) {
        problems.push({
          line: 0,
          type: 'warning',
          message: 'SELECT statement without FROM clause (may be incomplete)',
          code: ''
        });
      }
      
    } catch (error) {
      problems.push({
        line: 0,
        type: 'error',
        message: 'SQL parsing error: ' + error.message,
        code: ''
      });
    }
    
    return problems;
  }, [sql]);

  if (issues.length === 0) {
    return (
      <Alert severity="success" sx={{ mb: 2 }}>
        <CheckCircleIcon sx={{ mr: 1 }} />
        SQL appears to be valid with no issues detected
      </Alert>
    );
  }

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          SQL Validation Results
        </Typography>
        
        <List dense>
          {issues.map((issue, index) => (
            <ListItem key={index} divider>
              <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                {issue.type === 'error' && <ErrorIcon color="error" sx={{ mr: 1 }} />}
                {issue.type === 'warning' && <WarningIcon color="warning" sx={{ mr: 1 }} />}
                {issue.type === 'info' && <InfoIcon color="info" sx={{ mr: 1 }} />}
                
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="body2">
                    {issue.line > 0 && `Line ${issue.line}: `}{issue.message}
                  </Typography>
                  {issue.code && (
                    <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'text.secondary' }}>
                      {issue.code}
                    </Typography>
                  )}
                </Box>
              </Box>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

const SqlAnalyzer = ({ sql }) => {
  const analysis = useMemo(() => {
    const keywords = {};
    const tables = [];
    const columns = [];
    const functions = [];
    
    try {
      const upperSql = sql.toUpperCase();
      
      // Count keywords
      const sqlKeywords = [
        'SELECT', 'FROM', 'WHERE', 'JOIN', 'INNER', 'LEFT', 'RIGHT', 'FULL', 'OUTER',
        'ON', 'GROUP', 'BY', 'HAVING', 'ORDER', 'INSERT', 'INTO', 'VALUES',
        'UPDATE', 'SET', 'DELETE', 'CREATE', 'TABLE', 'DROP', 'ALTER', 'INDEX',
        'UNION', 'ALL', 'DISTINCT', 'AS', 'AND', 'OR', 'NOT', 'IN', 'EXISTS',
        'LIKE', 'BETWEEN', 'IS', 'NULL', 'CASE', 'WHEN', 'THEN', 'ELSE', 'END'
      ];
      
      sqlKeywords.forEach(keyword => {
        const matches = upperSql.match(new RegExp(`\\b${keyword}\\b`, 'g'));
        if (matches) {
          keywords[keyword] = matches.length;
        }
      });
      
      // Extract table names (basic)
      const fromMatches = sql.match(/FROM\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi);
      if (fromMatches) {
        fromMatches.forEach(match => {
          const tableName = match.replace(/FROM\s+/i, '').trim();
          if (tableName && !tables.includes(tableName)) {
            tables.push(tableName);
          }
        });
      }
      
      // Extract JOIN table names
      const joinMatches = sql.match(/JOIN\s+([a-zA-Z_][a-zA-Z0-9_]*)/gi);
      if (joinMatches) {
        joinMatches.forEach(match => {
          const tableName = match.replace(/JOIN\s+/i, '').trim();
          if (tableName && !tables.includes(tableName)) {
            tables.push(tableName);
          }
        });
      }
      
      // Extract functions (basic)
      const functionMatches = sql.match(/([A-Z_]+)\s*\(/gi);
      if (functionMatches) {
        functionMatches.forEach(match => {
          const funcName = match.replace(/\s*\(/, '').trim();
          if (funcName && !keywords[funcName] && !functions.includes(funcName)) {
            functions.push(funcName);
          }
        });
      }
      
    } catch (error) {
      console.error('SQL analysis error:', error);
    }
    
    return {
      keywords: Object.entries(keywords).sort((a, b) => b[1] - a[1]),
      tables: tables.slice(0, 20),
      functions: functions.slice(0, 20),
      totalKeywords: Object.values(keywords).reduce((sum, count) => sum + count, 0),
      uniqueKeywords: Object.keys(keywords).length
    };
  }, [sql]);

  return (
    <Card sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          SQL Analysis
        </Typography>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              Keywords ({analysis.uniqueKeywords} unique, {analysis.totalKeywords} total)
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Keyword</TableCell>
                    <TableCell align="right">Count</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {analysis.keywords.map(([keyword, count]) => (
                    <TableRow key={keyword}>
                      <TableCell sx={{ fontFamily: 'monospace' }}>{keyword}</TableCell>
                      <TableCell align="right">{count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </AccordionDetails>
        </Accordion>
        
        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="subtitle2">
              Tables ({analysis.tables.length})
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List dense>
              {analysis.tables.map((table, index) => (
                <ListItem key={index}>
                  <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                    {table}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>
        
        {analysis.functions.length > 0 && (
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="subtitle2">
                Functions ({analysis.functions.length})
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <List dense>
                {analysis.functions.map((func, index) => (
                  <ListItem key={index}>
                    <Typography variant="body2" sx={{ fontFamily: 'monospace' }}>
                      {func}()
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
          </Accordion>
        )}
      </CardContent>
    </Card>
  );
};

export default function SqlFormatter({ name, description }) {
  const [inputSql, setInputSql] = useState(`SELECT u.id, u.username, u.email, p.title, p.content, p.created_at
FROM users u
INNER JOIN posts p ON u.id = p.user_id
WHERE u.active = 1 
  AND p.published = 1
  AND p.created_at >= DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY p.created_at DESC, u.username ASC
LIMIT 50;`);
  
  const [outputSql, setOutputSql] = useState('');
  const [formatMode, setFormatMode] = useState('beautify');
  const [sqlDialect, setSqlDialect] = useState('sql');
  const [indentSize, setIndentSize] = useState(2);
  const [uppercaseKeywords, setUppercaseKeywords] = useState(true);
  const [newlineBeforeKeywords, setNewlineBeforeKeywords] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [currentTab, setCurrentTab] = useState(0);
  const fileInputRef = useRef(null);

  const sqlStats = useMemo(() => {
    if (!inputSql.trim()) return null;
    
    const lines = inputSql.split('\n').length;
    const size = new Blob([inputSql]).size;
    const statements = inputSql.split(';').filter(s => s.trim().length > 0).length;
    const keywords = (inputSql.match(/\b(SELECT|FROM|WHERE|JOIN|INSERT|UPDATE|DELETE|CREATE|DROP|ALTER)\b/gi) || []).length;
    const comments = (inputSql.match(/--.*$/gm) || []).length + (inputSql.match(/\/\*[\s\S]*?\*\//g) || []).length;
    
    const outputSize = outputSql ? new Blob([outputSql]).size : 0;
    const compressionRatio = outputSize && size ? ((size - outputSize) / size * 100).toFixed(1) : 0;
    
    return {
      lines,
      size,
      statements,
      keywords,
      comments,
      outputSize,
      compressionRatio
    };
  }, [inputSql, outputSql]);

  const processSql = () => {
    if (!inputSql.trim()) {
      setOutputSql('');
      return;
    }
    
    setProcessing(true);
    
    try {
      let result = inputSql;
      
      if (formatMode === 'beautify') {
        result = formatSql(inputSql, {
          language: sqlDialect,
          tabWidth: indentSize,
          useTabs: false,
          keywordCase: uppercaseKeywords ? 'upper' : 'lower',
          indentStyle: 'standard',
          logicalOperatorNewline: 'before',
          expressionWidth: 50,
          linesBetweenQueries: 2
        });
      } else if (formatMode === 'minify') {
        // Basic minification
        result = inputSql
          .replace(/\s+/g, ' ')
          .replace(/\s*;\s*/g, ';')
          .replace(/\s*,\s*/g, ',')
          .replace(/\s*\(\s*/g, '(')
          .replace(/\s*\)\s*/g, ')')
          .replace(/\s*=\s*/g, '=')
          .replace(/--.*$/gm, '') // Remove line comments
          .replace(/\/\*[\s\S]*?\*\//g, '') // Remove block comments
          .trim();
      }
      
      setOutputSql(result);
    } catch (error) {
      console.error('SQL processing error:', error);
      setOutputSql('-- Error processing SQL: ' + error.message);
    }
    
    setProcessing(false);
  };

  const copyToClipboard = async (content) => {
    try {
      await navigator.clipboard.writeText(content);
      setOpenSnackbar(true);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const downloadSql = () => {
    const blob = new Blob([outputSql || inputSql], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${formatMode === 'minify' ? 'minified' : 'formatted'}.sql`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setInputSql(e.target.result);
      };
      reader.readAsText(file);
    }
  };

  const sqlExamples = [
    {
      name: 'User Management Query',
      sql: `-- Get active users with their profiles
SELECT 
    u.id,
    u.email,
    u.created_at,
    p.first_name,
    p.last_name,
    p.phone
FROM users u
INNER JOIN profiles p ON u.id = p.user_id
WHERE u.status = 'active'
  AND u.created_at > DATE_SUB(NOW(), INTERVAL 30 DAY)
ORDER BY u.created_at DESC
LIMIT 100;`
    },
    {
      name: 'E-commerce Analytics',
      sql: `-- Sales performance by product category
SELECT 
    c.name AS category,
    COUNT(DISTINCT oi.order_id) AS total_orders,
    COUNT(oi.product_id) AS items_sold,
    SUM(oi.quantity * oi.price) AS revenue,
    AVG(oi.price) AS avg_item_price
FROM order_items oi
INNER JOIN products p ON oi.product_id = p.id
INNER JOIN categories c ON p.category_id = c.id
INNER JOIN orders o ON oi.order_id = o.id
WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 3 MONTH)
  AND o.status = 'completed'
GROUP BY c.id, c.name
HAVING revenue > 1000
ORDER BY revenue DESC;`
    },
    {
      name: 'Employee Performance Report',
      sql: `-- Quarterly employee metrics with ranking
SELECT 
    e.employee_id,
    e.full_name,
    d.department_name,
    COUNT(p.id) AS projects_completed,
    AVG(p.completion_rating) AS avg_rating,
    RANK() OVER (
        PARTITION BY d.id 
        ORDER BY COUNT(p.id) DESC, AVG(p.completion_rating) DESC
    ) AS dept_rank,
    CASE 
        WHEN AVG(p.completion_rating) >= 4.5 THEN 'Excellent'
        WHEN AVG(p.completion_rating) >= 4.0 THEN 'Good'
        WHEN AVG(p.completion_rating) >= 3.5 THEN 'Satisfactory'
        ELSE 'Needs Improvement'
    END AS performance_level
FROM employees e
INNER JOIN departments d ON e.department_id = d.id
LEFT JOIN projects p ON e.employee_id = p.assigned_to
WHERE p.completed_date >= DATE_TRUNC('quarter', NOW())
  AND e.status = 'active'
GROUP BY e.employee_id, e.full_name, d.id, d.department_name
ORDER BY d.department_name, dept_rank;`
    },
    {
      name: 'Customer Segmentation',
      sql: `-- Customer lifetime value analysis
WITH customer_metrics AS (
    SELECT 
        c.customer_id,
        c.email,
        c.registration_date,
        COUNT(DISTINCT o.id) AS total_orders,
        SUM(o.total_amount) AS lifetime_value,
        AVG(o.total_amount) AS avg_order_value,
        DATEDIFF(NOW(), MAX(o.order_date)) AS days_since_last_order
    FROM customers c
    LEFT JOIN orders o ON c.customer_id = o.customer_id
    WHERE c.registration_date >= '2022-01-01'
    GROUP BY c.customer_id, c.email, c.registration_date
),
customer_segments AS (
    SELECT 
        *,
        CASE 
            WHEN lifetime_value >= 1000 AND days_since_last_order <= 30 THEN 'VIP Active'
            WHEN lifetime_value >= 500 AND days_since_last_order <= 60 THEN 'High Value'
            WHEN total_orders >= 3 AND days_since_last_order <= 90 THEN 'Regular'
            WHEN days_since_last_order > 180 THEN 'At Risk'
            ELSE 'New/Low Activity'
        END AS segment
    FROM customer_metrics
)
SELECT 
    segment,
    COUNT(*) AS customer_count,
    AVG(lifetime_value) AS avg_lifetime_value,
    AVG(total_orders) AS avg_orders,
    AVG(days_since_last_order) AS avg_days_inactive
FROM customer_segments
GROUP BY segment
ORDER BY avg_lifetime_value DESC;`
    },
    {
      name: 'Inventory Management',
      sql: `-- Stock level alerts and reorder suggestions
SELECT 
    p.product_id,
    p.product_name,
    p.sku,
    c.category_name,
    i.current_stock,
    i.reserved_stock,
    (i.current_stock - i.reserved_stock) AS available_stock,
    i.reorder_level,
    i.max_stock_level,
    COALESCE(recent_sales.avg_daily_sales, 0) AS avg_daily_sales,
    CASE 
        WHEN (i.current_stock - i.reserved_stock) <= i.reorder_level THEN 'URGENT'
        WHEN (i.current_stock - i.reserved_stock) <= (i.reorder_level * 1.5) THEN 'LOW'
        WHEN (i.current_stock - i.reserved_stock) >= (i.max_stock_level * 0.9) THEN 'OVERSTOCK'
        ELSE 'NORMAL'
    END AS stock_status,
    CEIL(i.max_stock_level - (i.current_stock - i.reserved_stock)) AS suggested_order_qty
FROM products p
INNER JOIN inventory i ON p.product_id = i.product_id
INNER JOIN categories c ON p.category_id = c.id
LEFT JOIN (
    SELECT 
        oi.product_id,
        AVG(daily_sales.total_qty) AS avg_daily_sales
    FROM (
        SELECT 
            oi.product_id,
            DATE(o.order_date) AS sale_date,
            SUM(oi.quantity) AS total_qty
        FROM order_items oi
        INNER JOIN orders o ON oi.order_id = o.id
        WHERE o.order_date >= DATE_SUB(NOW(), INTERVAL 30 DAY)
          AND o.status = 'completed'
        GROUP BY oi.product_id, DATE(o.order_date)
    ) daily_sales
    GROUP BY daily_sales.product_id
) recent_sales ON p.product_id = recent_sales.product_id
WHERE p.status = 'active'
ORDER BY 
    FIELD(stock_status, 'URGENT', 'LOW', 'OVERSTOCK', 'NORMAL'),
    available_stock ASC;`
    },
    {
      name: 'Data Migration Script',
      sql: `-- Migrate user data with validation and rollback support
BEGIN;

-- Create backup table
CREATE TABLE users_backup_20240315 AS 
SELECT * FROM users WHERE created_at < '2024-01-01';

-- Update user email formats
UPDATE users 
SET email = LOWER(TRIM(email))
WHERE email != LOWER(TRIM(email))
  AND email IS NOT NULL;

-- Normalize phone numbers
UPDATE users 
SET phone = REGEXP_REPLACE(phone, '[^0-9+]', '', 'g')
WHERE phone IS NOT NULL;

-- Create audit log
INSERT INTO data_migration_log (
    migration_id, 
    table_name, 
    operation, 
    records_affected, 
    executed_at
) VALUES (
    'USER_CLEANUP_20240315',
    'users',
    'email_phone_normalization',
    ROW_COUNT(),
    NOW()
);

-- Validation check
SELECT 
    COUNT(*) AS total_users,
    COUNT(CASE WHEN email LIKE '%@%' THEN 1 END) AS valid_emails,
    COUNT(CASE WHEN phone ~ '^\\+?[0-9]{10,15}$' THEN 1 END) AS valid_phones,
    COUNT(CASE WHEN created_at IS NULL THEN 1 END) AS missing_dates
FROM users;

-- Uncomment the next line to commit changes
-- COMMIT;

-- If issues found, run: ROLLBACK;`
    }
  ];

  // Auto-process when settings change
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      processSql();
    }, 500);
    
    return () => clearTimeout(timeoutId);
  }, [inputSql, formatMode, sqlDialect, indentSize, uppercaseKeywords, newlineBeforeKeywords]);

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'SQL Query Formatter & Syntax Highlighter - Dev Tools'}</title>
        <meta name="description" content={description} />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional SQL Tool:</strong> Format, minify, validate, and analyze SQL queries with 
        syntax highlighting, multiple dialect support, and comprehensive analysis.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab label="Formatter" />
        <Tab label="Validator" />
        <Tab label="Analyzer" />
        <Tab label="Examples" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <>
              {/* Format Options */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Format Options
                </Typography>
                <Grid container spacing={2} alignItems="center">
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <ToggleButtonGroup
                      value={formatMode}
                      exclusive
                      onChange={(e, newMode) => newMode && setFormatMode(newMode)}
                      size="small"
                      fullWidth
                    >
                      <ToggleButton value="beautify">
                        <FormatIndentIncreaseIcon sx={{ mr: 1 }} />
                        Beautify
                      </ToggleButton>
                      <ToggleButton value="minify">
                        <CompressIcon sx={{ mr: 1 }} />
                        Minify
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                    <FormControl size="small" fullWidth>
                      <InputLabel>SQL Dialect</InputLabel>
                      <Select
                        value={sqlDialect}
                        onChange={(e) => setSqlDialect(e.target.value)}
                        label="SQL Dialect"
                      >
                        <MenuItem value="sql">Standard SQL</MenuItem>
                        <MenuItem value="mysql">MySQL</MenuItem>
                        <MenuItem value="postgresql">PostgreSQL</MenuItem>
                        <MenuItem value="sqlite">SQLite</MenuItem>
                        <MenuItem value="mssql">SQL Server</MenuItem>
                        <MenuItem value="oracle">Oracle</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  
                  <Grid size={{ xs: 12, sm: 6, md: 2 }}>
                    <TextField
                      size="small"
                      label="Indent Size"
                      type="number"
                      value={indentSize}
                      onChange={(e) => setIndentSize(Math.max(1, parseInt(e.target.value) || 2))}
                      fullWidth
                      inputProps={{ min: 1, max: 8 }}
                    />
                  </Grid>
                  
                  <Grid size={{ xs: 12, md: 4 }}>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={uppercaseKeywords} 
                            onChange={(e) => setUppercaseKeywords(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Uppercase Keywords"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox 
                            checked={newlineBeforeKeywords} 
                            onChange={(e) => setNewlineBeforeKeywords(e.target.checked)}
                            size="small"
                          />
                        }
                        label="Newlines"
                      />
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {/* Input SQL */}
              <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    Input SQL
                  </Typography>
                  <Box>
                    <input
                      accept=".sql,.txt"
                      style={{ display: 'none' }}
                      id="file-upload"
                      type="file"
                      onChange={handleFileUpload}
                      ref={fileInputRef}
                    />
                    <label htmlFor="file-upload">
                      <IconButton component="span" color="primary">
                        <FileUploadIcon />
                      </IconButton>
                    </label>
                  </Box>
                </Box>
                <LineNumberedEditor
                  value={inputSql}
                  onValueChange={setInputSql}
                  placeholder="-- Enter your SQL query here..."
                />
              </Paper>

              {/* Output SQL */}
              <Paper sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">
                    {formatMode === 'minify' ? 'Minified' : 'Formatted'} Output
                  </Typography>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    {outputSql && (
                      <>
                        <IconButton onClick={() => copyToClipboard(outputSql)}>
                          <ContentCopyIcon />
                        </IconButton>
                        <IconButton onClick={downloadSql}>
                          <DownloadIcon />
                        </IconButton>
                      </>
                    )}
                  </Box>
                </Box>
                <LineNumberedEditor
                  value={outputSql || 'Processed SQL will appear here...'}
                  readOnly
                />
                
                {sqlStats && sqlStats.compressionRatio > 0 && (
                  <Alert severity="success" sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">Processing Results:</Typography>
                    <Typography variant="body2">
                      Size reduced by {sqlStats.compressionRatio}% 
                      ({(sqlStats.size / 1024).toFixed(1)}KB → {(sqlStats.outputSize / 1024).toFixed(1)}KB)
                    </Typography>
                  </Alert>
                )}
              </Paper>
            </>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                SQL Validation
              </Typography>
              <SqlValidator sql={inputSql} />
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                SQL Analysis
              </Typography>
              <SqlAnalyzer sql={inputSql} />
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>
                SQL Examples
              </Typography>
              <List>
                {sqlExamples.map((example, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemButton 
                      onClick={() => {
                        setInputSql(example.sql);
                        setCurrentTab(0);
                      }}
                      sx={{ py: 2 }}
                    >
                      <ListItemText
                        primary={example.name}
                        secondary={
                          <Typography 
                            variant="caption" 
                            sx={{ fontFamily: 'monospace', display: 'block', mt: 0.5 }}
                          >
                            {example.sql.split('\n')[0]}
                          </Typography>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          {/* SQL Statistics */}
          {sqlStats && (
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  <InfoIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                  SQL Statistics
                </Typography>
                <TableContainer>
                  <Table size="small">
                    <TableBody>
                      <TableRow>
                        <TableCell>Lines</TableCell>
                        <TableCell align="right">{sqlStats.lines.toLocaleString()}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Statements</TableCell>
                        <TableCell align="right">{sqlStats.statements}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Keywords</TableCell>
                        <TableCell align="right">{sqlStats.keywords}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Comments</TableCell>
                        <TableCell align="right">{sqlStats.comments}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell><strong>File Size</strong></TableCell>
                        <TableCell align="right"><strong>{(sqlStats.size / 1024).toFixed(1)} KB</strong></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </CardContent>
            </Card>
          )}

          {/* Dialect Guide */}
          <Card sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <StorageIcon sx={{ verticalAlign: 'middle', mr: 1 }} />
                SQL Dialects
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>MySQL:</strong> Popular open-source
              </Typography>
              <Typography variant="body2" paragraph>
                • LIMIT for row limiting
                • Backticks for identifiers
                • AUTO_INCREMENT columns
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>PostgreSQL:</strong> Advanced features
              </Typography>
              <Typography variant="body2" paragraph>
                • LIMIT/OFFSET for pagination
                • Strong JSON support
                • Window functions
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>SQL Server:</strong> Microsoft
              </Typography>
              <Typography variant="body2" paragraph>
                • TOP for row limiting
                • Square brackets for identifiers
                • T-SQL extensions
              </Typography>
              
              <Typography variant="subtitle2" gutterBottom>
                <strong>Oracle:</strong> Enterprise
              </Typography>
              <Typography variant="body2">
                • ROWNUM for row limiting
                • PL/SQL support
                • Advanced analytics
              </Typography>
            </CardContent>
          </Card>

          {/* SQL Best Practices */}
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                SQL Best Practices
              </Typography>
              <Typography variant="body2" paragraph>
                • Use consistent indentation and formatting
              </Typography>
              <Typography variant="body2" paragraph>
                • Write keywords in UPPERCASE
              </Typography>
              <Typography variant="body2" paragraph>
                • Use meaningful table and column aliases
              </Typography>
              <Typography variant="body2" paragraph>
                • Always specify JOIN conditions explicitly
              </Typography>
              <Typography variant="body2" paragraph>
                • Use parameterized queries to prevent SQL injection
              </Typography>
              <Typography variant="body2">
                • Add comments to explain complex logic
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        message="Copied to clipboard!"
      />
    </Box>
  );
}
