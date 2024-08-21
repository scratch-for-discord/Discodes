//@ts-nocheck Idk why it's checking on a js file
import Blockly from "blockly";

const dom = {
	addClass(element, className) {
		const classNames = className.split(" ");
		if (classNames.every((name) => element.classList.contains(name))) {
			return false;
		}
		element.classList.add(...classNames);
		return true;
	}
};

class CustomCategory extends Blockly.ToolboxCategory {
	/**
	 * Constructor for a custom category.
	 * @override
	 */
	constructor(categoryDef, toolbox, opt_parent) {
		super(categoryDef, toolbox, opt_parent);
	}

	addColourBorder_(colour) {
		this.rowDiv_.style.backgroundColor = colour;
	}

	/** @override */
	setSelected(isSelected) {
		// We do not store the label span on the category, so use getElementsByClassName.
		var labelDom = this.rowDiv_.getElementsByClassName("blocklyTreeLabel")[0];
		if (isSelected) {
			// Change the background color of the div to white.
			this.rowDiv_.style.backgroundColor = "white";
			// Set the colour of the text to the colour of the category.
			labelDom.style.color = this.colour_;
		} else {
			// Set the background back to the original colour.
			this.rowDiv_.style.backgroundColor = this.colour_;
			// Set the text back to white.
			labelDom.style.color = "white";
		}
		// This is used for accessibility purposes.
		Blockly.utils.aria.setState(
			/** @type {!Element} */ (this.htmlDiv_),
			Blockly.utils.aria.State.SELECTED,
			isSelected
		);
	}

	// Hides the invisible icon that shifts the text to the right
	createIconDom_() {
		const toolboxIcon = document.createElement("span");

		toolboxIcon.style.display = "none";
		return toolboxIcon;
	}
	createRowContainer_() {
		const rowDiv = document.createElement("div");
		const className = this.cssConfig_["row"];
		if (className) {
			// rowDiv.classList.add("blocklyTreeRowContentContainer");
			dom.addClass(rowDiv, className);
		}
		// const nestedPadding = `0px`;
		// if (this.workspace_.RTL) {
		// 	rowDiv.style.paddingRight = nestedPadding;
		// } else {
		// 	rowDiv.style.paddingLeft = nestedPadding;
		// }
		return rowDiv;
	}
}

class CustomCollapsibleCategory extends Blockly.CollapsibleToolboxCategory {
	/**
	 * Constructor for a custom category.
	 * @override
	 */
	constructor(categoryDef, toolbox, opt_parent) {
		super(categoryDef, toolbox, opt_parent);
	}

	addColourBorder_(colour) {
		this.rowDiv_.style.backgroundColor = colour;
	}

	/** @override */
	setSelected(isSelected) {
		// We do not store the label span on the category, so use getElementsByClassName.
		var labelDom = this.rowDiv_.getElementsByClassName("blocklyTreeLabel")[0];
		if (isSelected) {
			// Change the background color of the div to white.
			this.rowDiv_.style.backgroundColor = "white";
			// Set the colour of the text to the colour of the category.
			labelDom.style.color = this.colour_;
		} else {
			// Set the background back to the original colour.
			this.rowDiv_.style.backgroundColor = this.colour_;
			// Set the text back to white.
			labelDom.style.color = "white";
		}
		// This is used for accessibility purposes.
		Blockly.utils.aria.setState(
			/** @type {!Element} */ (this.htmlDiv_),
			Blockly.utils.aria.State.SELECTED,
			isSelected
		);
	}
}

Blockly.registry.register(
	Blockly.registry.Type.TOOLBOX_ITEM,
	Blockly.ToolboxCategory.registrationName,
	CustomCategory,
	true
);

Blockly.registry.register(
	Blockly.registry.Type.TOOLBOX_ITEM,
	Blockly.CollapsibleToolboxCategory.registrationName,
	CustomCollapsibleCategory,
	true
);
