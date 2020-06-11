import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FadeIn from "~components/Body/FadeIn";

const TabPanel = ({ children, className, index, value }) => (
  <div
    className={className}
    hidden={value !== index}
    role="tabpanel"
    id={`simple-tabpanel-${index}`}
    aria-labelledby={`simple-tab-${index}`}
  >
    {value === index && <FadeIn timing="600ms">{children}</FadeIn>}
  </div>
);

TabPanel.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default styled(TabPanel)`
  padding: 10px;
  min-height: 440px;
`;
