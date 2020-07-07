import { withStyles } from "@material-ui/core/styles";
import Tab from "@material-ui/core/Tab";

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "capitalize",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    fontFamily: [
      "-apple-system",
      "Valera Round",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Roboto",
      "Oxygen",
      "Cantarell",
      "Fira Sans",
      "Droid Sans",
      "Helvetica Neue",
      "sans-serif"
    ].join(","),
    fontSize: 14,
    marginRight: theme.spacing(2),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: "normal"
    },
    "&:focus": {
      color: "#40a9ff"
    }
  },
  selected: {}
}))(props => <Tab disableRipple {...props} />);

export default AntTab;
