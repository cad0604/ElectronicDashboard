import React, { useState, useEffect } from "react";
import { UsageSummary } from "../shared";
import "./App.css";

function App() {
  const [serverResp, setServerResp] = useState<UsageSummary | undefined>(
    undefined
  );

  useEffect(() => {
    (async () => {
      const resp = await fetch("/api/usage");
      const data: UsageSummary = await resp.json();
      setServerResp(data);
    })();
  }, []);

  return (
    <div className="App">
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <code>Server data: {JSON.stringify(serverResp)}</code>
    </div>
  );
}

export default App;
