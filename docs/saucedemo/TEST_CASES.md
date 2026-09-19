# SauceDemo Test Cases

Test data uses SauceDemo's published demo accounts. `Latest Execution Result` is updated only from the focused Playwright regression run documented in [`TEST_EXECUTION_SUMMARY.md`](./TEST_EXECUTION_SUMMARY.md).

## Login

### TC-001 — Login controls are available

- **Requirement ID:** REQ-001
- **Priority:** P0
- **Precondition:** Browser can reach the SauceDemo login page.
- **Steps:** Open the login page; inspect username, password, and login controls.
- **Expected Result:** All three controls are visible and usable.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/login.spec.ts`
- **Latest Execution Result:** PASS

### TC-002 — Standard user can log in

- **Requirement ID:** REQ-002
- **Priority:** P0
- **Precondition:** Login page is open; published standard-user credentials are available.
- **Steps:** Enter valid username and password; select Login.
- **Expected Result:** Inventory page opens.
- **Automation Status:** Automated (Smoke, Regression) — `06-playwright-tests/tests/saucedemo/login.spec.ts`
- **Latest Execution Result:** PASS

### TC-003 — Locked user is rejected

- **Requirement ID:** REQ-003
- **Priority:** P1
- **Precondition:** Login page is open; published locked-user credentials are available.
- **Steps:** Enter the locked user and valid password; select Login.
- **Expected Result:** A locked-out error is shown and the login page remains open.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/login.spec.ts`
- **Latest Execution Result:** PASS

### TC-004 — Wrong password is rejected

- **Requirement ID:** REQ-003
- **Priority:** P1
- **Precondition:** Login page is open.
- **Steps:** Enter the standard username and an invalid password; select Login.
- **Expected Result:** A credential-mismatch error is shown and no login occurs.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/login.spec.ts`
- **Latest Execution Result:** PASS

### TC-005 — Username is required

- **Requirement ID:** REQ-003
- **Priority:** P1
- **Precondition:** Login page is open.
- **Steps:** Leave username empty; enter the valid password; select Login.
- **Expected Result:** A username-required error is shown.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/login.spec.ts`
- **Latest Execution Result:** PASS

### TC-006 — Password is required

- **Requirement ID:** REQ-003
- **Priority:** P1
- **Precondition:** Login page is open.
- **Steps:** Enter the standard username; leave password empty; select Login.
- **Expected Result:** A password-required error is shown.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/login.spec.ts`
- **Latest Execution Result:** PASS

## Products

### TC-007 — Product catalog is complete

- **Requirement ID:** REQ-004
- **Priority:** P0
- **Precondition:** Standard user is logged in.
- **Steps:** Open the inventory; inspect every product row.
- **Expected Result:** Six products are displayed; every product has a non-empty name and a numeric price.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-008 — Products sort by price low to high

- **Requirement ID:** REQ-005
- **Priority:** P2
- **Precondition:** Standard user is on the inventory page.
- **Steps:** Select Price (low to high); read displayed prices in order.
- **Expected Result:** Prices are in ascending numeric order.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-009 — Products sort by name Z to A

- **Requirement ID:** REQ-005
- **Priority:** P2
- **Precondition:** Standard user is on the inventory page.
- **Steps:** Select Name (Z to A); read displayed names in order.
- **Expected Result:** Names are in descending alphabetical order.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-010 — Products sort by price high to low

- **Requirement ID:** REQ-005
- **Priority:** P2
- **Precondition:** Standard user is on the inventory page.
- **Steps:** Select Price (high to low); read displayed prices in order.
- **Expected Result:** Prices are in descending numeric order.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

## Cart

### TC-011 — Add one product to cart

- **Requirement ID:** REQ-006
- **Priority:** P0
- **Precondition:** Standard user is on a clean inventory page.
- **Steps:** Add Sauce Labs Backpack.
- **Expected Result:** Cart badge becomes `1` and the product action changes to Remove.
- **Automation Status:** Automated (Smoke, Regression) — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-012 — Remove product from inventory

- **Requirement ID:** REQ-006
- **Priority:** P1
- **Precondition:** Sauce Labs Backpack has been added from inventory.
- **Steps:** Select Remove for the backpack.
- **Expected Result:** Cart badge disappears and the product action changes back to Add to cart.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-013 — Cart contains multiple selected products

- **Requirement ID:** REQ-007
- **Priority:** P0
- **Precondition:** Standard user is on a clean inventory page.
- **Steps:** Add Backpack and Bike Light; open the cart.
- **Expected Result:** Badge and cart show two items with both expected names.
- **Automation Status:** Automated (Smoke, Regression) — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-014 — Remove one of multiple cart items

- **Requirement ID:** REQ-007
- **Priority:** P1
- **Precondition:** Backpack and Bike Light are in the cart.
- **Steps:** Open the cart; remove Backpack.
- **Expected Result:** One item remains and it is Bike Light.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-015 — Cart survives inventory/cart navigation

- **Requirement ID:** REQ-007
- **Priority:** P1
- **Precondition:** Backpack is in the cart.
- **Steps:** Open the cart; continue shopping; open the cart again.
- **Expected Result:** Backpack remains in the cart after both navigation transitions.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

## Checkout

### TC-016 — First name is required

- **Requirement ID:** REQ-008
- **Priority:** P1
- **Precondition:** A product is in the cart and checkout information is open.
- **Steps:** Leave first name empty; enter last name and postal code; continue.
- **Expected Result:** A first-name-required error is shown and overview does not open.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-017 — Last name is required

- **Requirement ID:** REQ-008
- **Priority:** P1
- **Precondition:** A product is in the cart and checkout information is open.
- **Steps:** Enter first name; leave last name empty; enter postal code; continue.
- **Expected Result:** A last-name-required error is shown and overview does not open.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-018 — Postal code is required

- **Requirement ID:** REQ-008
- **Priority:** P1
- **Precondition:** A product is in the cart and checkout information is open.
- **Steps:** Enter first and last name; leave postal code empty; continue.
- **Expected Result:** A postal-code-required error is shown and overview does not open.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-019 — Overview has correct item and total

- **Requirement ID:** REQ-009
- **Priority:** P0
- **Precondition:** Backpack is in the cart.
- **Steps:** Enter all required buyer information; continue to overview; inspect item, subtotal, tax, and total.
- **Expected Result:** Overview contains Backpack and displayed total equals subtotal plus tax.
- **Automation Status:** Automated — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS

### TC-020 — Complete an order

- **Requirement ID:** REQ-010
- **Priority:** P0
- **Precondition:** Standard user is logged in with an empty cart.
- **Steps:** Add Backpack; open cart; start checkout; submit valid buyer information; finish the order.
- **Expected Result:** Completion page opens with `Thank you for your order!`.
- **Automation Status:** Automated (Smoke, Regression) — `06-playwright-tests/tests/saucedemo/checkout.spec.ts`
- **Latest Execution Result:** PASS
