<p align="center">
  <a href="https://kinetic-ui.com">
      <img 
        alt="Kinetic v3 logo" 
        width="100%" 
        src="https://heroui-assets.nyc3.cdn.digitaloceanspaces.com/docs/heroui-og_2x.jpg"
      />
  </a>
</p>
<p align="center">
  <a href="https://github.com/heroui-inc/heroui/blob/main/LICENSE">
    <img src="https://img.shields.io/npm/l/@kinetic/react?style=flat" alt="License">
  </a>
  <a href="https://www.npmjs.com/package/@kinetic/react">
    <img src="https://img.shields.io/npm/dm/@kinetic/react.svg?style=flat-round" alt="npm downloads">
  </a>
</p>

## Why Kinetic?

Kinetic (previously NextUI) is a production-ready React component library that combines the accessibility rigor of [React Aria](https://react-spectrum.adobe.com/react-aria/) with the utility-first styling of [Tailwind CSS v4](https://tailwindcss.com/). It ships a clean compound component API (`Card.Header`, `Card.Content`, `Select.Item`, …), requires no `<Provider>` wrapper, and works out of the box with React 19 and Next.js.

- **Accessible by default** — Built on React Aria for WCAG-compliant keyboard, focus, and screen-reader behavior
- **Tailwind CSS v4** — Modern engine, no CSS-in-JS runtime, smaller output, faster builds
- **Compound components** — Composable API (`Card.Header`, `Card.Content`) instead of deeply nested props
- **Zero boilerplate** — No Provider wrapper needed (unlike Chakra, MUI)
- **AI-native** — MCP server, `llms.txt`, and agent skills so AI assistants understand your components
- **Battle-tested** — Previously known as NextUI, trusted by thousands of production apps

## Packages

| Package | Description |
|---|---|
| [`@kinetic/react`](https://www.npmjs.com/package/@kinetic/react) | Full component bundle |
| [`@kinetic/styles`](https://www.npmjs.com/package/@kinetic/styles) | Styles / theme only |
| Individual packages | e.g. `@kinetic/button`, `@kinetic/modal` — tree-shakeable per-component imports |

## Getting Started

Visit [kinetic-ui.com/docs/react/getting-started/quick-start](https://kinetic-ui.com/docs/react/getting-started/quick-start) to get started with Kinetic.

```bash
npm install @kinetic/react
```

## Who Is This For?

Kinetic is a good fit if you are building:

- **SaaS applications** — forms, tables, overlays, and notifications out of the box
- **Dashboards & admin panels** — data-dense layouts with consistent design tokens
- **E-commerce storefronts** — performant, accessible, SEO-friendly components
- **Marketing sites & landing pages** — polished UI without a heavyweight runtime
- **Any React / Next.js project** that values design quality and accessibility

## AI-Powered Development

Kinetic is built for the AI-assisted development workflow.

| Tool | What it does |
|---|---|
| **MCP Server** (`@kinetic/react-mcp`) | Components that understand your theme — install the server in Cursor, Claude Code, Windsurf, or any MCP-compatible editor |
| **llms.txt** | Available at [kinetic-ui.com/llms.txt](https://kinetic-ui.com/llms.txt) — structured context for LLMs about every component |
| **Agent Skills** | Run `npx heroui-cli agents-md` to install skills for Cursor, Claude Code, and more |

Works with **Cursor**, **Claude Code**, **Windsurf**, **GitHub Copilot**, and any tool that supports MCP or `llms.txt`.

## Compared To

| Library | How Kinetic differs |
|---|---|
| **shadcn/ui** | Kinetic is batteries-included with a consistent design system; shadcn is copy-paste-customize |
| **MUI** | Kinetic is lighter, Tailwind-native, no CSS-in-JS runtime overhead |
| **Chakra UI** | Kinetic uses React Aria (stronger a11y primitives) and Tailwind v4 (better perf) |
| **Mantine** | Kinetic has AI tooling (MCP, llms.txt), Tailwind-first styling |

## Documentation

- **Latest (v3)**: [kinetic-ui.com](https://kinetic-ui.com)
- **v2**: [v2.kinetic-ui.com](https://v2.kinetic-ui.com)

## Storybook

Visit [storybook-v3.kinetic-ui.com](https://storybook-v3.kinetic-ui.com/) to view the storybook for all components.

## Roadmap

Visit [herouiv3.featurebase.app/roadmap](https://herouiv3.featurebase.app/roadmap) to view the roadmap for Kinetic v3.

## Figma

Visit the [Kinetic Figma Kit (v3)](https://www.figma.com/community/file/1546526812159103429/heroui-figma-kit-v3) to view the design kit.

## Community

We're excited to see the community adopt Kinetic, raise issues, and provide feedback.
Whether it's a feature request, bug report, or a project to showcase, please get involved!

- [Discord](https://discord.gg/9b6yyZKmH4)
- [X](https://x.com/hero_ui)
- [GitHub Discussions](https://github.com/heroui-inc/heroui/discussions)

## Contributing

Contributions are always welcome!

See [CONTRIBUTING.md](https://github.com/heroui-inc/heroui/blob/main/CONTRIBUTING.md) for ways to get started.

Please adhere to this project's [CODE_OF_CONDUCT](https://github.com/heroui-inc/heroui/blob/main/CODE_OF_CONDUCT.md).

## License

[MIT](https://choosealicense.com/licenses/mit/)
