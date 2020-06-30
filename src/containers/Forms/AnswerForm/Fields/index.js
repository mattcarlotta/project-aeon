export default props => [
  {
    name: "body",
    type: "editor",
    value: props.body || "",
    errors: "",
    required: true,
    classes: { mde: "mde-answer" },
    autoGrow: true,
    minEditorHeight: !props.body ? 200 : 80,
    css: `height: ${!props.body ? "300px" : "90px"};margin-top: 25px;`,
    textAreaProps: { placeholder: "Type here to answer this question..." }
  }
];
