# Contributing to Shadcn UI Variants

Thank you for your interest in contributing to Shadcn UI Variants! Your contributions help make the project better for everyone. Please follow these guidelines to ensure a smooth collaboration process.

## How to Contribute

### Reporting Bugs

- **Open an Issue:**  
  If you find a bug, please open an issue on GitHub with a clear description, including:
  - Steps to reproduce the problem.
  - Expected vs. actual behavior.
  - Any relevant screenshots or error messages.

### Proposing New Features

- **Discuss First:**  
  Before starting work on a new feature or enhancement, open an issue to discuss your idea. This helps ensure your contribution aligns with the project goals.
- **Detail Your Proposal:**  
  Clearly describe the feature, its benefits, and any potential drawbacks.

### Submitting Pull Requests

1. **Fork and Branch:**

   - Fork the repository.
   - Create a new branch from `main` with a descriptive name (e.g., `feature/interactive-playground-enhancement` or `bugfix/fix-component-render`).

2. **Code Guidelines:**

   - Follow the existing project style and conventions.
   - Use TypeScript and Tailwind CSS consistently.
   - Write clear commit messages that describe your changes.

3. **Testing and Documentation:**

   - Add or update tests for any new functionality.
   - Update documentation and comments as needed to reflect your changes.

4. **Submit a PR:**
   - Ensure your pull request (PR) description explains your changes clearly.
   - Reference any related issues in the PR description.

### Branch Naming Conventions

- **New Features:** Use `feature/description`.
- **Bug Fixes:** Use `bugfix/description`.
- **Documentation:** Use `docs/description`.

## Code Reviews

- All submitted pull requests will be reviewed by at least one maintainer.
- You may be asked to make adjustments before the PR is merged.
- Constructive feedback will be provided during the review process.

## Licensing

By contributing, you agree that your contributions will be licensed under the project's MIT License.

## Getting Started

1. **Clone the Repository:**

```bash
git clone https://github.com/your-username/shadcn-variants.git
cd shadcn-variants
```

2. **Install Dependencies:**

On Windows, run:

```bash
pnpm install
```

3. **Environmental Variables:**

Add a `.env` file in the root folder and set the two variables:

- `NEXT_PUBLIC_URL="http://localhost:4000"`
- `API_KEY=` create a secure key to be able to execute server actions

4. **Run the Development Server:**

```bash
pnpm dev
```

For any questions or help getting started, please open an issue on GitHub.

Thank you for contributing!
