import express from 'express';
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

app.use('/auth', createProxyMiddleware({
    target: 'http://localhost:3001/auth',
    changeOrigin: true,
    pathRewrite: {
      '^/user': '/',
    },
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying request: ${req.method} ${req.url}`);
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    },
  }));
app.use('/tasks', createProxyMiddleware({
    target: 'http://localhost:3002/tasks',
    changeOrigin: true,
    onProxyReq: (proxyReq, req, res) => {
      console.log(`Proxying request: ${req.method} ${req.url}`);
    },
    onError: (err, req, res) => {
      console.error('Proxy error:', err);
      res.status(500).send('Proxy error');
    },
  }));
app.use('/notification', createProxyMiddleware({ target: 'http://notification-service:3003', changeOrigin: true }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`API Gateway listening on port ${PORT}`);
});
