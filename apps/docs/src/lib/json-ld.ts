import {siteConfig} from "@/config/site";

export function getOrganizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    logo: "https://kinetic-ui.com/icons/favicon.svg",
    name: "Kinetic",
    sameAs: [siteConfig.links.github, siteConfig.links.twitter, siteConfig.links.discord],
    url: "https://kinetic-ui.com",
  };
}

export function getWebSiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    description: siteConfig.description,
    name: "Kinetic",
    publisher: {
      "@type": "Organization",
      name: "Kinetic",
    },
    url: "https://kinetic-ui.com",
  };
}

export function getSoftwareApplicationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    applicationCategory: "DeveloperApplication",
    description: siteConfig.description,
    downloadUrl: "https://www.npmjs.com/package/@kinetic/react",
    name: "Kinetic",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    operatingSystem: "Any",
    url: "https://kinetic-ui.com",
  };
}

export function getBreadcrumbJsonLd(items: {name: string; url: string}[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      item: item.url,
      name: item.name,
      position: index + 1,
    })),
  };
}

export function getTechArticleJsonLd(params: {
  title: string;
  description: string;
  url: string;
  datePublished?: string;
  dateModified?: string;
  authorName?: string;
  authorUrl?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    author: params.authorName
      ? {
          "@type": "Person",
          name: params.authorName,
          ...(params.authorUrl && {url: params.authorUrl}),
        }
      : {
          "@type": "Organization",
          name: "Kinetic",
        },
    description: params.description,
    headline: params.title,
    mainEntityOfPage: {
      "@id": params.url,
      "@type": "WebPage",
    },
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: "https://kinetic-ui.com/icons/favicon.svg",
      },
      name: "Kinetic",
    },
    url: params.url,
    ...(params.datePublished && {datePublished: params.datePublished}),
    ...(params.dateModified && {dateModified: params.dateModified || params.datePublished}),
    ...(params.image && {image: params.image}),
  };
}

export function getBlogJsonLd(params: {
  url: string;
  posts: {title: string; url: string; datePublished: string; description: string}[];
  description?: string;
  name?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    blogPost: params.posts.map((post) => ({
      "@type": "BlogPosting",
      datePublished: post.datePublished,
      description: post.description,
      headline: post.title,
      url: post.url,
    })),
    description:
      params.description ??
      "Guides, tutorials, and resources for building modern React applications with Kinetic.",
    name: params.name ?? "Kinetic Blog",
    publisher: {
      "@type": "Organization",
      logo: {
        "@type": "ImageObject",
        url: "https://kinetic-ui.com/icons/favicon.svg",
      },
      name: "Kinetic",
    },
    url: params.url,
  };
}
