# Kinetic UI - Documentation Index

## Overview

This repository has been successfully rebranded from **@heroui/react** to **@kinetic/react**. This index helps you navigate all available documentation.

---

## Quick Navigation

### 🎯 I Want To...

| Goal | Document | Time |
|------|----------|------|
| **Understand what changed** | [COMPLETION_REPORT.md](#completion_report) | 5 min |
| **Quick reference/cheat sheet** | [QUICK_REFERENCE.md](#quick_reference) | 2 min |
| **Start developing** | [DEVELOPER_GUIDE.md](#developer_guide) | 10 min |
| **Add custom components** | [NAMING_AND_CUSTOMIZATION.md](#naming_customization) | 15 min |
| **Full technical details** | [REBRANDING_SUMMARY.md](#rebranding_summary) | 15 min |

---

## Documentation by File

### COMPLETION_REPORT.md {#completion_report}

**Purpose:** Project completion overview  
**Length:** ~450 lines  
**Audience:** Everyone  
**Contents:**
- Mission accomplished summary
- Project statistics
- All changes made
- Verification results
- Next steps
- Production readiness checklist

**When to read:** First - get the big picture

**Key sections:**
- Project Summary (metrics at a glance)
- What Was Renamed (all changes listed)
- Git Commits (what was committed)
- Breaking Changes (important for users)

---

### QUICK_REFERENCE.md {#quick_reference}

**Purpose:** One-page quick lookup guide  
**Length:** ~350 lines  
**Audience:** All users  
**Contents:**
- What changed (table format)
- Import examples (before/after)
- CSS class naming patterns
- Common components
- Development commands
- Package naming convention
- File naming convention
- Quick troubleshooting

**When to read:** When you need a quick answer

**Key sections:**
- What Changed (lookup table)
- Import Updates (copy/paste ready)
- CSS Class Naming (patterns)
- Common Commands (just run these)

---

### NAMING_AND_CUSTOMIZATION.md {#naming_customization}

**Purpose:** Naming conventions and customization guide  
**Length:** ~590 lines  
**Audience:** Component authors, contributors  
**Contents:**
- Current naming structure
- File & folder naming conventions
- Component file patterns
- CSS/Tailwind class naming
- TypeScript export patterns
- Storybook story patterns
- Complete step-by-step component creation
- Theme customization
- Recommended new packages
- Best practices checklist

**When to read:** When adding custom components or extending the library

**Key sections:**
- Naming Convention Rules (conventions to follow)
- Adding a Custom Primitive (step-by-step)
- Checklist for Adding Components (don't forget anything)
- Directory Structure Reference (where things go)

---

### DEVELOPER_GUIDE.md {#developer_guide}

**Purpose:** Technical reference and best practices  
**Length:** ~675 lines  
**Audience:** Developers, maintainers  
**Contents:**
- Installation & setup
- Development commands
- Full project structure
- Component architecture explained
- Component code patterns
- Style variant patterns (TV)
- Export patterns
- Step-by-step component creation
- Naming conventions reference
- Testing patterns
- Accessibility guidelines
- Performance optimization
- Git workflow
- Troubleshooting

**When to read:** When working on the library or creating components

**Key sections:**
- Project Structure (where everything is)
- Component Architecture (how components work)
- Adding a New Component (detailed steps)
- Testing Pattern (how to test)
- Performance section (optimize bundle size)
- Troubleshooting (solutions to common issues)

---

### REBRANDING_SUMMARY.md {#rebranding_summary}

**Purpose:** Comprehensive rebranding documentation  
**Length:** ~250 lines  
**Audience:** Technical stakeholders  
**Contents:**
- Overview of all changes
- List of all file changes
- Component files patterns
- Verification methodology
- Registry and reference updates
- Breaking changes explanation
- Namespace structure (ready for expansion)
- Testing recommendations
- Future enhancement ideas
- References and links

**When to read:** For complete technical details about the rebranding

**Key sections:**
- Changes Made (comprehensive list)
- File Changes Summary (organized by category)
- Verification Results (before/after)
- Next Steps (what comes next)

---

### README.md {#readme}

**Purpose:** Main project readme  
**Contents:**
- Project overview
- Why Kinetic UI
- Features
- Getting started
- Who it's for
- Comparisons with other libraries
- Community links

**When to read:** First time visiting, or need general info

---

## Reading Paths

### Path 1: I'm a New User
1. Start with [COMPLETION_REPORT.md](#completion_report) - understand what happened
2. Read [QUICK_REFERENCE.md](#quick_reference) - get the syntax
3. Check [README.md](#readme) - understand the project
4. Start building!

### Path 2: I'm a Developer
1. Read [COMPLETION_REPORT.md](#completion_report) - understand changes
2. Read [DEVELOPER_GUIDE.md](#developer_guide) - technical setup
3. Read [QUICK_REFERENCE.md](#quick_reference) - common tasks
4. Start developing!

### Path 3: I'm Contributing Components
1. Read [COMPLETION_REPORT.md](#completion_report) - context
2. Read [NAMING_AND_CUSTOMIZATION.md](#naming_customization) - naming rules
3. Read [DEVELOPER_GUIDE.md](#developer_guide) - technical patterns
4. Follow the step-by-step guides
5. Submit PR!

### Path 4: I'm a Maintainer
1. Read [COMPLETION_REPORT.md](#completion_report) - full status
2. Read [REBRANDING_SUMMARY.md](#rebranding_summary) - technical details
3. Read [DEVELOPER_GUIDE.md](#developer_guide) - review procedures
4. Manage the project!

---

## Key Information at a Glance

### Package Names
```
@kinetic/react      - Main component library
@kinetic/styles     - Style variants and themes
@kinetic/standard   - Linting and standards
```

### Import Pattern
```typescript
import { Button } from "@kinetic/react";
import { buttonVariants } from "@kinetic/styles";
```

### CSS Class Pattern
```css
.kinetic-button
.kinetic-button__icon
.kinetic-button--primary
.kinetic-button--disabled
```

### Development Commands
```bash
pnpm install      # Install dependencies
pnpm dev          # Development server
pnpm build        # Build packages
pnpm typecheck    # Type checking
pnpm lint         # Linting
```

---

## Troubleshooting Guide

### Import Errors
**Error:** `Cannot find module '@heroui/react'`  
**Solution:** Update to `@kinetic/react` (see [QUICK_REFERENCE.md](#quick_reference))

### CSS Classes Not Styling
**Error:** `.heroui-button` styles not applying  
**Solution:** Update to `.kinetic-button` (see [QUICK_REFERENCE.md](#quick_reference))

### Type Checking Fails
**Error:** TypeScript path resolution issues  
**Solution:** Run `pnpm install` and check [DEVELOPER_GUIDE.md](#developer_guide) troubleshooting

### Build Fails
**Error:** Build errors during `pnpm build`  
**Solution:** See [DEVELOPER_GUIDE.md](#developer_guide) Build Issues section

---

## Document Statistics

| Document | Lines | Topics | Purpose |
|----------|-------|--------|---------|
| COMPLETION_REPORT.md | ~450 | 15 | Project overview |
| QUICK_REFERENCE.md | ~345 | 20 | Quick lookup |
| NAMING_AND_CUSTOMIZATION.md | ~590 | 25 | Conventions |
| DEVELOPER_GUIDE.md | ~675 | 30 | Technical reference |
| REBRANDING_SUMMARY.md | ~250 | 15 | Rebranding details |
| README.md | ~100 | 10 | Project info |

**Total:** ~2,400 lines of documentation

---

## Links & Resources

### Documentation
- **This File:** DOCUMENTATION_INDEX.md
- **GitHub Repository:** https://github.com/heroui-inc/kinetic
- **Website:** https://kinetic-ui.com
- **NPM Package:** https://npmjs.com/@kinetic/react
- **Storybook:** https://storybook-v3.kinetic-ui.com/

### Community
- **Discord:** https://discord.gg/9b6yyZKmH4
- **GitHub Discussions:** https://github.com/heroui-inc/kinetic/discussions
- **GitHub Issues:** https://github.com/heroui-inc/kinetic/issues
- **Twitter:** https://x.com/kinetic_ui

---

## Quick Command Reference

```bash
# Setup
pnpm install
pnpm clean:cache

# Development
pnpm dev
pnpm dev:docs
pnpm start:storybook

# Building
pnpm build
pnpm build:react
pnpm build:docs
pnpm build:storybook

# Quality
pnpm typecheck
pnpm lint
pnpm lint:fix
pnpm format:fix

# Add component
pnpm add:component
```

---

## File Organization

```
kinetic/
├── DOCUMENTATION_INDEX.md    ← You are here
├── README.md                 ← Main project info
├── QUICK_REFERENCE.md        ← Quick lookup
├── COMPLETION_REPORT.md      ← Project summary
├── REBRANDING_SUMMARY.md     ← Technical details
├── NAMING_AND_CUSTOMIZATION.md ← How to extend
├── DEVELOPER_GUIDE.md        ← Technical reference
└── packages/
    ├── react/
    ├── styles/
    └── standard/
```

---

## FAQ

**Q: I'm using @heroui/react. How do I update?**  
A: See [QUICK_REFERENCE.md - Import Updates](#quick_reference)

**Q: How do I add a custom component?**  
A: See [NAMING_AND_CUSTOMIZATION.md - Adding a Custom Primitive](#naming_customization)

**Q: What's the naming convention for components?**  
A: See [NAMING_AND_CUSTOMIZATION.md - Naming Convention](#naming_customization)

**Q: How do I set up development?**  
A: See [DEVELOPER_GUIDE.md - Quick Start](#developer_guide)

**Q: What was changed in the rebranding?**  
A: See [COMPLETION_REPORT.md - What Was Changed](#completion_report)

**Q: Is the API the same?**  
A: Yes! 100% API compatible. Only imports changed. See [COMPLETION_REPORT.md - Breaking Changes](#completion_report)

**Q: Can I still use @heroui?**  
A: No, @heroui is deprecated. Use @kinetic instead.

**Q: What new packages are coming?**  
A: See [NAMING_AND_CUSTOMIZATION.md - Recommended New Packages](#naming_customization)

---

## Getting Help

1. **Check QUICK_REFERENCE.md first** - 90% of questions answered
2. **Search DEVELOPER_GUIDE.md** - detailed technical info
3. **Check NAMING_AND_CUSTOMIZATION.md** - patterns and conventions
4. **GitHub Issues** - report bugs or ask questions
5. **Discord Community** - get help from community

---

**Start Reading:** [COMPLETION_REPORT.md](COMPLETION_REPORT.md)  
**Quick Lookup:** [QUICK_REFERENCE.md](QUICK_REFERENCE.md)  
**Start Coding:** [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md)

