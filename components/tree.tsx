"use client";

import type { ItemInstance, TreeInstance } from "@headless-tree/core";
import { Slot as SlotPrimitive } from "@radix-ui/react-slot";
import { ChevronDownIcon } from "lucide-react";
import { createContext, useContext } from "react";

import { cn } from "@/lib/utils";

interface TreeContextValue<T> {
	indent: number;
	currentItem?: ItemInstance<T>;
	tree?: TreeInstance<T>;
}

const TreeContext = createContext<TreeContextValue<any>>({
	indent: 20,
	currentItem: undefined,
	tree: undefined,
});

function useTreeContext<T>() {
	return useContext(TreeContext) as TreeContextValue<T>;
}

interface TreeProps<T> extends React.HTMLAttributes<HTMLDivElement> {
	indent?: number;
	tree?: TreeInstance<T>;
}

function Tree<T>({ indent = 20, tree, className, ...props }: TreeProps<T>) {
	const containerProps =
		tree && typeof tree.getContainerProps === "function"
			? tree.getContainerProps()
			: {};
	const mergedProps = { ...props, ...containerProps };

	const { style: propStyle, ...otherProps } = mergedProps;

	const mergedStyle = {
		...propStyle,
		"--tree-indent": `${indent}px`,
	} as React.CSSProperties;

	return (
		<TreeContext.Provider value={{ indent, tree }}>
			<div
				className={cn("flex flex-col", className)}
				data-slot="tree"
				style={mergedStyle}
				{...otherProps}
			/>
		</TreeContext.Provider>
	);
}

interface TreeItemProps<T> extends React.HTMLAttributes<HTMLButtonElement> {
	item: ItemInstance<T>;
	indent?: number;
	asChild?: boolean;
}

function TreeItem<T>({
	item,
	className,
	asChild,
	children,
	...props
}: Omit<TreeItemProps<T>, "indent">) {
	const { indent } = useTreeContext<T>();

	const itemProps = typeof item.getProps === "function" ? item.getProps() : {};
	const mergedProps = { ...props, ...itemProps };

	const { style: propStyle, ...otherProps } = mergedProps;

	const mergedStyle = {
		...propStyle,
		"--tree-padding": `${item.getItemMeta().level * indent}px`,
	} as React.CSSProperties;

	const Comp = asChild ? SlotPrimitive : "button";

	return (
		<TreeContext.Provider value={{ indent, currentItem: item }}>
			<Comp
				aria-expanded={item.isExpanded()}
				className={cn(
					"z-10 select-none ps-(--tree-padding) not-last:pb-0.5 outline-hidden focus:z-20 data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
					className
				)}
				data-drag-target={
					typeof item.isDragTarget === "function"
						? item.isDragTarget()
						: undefined
				}
				data-focus={
					typeof item.isFocused === "function" ? item.isFocused() : undefined
				}
				data-folder={
					typeof item.isFolder === "function" ? item.isFolder() : undefined
				}
				data-search-match={
					typeof item.isMatchingSearch === "function"
						? item.isMatchingSearch()
						: undefined
				}
				data-selected={
					typeof item.isSelected === "function" ? item.isSelected() : undefined
				}
				data-slot="tree-item"
				style={mergedStyle}
				{...otherProps}
			>
				{children}
			</Comp>
		</TreeContext.Provider>
	);
}

interface TreeItemLabelProps<T> extends React.HTMLAttributes<HTMLSpanElement> {
	item?: ItemInstance<T>;
}

function TreeItemLabel<T>({
	item: propItem,
	children,
	className,
	...props
}: TreeItemLabelProps<T>) {
	const { currentItem } = useTreeContext<T>();
	const item = propItem || currentItem;

	if (!item) {
		return null;
	}

	return (
		<span
			className={cn(
				"flex items-center gap-1 rounded-sm bg-background in-data-[drag-target=true]:bg-accent in-data-[search-match=true]:bg-blue-50! in-data-[selected=true]:bg-accent px-2 py-1.5 not-in-data-[folder=true]:ps-7 in-data-[selected=true]:text-accent-foreground text-sm in-focus-visible:ring-[3px] in-focus-visible:ring-ring/50 transition-colors hover:bg-accent [&_svg]:pointer-events-none [&_svg]:shrink-0",
				className
			)}
			data-slot="tree-item-label"
			{...props}
		>
			{item.isFolder() && (
				<ChevronDownIcon className="in-aria-[expanded=false]:-rotate-90 size-4 text-muted-foreground" />
			)}
			{children ||
				(typeof item.getItemName === "function" ? item.getItemName() : null)}
		</span>
	);
}

function TreeDragLine({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const { tree } = useTreeContext();

	if (!tree || typeof tree.getDragLineStyle !== "function") {
		return null;
	}

	const dragLine = tree.getDragLineStyle();
	return (
		<div
			className={cn(
				"-mt-px before:-top-[3px] before:border- absolute z-30 h-0.5 w-[unset] bg-primary before:absolute before:left-0 before:size-2 before:rounded-full before:border-primary before:bg-background",
				className
			)}
			style={dragLine}
			{...props}
		/>
	);
}

export { Tree, TreeItem, TreeItemLabel, TreeDragLine };
