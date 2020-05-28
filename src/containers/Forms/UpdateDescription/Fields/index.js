export default ({ displayname, firstname, lastname, website, description }) => [
	{
		name: "displayname",
		type: "text",
		label: "Display Name",
		value: displayname,
		tooltip: "Adding a display name will hide your first and last name.",
		errors: "",
		required: false
	},
	{
		name: "firstname",
		type: "text",
		label: "First Name",
		value: firstname,
		errors: "",
		required: true
	},
	{
		name: "lastname",
		type: "text",
		label: "Last Name",
		value: lastname,
		errors: "",
		required: true
	},
	{
		name: "website",
		type: "text",
		label: "Website",
		value: website,
		errors: "",
		tooltip: "You'll need to specify a full address: https://example.com.",
		required: false
	},
	{
		name: "description",
		type: "editor",
		label: "Description",
		value: description,
		errors: "",
		required: false,
		placeholder: "Add a description..."
	}
];
