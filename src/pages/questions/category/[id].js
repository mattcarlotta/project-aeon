import { Component } from "react";
import { withRouter } from "next/router";
import PropTypes from "prop-types";
import get from "lodash.get";
import Head from "~components/Navigation/Head";

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { id: get(props.router.query, ["id"]) || "" };
  }

  render = () => (
    <>
      <Head title={`Newest '${this.state.id}' Questions`} />
      <div>Nothing to see here</div>
    </>
  );
}

Questions.propTypes = {
  router: PropTypes.shape({
    query: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};

export default withRouter(Questions);
