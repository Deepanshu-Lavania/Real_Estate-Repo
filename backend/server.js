import express from 'express';
import authRouter from './Router/auth-router.js';

const app = express();
const port = 8000;

// Use express router
app.use('/', authRouter);

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
