import type { SocialObjects } from "@/lib/types";

export const SITE = {
  website: "https://borenomore.github.io/BoreNoMore", // replace this with your deployed domain
  author: "Pipelon",
  desc: "Documentation of BoreNoMore BCI Unity Framework",
  title: "BoreNoMore",
  ogImage: "og-image.jpg",
  repo: "https://gitlab.com/kn-neuron/bore-no-more",
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const menu_items: { title: string; href: string }[] = [
  // {
  //   title: "Home",
  //   href: "/",
  // },
];

// Just works with top-level folders and files. For files, don't add extension as it looks for the slug, and not the file name.
export const side_nav_menu_order: string[] = [
  "intro",
  "docs",
  "docs/device",
  "docs/preprocessing",
  "docs/classifier",
  "docs/game-integration",

  "guides",
  "guides/pages",
  "guides/table-of-contents",
  "guides/sidebar-navigation",
];

// Don't delete anything. You can use 'true' or 'false'.
// These are global settings
export const docconfig = {
  hide_table_of_contents: false,
  hide_breadcrumbs: false,
  hide_side_navigations: false,
  hide_datetime: false,
  hide_time: true,
  hide_search: false,
  hide_repo_button: false,
  hide_author: true,
};

// Set your social. It will appear in footer. Don't change the `name` value.
export const Socials: SocialObjects = [
  {
    name: "GitLab",
    href: "https://gitlab.com/kn-neuron/bore-no-more",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
];
