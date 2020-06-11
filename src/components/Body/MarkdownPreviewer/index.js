import PropTypes from "prop-types";
import Markdown from "react-markdown";
import CodeBlock from "./CodeBock";

const MarkdownPreviewer = ({ children }) => (
  <Markdown renderers={{ code: CodeBlock }}>{children}</Markdown>
);

MarkdownPreviewer.propTypes = {
  children: PropTypes.string,
};

export default MarkdownPreviewer;
