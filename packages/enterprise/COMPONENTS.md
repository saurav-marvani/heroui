# @kinetic/enterprise Component Registry

Complete list of 320+ components organized by category and phase.

## Phase 1: Navigation & Layout (35 components)

### Core Layout
- `AppShell` - Main application container with navbar, sidebar, and footer
- `Sidebar` - Collapsible sidebar with items and groups
- `ResizableSidebar` - Sidebar with draggable resize handle
- `SidebarItem` - Individual sidebar menu item
- `SidebarGroup` - Grouped sidebar items with label

### Navigation
- `NavigationRail` - Vertical icon-based navigation bar
- `BreadcrumbNavigation` - Hierarchical breadcrumb navigation
- `CommandPalette` - Command search and execution interface
- `Topbar` - Top navigation bar
- `Toolbar` - Action toolbar component
- `MegaMenu` - Large dropdown menu
- `ContextMenu` - Right-click context menu
- `ContextMenuItem` - Context menu item
- `ContextSubMenu` - Nested context menu
- `NavigationDrawer` - Mobile drawer navigation

### Advanced Navigation
- `ActivityBar` - Activity indicator bar
- `Dock` - Floating dock component
- `DockItem` - Dock item with icon and label
- `DockGroup` - Grouped dock items
- `WorkspaceLayout` - IDE-style workspace layout
- `SplitView` - Split view container
- `SplitPane` - Resizable split pane
- `NavigationTree` - Tree-based navigation
- `TreeNavigation` - Hierarchical tree navigation
- `QuickActions` - Quick action panel
- `SpotlightSearch` - Spotlight search component
- `GlobalSearch` - Global search interface
- `SearchOverlay` - Full-screen search overlay

## Phase 2: Data Display & Tables (25 components)

### Tables & Grids
- `DataGrid` - Feature-rich data grid with sorting/filtering
- `VirtualizedTable` - Virtual scrolling table for large datasets
- `TreeTable` - Hierarchical tree table
- `PivotTable` - Pivot table for data analysis
- `KeyValueTable` - Key-value pair table
- `DescriptionList` - Description list component

### Boards & Lists
- `KanbanBoard` - Drag-and-drop Kanban board
- `KanbanColumn` - Column in Kanban board
- `KanbanCard` - Card in Kanban column

### Timeline & Schedule
- `Timeline` - Vertical/horizontal timeline
- `TimelineItem` - Individual timeline item
- `CalendarScheduler` - Calendar with scheduling
- `SchedulerDayView` - Day view scheduler
- `SchedulerWeekView` - Week view scheduler
- `SchedulerMonthView` - Month view scheduler
- `GanttChart` - Gantt chart visualization

### Data Visualization
- `OrganizationChart` - Org chart visualization
- `TreeGraph` - Tree graph visualization
- `JSONViewer` - Hierarchical JSON viewer
- `JSONTree` - JSON tree component
- `CodeDiffViewer` - Code diff viewer
- `MarkdownViewer` - Markdown renderer
- `LogViewer` - Log output viewer
- `AuditLog` - Audit log display
- `ActivityTimeline` - Activity history timeline
- `MetricCard` - Metric display card
- `StatCard` - Statistics card
- `DataCard` - Data display card
- `PropertyGrid` - Property grid view

## Phase 3: Forms & Input (30 components)

### Advanced Input Fields
- `TagInput` - Multi-tag input with autocomplete
- `TokenInput` - Token input field
- `ChipInput` - Chip-based input
- `OTPInput` - One-time password input
- `PINInput` - PIN input field
- `AddressInput` - Address autocomplete input
- `PhoneInput` - Phone number input
- `CountryPicker` - Country selection
- `StatePicker` - State/province selection
- `TimezonePicker` - Timezone selection
- `LanguagePicker` - Language selection
- `CurrencyPicker` - Currency selection

### Color & Visual Input
- `ColorPicker` - Color selection with palette
- `GradientPicker` - Gradient selection
- `IconPicker` - Icon selection
- `EmojiPicker` - Emoji selection

### Date & Time
- `DateRangePicker` - Date range selection
- `TimeRangePicker` - Time range selection
- `CronBuilder` - Cron expression builder

### Form Layout
- `FormSection` - Section in form
- `FormStepper` - Form step indicator
- `FormWizard` - Multi-step form wizard
- `SignaturePad` - Digital signature capture
- `FormField` - Form field wrapper
- `FormLabel` - Form field label
- `FormError` - Form error display
- `FormHint` - Form hint text
- `FormGrid` - Form grid layout

## Phase 4: Editors & Code (20 components)

### Text Editors
- `RichTextEditor` - WYSIWYG rich text editor
- `MarkdownEditor` - Markdown editor with preview
- `CodeEditor` - Syntax-highlighted code editor
- `JSONEditor` - JSON editor with validation
- `PromptEditor` - AI prompt editor
- `TemplateEditor` - Template editor
- `EmailEditor` - Email template editor

### Advanced Builders
- `WorkflowBuilder` - Visual workflow builder
- `FormulaBuilder` - Formula/expression builder
- `ExpressionBuilder` - Expression builder
- `QueryBuilder` - SQL query builder
- `FilterBuilder` - Query filter builder
- `RuleBuilder` - Business rule builder
- `CronEditor` - Cron expression editor
- `SchemaEditor` - Schema editor
- `SQLBuilder` - SQL query builder
- `VisualEditor` - Visual/WYSIWYG editor

## Phase 5: AI & Chat (30 components)

### Chat Interface
- `AIChat` - Main chat interface
- `Conversation` - Conversation container
- `ConversationList` - Conversation list sidebar
- `ConversationHeader` - Conversation header
- `ConversationFooter` - Conversation footer

### Messages
- `MessageBubble` - Individual message bubble
- `UserMessage` - User message component
- `AssistantMessage` - Assistant message component
- `SystemMessage` - System message component
- `ThinkingIndicator` - Thinking/loading indicator
- `StreamingText` - Streaming text output
- `TypingIndicator` - Typing indicator

### AI Features
- `ReasoningViewer` - AI reasoning viewer
- `CitationCard` - Citation display card
- `ToolCallCard` - Tool call display
- `ToolResultCard` - Tool result display
- `ArtifactViewer` - Artifact display
- `ArtifactCard` - Artifact card
- `PromptInput` - Prompt input field
- `PromptHistory` - Prompt history
- `PromptLibrary` - Prompt library
- `PromptVariable` - Prompt variable
- `ModelSelector` - Model selection
- `TemperatureSlider` - Temperature control
- `TokenCounter` - Token counter
- `ContextPanel` - Context panel
- `AttachmentPreview` - Attachment preview
- `SourceReference` - Source reference
- `KnowledgeCard` - Knowledge card
- `MemoryViewer` - Memory viewer
- `ExecutionTimeline` - Execution timeline
- `AIStatus` - AI status indicator

## Phase 6: Dashboard & Workspace (25 components)

### Dashboard Layout
- `DashboardLayout` - Main dashboard container
- `DashboardGrid` - Dashboard grid layout
- `WidgetGrid` - Widget grid container
- `DashboardCard` - Dashboard card
- `AnalyticsCard` - Analytics card
- `ChartCard` - Chart card container
- `MetricGrid` - Metric grid
- `StatCard` - Stat card
- `SummaryCard` - Summary card
- `QuickStats` - Quick stats panel
- `KPIGrid` - KPI grid

### Dashboard Controls
- `FilterBar` - Filter control bar
- `FilterChip` - Filter chip
- `DateRangeSelector` - Date range selector
- `DashboardHeader` - Dashboard header
- `DashboardSidebar` - Dashboard sidebar
- `DashboardToolbar` - Dashboard toolbar
- `ResizablePanel` - Resizable panel
- `InspectorPanel` - Inspector panel
- `WidgetContainer` - Widget container
- `WidgetToolbar` - Widget toolbar
- `WidgetPlaceholder` - Widget placeholder
- `EmptyDashboard` - Empty state
- `Panel` - Panel component
- `PanelGroup` - Panel group

## Phase 7: File & Media (20 components)

### File Management
- `FileExplorer` - File tree explorer
- `FolderTree` - Folder tree
- `FolderItem` - Folder item
- `FileItem` - File item
- `FileBreadcrumbs` - File breadcrumbs
- `VersionHistory` - Version history

### Upload
- `UploadZone` - Drag-and-drop upload zone
- `DropZone` - File drop zone
- `ImageUpload` - Image upload
- `AvatarUpload` - Avatar upload
- `FileUpload` - File upload

### Viewers
- `MediaGallery` - Media gallery
- `GalleryGrid` - Gallery grid
- `PreviewPane` - Preview pane
- `PreviewCard` - Preview card
- `DocumentViewer` - Document viewer
- `PDFViewer` - PDF viewer
- `ImageViewer` - Image viewer
- `VideoViewer` - Video viewer
- `AudioPlayer` - Audio player
- `FileCard` - File card

## Phase 8: Visualization (25 components)

### Diagrams
- `FlowBuilder` - Flow diagram builder
- `FlowCanvas` - Flow canvas
- `NodeEditor` - Node editor
- `ConnectionLine` - Connection line
- `ProcessDiagram` - Process diagram
- `DependencyGraph` - Dependency graph
- `StateMachine` - State machine diagram
- `JourneyMap` - User journey map
- `DecisionTree` - Decision tree
- `PipelineView` - Pipeline view
- `Swimlane` - Swimlane diagram

### Progress & Status
- `Stepper` - Step indicator
- `Milestone` - Milestone marker
- `Roadmap` - Roadmap visualization

### Data Visualization
- `Heatmap` - Heatmap visualization
- `Treemap` - Treemap visualization
- `MindMap` - Mind map diagram
- `NodeGraph` - Node graph
- `LineChart` - Line chart wrapper
- `BarChart` - Bar chart wrapper
- `AreaChart` - Area chart wrapper
- `PieChart` - Pie chart wrapper
- `DonutChart` - Donut chart wrapper
- `RadarChart` - Radar chart wrapper
- `ScatterChart` - Scatter chart wrapper
- `BubbleChart` - Bubble chart wrapper
- `CandlestickChart` - Candlestick chart wrapper
- `Sparkline` - Sparkline chart
- `ChartLegend` - Chart legend
- `ChartTooltip` - Chart tooltip
- `ChartContainer` - Chart container

## Phase 9: Commerce (15 components)

### Product Display
- `ProductCard` - Product display card
- `PricingTable` - Pricing comparison table

### Checkout
- `CheckoutSummary` - Checkout summary
- `OrderTimeline` - Order timeline
- `PaymentMethod` - Payment method selector
- `AddressCard` - Address card
- `CouponInput` - Coupon code input
- `CartDrawer` - Shopping cart drawer

### Additional Commerce
- Components for product filters, reviews, recommendations, etc.

## Phase 10: Mobile & Utilities (25 components)

### Mobile Components
- `BottomNavigation` - Bottom navigation bar
- `TabBar` - Tab bar component
- `FloatingActionButton` - FAB button
- `SwipeAction` - Swipe action component
- `SwipeList` - List with swipe actions
- `PullToRefresh` - Pull-to-refresh gesture
- `CollapsibleHeader` - Collapsible header
- `NativeBottomSheet` - Bottom sheet
- `SearchBar` - Mobile search bar
- `SegmentedControl` - Segmented control

### Utility Components
- `Portal` - Portal container
- `PortalHost` - Portal host
- `OverlayManager` - Overlay manager
- `Shortcut` - Keyboard shortcut
- `ShortcutProvider` - Shortcut provider
- `KeyboardManager` - Keyboard manager
- `FocusTrap` - Focus trap
- `ScrollArea` - Scroll area
- `VirtualScroller` - Virtual list scroller
- `LazyMount` - Lazy mount component
- `InfiniteLoader` - Infinite scroll loader
- `AutoSizer` - Auto sizing component
- `Measure` - Measurement component
- `ResizeObserver` - Resize observer
- `ErrorBoundary` - Error boundary
- `Suspense` - Suspense component

## Usage Examples

### Import Categories
```typescript
// Import entire category
import * as Navigation from '@kinetic/enterprise/components/navigation';

// Import specific component
import { DataGrid, Timeline } from '@kinetic/enterprise';

// Import utilities
import { cn, debounce } from '@kinetic/enterprise';
```

### Component Templates
See individual component documentation for usage patterns and props.

## Component States

All components support:
- `loading` - Loading state
- `disabled` - Disabled state  
- `error` - Error state
- `className` - Custom styling

## Customization

Components use Tailwind CSS design tokens:
- Colors: `bg-primary`, `text-foreground`, etc.
- Spacing: `p-4`, `gap-2`, etc.
- Typography: `font-semibold`, `text-sm`, etc.

Customize via `globals.css` or component props.
