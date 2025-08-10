# Playwright Testing Project
This project uses Playwright with TypeScript to perform UI testing on Chromium. 

---
## Prerequisites
Make sure you have the following installed:

- Node.js
- npm
- Git (optional, for version control)

---
## Setup
Install dependencies:

```bash
npm install
```
---
## Running the tests
Enable headless: false in config for visual debugging.

1. Run all tests:

```bash
npx playwright test
```

2. Run a Specific Test by Name

```bash
npx playwright test -g "<test_name>"
```

3. To run a Playwright test in headed mode (with the browser visible), use the --headed flag:

```bash
npx playwright test --headed
```
