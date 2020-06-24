import PropTypes from "prop-types";
import Markdown from "react-markdown";
import CodeBlock from "./CodeBock";
// import OpenImageInTab from "./OpenImageInTab";
import OpenLinkInTab from "./OpenLinkInTab";

const MarkdownPreviewer = ({ children }) => (
  <Markdown
    renderers={{
      code: CodeBlock,
      // image: OpenImageInTab,
      link: OpenLinkInTab,
      linkReference: OpenLinkInTab
    }}
  >
    {children}
  </Markdown>
);

MarkdownPreviewer.propTypes = {
  children: PropTypes.string
};

export default MarkdownPreviewer;
