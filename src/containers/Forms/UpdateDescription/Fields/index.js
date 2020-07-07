export default ({ username, firstname, lastname, website, description }) => [
  {
    name: "username",
    type: "text",
    label: "Display Name",
    value: username,
    tooltip: "Adding a display name will hide your first and last name.",
    placeholder: "Enter a display name to hide your first and last name...",
    errors: "",
    required: false
  },
  {
    name: "firstname",
    type: "text",
    label: "First Name",
    placeholder: "Enter your first name...",
    value: firstname,
    errors: "",
    required: true
  },
  {
    name: "lastname",
    type: "text",
    label: "Last Name",
    placeholder: "Enter your last name...",
    value: lastname,
    errors: "",
    required: true
  },
  {
    name: "description",
    type: "editor",
    label: "Description",
    placeholder: "Tell us a little bit about yourself...",
    value: description,
    errors: "",
    required: false
  }
];
