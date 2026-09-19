# QA Engineering Portfolio

[![SauceDemo Playwright](https://github.com/ecjtusyy/qa-engineer-portfolio/actions/workflows/playwright.yml/badge.svg)](https://github.com/ecjtusyy/qa-engineer-portfolio/actions/workflows/playwright.yml)
![Playwright](https://img.shields.io/badge/Playwright-TypeScript-2EAD33?logo=playwright&logoColor=white)
![Test Design](https://img.shields.io/badge/QA-Traceable_Test_Design-2563EB)

## Overview

This fork turns a broad collection of QA demos into one focused, interview-ready **SauceDemo QA case study**. It demonstrates a complete and evidence-based testing workflow:

```text
Requirements → Test Design → Test Cases → RTM
             → Smoke / Regression → Playwright
             → Execution → Test Report
```

The goal is not framework count. The goal is to show how business risk becomes traceable coverage, executable checks, and an honest release signal.

## Core Case Study: SauceDemo

[SauceDemo](https://www.saucedemo.com/) is a public training storefront with stable demo users and a complete login-to-order journey. This project covers authentication, product listing and sorting, cart state, checkout validation, overview totals, and order completion.

| Scope | Current implementation |
|---|---|
| Requirements | 10 concise, risk-focused requirements |
| Test cases | 20 cases across happy path, negative, boundary/validation, and state transition coverage |
| Traceability | Every requirement maps to a documented case and a real automated test |
| Smoke | 4 business-critical checks |
| Regression | All 20 SauceDemo checks |
| Automation | Playwright + TypeScript + Page Object Model |
| CI | Chromium regression and HTML report artifact in GitHub Actions |

## Key Deliverables

- [Requirements](./docs/saucedemo/REQUIREMENTS.md)
- [Test Cases](./docs/saucedemo/TEST_CASES.md)
- [Requirements Traceability Matrix](./docs/saucedemo/RTM.md)
- [Test Execution Summary](./docs/saucedemo/TEST_EXECUTION_SUMMARY.md)
- [Upstream Audit](./docs/UPSTREAM_AUDIT.md)

## Automated Testing

The focused suite is under [`06-playwright-tests/tests/saucedemo`](./06-playwright-tests/tests/saucedemo/). Stable `data-test` selectors, Playwright locators, assertions, and auto-waiting are used instead of fixed sleeps. The coverage includes:

- successful, invalid, locked, and missing-field login scenarios;
- product completeness plus name/price sorting;
- add, remove, multi-item, and navigation-state cart behavior;
- all required checkout fields;
- item and subtotal/tax/total consistency on the overview;
- complete order confirmation.

### Smoke Testing

```bash
cd 06-playwright-tests
npm ci
npx playwright install chromium
npm run test:smoke
```

### Regression Testing

```bash
cd 06-playwright-tests
npm run test:regression
```

### TypeScript Compile Check

```bash
cd 06-playwright-tests
npm run typecheck
```

## Verified Results

Local focused execution on **2026-09-19**, Chromium headless:

| Check | Passed | Failed | Skipped | Status |
|---|---:|---:|---:|---|
| SauceDemo Smoke | 4 | 0 | 0 | PASS |
| SauceDemo Regression | 20 | 0 | 0 | PASS |
| TypeScript compile | — | — | — | PASS |

These figures come from the current focused runs, not from upstream historical claims. See the [execution summary](./docs/saucedemo/TEST_EXECUTION_SUMMARY.md) for the environment, timing, and boundaries.

## Supporting Practice Modules

### API Testing Practice

[`04-postman-api-testing`](./04-postman-api-testing/) contains a separate Restful-Booker Newman exercise. The audited baseline is **13 requests / 24 assertions / PASS**. It is supporting API practice and is **not** presented as a SauceDemo API.

### SQL Validation Practice

[`03-sql-queries`](./03-sql-queries/) is an independent SQLite validation exercise covering `SELECT`, joins, grouping, aggregation, duplicate detection, and data-consistency checks. The audited baseline is **19/19 PASS**. It is **not** SauceDemo's backend database and no UI-to-database consistency claim is made.

## Known Limitations

- Automation Exercise automation was blocked by Imunify360 anti-bot verification during the upstream audit.
- Selenium was not run locally because JDK/Maven were unavailable.
- k6 was not run locally because k6 was unavailable.
- The Internet iframe navigation instability was observed during the upstream audit.
- SauceDemo is a shared external demo environment, so availability is outside this repository's control.

These are documented constraints, not hidden or converted into false passing results.

## My Improvements

- Audited the upstream evidence and documented result and traceability inconsistencies.
- Focused the portfolio on a stable SauceDemo business case instead of unrelated public-site demos.
- Added 10 explicit requirements and 20 risk-based test cases with current execution status.
- Built a clean Requirement → Test Case → Automated Test → Result matrix.
- Organized verified Smoke and Regression suites and a focused GitHub Actions gate.

## Repository Map

| Path | Purpose |
|---|---|
| [`docs/saucedemo`](./docs/saucedemo/) | Focused QA planning, design, traceability, and execution evidence |
| [`06-playwright-tests`](./06-playwright-tests/) | Core SauceDemo automation used by this case study |
| [`03-sql-queries`](./03-sql-queries/) | Independent SQL validation practice |
| [`04-postman-api-testing`](./04-postman-api-testing/) | Independent API testing practice |
| Other numbered folders | Preserved upstream learning material; not part of the focused execution claim |

## Attribution

Forked from [orkhan-aliyev-qa/qa-engineer-portfolio](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio). The upstream Git history, original attribution, and [MIT License](./LICENSE) are preserved. The focused SauceDemo case study and changes listed under **My Improvements** are the work added in this fork.
