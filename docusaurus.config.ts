import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";
import type * as OpenApiPlugin from "docusaurus-plugin-openapi-docs";
import type * as Plugin from "@docusaurus/types/src/plugin";

const config: Config = {
  title: "Pocket ID",
  tagline:
    "Pocket ID is a simple OIDC provider that allows users to authenticate with their passkeys to your services.",
  favicon: "img/logo.png",

  url: "https://pocket-id.org",
  baseUrl: "/",
  organizationName: "pocket-id",
  projectName: "website",

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          routeBasePath: "/docs",
          sidebarPath: "./sidebars.ts",
          docItemComponent: "@theme/ApiItem",
          editUrl: "https://github.com/pocket-id/website/edit/main",
        },
        blog: false,
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    image: "img/logo.png",
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: "Pocket ID",
      logo: {
        alt: "Pocket ID Share Logo",
        src: "img/logo.png",
      },
      items: [
        // Version gets replaced by the version-label.ts script
        {
          to: "#version",
          label: " ",
          position: "right",
        },
        {
          href: "https://github.com/pocket-id/pocket-id",
          label: "GitHub",
          position: "right",
        },
      ],
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,

  // Everytime new api docs are generated from swagger and put into static/api.yaml
  // we need to run this command: npx docusaurus gen-api-docs all to regenerate the api doc files.

  plugins: [
    [
      "docusaurus-plugin-openapi-docs",
      {
        id: "openapi",
        docsPluginId: "classic",
        config: {
          pocketid: {
            specPath: "static/api.yaml",
            outputDir: "docs/api/endpoints",
            // downloadUrl:
            //   "https://raw.githubusercontent.com/PaloAltoNetworks/docusaurus-template-openapi-docs/main/examples/petstore.yaml",
            sidebarOptions: {
              groupPathsBy: "tag",
              categoryLinkSource: "tag",
            },
          } satisfies OpenApiPlugin.Options,
        } satisfies Plugin.PluginOptions,
      },
    ],
  ],

  clientModules: [require.resolve("./src/version-label.ts")],
  themes: ["docusaurus-theme-openapi-docs"],
};
export default config;
