# Playwright + TypeScript

This folder contains the automation layer for the focused [SauceDemo QA case study](../docs/saucedemo/REQUIREMENTS.md). The core portfolio gate runs SauceDemo on Chromium; upstream tests for other public demo sites remain available for reference but are outside the focused execution claim.

## Focused Suites

| Suite | Selection | Cases | Purpose |
|---|---|---:|---|
| Smoke | `@smoke` | 4 | Valid login, add product, cart verification, order completion |
| Regression | `@regression` | 20 | All documented SauceDemo positive, negative, validation, and state cases |

The source of truth for case IDs and expected behavior is:

- [Test Cases](../docs/saucedemo/TEST_CASES.md)
- [RTM](../docs/saucedemo/RTM.md)
- [Execution Summary](../docs/saucedemo/TEST_EXECUTION_SUMMARY.md)

## Run Locally

```bash
npm ci
npx playwright install chromium

npm run typecheck
npm run test:smoke
npm run test:regression
```

Open the last generated HTML report with:

```bash
npm run report
```

## Structure

```text
06-playwright-tests/
├── fixtures/test-data.ts
├── pages/saucedemo/
│   ├── LoginPage.ts
│   ├── InventoryPage.ts
│   ├── CartPage.ts
│   └── CheckoutPage.ts
├── tests/saucedemo/
│   ├── login.spec.ts
│   └── checkout.spec.ts
├── package.json
├── package-lock.json
├── playwright.config.ts
└── tsconfig.json
```

## Design Choices

- Stable `data-test` selectors where SauceDemo provides them.
- Page objects separate interactions and assertions from scenario intent.
- Playwright auto-waiting and retryable assertions; no fixed sleeps.
- A small tagged smoke set for rapid feedback and a complete tagged regression set for the CI gate.
- Trace, screenshot, and video collection only around failures to keep routine runs lightweight.

GitHub Actions installs the lockfile dependencies, type-checks the project, runs the Chromium regression suite, and uploads the HTML report. See [`.github/workflows/playwright.yml`](../.github/workflows/playwright.yml).
