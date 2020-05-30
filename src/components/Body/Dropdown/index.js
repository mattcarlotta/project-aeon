import React from "react";
import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import Flex from "~components/Body/Flex";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";
import ClickHandler from "./ClickHandler";
import DropdownContainer from "./DropdownContainer";
import Menu from "./Menu";

const Dropdown = ({ children, menu }) => (
	<ClickHandler>
		{({ isVisible, handleMenuClick }) => (
			<div
				data-testid="select-container"
				css="display: flex;margin: 0 auto;width: 100%;max-width: 225px;
  flex-direction: row;"
			>
				<div css="position: relative;width: 100%;">
					<DropdownContainer isVisible={isVisible} onClick={handleMenuClick}>
						<Flex>
							<FlexStart>{children}</FlexStart>
							<FlexEnd>
								<FaChevronUp
									style={{
										fontSize: 12,
										transform: `${
											isVisible ? "rotate(-180deg)" : "rotate(0deg)"
										}`,
										transition: "transform  0.2s ease-in-out"
									}}
								/>
							</FlexEnd>
						</Flex>
					</DropdownContainer>
					{isVisible && <Menu>{menu}</Menu>}
				</div>
			</div>
		)}
	</ClickHandler>
);

Dropdown.propTypes = {
	menu: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired
};

export default Dropdown;
