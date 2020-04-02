import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";

import { ProgressBar } from "@blueprintjs/core";
import { css } from "glamor";

import { Question, Answer } from "./interfaces";
import QuestionCard from "./Question";
import { getQuestions, getAnswers } from "./api";
import Ranking from "./Ranking";

interface State {
	questions: Question[];
	currentQuestion: number;
	done: boolean;
	answers: Answer[];
	correctAnswers: Answer[];
}
interface Props {
	match: { params: { seed: string } };
}

const styles = {
	container: css({
		width: "500px",
		margin: "auto",
		"@media(max-width: 500px)": {
			paddingLeft: "10px",
			paddingRight: "10px",
			width: "300px",
		},
	}),
	progressBarContainer: css({
		width: "500px",
		margin: "auto",
		height: "30px",
		marginTop: "10px",
		"@media(max-width: 500px)": {
			width: "300px",
			height: "20px",
		},
	}),
	link: css({}),
};

class Play extends React.Component<Props, State> {
	async componentDidMount() {
		const questions = await getQuestions(this.props.match.params.seed);
		const correctAnswers = await getAnswers(this.props.match.params.seed);
		this.setState({ questions, correctAnswers });
	}
	public state = {
		questions: [] as Question[],
		answers: [],
		correctAnswers: [],
		currentQuestion: 0,
		done: false,
	};
	public render() {
		const question = this.state.questions[this.state.currentQuestion];

		return !this.state.done ? (
			<div>
				<div {...styles.progressBarContainer}>
					<ProgressBar
						value={this.state.currentQuestion / this.state.questions.length}
						animate={false}
						stripes={false}
						className={"progressBar"}
					/>
				</div>
				{question ? (
					<QuestionCard
						key={question.img_url}
						img_url={question.img_url}
						answers={question.answers}
						onSubmit={(selectedAnswer: number) => {
							this.setState({
								answers: [
									...this.state.answers,
									{
										id: selectedAnswer,
										text: question.answers.find((answer) => answer.id === selectedAnswer)!.text,
									},
								],
							});
							if (this.state.currentQuestion === this.state.questions.length - 1) {
								this.setState({ done: true });
							} else {
								this.setState({ currentQuestion: this.state.currentQuestion + 1 });
							}
						}}
					/>
				) : (
					<div />
				)}
			</div>
		) : (
			<Ranking
				answers={this.state.answers}
				correctAnswers={this.state.correctAnswers}
				answerThumbs={this.state.questions.map((question) => question.img_url)}
			/>
		);
	}
}

export default Play;
