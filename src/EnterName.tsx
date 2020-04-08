import React from "react";
import { css } from "glamor";
import { Button, H1, InputGroup } from "@blueprintjs/core";

const styles = {
	container: css({
		width: "600px",
		margin: "auto",
		minHeight: "500px",
		height: "100%",
		padding: "30px",
		maxWidth: "100%",
		fontSize: "20px",
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		"@media(max-width: 500px)": {
			width: "100%",
			fontSize: "18px",
		},
	}),
	info: css({
		"@media(max-width: 500px)": {
			width: "100%",
			fontSize: "14px",
		},
	}),
	input: css({ display: "flex" }),
};

interface Props {
	onEnter: (name: string) => void;
}

interface State {
	name: string;
}
class EnterName extends React.Component<Props, State> {
	public state = { name: "" };
	public render() {
		return (
			<div {...styles.container} {...styles.info}>
				<H1>Name</H1>
				<div {...styles.input}>
					<InputGroup
						placeholder={"din Name..."}
						value={this.state.name}
						onChange={(event: any) => this.setState({ name: event.target.value })}
					/>
					<Button onClick={() => this.props.onEnter(this.state.name)}>Abschicke...</Button>
				</div>
			</div>
		);
	}
}
export default EnterName;
