import express from 'express';
import { UsageSummary } from '../shared';
import { sampleUsage } from './sampleUsage';
// import { loadUsage } from "./loadUsage";

const app = express();

app.get('/api/usage', async (_req, res) => {
  console.log('GET /api/usage');

  // we sleep here to encourage you to implement a loading state
  await simulateSlowNetwork();
  const usageData: UsageSummary = sampleUsage();

  // uncomment this and implement
  // const usageDate = await loadUsage();

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(usageData));
});

function simulateSlowNetwork(delayMs = 1500): Promise<void> {
  console.log(
    `Simulating network delay of ${delayMs}ms (comment me out if you're bored)`
  );
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export { app };
