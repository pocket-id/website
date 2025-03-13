# <div align="center"><img  src="https://github.com/user-attachments/assets/4ceb2708-9f29-4694-b797-be833efce17d" width="100"/> </br>Pocket ID Website</div>

Pocket ID is a simple OIDC provider that allows users to authenticate with their passkeys to your services.

This website is built using [Docusaurus](https://docusaurus.io/).

## Contributing

### Setup

1. Clone the pocket-id/pocket-id and pocket-id/website repos
   ```bash
   git clone https://github.com/pocket-id/website
   cd webiste
   git clone https://github.com/pocket-id/pocket-id
   ```
2. Install `Swag`
   ```bash
   go install github.com/swaggo/swag/cmd/swag@latest
   ```
3. Generate Swagger API Doc Annotations
   ```bash
   cd pocket-id/backend
   swag init -d ./internal,./internal/dto -g ../cmd/main.go -ot yaml -o ../../static
   ```
4. Install the dependencies:
   ```bash
   npm install
   ```

5. Generate API Documentation
   ```bash
   npx docusaurus gen-api-docs all
   ```

6. Start the development server:
   ```bash
   npm start
   ```

These commands generate the API Documentation starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

### Structure
The markdown files are located in the `docs` folder. The sidebar is defined in `sidebars.ts`.
