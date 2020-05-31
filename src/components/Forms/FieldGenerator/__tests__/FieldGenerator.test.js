import moment from "moment-timezone";
import FieldGenerator from "../index";

const onChange = jest.fn();
const onFieldRemove = jest.fn();

const input = {
	type: "text",
	name: "seasonId",
	label: "Season ID",
	tooltip:
		"Select a start and end date below to automatically fill in this field.",
	icon: "id",
	value: "",
	errors: ""
};

const switchField = {
	name: "emailReminders",
	type: "switch",
	label: "Email Reminders",
	value: true,
	tooltip:
		"This setting only affects scheduled events and A/P form email reminders. Monthly schedules will remain unaffected."
};

const textarea = {
	type: "textarea",
	name: "notes",
	label: "Notes",
	icon: "note",
	value: "",
	errors: ""
};

const select = {
	name: "role",
	type: "select",
	label: "Role",
	placeholder: "Select an option...",
	icon: "usertag",
	value: "",
	errors: "",
	required: true,
	selectOptions: ["staff", "member"]
};

const range = {
	type: "range",
	name: "seasonDuration",
	label: "Season Duration",
	value: [],
	errors: "",
	required: true,
	disabled: true,
	format: "l"
};

const date = {
	type: "date",
	name: "eventDate",
	label: "Event Date",
	placeholder: "Select a start date and time...",
	value: null,
	errors: "",
	required: true,
	format: "MM/DD/YYYY h:mm a",
	showTime: { format: "h:mm a", use12Hours: true, minuteStep: 15 }
};

// const editor = {
// 	type: "editor",
// 	name: "message",
// 	label: "Message",
// 	value: "<span>Test</span>",
// 	errors: "Required.",
// 	placeholder: "Type a message...",
// 	tooltip:
// 		"The message created below will make up the body of a pre-defined email template. That said, you can still copy/paste, and/or create stylized and formatted text and links within the body.",
// 	required: true,
// 	disabled: true,
// };

const time = {
	type: "time",
	name: "callTime",
	label: "Call Time",
	value: moment(),
	errors: "",
	required: true,
	disabled: true
};

const removetime = {
	...time,
	label: "",
	onFieldRemove
};

const initProps = {
	fields: [],
	onChange
};

const radiogroup = {
	type: "radiogroup",
	name: "0123456789",
	value: "",
	errors: "",
	required: true,
	disabled: true,
	selectOptions: [
		"I want to work.",
		"Available to work.",
		"Prefer not to work.",
		"Not available to work."
	]
};

const transfer = {
	name: "sendTo",
	type: "transfer",
	label: "Send To",
	tooltip:
		"Select and transfer one or multiple members from the left box to the right box to include them on the mailing list.",
	value: [],
	errors: "",
	required: true,
	disabled: true,
	dataSource: [
		{
			_id: "5d83d5b32bff0853d6539cb6",
			email: "Bobby Axelrod <member10@example.com>",
			key: "Bobby Axelrod <member10@example.com>"
		},
		{
			_id: "5d83d5b32bff0853d6539cb7",
			email: "Matt Polls <member11@example.com>",
			key: "Matt Polls <member11@example.com>"
		}
	],
	showSearch: true,
	listStyle: {
		width: 277,
		height: 300
	},
	rowKey: record => record.email,
	render: item => item.email.replace(/ <.*?>/g, "")
};

describe("Field Generator", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<FieldGenerator {...initProps} />);
	});

	afterEach(() => {
		onChange.mockClear();
	});

	it("initially returns nothing", () => {
		expect(wrapper.find("Input").exists()).toBeFalsy();
		expect(wrapper.find("Select").exists()).toBeFalsy();
	});

	it("returns an Input when type is 'text'", () => {
		wrapper.setProps({ fields: [input] });

		expect(wrapper.find("Input").exists()).toBeTruthy();
	});

	it("returns a TextArea when type is 'textarea'", () => {
		wrapper.setProps({ fields: [textarea] });

		expect(wrapper.find("TextArea").exists()).toBeTruthy();
		expect(wrapper.find("Errors").exists()).toBeFalsy();

		wrapper.setProps({ fields: [{ ...textarea, errors: "Required." }] });
		expect(wrapper.find("Errors").exists()).toBeTruthy();
	});

	it("returns a Input when type is 'email'", () => {
		wrapper.setProps({ fields: [{ ...input, type: "email" }] });

		expect(wrapper.find("Input").exists()).toBeTruthy();
	});

	it("returns a Input when type is 'password'", () => {
		wrapper.setProps({ fields: [{ ...input, type: "password" }] });

		expect(wrapper.find("Input").exists()).toBeTruthy();
	});

	it("returns a Select when type is 'select'", () => {
		wrapper.setProps({ fields: [select] });

		expect(wrapper.find("Select").exists()).toBeTruthy();
	});

	// it("renders a QuillEditor when type is 'editor'", () => {
	// 	wrapper.setProps({ fields: [editor] });
	//
	// 	wrapper
	// 		.find("#erase-message")
	// 		.first()
	// 		.simulate("click");
	// 	expect(onChange).toHaveBeenCalledWith({
	// 		target: { name: "message", value: "" },
	// 	});
	//
	// 	expect(wrapper.find("LazyQuill").exists()).toBeTruthy();
	// });
});
