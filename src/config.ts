import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https:/johanneshaeuser.de/",
  author: "Johannes Häuser",
  desc: "A Software Engineer and Web Developer from Germany.",
  title: "Johannes Häuser",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  projectsPerPage: 10,
};

export const LOCALE = ["de-DE"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/JOHAE96",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/hjohannnes/",
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/johannes-häuser/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:hello@johanneshaeuser.de",
    linkTitle: `Send an email to ${SITE.title}`,
    active: true,
  },
  {
    name: "Twitter",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Twitter`,
    active: false,
  },
  {
    name: "YouTube",
    href: "https://youtube.com/",
    linkTitle: `${SITE.title} on YouTube`,
    active: false,
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/....",
    linkTitle: `${SITE.title} on WhatsApp`,
    active: false,
  },
  {
    name: "Discord",
    href: "",
    linkTitle: `${SITE.title} on Discord`,
    active: false,
  },
  {
    name: "GitLab",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on GitLab`,
    active: false,
  },
  {
    name: "Reddit",
    href: "https://reddit.com/",
    linkTitle: `${SITE.title} on Reddit`,
    active: false,
  },
  {
    name: "Steam",
    href: "https://steamcommunity.com/id/johae",
    linkTitle: `${SITE.title} on Steam`,
    active: true,
  },
  {
    name: "Telegram",
    href: "https://t.me/johae96",
    linkTitle: `${SITE.title} on Telegram`,
    active: true,
  },
  {
    name: "Mastodon",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Mastodon`,
    active: false,
  },
];
