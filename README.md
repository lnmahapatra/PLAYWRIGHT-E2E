playwright-e2e-framework/
├─ .github/
├─ test-results/
├─ src/
│ ├─ pages/
│ │ ├─ HomePage.ts
│ │ ├─ ProductPage.ts
│ │ ├─ CartPage.ts
│ │ ├─ MenTopsPage.ts
│ ├─ tests/
│ │ ├─ ecommerce.spec.ts
│ │ ├─ network.spec.ts
│ │ ├─ magento-pagination.spec.ts
│ ├─ utils/
│ │ ├─ softAssert.ts
│ ├─ interfaces/
│ │ └─ Product.ts
│ └─ main-network/
│ └─ main.ts
├─ PLAN.md
├─ README.md
├─ package.json
├─ playwright.config.ts
└─ .gitignore


Setup

Node.js v18+ (recommended)

Clone repository

git clone https://github.com/lnmahapatra/PLAYWRIGHT-E2E.git
local run
cd PlaywrightE2EFramework
npm install
npx playwright install
Run tests

Run all tests:

npx playwright test

Run a single file:

npx playwright test src/tests/ecommerce.spec.ts

Generate HTML report after run:

npx playwright show-report
Run network script
node ./dist/main-network/main.js   # after tsc build
# or run directly with ts-node if installed
npx ts-node src/main-network/main.ts
Test results

Reports and screenshots will be in test-results/ and Playwright HTML report by default.
<img width="1180" height="506" alt="image" src="https://github.com/user-attachments/assets/8a2e64a3-9684-4119-b139-9f7b182f8824" />


<img width="1180" height="506" alt="image" src="https://github.com/user-attachments/assets/a9a0c920-99b8-40f5-a110-bdf5671b8492" />
