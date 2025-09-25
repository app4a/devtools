import React, { useState, useMemo, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Paper,
  Grid,
  Card,
  CardContent,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Alert,
  IconButton,
  Snackbar,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Chip,
  Tabs,
  Tab,
  Stack,
  Divider,
  Switch,
  FormControlLabel,
  AccordionSummary,
  AccordionDetails,
  Accordion,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Slider,
  Autocomplete
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import BuildIcon from '@mui/icons-material/Build';
import CloudIcon from '@mui/icons-material/Cloud';
import StorageIcon from '@mui/icons-material/Storage';
import SecurityIcon from '@mui/icons-material/Security';
import NetworkingIcon from '@mui/icons-material/Dns';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import SaveIcon from '@mui/icons-material/Save';
import LoadIcon from '@mui/icons-material/CloudDownload';
import Head from 'next/head';

export default function K8sYamlGenerator({ name, description }) {
  const [currentTab, setCurrentTab] = useState(0);
  const [resourceType, setResourceType] = useState('deployment');
  const [resourceName, setResourceName] = useState('my-app');
  const [namespace, setNamespace] = useState('default');
  const [replicas, setReplicas] = useState(3);
  const [containerImage, setContainerImage] = useState('nginx:latest');
  const [containerPort, setContainerPort] = useState(80);
  const [serviceType, setServiceType] = useState('ClusterIP');
  const [servicePort, setServicePort] = useState(80);
  const [cpuRequest, setCpuRequest] = useState('100m');
  const [memoryRequest, setMemoryRequest] = useState('128Mi');
  const [cpuLimit, setCpuLimit] = useState('500m');
  const [memoryLimit, setMemoryLimit] = useState('512Mi');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [envVars, setEnvVars] = useState([]);
  const [volumes, setVolumes] = useState([]);
  const [labels, setLabels] = useState([{ key: 'app', value: 'my-app' }]);
  const [annotations, setAnnotations] = useState([]);
  const [savedTemplates, setSavedTemplates] = useState([]);
  const [templateName, setTemplateName] = useState('');
  const [openTemplateDialog, setOpenTemplateDialog] = useState(false);
  const [ingressHost, setIngressHost] = useState('example.com');
  const [ingressPath, setIngressPath] = useState('/');
  const [tlsEnabled, setTlsEnabled] = useState(false);
  const [tlsSecretName, setTlsSecretName] = useState('');
  
  // Available resource types
  const resourceTypes = [
    { value: 'deployment', label: 'Deployment', description: 'Manages a replicated application' },
    { value: 'service', label: 'Service', description: 'Exposes an application running on pods' },
    { value: 'configmap', label: 'ConfigMap', description: 'Configuration data for applications' },
    { value: 'secret', label: 'Secret', description: 'Sensitive data like passwords and keys' },
    { value: 'ingress', label: 'Ingress', description: 'Manages external access to services' },
    { value: 'persistentvolume', label: 'PersistentVolume', description: 'Storage resource in the cluster' },
    { value: 'persistentvolumeclaim', label: 'PersistentVolumeClaim', description: 'Request for storage by a user' },
    { value: 'statefulset', label: 'StatefulSet', description: 'Manages stateful applications' },
    { value: 'daemonset', label: 'DaemonSet', description: 'Runs a copy on all nodes' },
    { value: 'job', label: 'Job', description: 'Runs pods to completion' },
    { value: 'cronjob', label: 'CronJob', description: 'Runs jobs on a cron schedule' },
    { value: 'hpa', label: 'HorizontalPodAutoscaler', description: 'Automatically scales pods' }
  ];

  // Common Kubernetes templates
  const templates = {
    'web-app': {
      name: 'Web Application',
      description: 'Complete web app with deployment, service, and ingress',
      resources: ['deployment', 'service', 'ingress'],
      config: {
        replicas: 3,
        containerImage: 'nginx:latest',
        containerPort: 80,
        serviceType: 'ClusterIP',
        servicePort: 80,
        ingressHost: 'my-app.example.com'
      }
    },
    'microservice': {
      name: 'Microservice',
      description: 'Basic microservice with deployment and service',
      resources: ['deployment', 'service'],
      config: {
        replicas: 2,
        containerImage: 'my-service:latest',
        containerPort: 8080,
        serviceType: 'ClusterIP'
      }
    },
    'database': {
      name: 'Database',
      description: 'Stateful database with persistent storage',
      resources: ['statefulset', 'service', 'persistentvolumeclaim'],
      config: {
        replicas: 1,
        containerImage: 'postgres:13',
        containerPort: 5432,
        serviceType: 'ClusterIP'
      }
    },
    'batch-job': {
      name: 'Batch Job',
      description: 'One-time job for data processing',
      resources: ['job'],
      config: {
        containerImage: 'busybox:latest'
      }
    }
  };

  // Initialize saved templates from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('k8s-templates');
    if (saved) {
      setSavedTemplates(JSON.parse(saved));
    }
  }, []);

  // Generate YAML for different resource types
  const generateYaml = () => {
    const labelsObj = {};
    labels.forEach(label => {
      if (label.key && label.value) {
        labelsObj[label.key] = label.value;
      }
    });

    const annotationsObj = {};
    annotations.forEach(annotation => {
      if (annotation.key && annotation.value) {
        annotationsObj[annotation.key] = annotation.value;
      }
    });

    const envArray = envVars.filter(env => env.key && env.value).map(env => ({
      name: env.key,
      value: env.value
    }));

    switch (resourceType) {
      case 'deployment':
        return `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${resourceName}
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
${Object.keys(annotationsObj).length > 0 ? `  annotations:\n${Object.entries(annotationsObj).map(([k, v]) => `    ${k}: "${v}"`).join('\n')}` : ''}
spec:
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${resourceName}
  template:
    metadata:
      labels:
        app: ${resourceName}
${Object.entries(labelsObj).map(([k, v]) => `        ${k}: ${v}`).join('\n')}
    spec:
      containers:
      - name: ${resourceName}
        image: ${containerImage}
        ports:
        - containerPort: ${containerPort}
${envArray.length > 0 ? `        env:\n${envArray.map(env => `        - name: ${env.name}\n          value: "${env.value}"`).join('\n')}` : ''}
        resources:
          requests:
            cpu: ${cpuRequest}
            memory: ${memoryRequest}
          limits:
            cpu: ${cpuLimit}
            memory: ${memoryLimit}`;

      case 'service':
        return `apiVersion: v1
kind: Service
metadata:
  name: ${resourceName}-service
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
${Object.keys(annotationsObj).length > 0 ? `  annotations:\n${Object.entries(annotationsObj).map(([k, v]) => `    ${k}: "${v}"`).join('\n')}` : ''}
spec:
  type: ${serviceType}
  ports:
  - port: ${servicePort}
    targetPort: ${containerPort}
    protocol: TCP
  selector:
    app: ${resourceName}`;

      case 'configmap':
        return `apiVersion: v1
kind: ConfigMap
metadata:
  name: ${resourceName}-config
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
data:
${envArray.map(env => `  ${env.name}: "${env.value}"`).join('\n')}`;

      case 'secret':
        return `apiVersion: v1
kind: Secret
metadata:
  name: ${resourceName}-secret
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
type: Opaque
data:
${envArray.map(env => `  ${env.name}: ${Buffer.from(env.value).toString('base64')}`).join('\n')}`;

      case 'ingress':
        return `apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: ${resourceName}-ingress
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
${Object.keys(annotationsObj).length > 0 ? `  annotations:\n${Object.entries(annotationsObj).map(([k, v]) => `    ${k}: "${v}"`).join('\n')}` : ''}
spec:
${tlsEnabled ? `  tls:
  - hosts:
    - ${ingressHost}
    secretName: ${tlsSecretName || `${resourceName}-tls`}` : ''}
  rules:
  - host: ${ingressHost}
    http:
      paths:
      - path: ${ingressPath}
        pathType: Prefix
        backend:
          service:
            name: ${resourceName}-service
            port:
              number: ${servicePort}`;

      case 'persistentvolumeclaim':
        return `apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: ${resourceName}-pvc
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
spec:
  accessModes:
    - ReadWriteOnce
  resources:
    requests:
      storage: 1Gi`;

      case 'statefulset':
        return `apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: ${resourceName}
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
spec:
  serviceName: ${resourceName}-headless
  replicas: ${replicas}
  selector:
    matchLabels:
      app: ${resourceName}
  template:
    metadata:
      labels:
        app: ${resourceName}
    spec:
      containers:
      - name: ${resourceName}
        image: ${containerImage}
        ports:
        - containerPort: ${containerPort}
${envArray.length > 0 ? `        env:\n${envArray.map(env => `        - name: ${env.name}\n          value: "${env.value}"`).join('\n')}` : ''}
        resources:
          requests:
            cpu: ${cpuRequest}
            memory: ${memoryRequest}
          limits:
            cpu: ${cpuLimit}
            memory: ${memoryLimit}
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: [ "ReadWriteOnce" ]
      resources:
        requests:
          storage: 1Gi`;

      case 'job':
        return `apiVersion: batch/v1
kind: Job
metadata:
  name: ${resourceName}
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
spec:
  template:
    spec:
      containers:
      - name: ${resourceName}
        image: ${containerImage}
${envArray.length > 0 ? `        env:\n${envArray.map(env => `        - name: ${env.name}\n          value: "${env.value}"`).join('\n')}` : ''}
        resources:
          requests:
            cpu: ${cpuRequest}
            memory: ${memoryRequest}
          limits:
            cpu: ${cpuLimit}
            memory: ${memoryLimit}
      restartPolicy: Never
  backoffLimit: 4`;

      case 'cronjob':
        return `apiVersion: batch/v1
kind: CronJob
metadata:
  name: ${resourceName}
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
spec:
  schedule: "0 1 * * *"  # Daily at 1 AM
  jobTemplate:
    spec:
      template:
        spec:
          containers:
          - name: ${resourceName}
            image: ${containerImage}
${envArray.length > 0 ? `            env:\n${envArray.map(env => `            - name: ${env.name}\n              value: "${env.value}"`).join('\n')}` : ''}
            resources:
              requests:
                cpu: ${cpuRequest}
                memory: ${memoryRequest}
              limits:
                cpu: ${cpuLimit}
                memory: ${memoryLimit}
          restartPolicy: OnFailure`;

      case 'hpa':
        return `apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: ${resourceName}-hpa
  namespace: ${namespace}
  labels:
${Object.entries(labelsObj).map(([k, v]) => `    ${k}: ${v}`).join('\n')}
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: ${resourceName}
  minReplicas: 1
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 80
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80`;

      default:
        return '# Select a resource type to generate YAML';
    }
  };

  // Validate YAML
  const validateYaml = () => {
    const issues = [];
    
    if (!resourceName.trim()) {
      issues.push({ type: 'error', message: 'Resource name is required' });
    }
    
    if (!/^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/.test(resourceName)) {
      issues.push({ type: 'error', message: 'Resource name must be lowercase alphanumeric with hyphens' });
    }
    
    if (!namespace.trim()) {
      issues.push({ type: 'warning', message: 'Namespace should be specified' });
    }
    
    if (resourceType === 'deployment' || resourceType === 'statefulset') {
      if (replicas < 1) {
        issues.push({ type: 'warning', message: 'Replicas should be at least 1' });
      }
      
      if (!containerImage.includes(':')) {
        issues.push({ type: 'warning', message: 'Container image should include a tag' });
      }
      
      if (containerImage.includes(':latest')) {
        issues.push({ type: 'warning', message: 'Avoid using :latest tag in production' });
      }
    }
    
    if (resourceType === 'ingress') {
      if (!ingressHost.includes('.')) {
        issues.push({ type: 'warning', message: 'Ingress host should be a valid domain' });
      }
      
      if (tlsEnabled && !tlsSecretName) {
        issues.push({ type: 'warning', message: 'TLS secret name should be specified when TLS is enabled' });
      }
    }
    
    return issues;
  };

  const validationIssues = useMemo(validateYaml, [
    resourceName, namespace, replicas, containerImage, resourceType, ingressHost, tlsEnabled, tlsSecretName
  ]);

  // Copy to clipboard
  const copyToClipboard = (text, message) => {
    navigator.clipboard.writeText(text).then(() => {
      setSnackbarMessage(message);
      setOpenSnackbar(true);
    });
  };

  // Download YAML file
  const downloadYaml = () => {
    const yaml = generateYaml();
    const blob = new Blob([yaml], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${resourceName}-${resourceType}.yaml`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Add environment variable
  const addEnvVar = () => {
    setEnvVars([...envVars, { id: Date.now(), key: '', value: '' }]);
  };

  // Update environment variable
  const updateEnvVar = (id, field, value) => {
    setEnvVars(envVars.map(env => 
      env.id === id ? { ...env, [field]: value } : env
    ));
  };

  // Remove environment variable
  const removeEnvVar = (id) => {
    setEnvVars(envVars.filter(env => env.id !== id));
  };

  // Add label
  const addLabel = () => {
    setLabels([...labels, { id: Date.now(), key: '', value: '' }]);
  };

  // Update label
  const updateLabel = (index, field, value) => {
    const newLabels = [...labels];
    newLabels[index] = { ...newLabels[index], [field]: value };
    setLabels(newLabels);
  };

  // Remove label
  const removeLabel = (index) => {
    setLabels(labels.filter((_, i) => i !== index));
  };

  // Load template
  const loadTemplate = (template) => {
    if (template.config) {
      setResourceName(template.config.resourceName || resourceName);
      setReplicas(template.config.replicas || replicas);
      setContainerImage(template.config.containerImage || containerImage);
      setContainerPort(template.config.containerPort || containerPort);
      setServiceType(template.config.serviceType || serviceType);
      setServicePort(template.config.servicePort || servicePort);
      setIngressHost(template.config.ingressHost || ingressHost);
    }
    setSnackbarMessage(`Template "${template.name}" loaded`);
    setOpenSnackbar(true);
  };

  // Save template
  const saveTemplate = () => {
    if (!templateName.trim()) return;
    
    const template = {
      id: Date.now(),
      name: templateName,
      resourceType,
      config: {
        resourceName,
        namespace,
        replicas,
        containerImage,
        containerPort,
        serviceType,
        servicePort,
        ingressHost,
        envVars,
        labels,
        annotations
      },
      createdAt: new Date().toISOString()
    };
    
    const updated = [...savedTemplates, template];
    setSavedTemplates(updated);
    localStorage.setItem('k8s-templates', JSON.stringify(updated));
    setTemplateName('');
    setOpenTemplateDialog(false);
    setSnackbarMessage('Template saved successfully');
    setOpenSnackbar(true);
  };

  return (
    <Box sx={{ p: 2 }}>
      <Head>
        <title>{name ? `${name} - Dev Tools` : 'Kubernetes YAML Generator - Dev Tools'}</title>
        <meta name="description" content={description} />
        <meta name="keywords" content="kubernetes yaml generator, k8s config, deployment yaml, service yaml, kubernetes templates" />
      </Head>
      
      <Typography variant="h4" gutterBottom>
        {name}
      </Typography>
      <Typography variant="body1" paragraph color="text.secondary">
        {description}
      </Typography>

      <Alert severity="info" sx={{ mb: 3 }}>
        <strong>Professional Kubernetes Tool:</strong> Generate, validate, and manage Kubernetes YAML 
        configurations with visual builder, templates, and best practices validation.
      </Alert>

      <Tabs value={currentTab} onChange={(e, newValue) => setCurrentTab(newValue)} sx={{ mb: 3 }}>
        <Tab icon={<BuildIcon />} label="Builder" />
        <Tab icon={<CloudIcon />} label="Templates" />
        <Tab icon={<SecurityIcon />} label="Advanced" />
        <Tab icon={<InfoIcon />} label="Validation" />
      </Tabs>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, lg: 8 }}>
          {currentTab === 0 && (
            <Paper sx={{ p: 3 }}>
              <Grid container spacing={3}>
                <Grid size={{ xs: 12, md: 6 }}>
                  <FormControl fullWidth sx={{ mb: 2 }}>
                    <InputLabel>Resource Type</InputLabel>
                    <Select
                      value={resourceType}
                      onChange={(e) => setResourceType(e.target.value)}
                      label="Resource Type"
                    >
                      {resourceTypes.map((type) => (
                        <MenuItem key={type.value} value={type.value}>
                          <Box>
                            <Typography variant="body2">{type.label}</Typography>
                            <Typography variant="caption" color="text.secondary">
                              {type.description}
                            </Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>

                  <TextField
                    label="Resource Name"
                    value={resourceName}
                    onChange={(e) => setResourceName(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                    helperText="Lowercase alphanumeric with hyphens"
                  />

                  <TextField
                    label="Namespace"
                    value={namespace}
                    onChange={(e) => setNamespace(e.target.value)}
                    fullWidth
                    sx={{ mb: 2 }}
                  />

                  {(resourceType === 'deployment' || resourceType === 'statefulset') && (
                    <>
                      <Typography gutterBottom>Replicas: {replicas}</Typography>
                      <Slider
                        value={replicas}
                        onChange={(e, value) => setReplicas(value)}
                        min={1}
                        max={10}
                        step={1}
                        marks
                        sx={{ mb: 3 }}
                      />

                      <TextField
                        label="Container Image"
                        value={containerImage}
                        onChange={(e) => setContainerImage(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                        helperText="e.g., nginx:1.21, node:16-alpine"
                      />

                      <TextField
                        label="Container Port"
                        type="number"
                        value={containerPort}
                        onChange={(e) => setContainerPort(parseInt(e.target.value))}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                    </>
                  )}

                  {resourceType === 'service' && (
                    <>
                      <FormControl fullWidth sx={{ mb: 2 }}>
                        <InputLabel>Service Type</InputLabel>
                        <Select
                          value={serviceType}
                          onChange={(e) => setServiceType(e.target.value)}
                          label="Service Type"
                        >
                          <MenuItem value="ClusterIP">ClusterIP</MenuItem>
                          <MenuItem value="NodePort">NodePort</MenuItem>
                          <MenuItem value="LoadBalancer">LoadBalancer</MenuItem>
                          <MenuItem value="ExternalName">ExternalName</MenuItem>
                        </Select>
                      </FormControl>

                      <TextField
                        label="Service Port"
                        type="number"
                        value={servicePort}
                        onChange={(e) => setServicePort(parseInt(e.target.value))}
                        fullWidth
                        sx={{ mb: 2 }}
                      />
                    </>
                  )}

                  {resourceType === 'ingress' && (
                    <>
                      <TextField
                        label="Host"
                        value={ingressHost}
                        onChange={(e) => setIngressHost(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                        helperText="e.g., api.example.com"
                      />

                      <TextField
                        label="Path"
                        value={ingressPath}
                        onChange={(e) => setIngressPath(e.target.value)}
                        fullWidth
                        sx={{ mb: 2 }}
                      />

                      <FormControlLabel
                        control={
                          <Switch 
                            checked={tlsEnabled} 
                            onChange={(e) => setTlsEnabled(e.target.checked)}
                          />
                        }
                        label="Enable TLS"
                        sx={{ mb: 2 }}
                      />

                      {tlsEnabled && (
                        <TextField
                          label="TLS Secret Name"
                          value={tlsSecretName}
                          onChange={(e) => setTlsSecretName(e.target.value)}
                          fullWidth
                          sx={{ mb: 2 }}
                        />
                      )}
                    </>
                  )}
                </Grid>

                <Grid size={{ xs: 12, md: 6 }}>
                  <Typography variant="h6" gutterBottom>Generated YAML</Typography>
                  <TextField
                    multiline
                    rows={20}
                    value={generateYaml()}
                    fullWidth
                    InputProps={{
                      readOnly: true,
                      sx: {
                        fontFamily: 'monospace',
                        fontSize: '0.75rem',
                      }
                    }}
                  />

                  <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<ContentCopyIcon />}
                      onClick={() => copyToClipboard(generateYaml(), 'YAML copied to clipboard')}
                    >
                      Copy YAML
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<DownloadIcon />}
                      onClick={downloadYaml}
                    >
                      Download
                    </Button>
                    <Button
                      variant="outlined"
                      startIcon={<SaveIcon />}
                      onClick={() => setOpenTemplateDialog(true)}
                    >
                      Save Template
                    </Button>
                  </Stack>
                </Grid>
              </Grid>
            </Paper>
          )}

          {currentTab === 1 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Quick Start Templates</Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                {Object.entries(templates).map(([key, template]) => (
                  <Grid size={{ xs: 12, md: 6 }} key={key}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        '&:hover': { bgcolor: 'action.hover' }
                      }}
                      onClick={() => loadTemplate(template)}
                    >
                      <CardContent>
                        <Typography variant="h6" gutterBottom>{template.name}</Typography>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                          {template.description}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
                          {template.resources.map((resource) => (
                            <Chip key={resource} label={resource} size="small" />
                          ))}
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>

              {savedTemplates.length > 0 && (
                <>
                  <Divider sx={{ my: 3 }} />
                  <Typography variant="h6" gutterBottom>Saved Templates</Typography>
                  <Grid container spacing={2}>
                    {savedTemplates.map((template) => (
                      <Grid size={{ xs: 12, md: 6 }} key={template.id}>
                        <Card>
                          <CardContent>
                            <Typography variant="h6" gutterBottom>{template.name}</Typography>
                            <Typography variant="body2" color="text.secondary" gutterBottom>
                              {template.resourceType} - Created {new Date(template.createdAt).toLocaleDateString()}
                            </Typography>
                            <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                              <Button
                                size="small"
                                onClick={() => loadTemplate(template)}
                              >
                                Load
                              </Button>
                              <IconButton
                                size="small"
                                onClick={() => {
                                  const updated = savedTemplates.filter(t => t.id !== template.id);
                                  setSavedTemplates(updated);
                                  localStorage.setItem('k8s-templates', JSON.stringify(updated));
                                }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </Stack>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                </>
              )}
            </Paper>
          )}

          {currentTab === 2 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>Advanced Configuration</Typography>
              
              <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Environment Variables</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {envVars.map((envVar) => (
                      <Stack key={envVar.id} direction="row" spacing={2} alignItems="center">
                        <TextField
                          label="Key"
                          value={envVar.key}
                          onChange={(e) => updateEnvVar(envVar.id, 'key', e.target.value)}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          label="Value"
                          value={envVar.value}
                          onChange={(e) => updateEnvVar(envVar.id, 'value', e.target.value)}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <IconButton onClick={() => removeEnvVar(envVar.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Stack>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={addEnvVar}
                      variant="outlined"
                      size="small"
                    >
                      Add Environment Variable
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography>Labels</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Stack spacing={2}>
                    {labels.map((label, index) => (
                      <Stack key={index} direction="row" spacing={2} alignItems="center">
                        <TextField
                          label="Key"
                          value={label.key}
                          onChange={(e) => updateLabel(index, 'key', e.target.value)}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        <TextField
                          label="Value"
                          value={label.value}
                          onChange={(e) => updateLabel(index, 'value', e.target.value)}
                          size="small"
                          sx={{ flex: 1 }}
                        />
                        {index > 0 && (
                          <IconButton onClick={() => removeLabel(index)}>
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Stack>
                    ))}
                    <Button
                      startIcon={<AddIcon />}
                      onClick={addLabel}
                      variant="outlined"
                      size="small"
                    >
                      Add Label
                    </Button>
                  </Stack>
                </AccordionDetails>
              </Accordion>

              {(resourceType === 'deployment' || resourceType === 'statefulset') && (
                <Accordion>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Resource Limits</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" gutterBottom>Requests</Typography>
                        <TextField
                          label="CPU Request"
                          value={cpuRequest}
                          onChange={(e) => setCpuRequest(e.target.value)}
                          fullWidth
                          sx={{ mb: 2 }}
                          helperText="e.g., 100m, 0.5"
                        />
                        <TextField
                          label="Memory Request"
                          value={memoryRequest}
                          onChange={(e) => setMemoryRequest(e.target.value)}
                          fullWidth
                          helperText="e.g., 128Mi, 1Gi"
                        />
                      </Grid>
                      <Grid size={{ xs: 12, sm: 6 }}>
                        <Typography variant="subtitle2" gutterBottom>Limits</Typography>
                        <TextField
                          label="CPU Limit"
                          value={cpuLimit}
                          onChange={(e) => setCpuLimit(e.target.value)}
                          fullWidth
                          sx={{ mb: 2 }}
                          helperText="e.g., 500m, 1"
                        />
                        <TextField
                          label="Memory Limit"
                          value={memoryLimit}
                          onChange={(e) => setMemoryLimit(e.target.value)}
                          fullWidth
                          helperText="e.g., 512Mi, 2Gi"
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              )}
            </Paper>
          )}

          {currentTab === 3 && (
            <Paper sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom>YAML Validation</Typography>
              
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="success.main">
                        {validationIssues.filter(i => i.type === 'success').length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Valid
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="warning.main">
                        {validationIssues.filter(i => i.type === 'warning').length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Warnings
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="error.main">
                        {validationIssues.filter(i => i.type === 'error').length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Errors
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
                <Grid size={{ xs: 6, sm: 3 }}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" color="primary">
                        {generateYaml().split('\n').length}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Lines
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>

              {validationIssues.length > 0 && (
                <Alert severity={validationIssues.some(i => i.type === 'error') ? 'error' : 'warning'}>
                  <Typography variant="subtitle2" gutterBottom>
                    Validation Issues ({validationIssues.length})
                  </Typography>
                  <List>
                    {validationIssues.map((issue, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                              {issue.type === 'error' ? (
                                <WarningIcon color="error" fontSize="small" />
                              ) : (
                                <InfoIcon color="warning" fontSize="small" />
                              )}
                              <Typography variant="body2">{issue.message}</Typography>
                            </Box>
                          }
                        />
                      </ListItem>
                    ))}
                  </List>
                </Alert>
              )}

              {validationIssues.length === 0 && (
                <Alert severity="success">
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CheckCircleIcon />
                    <Typography>Configuration is valid!</Typography>
                  </Box>
                </Alert>
              )}
            </Paper>
          )}
        </Grid>

        <Grid size={{ xs: 12, lg: 4 }}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h6" gutterBottom>Resource Info</Typography>
            <Stack spacing={1}>
              <Typography variant="body2">
                <strong>Type:</strong> {resourceTypes.find(t => t.value === resourceType)?.label}
              </Typography>
              <Typography variant="body2">
                <strong>Name:</strong> {resourceName}
              </Typography>
              <Typography variant="body2">
                <strong>Namespace:</strong> {namespace}
              </Typography>
              {(resourceType === 'deployment' || resourceType === 'statefulset') && (
                <>
                  <Typography variant="body2">
                    <strong>Replicas:</strong> {replicas}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Image:</strong> {containerImage}
                  </Typography>
                </>
              )}
              <Typography variant="body2">
                <strong>Environment Variables:</strong> {envVars.length}
              </Typography>
              <Typography variant="body2">
                <strong>Labels:</strong> {labels.length}
              </Typography>
            </Stack>
          </Paper>

          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>Best Practices</Typography>
            <List dense>
              <ListItem>
                <ListItemText
                  primary="Use specific image tags"
                  secondary="Avoid :latest in production"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Set resource limits"
                  secondary="Prevent resource starvation"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Use health checks"
                  secondary="Ensure pod reliability"
                />
              </ListItem>
              <ListItem>
                <ListItemText
                  primary="Apply security contexts"
                  secondary="Run with minimal privileges"
                />
              </ListItem>
            </List>
          </Paper>
        </Grid>
      </Grid>

      {/* Template Save Dialog */}
      <Dialog open={openTemplateDialog} onClose={() => setOpenTemplateDialog(false)}>
        <DialogTitle>Save Template</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Template Name"
            fullWidth
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            placeholder="e.g., My Web App Template"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenTemplateDialog(false)}>Cancel</Button>
          <Button onClick={saveTemplate} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={3000}
        onClose={() => setOpenSnackbar(false)}
        message={snackbarMessage}
      />
    </Box>
  );
}

