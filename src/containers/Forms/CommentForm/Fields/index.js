const fields = value => [
  {
    name: "body",
    type: "editor",
    value: value || "",
    errors: "",
    required: true,
    disableGrip: true,
    maxEditorHeight: 140,
    showCharacterLength: true,
    classes: {
      mde: "mde-comment",
      mdetextareawrapper: "mde-textarea-wrapper"
    },
    css: "margin-bottom: 10px;height: 200px;",
    maxCharacterLength: "500",
    textAreaProps: { placeholder: "Add a comment..." }
  }
];

export default fields;
