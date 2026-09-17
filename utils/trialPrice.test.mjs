// Run with: node --experimental-strip-types --no-warnings utils/trialPrice.test.mjs
import assert from "node:assert/strict";
import { trialPrice } from "./trialPrice.ts";

const plans = [
  { plan_code: "premium", status: "active", amount_trial: "5.95", amount_premium: "39.95", currency: { symbol: "£" } },
  { plan_code: "48h-expert-subscription", status: "active", amount_trial: "15.95", currency: { symbol: "£" } },
  { plan_code: "48h-basic-subscription", status: "active", amount_trial: "1.95", currency: { symbol: "£" } },
];

assert.equal(trialPrice(plans, "48h-basic-subscription"), "£1.95");
assert.equal(trialPrice(plans, "premium"), "£5.95");
assert.equal(trialPrice(plans, "48h-expert-subscription"), "£15.95");
assert.equal(trialPrice([{ ...plans[0], status: "inactive" }], "premium"), null);
assert.equal(trialPrice([{ ...plans[0], currency: { symbol: "" } }], "premium"), null);
