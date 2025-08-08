import { type Icon as IconType } from '@lucide/svelte';

import Shield from '@lucide/svelte/icons/shield';
import Users from '@lucide/svelte/icons/users';
import Database from '@lucide/svelte/icons/database';
import Code from '@lucide/svelte/icons/code';
import UserPlus from '@lucide/svelte/icons/user-plus';
import Smartphone from '@lucide/svelte/icons/smartphone';
import Globe from '@lucide/svelte/icons/globe';
import Palette from '@lucide/svelte/icons/palette';
import FileText from '@lucide/svelte/icons/file-text';
import Mail from '@lucide/svelte/icons/mail';

export interface Feature {
  icon: typeof IconType;
  title: string;
  description: string;
  image?: string;
}

export const mainFeatures: Feature[] = [
  {
    icon: Shield,
    title: 'Passwordless Authentication',
    description:
      'Pocket ID only supports passwordless authentication, which is easier and more secure than signing in with a password.',
    image: 'auth_screenshot.png',
  },
  {
    icon: Users,
    title: 'Restrict User Groups',
    description:
      'You can select which user groups are allowed to authenticate with your services. Fine-grained access control ensures only authorized users can access your applications.',
    image: 'group_restriction_screenshot.png',
  },
  {
    icon: Database,
    title: 'LDAP Integration',
    description: 'Sync your users and groups from your LDAP server to Pocket ID.',
    image: 'ldap_screenshot.png',
  },
  {
    icon: Code,
    title: 'REST API',
    description:
      'We have a documented REST API which allows you to create integrations. Build custom workflows and automate user management with our API.',
    image: 'rest_api_screenshot.png',
  },
  {
    icon: UserPlus,
    title: 'Flexible User Registration',
    description:
      "The admin can either create users manually, create sign up links, or allow open registration. Choose the registration method that fits your organization's needs.",
    image: 'registration_screenshot.png',
  },
];

export const additionalFeatures: Feature[] = [
  {
    icon: Smartphone,
    title: 'Login Code',
    description:
      "Create a one-time login code to sign in from a different device when you don't have your passkey available.",
  },
  {
    icon: Globe,
    title: '10+ Languages',
    description: 'The community has translated Pocket ID into over 10 languages. More translations are always welcome!',
  },
  {
    icon: Palette,
    title: 'Dark & Light Mode',
    description: 'Pocket ID matches your system theme, whether you prefer dark or light mode.',
  },
  {
    icon: FileText,
    title: 'Audit Logs',
    description: 'Comprehensive audit logs for important events, both global and per user.',
  },
  {
    icon: Mail,
    title: 'Mail Notifications',
    description: 'Automatic email notifications for sign-ins from unknown devices.',
  },
  {
    icon: Shield,
    title: 'Self-Hosted',
    description: 'Complete control over your authentication infrastructure with self-hosting.',
  },
];
