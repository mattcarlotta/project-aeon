import React from "react";
import PropTypes from "prop-types";
import { FaChevronUp } from "react-icons/fa";
import Flex from "~components/Body/Flex";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";
import ClickHandler from "./ClickHandler";
import DropdownContainer from "./DropdownContainer";
import DropdownMenu from "./DropdownMenu";
import SelectContainer from "./SelectContainer";

const Dropdown = ({ children, menu }) => (
	<ClickHandler>
		{({ isVisible, handleMenuClick }) => (
			<SelectContainer data-testid="select-container">
				<DropdownContainer
					data-testid="dropdown-container"
					isVisible={isVisible}
					onClick={handleMenuClick}
				>
					<Flex>
						<FlexStart data-testid="dropdown-children">{children}</FlexStart>
						<FlexEnd data-testid="dropdown-chevron">
							<FaChevronUp
								style={{
									fontSize: 12,
									transform: `${
										isVisible ? "rotate(-180deg)" : "rotate(0deg)"
									}`,
									transition: "transform 0.2s ease-in-out"
								}}
							/>
						</FlexEnd>
					</Flex>
				</DropdownContainer>
				{isVisible && (
					<DropdownMenu data-testid="dropdown-menu">{menu}</DropdownMenu>
				)}
			</SelectContainer>
		)}
	</ClickHandler>
);

Dropdown.propTypes = {
	menu: PropTypes.node.isRequired,
	children: PropTypes.node.isRequired
};

export default Dropdown;
