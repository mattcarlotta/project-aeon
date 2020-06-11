import { PureComponent } from "react";
import PropTypes from "prop-types";
import hljs from "highlight.js/lib/core";

hljs.registerLanguage(
  "javascript",
  require("highlight.js/lib/languages/javascript"),
);

class CodeBock extends PureComponent {
  componentDidMount() {
    this.highlightCode();
  }

  componentDidUpdate() {
    this.highlightCode();
  }

  highlightCode() {
    hljs.highlightBlock(this.codeEl);
  }

  render() {
    return (
      <pre>
        <code ref={node => (this.codeEl = node)} className="language-jsx">
          {this.props.value}
        </code>
      </pre>
    );
  }
}

CodeBock.propTypes = {
  value: PropTypes.string,
};

export default CodeBock;
