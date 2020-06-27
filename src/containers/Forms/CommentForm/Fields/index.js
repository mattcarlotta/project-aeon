const fields = value => [
  {
    name: "body",
    type: "editor",
    value: value || "",
    errors: "",
    required: true,
    disableGrip: true,
    disableToolbar: !!value,
    maxEditorHeight: !value ? 140 : 80,
    showCharacterLength: !value,
    classes: {
      mde: "mde-comment",
      mdetextareawrapper: "mde-textarea-wrapper"
    },
    css: `margin-bottom: 10px;height: ${!value ? "200px" : "90px"};margin-top:${
      !value ? "0px" : "5px"
    };`,
    maxCharacterLength: "1000",
    textAreaProps: { placeholder: "Add a comment..." }
  }
];

export default fields;
