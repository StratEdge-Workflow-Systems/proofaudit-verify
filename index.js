#!/usr/bin/env node
"use strict";

const { canonicalize, sha256Hex } = require("./src/canonical");
const { signEnclaveAttestation } = require("./src/attestation");
const { ENCLAVE_METADATA } = require("./src/enclave");

function canonicalJson(value) {
  return canonicalize(value);
}

function createDecisionReceipt(record) {
  const { receiptHash: _ignored, ...core } = record;
  const canonical = canonicalJson(core);
  const hash = "sha256:" + sha256Hex(canonical);
  return { ...core, receiptHash: hash };
}

function verifyDecisionReceipt(receipt) {
  if (!receipt || typeof receipt !== "object" || typeof receipt.receiptHash !== "string") {
    return { valid: false, reason: "missing_receipt_hash" };
  }
  const expected = createDecisionReceipt(receipt).receiptHash;
  return {
    valid: expected === receipt.receiptHash,
    expectedHash: expected,
    providedHash: receipt.receiptHash
  };
}

module.exports = { canonicalJson, createDecisionReceipt, verifyDecisionReceipt, signEnclaveAttestation, ENCLAVE_METADATA };
