/**
 * CT Display Manifest — Contract Test
 *
 * Validates ct-display-manifest-v2.json against the Zone TypeScript interface.
 * Run: npx tsx src/__tests__/ct-display-manifest.test.ts
 *
 * When a test runner (vitest/jest) is configured, these assertions
 * can be wrapped in describe/it blocks with no logic changes.
 */

import manifest from "../data/ct-display-manifest-v2.json";

const VALID_ZONE_TYPES = ["solid_cutout", "transparent_cutout", "hotspot"];

function assert(condition: boolean, msg: string): void {
  if (!condition) {
    console.error(`❌ FAIL: ${msg}`);
    process.exitCode = 1;
  } else {
    console.log(`✅ PASS: ${msg}`);
  }
}

const zones = Object.entries(manifest);

// Zone count
assert(zones.length === 44, `Expected 44 zones, got ${zones.length}`);

// Interactive / decorative split
const interactive = zones.filter(([, z]) => z.pointer);
const decorative = zones.filter(([, z]) => !z.pointer);
assert(interactive.length === 30, `Expected 30 interactive zones, got ${interactive.length}`);
assert(decorative.length === 14, `Expected 14 decorative zones, got ${decorative.length}`);

// Per-zone schema validation
let schemaErrors = 0;
for (const [name, zone] of zones) {
  const z = zone as Record<string, unknown>;
  const checks = [
    typeof z.x_pct === "number",
    typeof z.y_pct === "number",
    typeof z.w_pct === "number",
    typeof z.h_pct === "number",
    typeof z.title === "string",
    typeof z.pointer === "boolean",
    (z.x_pct as number) >= 0 && (z.x_pct as number) <= 100,
    (z.y_pct as number) >= 0 && (z.y_pct as number) <= 100,
    (z.x_pct as number) + (z.w_pct as number) <= 101,
    (z.y_pct as number) + (z.h_pct as number) <= 101,
  ];

  if ("zone_type" in z) {
    checks.push(VALID_ZONE_TYPES.includes(z.zone_type as string));
  }

  if (!checks.every(Boolean)) {
    console.error(`❌ FAIL: Zone "${name}" has invalid schema`);
    schemaErrors++;
  }
}

assert(schemaErrors === 0, `All ${zones.length} zones have valid schema`);

if (process.exitCode) {
  console.error("\n⚠️  Manifest contract test FAILED — schema drift detected");
} else {
  console.log("\n✅ All manifest contract tests passed");
}
