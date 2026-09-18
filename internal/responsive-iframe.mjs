const WRAPPER_STYLE = "margin-bottom: 1.0725rem";

const isElement = (node) => Boolean(node) && node.type === "element";

const wrapIframes = (node, parent, index) => {
  if (!isElement(node)) {
    return;
  }

  if (node.tagName === "iframe") {
    parent.children[index] = {
      type: "element",
      tagName: "div",
      properties: {
        className: ["responsive-iframe-wrapper"],
        style: WRAPPER_STYLE,
      },
      children: [node],
    };

    return;
  }

  node.children.forEach((child, childIndex) => {
    wrapIframes(child, node, childIndex);
  });
};

const rehypeResponsiveIframe = () => (tree) => {
  tree.children.forEach((child, index) => {
    wrapIframes(child, tree, index);
  });
};

export { rehypeResponsiveIframe };
