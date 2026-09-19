import { test, Page } from '@playwright/test'
import { LoginPage } from '../../pages/saucedemo/LoginPage'
import { InventoryPage } from '../../pages/saucedemo/InventoryPage'
import { CartPage } from '../../pages/saucedemo/CartPage'
import { CheckoutPage } from '../../pages/saucedemo/CheckoutPage'
import { saucedemo as sd } from '../../fixtures/test-data'

/**
 * SauceDemo (Swag Labs) — Full Purchase Flow (Playwright / TypeScript).
 *
 * inventory → sort → add to cart → cart → checkout → confirmation.
 *
 * This is the spec that CLOSES the checkout-coverage gap in the RTM:
 * Automation Exercise and Demoblaze can't complete a real purchase in
 * CI, but SauceDemo's public credentials let the whole flow — through
 * "Thank you for your order!" — run on every push across all browsers.
 *
 * Pattern: serial mode with ONE shared page and ONE login (beforeAll),
 * resetting app state in-app between tests. Mirrors the Cypress spec's
 * testIsolation:false approach and avoids hammering the demo CDN with
 * a fresh login per test.
 *
 * This focused case-study suite maps directly to docs/saucedemo/RTM.md.
 */

const BACKPACK = 'sauce-labs-backpack'
const BIKE_LIGHT = 'sauce-labs-bike-light'

test.describe.serial('SauceDemo — Full Purchase Flow', () => {
  let page: Page
  let inventory: InventoryPage
  let cart: CartPage
  let checkout: CheckoutPage

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage()
    await page.setViewportSize({ width: 1440, height: 900 })

    const login = new LoginPage(page)
    await login.visit()
    await login.loginAs(sd.standard, sd.password)
    await login.assertOnInventory()

    inventory = new InventoryPage(page)
    cart = new CartPage(page)
    checkout = new CheckoutPage(page)
  })

  test.beforeEach(async () => {
    // Reset to a clean, empty-cart inventory between tests — in-app,
    // no page reload.
    await inventory.resetToCleanInventory()
  })

  test.afterAll(async () => {
    await page.close()
  })

  // ---- INVENTORY ----------------------------------------------

  test('TC-007 | Product catalog is complete @regression', async () => {
    await inventory.assertItemCount(6)
    await inventory.assertProductsHaveNamesAndPrices()
  })

  test('TC-008 | Products sort by price low to high @regression', async () => {
    await inventory.sortBy('lohi')
    await inventory.assertPricesAscending()
  })

  test('TC-009 | Products sort by name Z to A @regression', async () => {
    await inventory.sortBy('za')
    await inventory.assertNamesDescending()
  })

  test('TC-010 | Products sort by price high to low @regression', async () => {
    await inventory.sortBy('hilo')
    await inventory.assertPricesDescending()
  })

  test('TC-011 | Add one product to cart @smoke @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.assertCartBadgeCount(1)
    await inventory.removeButton(BACKPACK).waitFor({ state: 'visible' })
  })

  test('TC-012 | Remove product from inventory @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.removeFromCart(BACKPACK)
    await inventory.assertCartIsEmpty()
    await inventory.addToCartButton(BACKPACK).waitFor({ state: 'visible' })
  })

  // ---- CART ---------------------------------------------------

  test('TC-013 | Cart contains multiple selected products @smoke @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.addToCart(BIKE_LIGHT)
    await inventory.assertCartBadgeCount(2)
    await inventory.openCart()

    await cart.assertItemCount(2)
    await cart.assertContainsItem('Sauce Labs Backpack')
    await cart.assertContainsItem('Sauce Labs Bike Light')
  })

  test('TC-014 | Remove one of multiple cart items @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.addToCart(BIKE_LIGHT)
    await inventory.openCart()

    await cart.removeItem(BACKPACK)
    await cart.assertItemCount(1)
    await cart.assertContainsItem('Sauce Labs Bike Light')
  })

  test('TC-015 | Cart survives inventory and cart navigation @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.openCart()
    await cart.assertContainsItem('Sauce Labs Backpack')

    await cart.continueShopping()
    await inventory.assertCartBadgeCount(1)
    await inventory.openCart()
    await cart.assertContainsItem('Sauce Labs Backpack')
  })

  // ---- CHECKOUT (full, through confirmation) ------------------

  test('TC-016 | Checkout requires first name @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.openCart()
    await cart.checkout()

    await checkout.fillBuyerInfo(undefined, sd.buyer.lastName, sd.buyer.postalCode)
    await checkout.assertErrorContains('First Name is required')
  })

  test('TC-017 | Checkout requires last name @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.openCart()
    await cart.checkout()

    await checkout.fillBuyerInfo(sd.buyer.firstName, undefined, sd.buyer.postalCode)
    await checkout.assertErrorContains('Last Name is required')
  })

  test('TC-018 | Checkout requires postal code @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.openCart()
    await cart.checkout()

    await checkout.fillBuyerInfo(sd.buyer.firstName, sd.buyer.lastName, undefined)
    await checkout.assertErrorContains('Postal Code is required')
  })

  test('TC-019 | Overview has correct item and total @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.openCart()
    await cart.checkout()

    await checkout.fillBuyerInfo(sd.buyer.firstName, sd.buyer.lastName, sd.buyer.postalCode)
    await checkout.assertOnOverview()
    await checkout.assertOverviewItemCount(1)

    await checkout.assertOverviewContainsItem('Sauce Labs Backpack')
    await checkout.assertTotalIsConsistent()
  })

  test('TC-020 | Complete an order @smoke @regression', async () => {
    await inventory.addToCart(BACKPACK)
    await inventory.openCart()
    await cart.assertContainsItem('Sauce Labs Backpack')
    await cart.checkout()

    await checkout.fillBuyerInfo(sd.buyer.firstName, sd.buyer.lastName, sd.buyer.postalCode)
    await checkout.assertOnOverview()

    await checkout.finish()
    await checkout.assertOrderComplete()
  })
})
