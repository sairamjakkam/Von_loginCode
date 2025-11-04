# Playwright Cucumber Regression Testing Framework

A comprehensive end-to-end testing framework built with **Playwright** and **Cucumber** for automated regression testing of web applications.

## 🚀 Project Overview

This framework provides a robust solution for automated testing with:
- **Playwright** for browser automation and cross-browser testing
- **Cucumber** for Behavior Driven Development (BDD) with Gherkin syntax
- **TypeScript** for type-safe test development
- **Page Object Model** for maintainable test structure
- **HTML and JSON reporting** for comprehensive test results

## 📋 Prerequisites

- **Node.js** (v16 or higher)
- **npm** or **yarn** package manager
- **Git** for version control

## 🛠️ Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd playwright_cucumber_regression-1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Install Playwright browsers:**
   ```bash
   npx playwright install
   ```

## 🏗️ Project Structure

```
playwright_cucumber_regression-1/
├── src/
│   ├── test/
│   │   ├── feature/           # Cucumber feature files (.feature)
│   │   ├── pages/            # Page Object Models (.ts)
│   │   └── steps/            # Step definitions (.ts)
│   ├── data/                 # Test data files (.json)
│   ├── hooks/               # Cucumber hooks
│   └── helper/              # Utility functions and helpers
├── config/
│   └── cucumber.js          # Cucumber configuration
├── test-results/            # Test execution reports
├── playwright.config.js      # Playwright configuration
├── package.json             # Project dependencies
└── tsconfig.json           # TypeScript configuration
```

## 🧪 Test Modules

The framework covers comprehensive testing across multiple modules:

### 📦 **Order Management**
- Order creation and lifecycle
- Product management (add, edit, delete)
- Cancelled/Backordered products
- Account setup and preferences
- Supplier management

### 🏥 **Encounter Management**
- Encounter creation and workflow
- Case management
- Patient data handling

### 📊 **Inventory Management**
- Product addition and removal
- Transfer operations
- Zero inventory handling
- Targeted physical inventory
- Preference handling

### 🎯 **Kanban Module**
- Bin scanning and management
- Alert handling
- Workflow automation

### 🔍 **Product Management**
- Product search and creation
- Transitioned products
- Product preferences

### ⚙️ **Account Setup**
- System preferences
- Encounter preferences
- Kanban preferences

## 🚀 Running Tests

### Basic Test Execution
```bash
# Run all tests
npm test

# Run with specific tags
npm test -- --tags @regression

# Run specific feature
npm test -- --tags @order
```

### Environment Configuration
```bash
# Run tests for specific environment
ENV=QA npm test
ENV=STAGING npm test
ENV=PROD npm test
```

### Parallel Execution
```bash
# Run tests in parallel (configured in cucumber.js)
npm test -- --parallel 4
```

## 🏷️ Tagging Strategy

The framework uses a comprehensive tagging system:

- **@regression** - Regression test suite
- **@order** - Order management tests
- **@inventory** - Inventory management tests
- **@encounter** - Encounter management tests
- **@kanban** - Kanban module tests
- **@product** - Product management tests
- **@refined** - Refined/tested scenarios
- **@notyetimplemented** - Scenarios pending implementation

### Example Tag Usage
```bash
# Run only order management tests
npm test -- --tags @order

# Run refined regression tests
npm test -- --tags @regression and @refined

# Exclude not yet implemented tests
npm test -- --tags "not @notyetimplemented"
```

## 📊 Reporting

The framework generates comprehensive reports:

- **HTML Reports**: `test-results/cucumber-report.html`
- **JSON Reports**: `test-results/cucumber-report.json`
- **Playwright Reports**: `test-results/` directory
- **Rerun File**: `@rerun.txt` for failed test reruns

### View Reports
```bash
# Open HTML report
open test-results/cucumber-report.html

# Open Playwright report
npx playwright show-report
```

## 🏗️ Page Object Model

The framework follows the Page Object Model pattern for maintainable tests:

### Example Page Object
```typescript
// src/test/pages/orderPage.ts
class OrderPage {
    locators = {
        createOrder: {
            createOrderButton: "[data-testid='create-order-button']",
            vendorDropdown: "[data-testid='manufacturer-dropdown']"
        },
        orderWorksheet: {
            addproductButton: "[data-testid='order-worksheet-empty-state-product-add-btn']",
            sendOrderButton: "[data-testid='order-worksheet-filter-send-order']"
        }
    }

    async createOrderWithVendorAndLocation() {
        // Implementation
    }
}
```

### Example Step Definition
```typescript
// src/test/steps/order.ts
Given('I create an order', async function () {
    await loginPage.navigateToSubMenuFromDashboard("ORDERS", "orders", "create-order");
    await orderPage.createOrderWithVendorAndLocation();
});
```

## 📝 Writing Tests

### Feature File Structure
```gherkin
@regression @order @createOrder
Feature: Order Management

Scenario: Create order with products
  Given I create an order
  When I add 1 product, save added product catalog number
  Then I verify the product is added successfully
```

### Step Definition Pattern
```typescript
Given('I create an order', async function () {
    // Navigation and setup
});

When('I add {int} product, save added product catalog number', async function (count) {
    // Action implementation
});

Then('I verify the product is added successfully', async function () {
    // Verification
});
```

## 🔧 Configuration

### Cucumber Configuration (`config/cucumber.js`)
- Viewport: 1920x1080 (Full HD)
- Parallel execution support
- Multiple report formats
- TypeScript support

### Playwright Configuration (`playwright.config.js`)
- Cross-browser testing (Chrome, Firefox, Safari)
- Retry logic for CI
- Trace collection on retry
- HTML reporter

## 🛠️ Development Workflow

### 1. **Create New Test**
```bash
# Create feature file
touch src/test/feature/newModule.feature

# Create page object
touch src/test/pages/newModulePage.ts

# Create step definitions
touch src/test/steps/newModule.ts
```

### 2. **Write Test Scenarios**
- Use Gherkin syntax in `.feature` files
- Follow existing naming conventions
- Add appropriate tags

### 3. **Implement Page Objects**
- Define locators with `data-testid` attributes
- Create reusable methods
- Follow existing patterns

### 4. **Write Step Definitions**
- Use existing navigation helpers
- Implement reusable verification methods
- Follow async/await patterns

## 🧪 Test Data Management

Test data is stored in JSON files:
- `src/data/test-data.json` - Main test data
- `src/data/product_*.json` - Product-specific data
- `src/data/inventory_*.json` - Inventory-specific data

## 🔍 Debugging

### Debug Mode
```bash
# Run with debug logging
DEBUG=1 npm test

# Run specific scenario
npm test -- --tags @debug
```

### Visual Debugging
```bash
# Run with headed browser
npx playwright test --headed

# Run with slow motion
npx playwright test --headed --slow-mo 1000
```

## 🚀 CI/CD Integration

### GitHub Actions Example
```yaml
name: E2E Tests
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npm test
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: test-results
          path: test-results/
```

## 📚 Best Practices

### 1. **Naming Conventions**
- Feature files: `moduleName.feature`
- Page objects: `moduleNamePage.ts`
- Step definitions: `moduleName.ts`

### 2. **Tagging Strategy**
- Use descriptive tags
- Group related scenarios
- Exclude incomplete tests

### 3. **Page Object Model**
- Keep locators centralized
- Create reusable methods
- Avoid hardcoded selectors

### 4. **Test Data**
- Use external JSON files
- Keep data environment-specific
- Use meaningful variable names

### 5. **Error Handling**
- Implement proper waits
- Use explicit assertions
- Handle dynamic content

## 🤝 Contributing

1. **Fork the repository**
2. **Create feature branch**: `git checkout -b feature/new-test`
3. **Write tests**: Follow existing patterns
4. **Run tests**: Ensure all tests pass
5. **Submit PR**: Include description and tags

## 📞 Support

For questions or issues:
- Check existing documentation
- Review test examples
- Contact the development team

## 📄 License

This project is licensed under the ISC License.

---

**Happy Testing! 🧪✨**