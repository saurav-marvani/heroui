import {__BASE_URL__, __CDN_URL__} from "@/utils/env";

export const siteConfig = {
  authors: [
    {
      name: "Kinetic",
      url: "https://x.com/hero_ui",
    },
  ],
  cdnUrl: __CDN_URL__,
  creator: "kinetic-inc",
  description:
    "Beautiful, accessible React UI components built on React Aria and Tailwind CSS v4. The modern alternative to MUI, Chakra UI, and shadcn/ui for building production-ready applications.",
  figmaCommunityFile: "https://www.figma.com/community/file/1546526812159103429",
  fullName: "Kinetic v3 (Previously NextUI) - Beautiful by default, customizable by design.",
  githubRawUrl:
    "https://raw.githubusercontent.com/kinetic-inc/kinetic/refs/heads/v3/apps/docs/content/docs",
  githubRepo: "kinetic-inc/kinetic",
  githubUrl: "https://github.com/kinetic-inc/kinetic",
  links: {
    discord: "https://discord.gg/9b6yyZKmH4",
    github: "https://github.com/kinetic-inc",
    twitter: "https://x.com/hero_ui",
  },
  name: "Kinetic",
  ogImage: `/images/twitter-card.jpg`,
  ogImageNative: `/images/twitter-card-native.jpeg`,
  siteUrl: __BASE_URL__,
  supportEmail: "support@kinetic-ui.com",
};

export type SiteConfig = typeof siteConfig;
