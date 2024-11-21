# front
UI/UX, communicate with backend REST API

## Suggested Timeline

We will start on Nov 21, the Day 1. Feel free to modify the plan, mark, etc.

- [ ] **Day 1-2: Learning and Environment Setup**

1. **Learn Vue.js Basics (Day 1):**
   - Learn key concepts (components, directives, props, events, data binding).
   - Explore Vue Router for navigation and Axios for API calls.
   - Practice by building a small, mock component that fetches data from a dummy API.

2. **Set up the Development Environment (Day 2):**
   - Install dependencies:
     - Node.js, npm, Vue CLI.
     - Libraries: Vue Router, Axios, and optionally Vuetify or TailwindCSS for styling.
   - Initialize a project with Vue CLI (`vue create fantasy-sports-frontend`).
   - Set up `.env` for configuring the backend API base URL for easier integration.

- [ ] **Day 3-4: Authentication Pages**

1. **Day 3: Login and Signup Pages:**
   - Create forms for login and signup with client-side validation.
   - Use mock APIs (JSON server or a dummy endpoint) to simulate responses from FastAPI.
   - Implement error handling for incorrect credentials.

2. **Day 4: User Settings Page:**
   - Build the User Settings form:
     - Sections for updating user information and changing passwords.
     - Ensure inputs are validated and saved using PUT/POST requests.
   - Design the layout using a design library for consistency.

- [ ] **Day 5-6: Dashboard and Navigation**

1. **Day 5: Dashboard Homepage:**
   - Create a dashboard to display:
     - Team summaries.
     - Top-performing players.
     - Upcoming matches.
   - Use mock data for now; integrate real API data later.

2. **Day 6: Navigation and Global State Management:**
   - Implement Vue Router for navigation across:
     - Leagues, Teams, Players, Drafts, Matches, Trades & Waivers.
   - Use Vuex (or Pinia) to manage global states, such as user authentication status or current team data.

- [ ] **Day 7-8: CRUD Operations for Core Features**

1. **Day 7: Leagues, Teams, and Players:**
   - Develop interfaces for:
     - Listing and viewing leagues, teams, and players.
     - Adding, editing, and deleting entities.
   - Create reusable components for forms and tables.
   - Use mock APIs to test CRUD operations.

2. **Day 8: Drafts and Matches:**
   - Implement CRUD interfaces for drafts and matches.
   - Focus on integrating real-time match updates using mock reactive data.

- [ ] **Day 9: Trades, Waivers, and API Integration**

1. **Trades & Waivers Interface:**
   - Design the UI for managing trades and waivers.
   - Include actions to approve/reject waivers and track their status.

2. **API Integration:**
   - Replace mock data with real REST API endpoints.
   - Test each API call using Axios (GET, POST, PUT, DELETE).
   - Ensure smooth communication with FastAPI backend.

- [ ] **Day 10: Testing, Debugging, and Refinement**

1. **End-to-End Testing:**
   - Test navigation, data rendering, and interactions.
   - Debug UI glitches or API errors.
   - Use tools like Postman to verify backend endpoints, ensuring smooth integration.

2. **Polish UI/UX:**
   - Enhance design consistency across pages.
   - Fix any performance bottlenecks (e.g., optimize data-fetching logic).

### Update here if finalize the assginment for each developer

## Notes (feel free to edit)

Below I will provide a brief introduction for working with Git (from what I wrote for another project), please read and follow.

## Use Git

Each team member should work on separate branches and integrate changes into the main codebase **via pull requests (PRs)**.

Here’s a branching workflow:

- **Main Branch** (main): The stable production-ready branch.

- **Development Branch** (dev): The integration branch where new features are merged before they are ready for production.

- **Feature Branches** (feature): Each team member creates a branch for the feature they’re working on.
  - For example:
  - `feature/authentication` (for authentication work by teammate A)
  - `feature/charts` (for charting work by teammate B)
  - `feature/portfolio` (for portfolio work by teammate C)

### Sample Workflow:

1. **Branch Creation**: Each team member creates a branch from the `dev` branch, eg. called `feature/authentication`.

2. **Development**: Each developer works on their assigned feature (authentication, charts, portfolio) on their respective branches.

3. **Pull Requests**: After completing a feature, the developer creates a pull request to merge their feature branch into the `dev` branch.

4. **Code Review**: The team reviews the PR to ensure no conflicts or bugs before merging it into the `dev` branch.

5. **Final Testing**: Once the `dev` branch is stable, it is merged into the `main` branch for deployment.

Details about HOW-TO? Check [this](./How_to_new_a_branch.md).
