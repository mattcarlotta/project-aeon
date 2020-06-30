export default props => [
  {
    name: "title",
    type: "text",
    label: "Title",
    placeholder: "Enter a question title...",
    value: props.title || "",
    errors: "",
    required: true,
    maxLength: 250
  },
  {
    name: "tags",
    type: "tag",
    label: "Tags",
    placeholder: "Search for related tags...",
    tooltip: "Adding tags will make the question more specific.",
    value: props.tags || [],
    errors: "",
    options: [],
    required: true
  },
  {
    name: "body",
    type: "editor",
    label: "Question",
    value: props.body || "",
    errors: "",
    required: true,
    classes: {
      mde: "mde-question",
      mdetoolbarseparator: "mde-toolbarseparator"
    }
  }
];
