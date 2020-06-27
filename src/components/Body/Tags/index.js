import PropTypes from "prop-types";
import Tag from "~components/Body/Tag";
import Link from "~components/Navigation/Link";

const Tags = ({ tags }) => (
  <div css="margin-bottom: 15px;">
    {tags.map(tag => (
      <Link
        stopPropagation
        key={tag}
        margin="0 5px 0 0"
        href="/t/[...slug]"
        asHref={`/t/${tag}`}
      >
        <Tag>{tag}</Tag>
      </Link>
    ))}
  </div>
);

Tags.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string)
};

export default Tags;
