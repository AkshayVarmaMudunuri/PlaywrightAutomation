
# Playwright Automation Testing – SauceDemo

## Project Overview

This project contains end-to-end test automation for the SauceDemo web application using Playwright with TypeScript.

The main objective is to validate important e-commerce functionalities, including user login, product listings, shopping cart operations, checkout processes, and menu navigation.

The project follows a practical QA automation approach, focusing on functional testing, positive and negative test scenarios, and validating expected application behaviour.



## Technologies Used

- **Playwright** – End-to-end browser automation testing.
- **TypeScript** – Programming language used to write test scripts.
- **Node.js** – JavaScript runtime environment.
- **npm** – Package manager for installing dependencies.
- **Git** – Version control system.
- **GitHub** – Source code hosting and project management.



## Application Under Test

**Website:** https://www.saucedemo.com/

SauceDemo is a demo e-commerce application used for practising software testing and automation.

The application provides functionalities such as:
- User authentication
- Product browsing and sorting
- Shopping cart management
- Checkout and order completion
- Menu navigation



## Test Scenarios Covered

### 1. Login Tests
- Successful login with valid credentials.
- Login with invalid username and password.
- Validation of empty username and password fields.
- Verification of login error messages.

### 2. Inventory / Product Tests
- Verify product listings and product details.
- Validate product images, names, descriptions, and prices.
- Test product sorting (A–Z, Z–A, Price Low–High, Price High–Low).
- Add and remove products from the shopping cart.
- Verify product detail navigation.

### 3. Shopping Cart Tests
- Verify cart contents and product details.
- Add and remove products.
- Validate cart badge count.
- Verify Continue Shopping functionality.

### 4. Checkout Tests
- Validate checkout information fields.
- Test mandatory field validation.
- Verify order summary, payment, shipping, tax, and total.
- Complete an order successfully.

### 5. Menu Tests
- Open and close the navigation menu.
- Verify menu options.
- Test logout functionality.
- Test Reset App State functionality.


## Project Structure

```text
PlaywrightAutomation/
│
├── tests/
│   └── tests/
│       ├── cart.spec.ts
│       ├── checkout1.spec.ts
│       ├── checkout2.spec.ts
│       ├── complete.spec.ts
│       ├── inventory.spec.ts
│       ├── login.spec.ts
│       ├── logout.spec.ts
│       └── reset.spec.ts
│
├── .gitignore
├── package.json
├── package-lock.json
└── playwright.config.ts
```


## Installation and Setup

### 1. Clone the repository

```bash
git clone https://github.com/AkshayVarmaMudunuri/PlaywrightAutomation.git
```

### 2. Navigate to the project directory

```bash
cd PlaywrightAutomation
```

### 3. Install project dependencies

```bash
npm install
```

### 4. Install Playwright browsers

```bash
npx playwright install
```


## Running Tests

### Run all tests

```bash
npx playwright test
```

### Run tests in UI mode

```bash
npx playwright test --ui
```

### Run a specific test file

```bash
npx playwright test tests/tests/login.spec.ts
```

### Run tests in headed mode (visible browser)

```bash
npx playwright test --headed
```


## Test Reports

Playwright generates an HTML report after test execution.

To open the HTML report, run:

```bash
npx playwright show-report
```

The report provides information about:
- Total tests executed.
- Passed and failed tests.
- Test execution duration.
- Error details for failed tests.
- Screenshots and other available test evidence.



## Author

**Akshay Varma Mudunuri**

QA Automation Engineer – Learning Portfolio

This project demonstrates hands-on experience with Playwright, TypeScript, end-to-end testing, and Git version control.

**GitHub:** https://github.com/AkshayVarmaMudunuri
