# n8n-nodes-docusign

> **⚠️ Early Development Stage**: This node is currently in very early development. Not all operations have been tested yet. Use with caution in production environments.

DocuSign integration for [n8n](https://n8n.io/) workflow automation platform.

## Installation

### Community Nodes

1. Go to **Settings** > **Community Nodes**
2. Select **Install**
3. Enter package name: `n8n-nodes-docusign`
4. Agree to the risks of using community nodes
5. Select **Install**

### Manual Installation

```bash
npm install n8n-nodes-docusign
```

## Authentication

This node uses OAuth2 for authentication.

### Setup

1. Create a DocuSign developer account at [developers.docusign.com](https://developers.docusign.com/)
2. Create an integration in the DocuSign Admin Console
3. Configure OAuth settings and obtain Client ID and Client Secret
4. In n8n, create new DocuSign OAuth2 credentials
5. Enter your Client ID, Client Secret, and account base URI
6. Complete the OAuth flow

For detailed instructions, see the [DocuSign OAuth documentation](https://developers.docusign.com/platform/auth/oauth/).

## Supported Resources

- Accounts
- Billing
- Bulk Envelopes
- Cloud Storage
- Connect
- Custom Tabs
- Diagnostics
- Envelopes
- Folders
- Groups
- Notary
- Organizations
- Permission Profiles
- PowerForms
- Signatures
- Signing Groups
- Templates
- Users
- Workspaces

## Development

### Setup

```bash
git clone https://github.com/hansdoebel/n8n-nodes-docusign.git
cd n8n-nodes-docusign
npm install
```

---

## Resources

- [n8n Website](https://n8n.io/)
- [n8n community nodes documentation](https://docs.n8n.io/integrations/community-nodes/)
- [Docusign Website](https://www.docusign.com/)
- [Docusign API documentation](https://developers.docusign.com/docs/)
- [Docusign API reference](https://developers.docusign.com/docs/esign-rest-api/reference/)
- [Docusign Login](https://account-d.docusign.com/)
- [Zapier Docusign Integrations](https://zapier.com/apps/docusign/integrations)
- [GitHub Repository](https://github.com/hansdoebel/n8n-nodes-docusign)
- [Sample PDF](https://raw.githubusercontent.com/docusign/code-examples-java/master/src/main/resources/World_Wide_Corp_lorem.pdf)
- [ocusign-esign-node-client](https://github.com/docusign/esign-node-client)


## Credits

Initial code by [JanThiel](https://github.com/JanThiel)
