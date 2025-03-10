import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Well Known",
      items: [
        {
          type: "doc",
          id: "api/endpoints/get-json-web-key-set-jwks",
          label: "Get JSON Web Key Set (JWKS)",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/get-open-id-connect-discovery-configuration",
          label: "Get OpenID Connect discovery configuration",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "API Keys",
      items: [
        {
          type: "doc",
          id: "api/endpoints/list-api-keys",
          label: "List API keys",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/create-api-key",
          label: "Create API key",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/revoke-api-key",
          label: "Revoke API key",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Application Configuration",
      items: [
        {
          type: "doc",
          id: "api/endpoints/list-public-application-configurations",
          label: "List public application configurations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-application-configurations",
          label: "Update application configurations",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/list-all-application-configurations",
          label: "List all application configurations",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/get-background-image",
          label: "Get background image",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-background-image",
          label: "Update background image",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/get-favicon",
          label: "Get favicon",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-favicon",
          label: "Update favicon",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/get-logo-image",
          label: "Get logo image",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-logo",
          label: "Update logo",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/synchronize-ldap",
          label: "Synchronize LDAP",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/send-test-email",
          label: "Send test email",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Audit Logs",
      items: [
        {
          type: "doc",
          id: "api/endpoints/list-audit-logs",
          label: "List audit logs",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Custom Claims",
      items: [
        {
          type: "doc",
          id: "api/endpoints/get-custom-claim-suggestions",
          label: "Get custom claim suggestions",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-custom-claims-for-a-user-group",
          label: "Update custom claims for a user group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/update-custom-claims-for-a-user",
          label: "Update custom claims for a user",
          className: "api-method put",
        },
      ],
    },
    {
      type: "category",
      label: "OIDC",
      items: [
        {
          type: "doc",
          id: "api/endpoints/check-if-authorization-confirmation-is-required",
          label: "Check if authorization confirmation is required",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/authorize-oidc-client",
          label: "Authorize OIDC client",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/list-oidc-clients",
          label: "List OIDC clients",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/create-oidc-client",
          label: "Create OIDC client",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/delete-oidc-client",
          label: "Delete OIDC client",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/endpoints/get-oidc-client",
          label: "Get OIDC client",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-oidc-client",
          label: "Update OIDC client",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/update-allowed-user-groups",
          label: "Update allowed user groups",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/delete-client-logo",
          label: "Delete client logo",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/endpoints/get-client-logo",
          label: "Get client logo",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-client-logo",
          label: "Update client logo",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/get-client-metadata",
          label: "Get client metadata",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/create-client-secret",
          label: "Create client secret",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/end-oidc-session",
          label: "End OIDC session",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/end-oidc-session-post-method",
          label: "End OIDC session (POST method)",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/create-oidc-tokens",
          label: "Create OIDC tokens",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/get-user-information",
          label: "Get user information",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/get-user-information-post-method",
          label: "Get user information (POST method)",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Users",
      items: [
        {
          type: "doc",
          id: "api/endpoints/request-one-time-access-email",
          label: "Request one-time access email",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/exchange-one-time-access-token",
          label: "Exchange one-time access token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/setup-initial-admin",
          label: "Setup initial admin",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/list-users",
          label: "List users",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/create-user",
          label: "Create user",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/delete-user",
          label: "Delete user",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/endpoints/get-user-by-id",
          label: "Get user by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-user",
          label: "Update user",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/get-user-groups",
          label: "Get user groups",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/create-one-time-access-token",
          label: "Create one-time access token",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/update-user-profile-picture",
          label: "Update user profile picture",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/get-user-profile-picture",
          label: "Get user profile picture",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-user-groups",
          label: "Update user groups",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/get-current-user",
          label: "Get current user",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-current-user",
          label: "Update current user",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/update-current-users-profile-picture",
          label: "Update current user's profile picture",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/get-current-users-profile-picture",
          label: "Get current user's profile picture",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "User Groups",
      items: [
        {
          type: "doc",
          id: "api/endpoints/list-user-groups",
          label: "List user groups",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/create-user-group",
          label: "Create user group",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "api/endpoints/delete-user-group",
          label: "Delete user group",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "api/endpoints/get-user-group-by-id",
          label: "Get user group by ID",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "api/endpoints/update-user-group",
          label: "Update user group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/update-users-in-a-group",
          label: "Update users in a group",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "api/endpoints/get-user-groups",
          label: "Get user groups",
          className: "api-method get",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
