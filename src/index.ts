import { PORT } from "./config.ts";
import { scheduleDailyReset } from "../src/cron/dailyReset.ts";

import app from "./app.ts";

app.listen(PORT, () => {
  console.log("Example app listening on port 3000!");
});
scheduleDailyReset();
