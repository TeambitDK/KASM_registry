# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a KASM Workspaces Registry - a template-based system for creating custom workspace registries. It combines a Next.js frontend with a Node.js processing pipeline, deployed via GitHub Pages.

## Common Commands

### Site Development (Next.js)
```bash
cd site
npm ci                    # Install dependencies
npm run dev               # Local development server
npm run build             # Build static site
npm run deploy            # Build with export to ../public
```

### Processing Pipeline
```bash
cd processing
npm ci                    # Install dependencies
node processjson.js       # Generate list.json from workspaces
node add_next_version.js  # Add new Kasm version to all workspaces
node get_image_sizes.js   # Fetch Docker image sizes (requires Docker)
```

### Full Build (All Branches)
```bash
./build_all_branches.sh   # Builds all version branches for deployment
```

### Docker Image Build (for custom workspaces)
```bash
cd docker-images/ubuntu-libreoffice
docker build -t username/image-name:tag .
docker push username/image-name:tag
```

## Architecture

### Data Flow
```
workspaces/*/workspace.json → processing/processjson.js → site/public/list.json → Next.js site
```

### Key Directories

- **`workspaces/`** - Workspace definitions. Each workspace is a folder with `workspace.json` and an icon image.
- **`processing/`** - Node.js scripts that generate registry metadata (`list.json`) from workspace definitions.
- **`site/`** - Next.js 14 static site that displays the registry. Exports to `../public/`.
- **`docker-images/`** - Dockerfiles for custom workspace images.

### Workspace Schema (1.1)
```javascript
{
  "friendly_name": "Display Name",
  "description": "Short description",
  "image_src": "icon.png",
  "architecture": ["amd64", "arm64"],
  "compatibility": [{
    "version": "1.18.x",
    "image": "dockerhub/image:tag",
    "uncompressed_size_mb": 3500
  }],
  "categories": ["Desktop", "Office"]  // Optional, max 3
}
```

### Site Configuration
Registry metadata is configured in `site/next.config.js` under `env`:
- `name` - Registry display name
- `description` - Registry description
- `icon` - Registry icon path
- `listUrl` - GitHub repository URL
- `contactUrl` - Support URL

### Multi-Branch Versioning
Each Git branch (e.g., `1.0`, `1.1`) represents a schema version. The build script processes all branches and deploys them to separate paths on GitHub Pages.

## CI/CD

GitHub Actions workflow (`.github/workflows/build-and-deploy.yml`) triggers on push to any branch except `gh-pages`:
1. Installs dependencies for `processing/` and `site/`
2. Runs `build_all_branches.sh`
3. Deploys `public/` to `gh-pages` branch

## Adding a New Workspace

1. Create folder in `workspaces/` with workspace name
2. Add `workspace.json` with required fields
3. Add icon image (PNG, referenced in `image_src`)
4. Commit and push - CI/CD handles the rest

## Key Files

- `site/pages/index.js` - Main workspace listing with version filtering
- `site/pages/new/[[...workspace]].js` - Workspace builder/editor UI
- `site/next.config.js` - Registry configuration and basePath
- `processing/processjson.js` - Generates list.json from workspaces
- `build_all_branches.sh` - Multi-branch build orchestration
