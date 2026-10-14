"use strict";
const assert = require("assert");
const { createDecisionReceipt, verifyDecisionReceipt } = require("./index");

const rec = createDecisionReceipt({ actor: "treasury_mgr", action: "wire_approve", amount: "85611.00", currency: "USD" });
const check = verifyDecisionReceipt(rec);
assert.strictEqual(check.valid, true);

const tampered = { ...rec, amount: "95611.00" };
assert.strictEqual(verifyDecisionReceipt(tampered).valid, false);
console.log("proofaudit-verify: all offline receipt verification tests passed.");
