# SauceDemo Test Execution Summary

## Execution Context

| Field | Value |
|---|---|
| Execution date | 2026-09-19 (Asia/Shanghai) |
| Environment | Local Windows workspace; public SauceDemo environment |
| Framework | Playwright 1.63.0 with TypeScript |
| Browser | Chromium 153.0.8010.12, headless |
| Test data | Published SauceDemo demo users; synthetic checkout name/address |

## Results

| Test Set | Command | Passed | Failed | Skipped | Blocked | Duration |
|---|---|---:|---:|---:|---:|---:|
| Smoke | `pnpm run test:smoke` | 4 | 0 | 0 | 0 | 4.4 s |
| Regression | `pnpm run test:regression` | 20 | 0 | 0 | 0 | 8.3 s |
| TypeScript compile | `pnpm run typecheck` | PASS | 0 | 0 | 0 | — |

## Scope and Evidence

- Smoke verifies valid login, adding a product, cart contents, and order completion.
- Regression covers all cases `TC-001` through `TC-020`: login, negative validation, product listing/sorting, cart state, checkout validation, overview totals, and completion.
- Playwright's generated HTML report, screenshots, video, and traces are intentionally gitignored; GitHub Actions publishes the HTML report as a run artifact.
- The initial attempt inside a network-restricted sandbox returned `ERR_NETWORK_ACCESS_DENIED`; it is infrastructure noise and is not counted as a product test execution. The reported results above are from the subsequent network-enabled runs.

## Known Issues and Boundaries

- SauceDemo is a shared public demo environment; external availability remains outside this repository's control.
- The local dependency tree resolved Playwright 1.63.0, while committed `package-lock.json` pins 1.60.0 for CI reproducibility. Both execute the same documented suite; GitHub Actions is the authoritative CI result.
- This case study does not claim SauceDemo API or database verification. The repository's API and SQL folders are independent practice modules.
