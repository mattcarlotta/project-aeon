import PropTypes from "prop-types";
import { Tooltip } from "react-smde";
import { GoQuestion } from "react-icons/go";

const Label = ({ className, name, label, style, tooltip }) => (
	<label className={className} style={style} htmlFor={name}>
		{label}
		{tooltip && (
			<span className="tooltip">
				<Tooltip placement="top" title={tooltip}>
					<GoQuestion />
				</Tooltip>
			</span>
		)}
	</label>
);

Label.propTypes = {
	className: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	name: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number])
	),
	tooltip: PropTypes.string
};

export default Label;
