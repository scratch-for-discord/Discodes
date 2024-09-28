import Blockly from "blockly/core";

const toolbox = {
	kind: "categoryToolbox",
	contents: [
		{
			kind: "category",
			name: "test blocks",
			colour: "#ff0000",
			contents: [
				{
					kind: "block",
					type: "mutator_test_1",
				},
			],
		},
		{
			kind: "category",
			name: "the rest",
			colour: "#ff5555",
			contents: [
				{
					kind: "block",
					type: "controls_if",
				},
				{
					kind: "block",
					type: "controls_repeat_ext",
				},
				{
					kind: "block",
					type: "logic_compare",
				},
				{
					kind: "block",
					type: "math_number",
				},
				{
					kind: "block",
					type: "math_arithmetic",
				},
				{
					kind: "block",
					type: "text",
				},
			],
		},
	],
};

export const DARKTHEME = Blockly.Theme.defineTheme("a", {
	name: "true_dark",
	base: Blockly.Themes.Classic,
	componentStyles: {
		workspaceBackgroundColour: "#0C111A",
		toolboxBackgroundColour: "#111827",
		toolboxForegroundColour: "#ffffff",
		flyoutBackgroundColour: "#111827",
		flyoutForegroundColour: "#cccccc",
		flyoutOpacity: 0.5,
		scrollbarColour: "#797979",
		insertionMarkerColour: "#ffffff",
		insertionMarkerOpacity: 0.3,
		scrollbarOpacity: 0.01,
		cursorColour: "#d0d0d0",
	},
});

export const OPTIONS = {
	theme: DARKTHEME,
	renderer: "zelos",
	collapse: true,
	comments: true,
	disable: true,
	maxBlocks: Infinity,
	trashcan: true,
	horizontalLayout: false,
	rtl: false,
	grid: {
		spacing: 25,
		length: 3,
		colour: "#5c5a5a",
		snap: true,
	},
	zoom: {
		controls: true,
		startScale: 0.9,
		maxScale: 5,
		minScale: 0.1,
		scaleSpeed: 1.2,
	},
	toolbox: toolbox,
	move: {
		scrollbars: {
			horizontal: true,
			vertical: true,
		},
		drag: true,
		wheel: true,
	},
};
