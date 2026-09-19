# SauceDemo Requirements

Scope: the public [SauceDemo](https://www.saucedemo.com/) storefront, tested with the published `standard_user` and `locked_out_user` personas. These requirements describe only behavior that is visible in the current application and covered by this case study.

| ID | Title | Description | Business Risk / Test Focus |
|---|---|---|---|
| REQ-001 | Login page availability | The login page shall display username and password inputs and a login action. | A missing or unusable control blocks every customer journey. |
| REQ-002 | Successful authentication | A standard user with the published valid credentials shall reach the product inventory. | Valid customers must be able to start shopping. |
| REQ-003 | Authentication validation | The application shall reject locked users, invalid credentials, and missing required credentials with a clear error while remaining on the login page. | Weak or unclear validation can create access and support risks. |
| REQ-004 | Product listing | After login, the inventory shall display the six available products with names and numeric prices. | An incomplete or malformed catalog prevents informed purchasing. |
| REQ-005 | Product sorting | The customer shall be able to sort products by name and price using the available sort options. | Incorrect ordering makes products difficult to compare. |
| REQ-006 | Add and remove products | The customer shall be able to add a product, see the cart count update, and remove the product again. | Incorrect cart mutations can cause unintended orders. |
| REQ-007 | Cart state | The cart shall contain the selected products, preserve them across inventory/cart navigation, and update after removal. | Lost, duplicated, or stale cart state directly affects order accuracy. |
| REQ-008 | Checkout information validation | Checkout shall require first name, last name, and postal code before showing the overview. | Missing buyer data can prevent fulfilment. |
| REQ-009 | Checkout overview | The overview shall show the selected items and a total consistent with item subtotal plus tax. | Incorrect totals or items create financial and trust risks. |
| REQ-010 | Order completion | A valid checkout shall reach the completion page and display the order confirmation message. | Failure at the final step represents lost conversion and an ambiguous order state. |

## Out of Scope

- Payment processing, shipment, email confirmation, and a real backend database (not exposed by SauceDemo).
- Performance, security penetration testing, and destructive testing.
- Automation Exercise, Demoblaze, The Internet, Selenium, Cypress, and k6 remediation; their upstream status is documented in [`../UPSTREAM_AUDIT.md`](../UPSTREAM_AUDIT.md).
