# CategoryApp

Developed a WebApp for selecting category with drill down to multi-sub category and search functionality, fetching data from `categories.json` and return the ID from the selected data

## Tech Stack & Key Implementations

* **Angular 17+:** Utilized Standalone Components, `signal`, and `computed` for clean state management. Separated `.html` and `.ts` files for better maintainability.
* **Client-Side Rendering:** Used `isPlatformBrowser` to fetch the JSON data on the client side.
* **Playwright (E2E Testing):** Implemented automated tests for user flows and search functionality.
* **GitHub Actions (CI/CD):** Set up a workflow to automatically run Playwright tests on push. Configured `webServer` in `playwright.config.ts` to boot up the Angular dev server at `localhost:4200` before executing tests.

---

## Running the Project

This project was generated with Angular CLI version 22.0.3.

**Development Server**
```bash
ng serve