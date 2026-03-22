# SauceDemo Playwright Framework

End-to-end test automation framework for [SauceDemo](https://www.saucedemo.com), built with [Playwright](https://playwright.dev) and TypeScript using the Page Object Model pattern.

---

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Running Tests](#running-tests)
- [Test Suites](#test-suites)
- [Architecture](#architecture)
- [Linting & Formatting](#linting--formatting)

---

## Prerequisites

- [Node.js](https://nodejs.org) v18 or higher
- npm v9 or higher

---

## Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

---

## Configuration

The framework reads configuration from environment variables. Defaults point to the public SauceDemo site and its well-known test credentials, so no `.env` file is required for local runs.

| Variable               | Default                  | Description                        |
|------------------------|--------------------------|------------------------------------|
| `BASE_URL`             | `https://www.saucedemo.com` | Target application URL          |
| `USER_PASSWORD`        | `secret_sauce`           | Shared password for all test users |
| `STANDARD_USER`        | `standard_user`          | Standard test user                 |
| `LOCKED_OUT_USER`      | `locked_out_user`        | Locked-out test user               |
| `PROBLEM_USER`         | `problem_user`           | Problem test user                  |
| `PERFORMANCE_GLITCH_USER` | `performance_glitch_user` | Performance-glitch test user   |
| `ERROR_USER`           | `error_user`             | Error test user                    |
| `VISUAL_USER`          | `visual_user`            | Visual test user                   |

To override values, create a `.env` file in the project root (it is git-ignored):

```env
BASE_URL=https://www.saucedemo.com
USER_PASSWORD=secret_sauce
```

---

## Project Structure

```
├── playwright.config.ts        # Playwright configuration
├── tsconfig.json               # TypeScript configuration & path aliases
├── eslint.config.mjs           # ESLint configuration
├── src/
│   ├── components/             # Reusable page components
│   │   ├── BaseComponent.ts
│   │   ├── HeaderComponent.ts
│   │   ├── ProductCardComponent.ts
│   │   └── SideMenuComponent.ts
│   ├── fixtures/
│   │   └── pageFixtures.ts     # Extended Playwright fixtures (page objects)
│   ├── pages/                  # Page Object Model classes
│   │   ├── BasePage.ts
│   │   ├── CartPage.ts
│   │   ├── CheckoutPage.ts
│   │   ├── InventoryPage.ts
│   │   └── LoginPage.ts
│   ├── test-data/              # Static test data
│   │   ├── checkoutData.ts
│   │   └── inventoryData.ts
│   ├── types/
│   │   └── index.ts            # Shared TypeScript types
│   └── utils/
│       ├── envHelper.ts        # Environment variable helpers & user credentials
│       └── logger.ts           # Logging utility
├── tests/
│   ├── auth/
│   │   └── auth.setup.ts       # Auth setup – logs in once and saves storage state
│   └── e2e/
│       ├── cart.spec.ts
│       ├── checkout.spec.ts
│       ├── inventory.spec.ts
│       └── login.spec.ts
└── playwright/
    └── .auth/                  # Saved browser storage state (git-ignored)
```

---

## Running Tests

| Command | Description |
|---|---|
| `npm test` | Run all tests (headless, all browsers) |
| `npm run test:headed` | Run all tests in headed mode |
| `npm run test:ui` | Open Playwright UI mode |
| `npm run test:debug` | Run tests in debug mode |
| `npm run test:report` | Open the last HTML test report |

### Run a specific test file

```bash
npx playwright test tests/e2e/login.spec.ts
```

### Run tests on a specific browser

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

### CI mode

In CI the framework automatically enables:
- `forbidOnly` – fails if `test.only` is committed
- `retries: 2` – retries flaky tests up to twice
- `workers: 4` – parallelism capped at 4 workers

---

## Test Suites

| Suite | File | Description |
|---|---|---|
| **Auth setup** | `tests/auth/auth.setup.ts` | Logs in once and persists session for all other tests |
| **Login** | `tests/e2e/login.spec.ts` | Successful login, locked-out user error |
| **Inventory** | `tests/e2e/inventory.spec.ts` | Inventory list visibility, product count |
| **Cart** | `tests/e2e/cart.spec.ts` | Empty cart, add item to cart |
| **Checkout** | `tests/e2e/checkout.spec.ts` | Full checkout flow |

---

## Architecture

### Page Object Model

Each page of the application is represented by a class in `src/pages/`. Pages extend `BasePage` and encapsulate all selectors and interactions for that page.

### Fixtures

`src/fixtures/pageFixtures.ts` extends the base Playwright `test` object with typed page object fixtures:

- `loginPage` – `LoginPage` instance
- `inventoryPage` – `InventoryPage` instance
- `cartPage` – `CartPage` instance
- `checkoutPage` – `CheckoutPage` instance
- `authenticatedPage` – `InventoryPage` pre-navigated using the saved auth session

### Authentication Strategy

The `setup` project (`tests/auth/auth.setup.ts`) runs once before all browser projects. It logs in as `standard_user` and saves the browser storage state to `playwright/.auth/user.json`. All subsequent test projects load this file via `storageState`, skipping UI login entirely.

### Path Aliases

TypeScript path aliases are configured in `tsconfig.json` for clean imports:

| Alias | Resolves to |
|---|---|
| `@pages/*` | `src/pages/*` |
| `@components/*` | `src/components/*` |
| `@utils/*` | `src/utils/*` |
| `@fixtures/*` | `src/fixtures/*` |
| `@shared/*` | `src/types/*` |
| `@test-data/*` | `src/test-data/*` |

---

## Linting & Formatting

```bash
# Check for lint errors
npm run lint

# Auto-fix lint errors
npm run lint:fix

# Check formatting
npm run format:check

# Auto-format all files
npm run format
```

The project uses **ESLint** (with `typescript-eslint`) for static analysis and **Prettier** for consistent code formatting.
