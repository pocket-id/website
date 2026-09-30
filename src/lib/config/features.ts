import type { LucideIcon } from "@lucide/svelte";

import Shield from "@lucide/svelte/icons/shield";
import Users from "@lucide/svelte/icons/users";
import Database from "@lucide/svelte/icons/database";
import Code from "@lucide/svelte/icons/code";
import Target from "@lucide/svelte/icons/target";
import QrCode from "@lucide/svelte/icons/qr-code";
import Languages from "@lucide/svelte/icons/languages";
import RefreshCw from "@lucide/svelte/icons/refresh-cw";
import FileText from "@lucide/svelte/icons/file-text";
import KeyRound from "@lucide/svelte/icons/key-round";

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
  image?: string;
}

export const mainFeatures: Feature[] = [
  {
    icon: Shield,
    title: "Passwordless Authentication",
    description:
      "Pocket ID only supports passwordless authentication, which is easier and more secure than signing in with a password.",
    image: "auth_screenshot.webp",
  },
  {
    icon: Users,
    title: "Group-based Access Control",
    description:
      "Choose which user groups may access each application so only authorized users can sign in.",
    image: "group_restriction_screenshot.webp",
  },
  {
    icon: Database,
    title: "LDAP Integration",
    description:
      "Sync your users and groups from your LDAP server to Pocket ID.",
    image: "ldap_screenshot.webp",
  },
  {
    icon: Code,
    title: "REST API",
    description:
      "Use the documented administrative API to build integrations, automate user management, and manage Pocket ID programmatically.",
    image: "rest_api_screenshot.webp",
  },
  {
    icon: Target,
    title: "API Resource Indicators",
    description:
      "Request access tokens for a specific API with the OAuth 2.0 resource parameter and grant only the scopes that API exposes.",
    image: "api_resource_screenshot.webp",
  },
];

export const additionalFeatures: Feature[] = [
  {
    icon: QrCode,
    title: "Sign in from another device",
    description:
      "Scan a QR code and approve the request on another device that has your passkey.",
  },
  {
    icon: Languages,
    title: "25 Languages",
    description:
      "The community has translated Pocket ID into over 10 languages. More translations are always welcome!",
  },
  {
    icon: RefreshCw,
    title: "SCIM Provisioning",
    description:
      "Automatically provision and deprovision users and groups in connected applications.",
  },
  {
    icon: FileText,
    title: "Audit Logs",
    description:
      "Comprehensive audit logs for important events, both global and per user.",
  },
  {
    icon: KeyRound,
    title: "Metadata-based OAuth Clients",
    description:
      "Connect compatible clients through a hosted metadata document instead of registering and maintaining each client manually.",
  },
  {
    icon: Shield,
    title: "Self-Hosted",
    description:
      "Complete control over your authentication infrastructure with self-hosting.",
  },
];
