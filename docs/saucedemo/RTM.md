# SauceDemo Requirements Traceability Matrix

This matrix is intentionally limited to the focused SauceDemo case study. It maps every requirement to documented cases and to real Playwright tests. The latest result is updated only from the regression execution recorded in [`TEST_EXECUTION_SUMMARY.md`](./TEST_EXECUTION_SUMMARY.md).

| Requirement | Test Cases | Automated Test | Suite | Latest Result |
|---|---|---|---|---|
| [REQ-001](./REQUIREMENTS.md#req-001--login-page-availability) | [TC-001](./TEST_CASES.md#tc-001--login-controls-are-available) | `06-playwright-tests/tests/saucedemo/login.spec.ts` | Regression | Not Run |
| [REQ-002](./REQUIREMENTS.md#req-002--successful-authentication) | [TC-002](./TEST_CASES.md#tc-002--standard-user-can-log-in) | `06-playwright-tests/tests/saucedemo/login.spec.ts` | Smoke, Regression | Not Run |
| [REQ-003](./REQUIREMENTS.md#req-003--authentication-validation) | [TC-003](./TEST_CASES.md#tc-003--locked-user-is-rejected), [TC-004](./TEST_CASES.md#tc-004--wrong-password-is-rejected), [TC-005](./TEST_CASES.md#tc-005--username-is-required), [TC-006](./TEST_CASES.md#tc-006--password-is-required) | `06-playwright-tests/tests/saucedemo/login.spec.ts` | Regression | Not Run |
| [REQ-004](./REQUIREMENTS.md#req-004--product-listing) | [TC-007](./TEST_CASES.md#tc-007--product-catalog-is-complete) | `06-playwright-tests/tests/saucedemo/checkout.spec.ts` | Regression | Not Run |
| [REQ-005](./REQUIREMENTS.md#req-005--product-sorting) | [TC-008](./TEST_CASES.md#tc-008--products-sort-by-price-low-to-high), [TC-009](./TEST_CASES.md#tc-009--products-sort-by-name-z-to-a), [TC-010](./TEST_CASES.md#tc-010--products-sort-by-price-high-to-low) | `06-playwright-tests/tests/saucedemo/checkout.spec.ts` | Regression | Not Run |
| [REQ-006](./REQUIREMENTS.md#req-006--add-and-remove-products) | [TC-011](./TEST_CASES.md#tc-011--add-one-product-to-cart), [TC-012](./TEST_CASES.md#tc-012--remove-product-from-inventory) | `06-playwright-tests/tests/saucedemo/checkout.spec.ts` | Smoke, Regression | Not Run |
| [REQ-007](./REQUIREMENTS.md#req-007--cart-state) | [TC-013](./TEST_CASES.md#tc-013--cart-contains-multiple-selected-products), [TC-014](./TEST_CASES.md#tc-014--remove-one-of-multiple-cart-items), [TC-015](./TEST_CASES.md#tc-015--cart-survives-inventorycart-navigation) | `06-playwright-tests/tests/saucedemo/checkout.spec.ts` | Smoke, Regression | Not Run |
| [REQ-008](./REQUIREMENTS.md#req-008--checkout-information-validation) | [TC-016](./TEST_CASES.md#tc-016--first-name-is-required), [TC-017](./TEST_CASES.md#tc-017--last-name-is-required), [TC-018](./TEST_CASES.md#tc-018--postal-code-is-required) | `06-playwright-tests/tests/saucedemo/checkout.spec.ts` | Regression | Not Run |
| [REQ-009](./REQUIREMENTS.md#req-009--checkout-overview) | [TC-019](./TEST_CASES.md#tc-019--overview-has-correct-item-and-total) | `06-playwright-tests/tests/saucedemo/checkout.spec.ts` | Regression | Not Run |
| [REQ-010](./REQUIREMENTS.md#req-010--order-completion) | [TC-020](./TEST_CASES.md#tc-020--complete-an-order) | `06-playwright-tests/tests/saucedemo/checkout.spec.ts` | Smoke, Regression | Not Run |

## Coverage Rules

- `@smoke` contains only the minimum business-critical path: valid login, add product, cart verification, and order completion.
- `@regression` contains all 20 documented cases, including negative validation, sorting, and state transitions.
- A requirement is marked `PASS` only when every mapped case passes in the latest regression run.
- API and SQL exercises are independent supporting modules and are not mapped to SauceDemo requirements.
