import PropTypes from "prop-types";
import { FaLink, FaRegCalendarPlus, FaUser } from "react-icons/fa";
import { MdUpdate } from "react-icons/md";
import MarkdownPreviewer from "~components/Body/MarkdownPreviewer";
import MissingDetails from "~components/Body/MissingDetails";
import Preview from "~components/Body/Preview";
import Timestamp from "~components/Body/Timestamp";
import dayjs from "~utils/dayjs";
import Website from "~components/Body/Website";

const iconStyle = { position: "relative", top: 1, marginRight: 5 };

const ViewProfile = ({
  description,
  firstname,
  lastname,
  registered,
  role,
  website
}) => (
  <>
    <h1 css="margin: 0;font-size: 35px;">
      {firstname}&nbsp;
      {lastname}
    </h1>
    <div>
      <FaUser style={iconStyle} /> {role}
    </div>
    {website && (
      <div>
        <FaLink style={iconStyle} /> <Website href={website} />
      </div>
    )}
    <div>
      <FaRegCalendarPlus style={{ ...iconStyle, marginRight: 7 }} />
      registered&nbsp;{dayjs(registered).format("MMMM Do, YYYY")}
    </div>
    <div>
      <MdUpdate
        style={{ ...iconStyle, top: 2, left: -1, fontSize: 17, marginRight: 7 }}
      />
      last active&nbsp;
      <Timestamp date={registered} />
    </div>
    <div css="margin: 10px 0;">
      {description ? (
        <Preview style={{ marginBottom: 0 }}>
          <MarkdownPreviewer>{description}</MarkdownPreviewer>
        </Preview>
      ) : (
        <MissingDetails>
          You haven&#39;t included a brief description of yourself that&#39;ll
          be shown on your profile.
        </MissingDetails>
      )}
    </div>
  </>
);

ViewProfile.propTypes = {
  description: PropTypes.string,
  firstname: PropTypes.string,
  lastname: PropTypes.string,
  registered: PropTypes.string,
  role: PropTypes.string,
  website: PropTypes.string
};

export default ViewProfile;
