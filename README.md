# n8n-nodes-docusign

[n8n](https://n8n.io/) is a [fair-code licensed](https://docs.n8n.io/reference/license/) workflow automation platform.

This is a custom n8n community node providing an integration with Docusign.

---

## 📚 Table of Contents

- Features
- Installation
- Authentication
- Development & Testing
- Roadmap
- Resources

---

## 📁 Features

### Resources

- Templates:
  - create
  

- Envelopes

---

## 📦 Installation

Follow the [installation guide](https://docs.n8n.io/integrations/community-nodes/installation/) in the n8n community nodes documentation.

1. Go to **Settings** > **Community Nodes.**
2. Select **Install.**
3. Find the node you want to install:

   a.) Select **Browse**. n8n takes you to an npm search results page, showing all npm packages tagged with the keyword `n8n-community-node-package`.

   b.) Browse the list of results. You can filter the results or add more keywords.

   c.) Once you find the package you want, make a note of the package name. If you want to install a specific version, make a note of the version number as well.

   d.) Return to n8n.

4. Enter the npm package name, and version number if required.
5. Agree to the risks of using community nodes: select I understand the risks of installing unverified code from a public source.
6. Select Install. n8n installs the node, and returns to the Community Nodes list in Settings.

---

## 🔐 Authentication



---

## 🧪 Development & Testing

### Setup Development Environment

```bash
# Install dependencies
pnpm install

# Build the project
pnpm build

# Watch mode (auto-compile on changes)
pnpm dev
```

### Running Tests

This project includes comprehensive unit tests for all utility functions and core functionality.

```bash
# Run all tests
pnpm test

# Run tests in watch mode (auto-run on file changes)
pnpm test:watch

# Run tests with coverage report
pnpm test:coverage
```

### Code Quality

```bash
# Lint code
pnpm lint

# Fix linting issues
pnpm lintfix

# Format code
pnpm format
```

---

## 🚧 Roadmap

### Triggers

- Envelope sent or completed
- Envelope declined or voided
- Recipient viewed or signed
- Envelope status changed

### Actions

- Send envelope from template
- Create & send envelope (custom document or existing PDF)
- Get envelope status
- List templates
- List users or recipients
- Download completed envelope

---

## 🚧 Development Log

Created & Tested:
- [X] Templates/Templates/Create
- [X] Templates/Templates/Get
- [X] Templates/Templates/List



---

## 🔗 Resources

- [n8n Website](https://n8n.io/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Docusign Website](https://www.docusign.com/)
- [Docusign API documentation](https://developers.docusign.com/docs/)
- [Docusign API reference](https://developers.docusign.com/docs/esign-rest-api/reference/)
- [Docusign Login](https://account-d.docusign.com/)
- [Zapier Docusign Integrations](https://zapier.com/apps/docusign/integrations)
- [GitHub Repository](https://github.com/hansdoebel/n8n-nodes-docusign)
- [Sample PDF](https://raw.githubusercontent.com/docusign/code-examples-java/master/src/main/resources/World_Wide_Corp_lorem.pdf)

---

## 📜 Version History

- `0.0.1` – Initial release (Thanks to [JanThiel](https://github.com/JanThiel) for foundational code)
