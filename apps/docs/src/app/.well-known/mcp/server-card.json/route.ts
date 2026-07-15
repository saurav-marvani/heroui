import {
  MCP_PACKAGE_VERSION,
  NATIVE_MCP_API_URL,
  REACT_MCP_API_URL,
  absoluteUrl,
  getRequestOrigin,
  jsonResponse,
} from "@/lib/agent-discovery";

export const dynamic = "force-dynamic";
export const revalidate = false;

export async function GET(request: Request) {
  const origin = getRequestOrigin(request);

  return jsonResponse({
    $schema: "https://modelcontextprotocol.io/schemas/server-card/draft.json",
    capabilities: {
      prompts: false,
      resources: false,
      tools: true,
    },
    description:
      "Kinetic MCP servers expose read-only Kinetic React and Kinetic Native documentation, component metadata, source references, styles, and theme variables to AI coding agents.",
    endpoint: absoluteUrl(origin, "/.well-known/mcp/server-card.json"),
    links: {
      docs: [
        absoluteUrl(origin, "/docs/react/getting-started/mcp-server"),
        absoluteUrl(origin, "/docs/native/getting-started/mcp-server"),
      ],
      npm: [
        "https://www.npmjs.com/package/@kinetic/react-mcp",
        "https://www.npmjs.com/package/@kinetic/native-mcp",
      ],
      source: "https://github.com/kinetic-inc/kinetic-mcp",
    },
    notes:
      "The supported MCP transport today is stdio through the published npm packages. The endpoint field identifies this server card for browser and catalog discovery; it is not a Streamable HTTP MCP endpoint.",
    serverInfo: {
      name: "Kinetic MCP",
      version: MCP_PACKAGE_VERSION,
    },
    tools: [
      {
        description: "List all available Kinetic v3 React components.",
        name: "list_components",
        package: "@kinetic/react-mcp",
      },
      {
        description: "Get complete React component documentation.",
        name: "get_component_docs",
        package: "@kinetic/react-mcp",
      },
      {
        description: "Get React component TypeScript source code.",
        name: "get_component_source_code",
        package: "@kinetic/react-mcp",
      },
      {
        description: "Get React component CSS source styles.",
        name: "get_component_source_styles",
        package: "@kinetic/react-mcp",
      },
      {
        description: "Get Kinetic React theme variables.",
        name: "get_theme_variables",
        package: "@kinetic/react-mcp",
      },
      {
        description: "Browse full Kinetic React documentation.",
        name: "get_docs",
        package: "@kinetic/react-mcp",
      },
      {
        description: "List all available Kinetic Native components.",
        name: "list_components",
        package: "@kinetic/native-mcp",
      },
      {
        description: "Get complete Native component documentation.",
        name: "get_component_docs",
        package: "@kinetic/native-mcp",
      },
      {
        description: "Get Kinetic Native theme variables.",
        name: "get_theme_variables",
        package: "@kinetic/native-mcp",
      },
      {
        description: "Browse full Kinetic Native documentation.",
        name: "get_docs",
        package: "@kinetic/native-mcp",
      },
    ],
    transports: [
      {
        args: ["-y", "@kinetic/react-mcp@latest"],
        command: "npx",
        dataApi: REACT_MCP_API_URL,
        package: "@kinetic/react-mcp",
        type: "stdio",
      },
      {
        args: ["-y", "@kinetic/native-mcp@latest"],
        command: "npx",
        dataApi: NATIVE_MCP_API_URL,
        package: "@kinetic/native-mcp",
        type: "stdio",
      },
    ],
  });
}
