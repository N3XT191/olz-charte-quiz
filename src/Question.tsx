import React, { useState } from "react";
import { css } from "glamor";
import { Answer } from "./interfaces";
import { Button, RadioGroup, Radio } from "@blueprintjs/core";

const styles = {
	container: css({
		width: "500px",
		margin: "auto",
		"@media(max-width: 500px)": {
			width: "225px",
		},
	}),
	imgContainer: css({
		height: "500px",
		width: "500px",
		margin: "auto",
		"@media(max-width: 500px)": {
			width: "225px",
			height: "225px",
		},
	}),
	img: css({
		marginTop: "10px",
		width: "100%",
		maxWidth: "100%",
		maxHeight: "100%",
		backgroundColor: "#fff",
	}),
	answers: css({
		display: "flex",
		flexDirection: "column",
		marginTop: "20px",
		"@media(max-width: 500px)": {
			marginTop: "20px",
		},
	}),
	answer: css({
		paddingTop: "10px",
		fontSize: "25px",
		"@media(max-width: 500px)": {
			paddingTop: "5px",
		},
	}),
	submit: css({
		paddingTop: "10px",
		"@media(max-width: 500px)": {
			paddingTop: "0px",
		},
	}),
};

interface Props {
	img_url: string;
	answers: Answer[];
	onSubmit: (selectedAnswer: number) => void;
}

const QuestionCard = ({ img_url, answers, onSubmit }: Props) => {
	const [selectedAnswer, setSelectedAnswer] = useState(-1);

	return (
		<div {...styles.container}>
			<div {...styles.imgContainer}>
				<img {...styles.img} src={img_url} alt="map" />
			</div>
			<div {...styles.answers}>
				<RadioGroup
					onChange={(e) => setSelectedAnswer(parseInt(e.currentTarget.value))}
					selectedValue={selectedAnswer}
				>
					{answers.map((answer) => (
						<Radio label={answer.text} value={answer.id} large={true} />
					))}
				</RadioGroup>
				<div {...styles.submit}>
					<Button onClick={() => (selectedAnswer !== -1 ? onSubmit(selectedAnswer) : null)}>
						Wiiter
					</Button>
				</div>
			</div>
		</div>
	);
};
export default QuestionCard;
