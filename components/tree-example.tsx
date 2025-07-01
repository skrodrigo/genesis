"use client"

import React, { useState } from "react"
import {
  createOnDropHandler,
  dragAndDropFeature,
  hotkeysCoreFeature,
  keyboardDragAndDropFeature,
  selectionFeature,
  syncDataLoaderFeature,
} from "@headless-tree/core"
import { AssistiveTreeDescription, useTree } from "@headless-tree/react"
import {
  RiBracesLine,
  RiCodeSSlashLine,
  RiFileLine,
  RiFileTextLine,
  RiImageLine,
  RiReactjsLine,
} from "@remixicon/react"

import { Tree, TreeItem, TreeItemLabel } from "@/components/tree"

interface Item {
  name: string
  children?: string[]
  fileExtension?: string
}

const initialItems: Record<string, Item> = {
  app: {
    name: "app",
    children: [
      "app/layout.tsx", "app/page.tsx", "app/(dashboard)", "app/(auth)", "app/(settings)", "app/api", "app/utils", "app/hooks", "app/assets"
    ],
  },
  "app/layout.tsx": { name: "layout.tsx", fileExtension: "tsx" },
  "app/page.tsx": { name: "page.tsx", fileExtension: "tsx" },
  "app/(dashboard)": {
    name: "(dashboard)",
    children: ["app/(dashboard)/dashboard", "app/(dashboard)/reports", "app/(dashboard)/users"],
  },
  "app/(dashboard)/dashboard": {
    name: "dashboard",
    children: ["app/(dashboard)/dashboard/page.tsx", "app/(dashboard)/dashboard/analytics.tsx", "app/(dashboard)/dashboard/overview.tsx"],
  },
  "app/(dashboard)/dashboard/page.tsx": { name: "page.tsx", fileExtension: "tsx" },
  "app/(dashboard)/dashboard/analytics.tsx": { name: "analytics.tsx", fileExtension: "tsx" },
  "app/(dashboard)/dashboard/overview.tsx": { name: "overview.tsx", fileExtension: "tsx" },
  "app/(dashboard)/reports": {
    name: "reports",
    children: ["app/(dashboard)/reports/monthly.tsx", "app/(dashboard)/reports/annual.tsx"],
  },
  "app/(dashboard)/reports/monthly.tsx": { name: "monthly.tsx", fileExtension: "tsx" },
  "app/(dashboard)/reports/annual.tsx": { name: "annual.tsx", fileExtension: "tsx" },
  "app/(dashboard)/users": {
    name: "users",
    children: ["app/(dashboard)/users/list.tsx", "app/(dashboard)/users/profile.tsx"],
  },
  "app/(dashboard)/users/list.tsx": { name: "list.tsx", fileExtension: "tsx" },
  "app/(dashboard)/users/profile.tsx": { name: "profile.tsx", fileExtension: "tsx" },
  "app/(auth)": {
    name: "(auth)",
    children: ["app/(auth)/login.tsx", "app/(auth)/register.tsx", "app/(auth)/forgot-password.tsx"],
  },
  "app/(auth)/login.tsx": { name: "login.tsx", fileExtension: "tsx" },
  "app/(auth)/register.tsx": { name: "register.tsx", fileExtension: "tsx" },
  "app/(auth)/forgot-password.tsx": { name: "forgot-password.tsx", fileExtension: "tsx" },
  "app/(settings)": {
    name: "(settings)",
    children: ["app/(settings)/profile.tsx", "app/(settings)/preferences.tsx", "app/(settings)/security.tsx"],
  },
  "app/(settings)/profile.tsx": { name: "profile.tsx", fileExtension: "tsx" },
  "app/(settings)/preferences.tsx": { name: "preferences.tsx", fileExtension: "tsx" },
  "app/(settings)/security.tsx": { name: "security.tsx", fileExtension: "tsx" },
  "app/api": { name: "api", children: ["app/api/hello", "app/api/user", "app/api/report"] },
  "app/api/hello": { name: "hello", children: ["app/api/hello/route.ts"] },
  "app/api/hello/route.ts": { name: "route.ts", fileExtension: "ts" },
  "app/api/user": { name: "user", children: ["app/api/user/route.ts"] },
  "app/api/user/route.ts": { name: "route.ts", fileExtension: "ts" },
  "app/api/report": { name: "report", children: ["app/api/report/route.ts"] },
  "app/api/report/route.ts": { name: "route.ts", fileExtension: "ts" },
  "app/utils": { name: "utils", children: ["app/utils/format.ts", "app/utils/validate.ts"] },
  "app/utils/format.ts": { name: "format.ts", fileExtension: "ts" },
  "app/utils/validate.ts": { name: "validate.ts", fileExtension: "ts" },
  "app/hooks": { name: "hooks", children: ["app/hooks/useAuth.ts", "app/hooks/useTheme.ts"] },
  "app/hooks/useAuth.ts": { name: "useAuth.ts", fileExtension: "ts" },
  "app/hooks/useTheme.ts": { name: "useTheme.ts", fileExtension: "ts" },
  "app/assets": { name: "assets", children: ["app/assets/logo.svg", "app/assets/bg.png"] },
  "app/assets/logo.svg": { name: "logo.svg", fileExtension: "svg" },
  "app/assets/bg.png": { name: "bg.png", fileExtension: "png" },
  components: {
    name: "components",
    children: [
      "components/button.tsx", "components/card.tsx", "components/sidebar.tsx", "components/navbar.tsx", "components/dialog.tsx", "components/avatar.tsx", "components/command.tsx", "components/tree.tsx"
    ],
  },
  "components/button.tsx": { name: "button.tsx", fileExtension: "tsx" },
  "components/card.tsx": { name: "card.tsx", fileExtension: "tsx" },
  "components/sidebar.tsx": { name: "sidebar.tsx", fileExtension: "tsx" },
  "components/navbar.tsx": { name: "navbar.tsx", fileExtension: "tsx" },
  "components/dialog.tsx": { name: "dialog.tsx", fileExtension: "tsx" },
  "components/avatar.tsx": { name: "avatar.tsx", fileExtension: "tsx" },
  "components/command.tsx": { name: "command.tsx", fileExtension: "tsx" },
  "components/tree.tsx": { name: "tree.tsx", fileExtension: "tsx" },
  lib: {
    name: "lib",
    children: ["lib/utils.ts", "lib/constants.ts", "lib/api.ts", "lib/auth.ts"]
  },
  "lib/utils.ts": { name: "utils.ts", fileExtension: "ts" },
  "lib/constants.ts": { name: "constants.ts", fileExtension: "ts" },
  "lib/api.ts": { name: "api.ts", fileExtension: "ts" },
  "lib/auth.ts": { name: "auth.ts", fileExtension: "ts" },
  public: {
    name: "public",
    children: ["public/favicon.ico", "public/vercel.svg", "public/robots.txt", "public/logo192.png", "public/logo512.png"]
  },
  "public/favicon.ico": { name: "favicon.ico", fileExtension: "ico" },
  "public/vercel.svg": { name: "vercel.svg", fileExtension: "svg" },
  "public/robots.txt": { name: "robots.txt", fileExtension: "txt" },
  "public/logo192.png": { name: "logo192.png", fileExtension: "png" },
  "public/logo512.png": { name: "logo512.png", fileExtension: "png" },
  "package.json": { name: "package.json", fileExtension: "json" },
  "tailwind.config.ts": { name: "tailwind.config.ts", fileExtension: "ts" },
  "tsconfig.json": { name: "tsconfig.json", fileExtension: "json" },
  "next.config.mjs": { name: "next.config.mjs", fileExtension: "mjs" },
  "README.md": { name: "README.md", fileExtension: "md" },

  root: {
    name: "Project Root",
    children: [
      "app",
      "components",
      "lib",
      "public",
      "package.json",
      "tailwind.config.ts",
      "tsconfig.json",
      "next.config.mjs",
      "README.md",
    ],
  },
}

function getFileIcon(extension: string | undefined, className: string) {
  switch (extension) {
    case "tsx":
    case "jsx":
      return <RiReactjsLine className={className} />
    case "ts":
    case "js":
    case "mjs":
      return <RiCodeSSlashLine className={className} />
    case "json":
      return <RiBracesLine className={className} />
    case "svg":
    case "ico":
    case "png":
    case "jpg":
      return <RiImageLine className={className} />
    case "md":
      return <RiFileTextLine className={className} />
    default:
      return <RiFileLine className={className} />
  }
}

const indent = 20

export default function Component() {
  const [items, setItems] = useState(initialItems)

  const tree = useTree<Item>({
    initialState: {
      expandedItems: ["app", "app/(dashboard)", "app/(dashboard)/dashboard"],
      selectedItems: ["components"],
    },
    indent,
    rootItemId: "root",
    getItemName: (item) => item.getItemData()?.name ?? "Unknown",
    isItemFolder: (item) => (item.getItemData()?.children?.length ?? 0) > 0,
    canReorder: false,
    onDrop: createOnDropHandler((parentItem, newChildrenIds) => {
      setItems((prevItems) => {
        const sortedChildren = [...newChildrenIds].sort((a, b) => {
          const itemA = prevItems[a]
          const itemB = prevItems[b]

          const isAFolder = (itemA?.children?.length ?? 0) > 0
          const isBFolder = (itemB?.children?.length ?? 0) > 0

          if (isAFolder && !isBFolder) return -1
          if (!isAFolder && isBFolder) return 1

          return (itemA?.name ?? "").localeCompare(itemB?.name ?? "")
        })

        return {
          ...prevItems,
          [parentItem.getId()]: {
            ...prevItems[parentItem.getId()],
            children: sortedChildren,
          },
        }
      })
    }),
    dataLoader: {
      getItem: (itemId) => items[itemId],
      getChildren: (itemId) => items[itemId]?.children ?? [],
    },
    features: [
      syncDataLoaderFeature,
      selectionFeature,
      hotkeysCoreFeature,
      dragAndDropFeature,
      keyboardDragAndDropFeature,
    ],
  })

  return (
    <div className="flex h-full flex-col gap-2 *:first:grow">
      <div>
        <Tree
          className="relative before:absolute before:inset-0 before:-ms-1 before:bg-[repeating-linear-gradient(to_right,transparent_0,transparent_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)-1px),var(--border)_calc(var(--tree-indent)))]"
          indent={indent}
          tree={tree}
        >
          <AssistiveTreeDescription tree={tree} />
          {tree.getItems().map((item) => {
            return (
              <TreeItem key={item.getId()} item={item} className="pb-0!">
                <TreeItemLabel className="rounded-none py-1">
                  <span className="flex items-center gap-2">
                    {!item.isFolder() &&
                      getFileIcon(
                        item.getItemData()?.fileExtension,
                        "text-muted-foreground pointer-events-none size-4"
                      )}
                    {item.getItemName()}
                  </span>
                </TreeItemLabel>
              </TreeItem>
            )
          })}
        </Tree>
      </div>

    </div>
  )
}
