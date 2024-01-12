import { app } from "./app";

const port = 3001;
app.listen(port, () => {
  console.log(`Server now listening on port: ${port}`);
});
