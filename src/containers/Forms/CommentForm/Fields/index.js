const fields = value => [
  {
    name: "body",
    type: "editor",
    value: value || "",
    errors: "",
    required: true,
    disableGrip: true,
    disableToolbar: !!value,
    maxEditorHeight: 140,
    showCharacterLength: !value,
    classes: {
      mde: "mde-comment",
      mdetextareawrapper: "mde-textarea-wrapper"
    },
    css: `margin-bottom: 10px;height: ${!value ? "200px" : "150px"};`,
    maxCharacterLength: "1000",
    textAreaProps: { placeholder: "Add a comment..." }
  }
];

export default fields;
