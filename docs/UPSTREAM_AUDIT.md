# Upstream Audit

## Audit status

This document records the repository as it existed before any portfolio redesign.
It is an evidence-led baseline, not a claim that the upstream work was created by
the fork owner.

| Item | Value |
|---|---|
| Audit date | 2026-09-19 |
| Upstream | [`orkhan-aliyev-qa/qa-engineer-portfolio`](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio) |
| Audited revision | `c43249073711c0fe7da9367dea40a6e8bab18f34` |
| Fork | [`ecjtusyy/qa-engineer-portfolio`](https://github.com/ecjtusyy/qa-engineer-portfolio) |
| License | MIT, copyright 2026 Orkhan Aliyev |
| Audit boundary | Structure, documents, test assets, local execution, and current upstream CI evidence |

The MIT license, copyright notice, Git history, and original author references
must remain intact. Future changes in this fork must distinguish upstream assets
from the fork owner's improvements.

## Executive assessment

The upstream repository is a broad and unusually complete QA portfolio. Its main
strength is the lifecycle story: planning, cases, defects, traceability, SQL,
API, UI, accessibility, performance, reporting, and CI are present in one place.
That makes it valuable as a reference architecture for a graduate QA portfolio.

The same breadth is also its main weakness for this fork. It spreads one story
across several unrelated public systems and repeats many UI flows in Cypress,
Playwright, and Selenium. Several documents describe historical green results
that no longer match either the tracked row-level evidence or the latest CI
state. A credible second-stage portfolio should therefore preserve the upstream
reference while building one smaller, traceable business case around a single
primary UI stack.

**Recommended focus for the next stage:** use SauceDemo as the core manual/UI
business case because its public credentials and checkout flow were stable in
this audit. Keep the synthetic SQLite module explicitly labelled as an SQL
validation exercise. Treat API automation as a separate supporting module unless
a controlled API belonging to the same business case is available. Do not imply
that SauceDemo exposes a database or public CRUD API when it does not.

## Environment and repository baseline

### Host tools

| Tool | Result |
|---|---|
| Git | `2.53.0.windows.3` |
| GitHub CLI | Not installed |
| System PATH Node/npm | Not installed |
| System PATH Python | Not installed |
| Java/Javac/Maven | Not installed |
| k6 | Not installed |
| Bundled Node.js used for audit | `24.19.0` |
| Bundled Python used for audit | `3.12.14` |
| Bundled pnpm used for audit | `11.19.0` |
| Global Git author | Not configured |

The fork was created through the authenticated GitHub account, then both remotes
were configured as follows:

```text
origin   https://github.com/ecjtusyy/qa-engineer-portfolio.git
upstream https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio.git
```

The first portfolio project in the same parent directory was checked and left
unchanged.

### Repository inventory

- 160 non-generated files.
- 65 manual test cases in five CSV files.
- 6 Markdown bug reports.
- 19 executable SQL queries with 19 expected-output files.
- 2 Postman collections: 27 requests and 67 declared `pm.test` blocks.
- 12 Cypress specs across seven public sites.
- 9 Playwright functional/accessibility specs across four public sites.
- Selenium/TestNG suites for SauceDemo and Demoblaze.
- k6 smoke, load, and stress scripts for Restful-Booker.
- 7 path-scoped GitHub Actions workflows plus a GitLab CI mirror.

## Module-by-module audit

| Module | Problem it solves | Evidence and runnability | Main dependency | Assessment for this fork |
|---|---|---|---|---|
| `01-manual-testing` | Test planning, risk-based case design, smoke/regression checklists, bug communication, RTM, and summary reporting | 65 structured cases and 6 detailed bugs exist. However, all 65 CSV rows are `Not Run` with blank `Actual_Result`, while the summary claims 46 executed, 43 passed, and 3 failed. | Public target sites and manually provisioned accounts | Preserve the structure and selected cases, but rebuild execution evidence around one business case. Do not copy the historical results as personal results. |
| `02-jira-workflow` | Defect lifecycle, severity/priority, CSV import, JQL, and workflow communication | The text artifacts are useful. The referenced `screenshots/` directory is absent, and the Jira workspace is the original author's external sandbox. | Atlassian Cloud account and original author's sandbox | Preserve as an upstream reference. Build a smaller fork-owner workflow only if real screenshots/tickets can be produced. |
| `03-sql-queries` | SQL query practice and deterministic data-quality validation | The in-memory SQLite harness passed 19/19 locally. Five defects are deliberately planted, so this proves the runner and queries, not defects in a live product database. | Python standard library only | Strong, reproducible learning module. Keep it, clearly labelled `SQL validation exercise`; later reduce emphasis on interview-style breadth if needed. |
| `04-postman-api-testing` | Functional API coverage, negative cases, authentication, chained CRUD, and cleanup | Restful-Booker passed 13 requests / 24 assertions locally. Automation Exercise sent 14 requests but 26 of 41 executed assertions failed because Imunify360 returned verification HTML instead of the expected JSON contract. | Two public APIs; one currently blocks automation IPs | Keep the test-design patterns. Restful-Booker duplicates the first portfolio project, and Automation Exercise is not currently a stable CI target from this environment. |
| `05-cypress-tests` | Broad UI automation and POM examples across demo and production sites | SauceDemo passed 14/14 locally. The latest upstream run failed: 5 failures in 89 tests, all in Automation Exercise specs after repeated redirect loops. Several ABB page objects also use fixed waits and forced clicks. | Seven unrelated public sites, including production bank/classified sites | Preserve as upstream reference; do not make Cypress a second personal mainline. Avoid spending time stabilizing all seven external sites. |
| `06-playwright-tests` | Cross-browser UI, TypeScript POM, traces, and axe accessibility audits | TypeScript compilation passed. Chromium baseline: 31 passed, 24 failed, 3 skipped. Twenty-three failures were Automation Exercise verification-page failures; one was a The Internet iframe navigation timeout. SauceDemo's 14 tests passed. | Four public sites, browser downloads, account state | Best upstream UI framework to learn from, but it duplicates Cypress and is TypeScript rather than the requested Python mainline. Retain concepts; later implement a focused Python Playwright suite instead of rebranding this code. |
| `07-selenium-java` | Selenium 4, TestNG, Java POM, and headless CI | Not locally runnable because Java/Maven are absent. The latest upstream Selenium workflow succeeded. It repeats SauceDemo/Demoblaze flows already present in two other frameworks. | JDK 17, Maven, Chrome, public sites | Low priority for this fork. Preserve history, but do not expand Java/Selenium merely to increase tool count. |
| `08-performance-k6` | Smoke/load/stress modelling and threshold gates | Not locally runnable because k6 is absent. The latest upstream smoke workflow succeeded; load/stress are intentionally local-only to avoid abusing a public service. | k6 binary and shared Restful-Booker service | Responsible design, but secondary to the target job profile and duplicative of the first project. Preserve as a reference rather than a mainline investment. |
| GitHub Actions | Repeatable automated feedback and artifacts | Six latest workflow results were green; the latest Cypress workflow failed. Seven workflows are understandable upstream but too broad for a focused fork. | GitHub-hosted runners and all public targets | Later consolidate around actual commands for SQL, API, and one UI stack. Keep artifacts and failure diagnostics. |

## Cross-cutting artifact audit

### Test plan and strategy

The upstream plan has useful scope, environment, risk, entry/exit, and deliverable
sections. It is still marked `Draft`, names the original author, and includes
schedule/sign-off language that is not backed by a real team in this fork. The
master strategy explains test layers well, but the claimed pyramid is wider at
the UI layer than the text suggests because three UI frameworks repeat many of
the same flows.

### Test cases

The CSV schema is strong: ID, module, title, priority, type, preconditions,
steps, test data, expected result, actual result, status, and notes. The 65 cases
include 39 positive, 18 negative, 4 security, 3 UI, and 1 edge case.

Evidence quality is the problem: every case remains `Not Run` and every
`Actual_Result` is blank. Therefore the design can be credited to upstream, but
the execution metrics cannot be independently reconstructed from the CSV files.

### Requirements traceability matrix

The RTM demonstrates the right concept: requirement to manual case to automation
to defect. It should not be accepted as a verified coverage ledger in its current
form:

- 15 RTM test-case tokens do not match a concrete CSV ID, including placeholders
  such as `TC-RBANK-NAV-*`, `TC-TAPAZ-*`, and `TC-SEARCH-00x`.
- 37 of the 65 CSV test-case IDs are not explicitly referenced in the RTM.
- The 63 requirements span several unrelated products, so the coverage total is
  a portfolio inventory rather than coverage of one system.
- A checkmark sometimes means coverage on a different site, for example checkout
  requirements from Automation Exercise being closed through SauceDemo.

The matrix is worth preserving as a design reference, but the fork should replace
the numerical breadth with a smaller verified mapping.

### Bug reports

The report format is useful: environment, precondition, steps, actual/expected,
severity, priority, impact, evidence, and suggested fix are generally present.
This audit rechecked three issues without modifying target data:

| Bug | Audit result |
|---|---|
| BUG-004 Rabitabank broken routes | Reproduced: all five listed old routes returned 404. `/about-bank` returned 200; `/filiallar` now redirects to a newer route, so that part of the evidence has evolved. |
| BUG-005 Demoblaze username enumeration | Reproduced: an unknown user returned `User does not exist.` while a known user with a wrong password returned `Wrong password.` |
| BUG-006 missing image alt text | Reproduced by the Playwright/axe run on Demoblaze: one critical `image-alt` violation covering two images. |
| BUG-001 Automation Exercise signup enumeration | Not reverified because the site currently serves Imunify360 bot verification to automated clients. |
| BUG-002 cart persistence | Not reverified; requires controlled account/session state. |
| BUG-003 whitespace login behavior | Not reverified; requires controlled account/session state. |

Only the three reproduced findings should be described as confirmed in this
audit. The remaining reports stay attributed to upstream until independently
reproduced.

### Test execution summary

The summary is a historical narrative, not a current executable report. It says
the automated suites are green and contains an addendum saying seven workflows
are green. At audit time, the latest Cypress run is red and the manual CSV rows
do not contain the execution statuses used to calculate the stated 93.5% manual
pass rate. These differences must be corrected rather than copied into a new
portfolio README.

## Actual execution results

### Local audit run

| Scope | Result | Classification |
|---|---|---|
| SQL runner | **PASS** — 19/19 query outputs matched | Deterministic local exercise |
| Restful-Booker Newman | **PASS** — 13/13 requests, 24/24 assertions | Public external API |
| Automation Exercise Newman | **FAIL** — 14 requests reached the target; 26/41 executed assertions failed because JSON parsing received bot-verification HTML | External service / anti-bot contract change, not made green by weakening assertions |
| Playwright TypeScript compile | **PASS** — `tsc --noEmit` | Static validation |
| Playwright Chromium | **FAIL** — 31 passed, 24 failed, 3 skipped out of 58 | 23 Automation Exercise verification-page failures; 1 The Internet iframe timeout |
| Cypress SauceDemo | **PASS** — 14/14 across login and checkout specs | Stable representative UI target |
| Selenium Java | **BLOCKED locally** | JDK/Maven absent; upstream CI currently succeeds |
| k6 | **BLOCKED locally** | k6 binary absent; upstream smoke CI currently succeeds |
| Jira evidence | **BLOCKED** | Original author's external sandbox; tracked screenshot directory absent |

The audit used Node 24 and pnpm because npm was not available on the host. Newman
and Cypress matched the versions in the committed npm locks. The locally resolved
Playwright package was 1.63.0 while the npm lock records 1.60.0, so the local run
is strong evidence about current target reachability but not an exact replay of
the upstream npm environment.

### Latest upstream GitHub Actions observed

| Workflow | Latest observed result | Evidence |
|---|---|---|
| Accessibility | PASS | [Run 26751750242](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio/actions/runs/26751750242) |
| Cypress E2E | **FAIL** — 67 passed, 5 failed, 3 pending, 14 skipped; 2/12 specs failed | [Run 28701763181](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio/actions/runs/28701763181) |
| k6 Performance | PASS | [Run 28701763155](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio/actions/runs/28701763155) |
| Newman API | PASS | [Run 28701763185](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio/actions/runs/28701763185) |
| Playwright Cross-Browser | PASS | [Run 28701763199](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio/actions/runs/28701763199) |
| Selenium Java | PASS | [Run 28701763175](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio/actions/runs/28701763175) |
| SQL Queries | PASS | [Run 28701763189](https://github.com/orkhan-aliyev-qa/qa-engineer-portfolio/actions/runs/28701763189) |

The Cypress failure was not a single assertion drift: Automation Exercise entered
more than 20 redirects on `/view_cart`, `/products`, and `/login`, consuming four
retry attempts and 39 minutes. This matches the current anti-bot behavior seen in
the Newman and Playwright baselines.

## Direct answers to the audit questions

### 1. What problem does each module solve?

The module table above is the source of truth. In short: `01` covers manual QA
design and reporting; `02` defect workflow; `03` data validation; `04` API
contracts and CRUD; `05`/`06`/`07` UI automation in three frameworks; `08`
non-functional performance; CI turns executable modules into repeatable gates.

### 2. What is most suitable for a graduate QA portfolio?

- A short risk-based test plan with explicit scope and exit criteria.
- Twenty or fewer high-information manual cases with positive, negative, and
  boundary reasoning.
- A small RTM that maps real requirement IDs to real cases and automation names.
- Reproducible bug reports with current evidence and correct classification.
- The SQLite validation harness and QA-oriented consistency queries.
- One API suite showing authentication, CRUD, negative cases, and cleanup.
- One primary UI framework with stable selectors, automatic waiting, and a
  critical business journey.
- One simple CI workflow with reports and diagnostics.

### 3. What is repetitive technology demonstration?

- Reimplementing login/cart/checkout in Cypress, Playwright, and Selenium.
- Maintaining both GitHub Actions and GitLab CI for a personal portfolio.
- Cross-browser matrices across every external demo site when one targeted matrix
  would demonstrate the same skill.
- Keeping Restful-Booker functional and performance suites here after the first
  portfolio project already demonstrates that API deeply.

### 4. What can actually run?

SQL, Restful-Booker Newman, SauceDemo Cypress, TypeScript compilation, and the
non-Authentication-Exercise portion of the Playwright suite produced real local
results. Selenium and k6 are supported by successful upstream CI but were locally
blocked by missing runtimes. Automation Exercise automation currently fails due
to explicit IP bot protection. Jira screenshots cannot be verified from the
repository.

### 5. What depends on external services?

Every Postman, Cypress, Playwright, Selenium, accessibility, and k6 scenario uses
a public service. Targets include Automation Exercise, SauceDemo, Demoblaze,
The Internet, Restful-Booker, ABB Bank, Rabitabank, and Tap.az. Account state,
anti-bot controls, redirects, rate limits, availability, and content changes are
outside repository control. Only the SQLite suite is fully self-contained.

### 6. What is most worth preserving?

- MIT license, attribution, and Git history.
- The lifecycle-oriented repository layout and concise artifact templates.
- Selected high-quality cases and the traceability concept.
- Reproduced BUG-004, BUG-005, and BUG-006 evidence, still attributed upstream.
- The deterministic SQL runner and data-consistency examples.
- Chained API cleanup patterns.
- Playwright POM, trace, artifact, and accessibility concepts.
- Path-scoped CI and failure artifact collection.

### 7. What is not worth major effort for this fork?

- Repairing all Cypress scenarios across seven changing public sites.
- Maintaining three UI frameworks and two CI platforms.
- Expanding Java/Selenium when the target role prioritizes Python and Playwright.
- Running load/stress tests against infrastructure the fork owner does not own.
- Recreating the original author's Jira sandbox or claiming its screenshots.
- Inflating requirement/test-case counts before traceability and execution evidence
  are trustworthy.

## Proposed second-stage direction — not implemented in this audit

1. Keep upstream modules available as references; clearly label them `Upstream`.
2. Build a fork-owner case study around SauceDemo with approximately 15–25
   requirements/scenarios covering login, inventory, cart, checkout, validation,
   state, and negative paths.
3. Create a small verified RTM: requirement -> manual case -> Python Playwright
   test -> execution result -> bug, where applicable.
4. Use Python, pytest, requests, Playwright, SQL, and one GitHub Actions workflow
   as the personal mainline. Do not add another Cypress/Selenium implementation.
5. Keep SQL explicitly independent unless a real database integration becomes
   available. Keep API automation explicitly independent if SauceDemo remains the
   UI case, rather than inventing UI/API/database consistency that cannot be
   observed.
6. Re-run and update evidence before claiming any bug, pass rate, or CI status.

No second-stage restructuring or personal authorship claim was made as part of
this audit.
