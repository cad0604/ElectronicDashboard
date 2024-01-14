import express from 'express';
import { UsageSummary } from '../shared';
import { sampleUsage } from './sampleUsage';

import { loadUsage } from "./loadUsage";

const app = express();

app.get('/api/usage/:id', async (_req, res) => {
  const requireDateArr = _req.params.id.split('-');
  const requireDateStr = requireDateArr[0] + '/' + requireDateArr[1];

  // we sleep here to encourage you to implement a loading state
  await simulateSlowNetwork();
  // const usageData: UsageSummary = sampleUsage();
  const testData: UsageSummary = await loadUsage(requireDateStr);

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(testData));
});

function simulateSlowNetwork(delayMs = 1500): Promise<void> {
  console.log(
    `Simulating network delay of ${delayMs}ms (comment me out if you're bored)`
  );
  return new Promise((resolve) => setTimeout(resolve, delayMs));
}

export { app };
