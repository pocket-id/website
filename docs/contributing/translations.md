---
id: translations
---

# Adding Translations to Pocket-ID

This guide explains how to add and manage translations for Pocket-ID.

## Overview

Pocket-ID uses [Paraglide JS](https://inlang.com/m/dxnzrydw/library-inlang-paraglideJs) as its translation library. This enables a smooth, type-safe internationalization (i18n) experience across the application.

## Project Structure

Translations are managed in two key locations:

1. **Project Configuration**: `frontend/project.inlang/settings.json`
2. **Translation Files**: `frontend/messages/{locale}.json`

## Adding a New Language

To add support for a new language in Pocket-ID:

1. Update the `locales` array in `frontend/project.inlang/settings.json`:

```json
{
  "$schema": "https://inlang.com/schema/project-settings",
  "baseLocale": "en",
  "locales": [
    "en",
    "nl",
    "fr"  // Example: Adding French as a new language
  ],
  "modules": [
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-message-format@4/dist/index.js",
    "https://cdn.jsdelivr.net/npm/@inlang/plugin-m-function-matcher@2/dist/index.js"
  ],
  "plugin.inlang.messageFormat": {
    "pathPattern": "./messages/{locale}.json"
  }
}
```

2. Create a new translation file for the language:
   - Create a new file at `frontend/messages/{locale}.json` (e.g., `frontend/messages/fr.json` for French)
   - Copy the structure from the base locale (`en.json`) and translate the values

## Translation File Structure

Translation files follow a simple key-value format. Each file must include the schema reference and all translation keys:

```json
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "my_account": "My Account",
  "logout": "Logout",
  "english": "English",
  "dutch": "Nederlands",
  "confirm": "Confirm",
  // ...other translation keys
}
```

For example, the French translation file (`fr.json`) might look like:

```json
{
  "$schema": "https://inlang.com/schema/inlang-message-format",
  "my_account": "Mon compte",
  "logout": "Déconnexion",
  "english": "Anglais",
  "dutch": "Néerlandais",
  "confirm": "Confirmer",
  // ...other translation keys
}
```

## Using Translations in Code

To use translations in your code:

1. Import the message function from the Paraglide library:

```javascript
import { m } from '$lib/paraglide/messages';
```

2. Use the translation keys in your code:

```javascript
// Basic usage
<button>{m.confirm()}</button>

// With parameters
<p>{m.welcome({ name: user.name })}</p>
```

### Parameters in Translations

You can include parameters in your translations to make them more dynamic. In your translation files:

```json
{
  "welcome": "Welcome, {name}!",
  "items_count": "You have {count} items."
}
```

Then in your code:

```javascript
m.welcome({ name: "Alice" })  // Outputs: "Welcome, Alice!"
m.items_count({ count: 5 })   // Outputs: "You have 5 items."
```

## Development Workflow

### Using the Sherlock Plugin

The [Sherlock VS Code extension](https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension) greatly simplifies the translation workflow. It provides:

- Inline translation previews
- Quick navigation to translation files
- Auto-completion for translation keys
- Missing translation detection

To install the plugin, search for "inlang" in the VS Code extensions marketplace or visit: https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension

### Best Practices

1. **Keep keys consistent**: Use clear, descriptive keys that represent the content, not the location
2. **Maintain translations together**: When adding a new feature, update all language files simultaneously
3. **Use parameters** for dynamic content instead of concatenating strings
4. **Group related translations** using namespaces (e.g., `auth.login`, `auth.register`)
5. **Avoid hardcoding text** in your components; always use the translation system

## Testing Translations

To test your translations:

1. Change the language setting in your application
2. Verify that all user-facing text appears in the selected language
3. Check that dynamic content with parameters renders correctly
4. Ensure all pages and components are fully translated

## Troubleshooting

### Missing Translations

If a translation key is used in code but not defined in a language file, Paraglide will fall back to the base locale (usually English). To find missing translations:

1. Use the Sherlock extension to highlight missing translations
2. Check the browser console for warnings about missing translation keys

### Incorrectly Formatted Parameters

If parameters aren't displaying correctly, ensure:

1. The parameter name in the translation file matches the one in your code
2. You're passing all required parameters to the translation function

## Contributing Translations

When contributing translations to Pocket-ID:

1. Fork the repository
2. Add or update the translation files following this guide
3. Test your changes thoroughly
4. Submit a pull request with a clear description of the languages added or modified

By following this guide, you can help make Pocket-ID accessible to users in different languages, enhancing its global usability.
