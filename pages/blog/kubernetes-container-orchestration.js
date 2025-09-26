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

export default function KubernetesContainerOrchestration() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Kubernetes and Container Orchestration: Complete DevOps Guide for Modern Applications",
    "description": "Master Kubernetes container orchestration with comprehensive guide covering deployments, services, scaling, monitoring, and best practices for production environments.",
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
      "@id": "https://app4a.github.io/devtools/blog/kubernetes-container-orchestration"
    }
  };

  return (
    <Container maxWidth="md">
      <SEO
        title="Kubernetes and Container Orchestration: Complete DevOps Guide for Modern Applications"
        description="Master Kubernetes container orchestration with comprehensive guide covering deployments, services, scaling, monitoring, and best practices for production environments."
        canonical="/blog/kubernetes-container-orchestration"
        schema={articleSchema}
        keywords={[
          'kubernetes',
          'container orchestration',
          'devops',
          'microservices',
          'docker',
          'cloud native',
          'k8s deployment',
          'kubernetes services',
          'pod management',
          'kubernetes scaling'
        ]}
      />
      
      <Box sx={{ py: 4 }}>
        <Box sx={{ mb: 4 }}>
          <Chip label="DevOps" color="primary" sx={{ mr: 1, mb: 2 }} />
          <Chip label="20 min read" variant="outlined" sx={{ mb: 2 }} />
        </Box>

        <Typography variant="h3" component="h1" gutterBottom>
          Kubernetes and Container Orchestration
        </Typography>
        
        <Typography variant="h6" component="h2" color="text.secondary" gutterBottom sx={{ mb: 4 }}>
          Complete guide to mastering Kubernetes for container orchestration, scaling, and managing modern cloud-native applications
        </Typography>

        <Typography variant="body1" paragraph>
          Kubernetes has revolutionized how we deploy, scale, and manage containerized applications. As the de facto standard for container orchestration, Kubernetes enables organizations to run resilient, scalable applications across any infrastructure. Whether you're running microservices, batch jobs, or complex distributed systems, understanding Kubernetes is essential for modern application deployment.
        </Typography>

        <Typography variant="body1" paragraph>
          This comprehensive guide covers everything from Kubernetes fundamentals to advanced orchestration patterns, helping you build robust, production-ready container platforms that can scale with your business needs.
        </Typography>

        <Alert severity="info" sx={{ mb: 4 }}>
          <Typography variant="body2">
            <strong>Pro Tip:</strong> Use our <Link href="/k8s-yaml-generator" style={{ color: 'inherit', textDecoration: 'underline' }}>Kubernetes YAML Generator</Link> to create deployments, services, and other resources with validation and best practices built-in.
          </Typography>
        </Alert>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          Table of Contents
        </Typography>
        <List>
          <ListItem>
            <ListItemText primary="1. Kubernetes Fundamentals and Architecture" />
          </ListItem>
          <ListItem>
            <ListItemText primary="2. Core Kubernetes Resources" />
          </ListItem>
          <ListItem>
            <ListItemText primary="3. Deployment Strategies and Patterns" />
          </ListItem>
          <ListItem>
            <ListItemText primary="4. Networking and Service Discovery" />
          </ListItem>
          <ListItem>
            <ListItemText primary="5. Storage and Data Management" />
          </ListItem>
          <ListItem>
            <ListItemText primary="6. Scaling and Resource Management" />
          </ListItem>
          <ListItem>
            <ListItemText primary="7. Monitoring and Observability" />
          </ListItem>
          <ListItem>
            <ListItemText primary="8. Security and Best Practices" />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          1. Kubernetes Fundamentals and Architecture
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          What is Kubernetes?
        </Typography>
        <Typography variant="body1" paragraph>
          Kubernetes (K8s) is an open-source container orchestration platform that automates the deployment, scaling, and management of containerized applications. Originally developed by Google, it's now maintained by the Cloud Native Computing Foundation (CNCF).
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Core Benefits
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', backgroundColor: 'primary.light', color: 'primary.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  🚀 Operational Benefits
                </Typography>
                <Typography variant="body2">
                  • Automated deployment and scaling<br/>
                  • Self-healing applications<br/>
                  • Rolling updates and rollbacks<br/>
                  • Service discovery and load balancing<br/>
                  • Secret and configuration management
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card sx={{ height: '100%', backgroundColor: 'secondary.light', color: 'secondary.contrastText' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  💼 Business Benefits
                </Typography>
                <Typography variant="body2">
                  • Infrastructure cost optimization<br/>
                  • Faster time to market<br/>
                  • Improved developer productivity<br/>
                  • Vendor-agnostic platform<br/>
                  • Enhanced application resilience
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Kubernetes Architecture
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`Kubernetes Cluster Architecture:

Control Plane Components:
├── API Server (kube-apiserver)
│   └── Central management component, REST API endpoint
├── etcd
│   └── Distributed key-value store for cluster data
├── Controller Manager (kube-controller-manager)
│   └── Runs controllers that regulate cluster state
├── Scheduler (kube-scheduler)
│   └── Assigns pods to nodes based on resource requirements
└── Cloud Controller Manager
    └── Integrates with cloud provider APIs

Worker Node Components:
├── kubelet
│   └── Node agent that manages pods and containers
├── kube-proxy
│   └── Network proxy for service communication
├── Container Runtime (Docker, containerd, CRI-O)
│   └── Runs containers
└── Pods
    └── Smallest deployable units containing one or more containers`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          2. Core Kubernetes Resources
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Pods: The Basic Building Blocks
        </Typography>
        <Typography variant="body1" paragraph>
          Pods are the smallest deployable units in Kubernetes, containing one or more containers that share storage and network:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Basic Pod definition
apiVersion: v1
kind: Pod
metadata:
  name: nginx-pod
  labels:
    app: nginx
spec:
  containers:
  - name: nginx
    image: nginx:1.21
    ports:
    - containerPort: 80
    resources:
      requests:
        memory: "64Mi"
        cpu: "250m"
      limits:
        memory: "128Mi"
        cpu: "500m"
    env:
    - name: ENVIRONMENT
      value: "production"
    volumeMounts:
    - name: config-volume
      mountPath: /etc/nginx/conf.d
  volumes:
  - name: config-volume
    configMap:
      name: nginx-config`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Deployments: Managing Application Lifecycle
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Deployment for scalable application management
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-app
  labels:
    app: web-app
spec:
  replicas: 3
  strategy:
    type: RollingUpdate
    rollingUpdate:
      maxUnavailable: 1
      maxSurge: 1
  selector:
    matchLabels:
      app: web-app
  template:
    metadata:
      labels:
        app: web-app
    spec:
      containers:
      - name: web-app
        image: myapp:v1.2.0
        ports:
        - containerPort: 8080
        livenessProbe:
          httpGet:
            path: /health
            port: 8080
          initialDelaySeconds: 30
          periodSeconds: 10
        readinessProbe:
          httpGet:
            path: /ready
            port: 8080
          initialDelaySeconds: 5
          periodSeconds: 5`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Services: Network Abstraction
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# ClusterIP Service (internal communication)
apiVersion: v1
kind: Service
metadata:
  name: web-app-service
spec:
  selector:
    app: web-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: ClusterIP

---
# LoadBalancer Service (external access)
apiVersion: v1
kind: Service
metadata:
  name: web-app-external
spec:
  selector:
    app: web-app
  ports:
  - protocol: TCP
    port: 80
    targetPort: 8080
  type: LoadBalancer

---
# Ingress for HTTP/HTTPS routing
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: web-app-ingress
  annotations:
    nginx.ingress.kubernetes.io/rewrite-target: /
    cert-manager.io/cluster-issuer: "letsencrypt-prod"
spec:
  tls:
  - hosts:
    - myapp.example.com
    secretName: myapp-tls
  rules:
  - host: myapp.example.com
    http:
      paths:
      - path: /
        pathType: Prefix
        backend:
          service:
            name: web-app-service
            port:
              number: 80`}
          </Typography>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Generate these YAML configurations easily with our <Link href="/k8s-yaml-generator" style={{ color: 'inherit', textDecoration: 'underline' }}>Kubernetes YAML Generator</Link> - includes validation and best practices.
          </Typography>
        </Alert>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          3. Deployment Strategies and Patterns
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Deployment Strategies
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Rolling Update
                </Typography>
                <Typography variant="body2">
                  Gradually replaces old pods with new ones. Zero downtime but temporary inconsistency during deployment.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  Blue-Green
                </Typography>
                <Typography variant="body2">
                  Maintains two identical environments. Instant switching but requires double resources.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="info.main">
                  Canary
                </Typography>
                <Typography variant="body2">
                  Gradually shifts traffic to new version. Safe testing but complex traffic management.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="warning.main">
                  Recreate
                </Typography>
                <Typography variant="body2">
                  Terminates all pods before creating new ones. Simple but causes downtime.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          GitOps Deployment Pattern
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`GitOps Workflow:

1. Developer pushes code changes
2. CI pipeline builds and tests application
3. CI updates deployment manifests in Git
4. GitOps operator (ArgoCD/Flux) detects changes
5. Operator applies changes to Kubernetes cluster
6. Cluster state matches Git repository state

Benefits:
✅ Git as single source of truth
✅ Declarative configuration
✅ Automated drift detection and correction
✅ Easy rollback using Git history
✅ Audit trail and compliance

Example ArgoCD Application:
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
  name: myapp
  namespace: argocd
spec:
  project: default
  source:
    repoURL: https://github.com/myorg/myapp-deploy
    targetRevision: HEAD
    path: manifests
  destination:
    server: https://kubernetes.default.svc
    namespace: myapp
  syncPolicy:
    automated:
      prune: true
      selfHeal: true`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          4. Networking and Service Discovery
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Kubernetes Networking Model
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Pod-to-Pod Communication" 
              secondary="Every pod gets its own IP address, pods can communicate directly" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Service Discovery" 
              secondary="Services provide stable endpoints for dynamic pod sets" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="External Access" 
              secondary="LoadBalancer, NodePort, and Ingress for external connectivity" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Network Policies" 
              secondary="Security controls for pod-to-pod communication" 
            />
          </ListItem>
        </List>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Service Mesh Integration
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`Service Mesh Benefits (Istio/Linkerd):

🔐 Security
- Mutual TLS between services
- Certificate management
- Security policies

📊 Observability
- Distributed tracing
- Service metrics
- Traffic monitoring

🚦 Traffic Management
- Load balancing strategies
- Circuit breaking
- Retry policies
- A/B testing and canary deployments

Example Istio VirtualService:
apiVersion: networking.istio.io/v1alpha3
kind: VirtualService
metadata:
  name: reviews
spec:
  http:
  - match:
    - headers:
        end-user:
          exact: jason
    route:
    - destination:
        host: reviews
        subset: v2
  - route:
    - destination:
        host: reviews
        subset: v1
      weight: 90
    - destination:
        host: reviews
        subset: v3
      weight: 10`}
          </Typography>
        </Paper>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          5. Storage and Data Management
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Persistent Storage Solutions
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# PersistentVolume (cluster-level resource)
apiVersion: v1
kind: PersistentVolume
metadata:
  name: postgres-pv
spec:
  capacity:
    storage: 10Gi
  accessModes:
  - ReadWriteOnce
  persistentVolumeReclaimPolicy: Retain
  storageClassName: fast-ssd
  hostPath:
    path: /mnt/data/postgres

---
# PersistentVolumeClaim (namespace resource)
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: postgres-pvc
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi
  storageClassName: fast-ssd

---
# StatefulSet for stateful applications
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: postgres
spec:
  serviceName: postgres
  replicas: 1
  selector:
    matchLabels:
      app: postgres
  template:
    metadata:
      labels:
        app: postgres
    spec:
      containers:
      - name: postgres
        image: postgres:13
        env:
        - name: POSTGRES_DB
          value: myapp
        - name: POSTGRES_USER
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: username
        - name: POSTGRES_PASSWORD
          valueFrom:
            secretKeyRef:
              name: postgres-secret
              key: password
        volumeMounts:
        - name: postgres-storage
          mountPath: /var/lib/postgresql/data
  volumeClaimTemplates:
  - metadata:
      name: postgres-storage
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Storage Classes and CSI Drivers
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Dynamic Provisioning" 
              secondary="Automatically create storage when needed" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Storage Classes" 
              secondary="Define different types of storage (SSD, HDD, replicated)" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="CSI Drivers" 
              secondary="Container Storage Interface for vendor-specific storage" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Backup Strategies" 
              secondary="Volume snapshots and disaster recovery planning" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          6. Scaling and Resource Management
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Horizontal Pod Autoscaler (HPA)
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# HPA based on CPU and memory metrics
apiVersion: autoscaling/v2
kind: HorizontalPodAutoscaler
metadata:
  name: web-app-hpa
spec:
  scaleTargetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  minReplicas: 3
  maxReplicas: 10
  metrics:
  - type: Resource
    resource:
      name: cpu
      target:
        type: Utilization
        averageUtilization: 70
  - type: Resource
    resource:
      name: memory
      target:
        type: Utilization
        averageUtilization: 80
  - type: Pods
    pods:
      metric:
        name: requests_per_second
      target:
        type: AverageValue
        averageValue: "1000"
  behavior:
    scaleDown:
      stabilizationWindowSeconds: 300
      policies:
      - type: Percent
        value: 50
        periodSeconds: 60
    scaleUp:
      stabilizationWindowSeconds: 0
      policies:
      - type: Percent
        value: 100
        periodSeconds: 15`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Vertical Pod Autoscaler (VPA)
        </Typography>
        <Typography variant="body1" paragraph>
          VPA automatically adjusts CPU and memory requests/limits for containers:
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`apiVersion: autoscaling.k8s.io/v1
kind: VerticalPodAutoscaler
metadata:
  name: web-app-vpa
spec:
  targetRef:
    apiVersion: apps/v1
    kind: Deployment
    name: web-app
  updatePolicy:
    updateMode: "Auto"  # Auto, Initial, Off
  resourcePolicy:
    containerPolicies:
    - containerName: web-app
      minAllowed:
        cpu: 100m
        memory: 128Mi
      maxAllowed:
        cpu: 2
        memory: 2Gi
      controlledResources: ["cpu", "memory"]`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Cluster Autoscaler
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Node Scaling" 
              secondary="Automatically adds/removes nodes based on pod scheduling needs" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Cost Optimization" 
              secondary="Scales down unused nodes to reduce infrastructure costs" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Multi-Zone Support" 
              secondary="Distributes nodes across availability zones for resilience" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Node Pools" 
              secondary="Different instance types for different workload requirements" 
            />
          </ListItem>
        </List>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          7. Monitoring and Observability
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Prometheus and Grafana Stack
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# ServiceMonitor for Prometheus scraping
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: web-app-metrics
  labels:
    app: web-app
spec:
  selector:
    matchLabels:
      app: web-app
  endpoints:
  - port: metrics
    interval: 30s
    path: /metrics

---
# PrometheusRule for alerting
apiVersion: monitoring.coreos.com/v1
kind: PrometheusRule
metadata:
  name: web-app-alerts
spec:
  groups:
  - name: web-app.rules
    rules:
    - alert: HighCPUUsage
      expr: |
        100 * (
          avg(rate(container_cpu_usage_seconds_total{container="web-app"}[5m]))
          by (pod)
        ) > 80
      for: 5m
      labels:
        severity: warning
      annotations:
        summary: "High CPU usage detected"
        description: "Pod {{ $labels.pod }} has high CPU usage: {{ $value }}%"
    
    - alert: HighMemoryUsage
      expr: |
        100 * (
          container_memory_working_set_bytes{container="web-app"}
          / container_spec_memory_limit_bytes{container="web-app"}
        ) > 90
      for: 2m
      labels:
        severity: critical
      annotations:
        summary: "High memory usage detected"
        description: "Pod {{ $labels.pod }} memory usage: {{ $value }}%"`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Distributed Tracing and Logging
        </Typography>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="primary">
                  Distributed Tracing
                </Typography>
                <Typography variant="body2">
                  • Jaeger or Zipkin for request tracing<br/>
                  • OpenTelemetry for instrumentation<br/>
                  • Service dependency mapping<br/>
                  • Performance bottleneck identification
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom color="secondary">
                  Centralized Logging
                </Typography>
                <Typography variant="body2">
                  • ELK/EFK stack (Elasticsearch, Logstash/Fluentd, Kibana)<br/>
                  • Structured logging with JSON format<br/>
                  • Log aggregation and correlation<br/>
                  • Security and audit logging
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h4" component="h2" gutterBottom sx={{ mt: 4 }}>
          8. Security and Best Practices
        </Typography>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Pod Security Standards
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Pod Security Policy (deprecated) → Pod Security Standards
apiVersion: v1
kind: Namespace
metadata:
  name: secure-namespace
  labels:
    pod-security.kubernetes.io/enforce: restricted
    pod-security.kubernetes.io/audit: restricted
    pod-security.kubernetes.io/warn: restricted

---
# Secure Pod specification
apiVersion: v1
kind: Pod
metadata:
  name: secure-app
spec:
  securityContext:
    runAsNonRoot: true
    runAsUser: 1000
    runAsGroup: 3000
    fsGroup: 2000
    seccompProfile:
      type: RuntimeDefault
  containers:
  - name: app
    image: myapp:latest
    securityContext:
      allowPrivilegeEscalation: false
      readOnlyRootFilesystem: true
      capabilities:
        drop:
        - ALL
    resources:
      requests:
        cpu: 100m
        memory: 128Mi
      limits:
        cpu: 500m
        memory: 256Mi
    volumeMounts:
    - name: tmp
      mountPath: /tmp
    - name: cache
      mountPath: /app/cache
  volumes:
  - name: tmp
    emptyDir: {}
  - name: cache
    emptyDir: {}`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          RBAC and Access Control
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# ServiceAccount for applications
apiVersion: v1
kind: ServiceAccount
metadata:
  name: app-service-account
  namespace: myapp

---
# Role with minimal required permissions
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  namespace: myapp
  name: app-role
rules:
- apiGroups: [""]
  resources: ["configmaps", "secrets"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods"]
  verbs: ["get", "list", "watch"]

---
# RoleBinding to connect ServiceAccount and Role
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: app-rolebinding
  namespace: myapp
subjects:
- kind: ServiceAccount
  name: app-service-account
  namespace: myapp
roleRef:
  kind: Role
  name: app-role
  apiGroup: rbac.authorization.k8s.io`}
          </Typography>
        </Paper>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Network Policies
        </Typography>
        <Paper sx={{ p: 3, mb: 3 }}>
          <Typography variant="body2" component="pre" sx={{ fontFamily: 'monospace', whiteSpace: 'pre-wrap' }}>
{`# Deny all traffic by default
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: default-deny-all
  namespace: myapp
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress

---
# Allow specific ingress traffic
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-frontend-to-backend
  namespace: myapp
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Ingress
  ingress:
  - from:
    - podSelector:
        matchLabels:
          app: frontend
    ports:
    - protocol: TCP
      port: 8080

---
# Allow egress to external services
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: allow-external-api
  namespace: myapp
spec:
  podSelector:
    matchLabels:
      app: backend
  policyTypes:
  - Egress
  egress:
  - to: []
    ports:
    - protocol: TCP
      port: 443  # HTTPS
    - protocol: TCP
      port: 53   # DNS
    - protocol: UDP
      port: 53   # DNS`}
          </Typography>
        </Paper>

        <Alert severity="success" sx={{ mb: 3 }}>
          <Typography variant="body2">
            Manage your Kubernetes configurations securely with our <Link href="/env-manager" style={{ color: 'inherit', textDecoration: 'underline' }}>Environment Variables Manager</Link> for secrets and config management.
          </Typography>
        </Alert>

        <Typography variant="h5" component="h3" gutterBottom sx={{ mt: 3 }}>
          Production Best Practices
        </Typography>
        <List>
          <ListItem>
            <ListItemText 
              primary="Resource Limits" 
              secondary="Always set CPU and memory requests/limits" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Health Checks" 
              secondary="Implement liveness, readiness, and startup probes" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Graceful Shutdown" 
              secondary="Handle SIGTERM signals properly" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Multi-Zone Deployment" 
              secondary="Use pod anti-affinity for high availability" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Regular Updates" 
              secondary="Keep Kubernetes and container images updated" 
            />
          </ListItem>
          <ListItem>
            <ListItemText 
              primary="Backup Strategy" 
              secondary="Regular backups of etcd and persistent volumes" 
            />
          </ListItem>
        </List>

        <Divider sx={{ my: 4 }} />

        <Typography variant="h4" component="h2" gutterBottom>
          Conclusion
        </Typography>
        <Typography variant="body1" paragraph>
          Kubernetes container orchestration provides the foundation for modern, scalable applications. By understanding its architecture, mastering core resources, and implementing best practices for security, monitoring, and deployment, you can build robust container platforms that support your organization's growth and innovation.
        </Typography>

        <Typography variant="body1" paragraph>
          Remember that Kubernetes is a powerful but complex platform. Start with the fundamentals, gradually adopt advanced features, and always prioritize security and observability. The investment in learning Kubernetes pays dividends in application reliability, developer productivity, and operational efficiency.
        </Typography>

        <Alert severity="success" sx={{ mt: 4 }}>
          <Typography variant="body2">
            <strong>Get started:</strong> Create Kubernetes resources with our <Link href="/k8s-yaml-generator" style={{ color: 'inherit', textDecoration: 'underline' }}>YAML Generator</Link> and manage configurations with our <Link href="/env-manager" style={{ color: 'inherit', textDecoration: 'underline' }}>Environment Variables Manager</Link>.
          </Typography>
        </Alert>

        <Box sx={{ mt: 4, p: 3, backgroundColor: 'action.hover', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Related Tools
          </Typography>
          <Typography variant="body2">
            • <Link href="/k8s-yaml-generator">Kubernetes YAML Generator</Link> - Create K8s resources<br/>
            • <Link href="/env-manager">Environment Variables Manager</Link> - Manage secrets and configs<br/>
            • <Link href="/cron">Cron Expression Parser</Link> - Schedule CronJobs in Kubernetes<br/>
            • <Link href="/base64">Base64 Encoder</Link> - Encode secrets for Kubernetes<br/>
            • <Link href="/yaml-formatter">YAML Formatter</Link> - Format and validate YAML files
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
