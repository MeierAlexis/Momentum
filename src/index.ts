import { PORT } from "./config.ts";
import { scheduleDailyReset } from "../src/cron/dailyReset.ts";

import app from "./app.ts";

app.listen(PORT, () => {});
scheduleDailyReset();
