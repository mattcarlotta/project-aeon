import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	FaUpload,
	FaTimesCircle,
	FaUndo,
	FaCloudUploadAlt
} from "react-icons/fa";
import { Tooltip } from "antd";
import { createUserAvatar, updateUserAvatar } from "~actions/Authentication";
import Button from "~components/Body/Button";
import FlexCenter from "~components/Body/FlexCenter";
import FlexSpaceAround from "~components/Body/FlexSpaceAround";
import toast from "~components/Body/Toast";

const initialState = {
	error: "",
	imagePreview: "",
	file: null,
	isSubmitting: false
};

export class UpdateImageForm extends Component {
	state = initialState;

	static getDerivedStateFromProps(props) {
		return props.serverError ? { isSubmitting: false } : null;
	}

	componentDidUpdate(prevProps) {
		const { showImageForm, serverMessage } = this.props;

		if (
			showImageForm &&
			serverMessage &&
			prevProps.serverMessage !== serverMessage
		) {
			this.props.closeForm();
		}
	}

	handleChange = async ({ target: { files } }) => {
		try {
			const file = files[0];

			const isAccepted = ["image/jpeg", "image/png", "image/gif"].some(
				type => type === file.type
			);
			const isLt10MB = file.size / 10240000 <= 1;

			if (!isAccepted || !isLt10MB) throw String("Invalid format.");

			const img = new Image();
			img.src = URL.createObjectURL(file);

			this.setState({
				file,
				imagePreview: img.src
			});
		} catch (e) {
			toast({
				type: "error",
				message: "Only 10MB (image/jpg,png,gif) files are accepted!"
			});
		}
	};

	handleReset = () =>
		this.setState(initialState, () => (this.image.value = null));

	handleSubmit = e => {
		e.preventDefault();

		if (!this.state.file) {
			this.setState({ error: "Required!" }, () =>
				toast({
					type: "error",
					message: "You must provide an image to upload!"
				})
			);
		} else {
			this.setState({ error: "", isSubmitting: true }, () => {
				const { avatar, createUserAvatar, updateUserAvatar } = this.props;

				const fd = new FormData();
				fd.append("file", this.state.file);
				if (!avatar) {
					createUserAvatar(fd);
				} else {
					updateUserAvatar(fd);
				}
			});
		}
	};

	render = () => {
		const { error, imagePreview, isSubmitting } = this.state;

		return (
			<form
				css="width: 100%; max-width: 200px; margin: 0 auto;"
				onSubmit={this.handleSubmit}
			>
				<div
					css={`
						height: 195px;
						width: 100%;
						margin: 0 auto;
						background: #efebeb;
						padding: 5px;
						position: relative;
						border: ${error ? "1px solid #f0506e" : "1px dashed #03a9f3"};
					`}
				>
					<FlexCenter direction="column">
						{imagePreview ? (
							<img css="height: 100%;" src={imagePreview} alt="avatar" />
						) : (
							<>
								<FaCloudUploadAlt style={{ fontSize: 60 }} />
								<p>Click here or drag an image to this area.</p>
								<p css="margin: 0;padding: 0;font-size: 12px;">
									&#40;jpg/png/gif/bmp &#8804; 10MB&#41;
								</p>
							</>
						)}
					</FlexCenter>
					<input
						css="position: absolute;top: 0px;right: 0px;bottom: 0px;left: 0px;opacity: 1e-05;width: 100%;cursor: pointer;z-index: 10;"
						ref={node => (this.image = node)}
						type="file"
						accept="image/*"
						multiple={false}
						onChange={this.handleChange}
					/>
				</div>
				<FlexSpaceAround style={{ width: "200px" }}>
					<Tooltip placement="top" title="Upload">
						<Button
							primary
							type="submit"
							width="50px"
							radius="4px"
							padding="5px"
							style={{ marginTop: 10 }}
							disabled={isSubmitting}
						>
							<FaUpload
								style={{ fontSize: 17, position: "relative", top: 3 }}
							/>
						</Button>
					</Tooltip>
					<Tooltip placement="top" title="Reset">
						<Button
							type="button"
							width="50px"
							radius="4px"
							padding="5px"
							style={{ marginTop: 10 }}
							onClick={this.handleReset}
							disabled={isSubmitting}
						>
							<FaUndo style={{ position: "relative", top: 4 }} />
						</Button>
					</Tooltip>

					<Tooltip placement="top" title="Cancel">
						<Button
							danger
							type="button"
							width="50px"
							radius="4px"
							padding="5px"
							style={{ marginTop: 10 }}
							onClick={this.props.closeForm}
							disabled={isSubmitting}
						>
							<FaTimesCircle
								style={{ fontSize: 18, position: "relative", top: 4 }}
							/>
						</Button>
					</Tooltip>
				</FlexSpaceAround>
			</form>
		);
	};
}

UpdateImageForm.propTypes = {
	avatar: PropTypes.string,
	createUserAvatar: PropTypes.func.isRequired,
	serverError: PropTypes.string,
	serverMessage: PropTypes.string,
	showImageForm: PropTypes.bool.isRequired,
	closeForm: PropTypes.func.isRequired,
	updateUserAvatar: PropTypes.func.isRequired
};

const mapStateToProps = ({ authentication, messages }) => ({
	avatar: authentication.avatar,
	serverError: messages.error,
	serverMessage: messages.message
});

const mapDispatchToProps = {
	createUserAvatar,
	updateUserAvatar
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateImageForm);
