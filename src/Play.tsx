import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";

import { ProgressBar } from "@blueprintjs/core";
import { css } from "glamor";

import { Question, Answer } from "./interfaces";
import QuestionCard from "./Question";
import { getQuestions, getAnswers, submitScore } from "./api";
import Ranking from "./Ranking";
import EnterName from "./EnterName";

interface State {
	questions: Question[];
	currentQuestion: number;
	done: boolean;
	answers: Answer[];
	correctAnswers: Answer[];
	name: string;
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
		if (localStorage.getItem("olz-quiz_" + this.props.match.params.seed)) {
			this.setState({
				answers: JSON.parse(localStorage.getItem("olz-quiz_" + this.props.match.params.seed)!),
				done: true,
				name: "placeholder",
			});
		}
	}
	public state = {
		questions: [] as Question[],
		answers: [] as Answer[],
		correctAnswers: [] as Answer[],
		currentQuestion: 0,
		done: false,
		name: "",
	};
	public render() {
		const question = this.state.questions[this.state.currentQuestion];

		return !this.state.name ? (
			<EnterName onEnter={(name: string) => this.setState({ name })} />
		) : !this.state.done ? (
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
							const newAnswers = [
								...this.state.answers,
								{
									id: selectedAnswer,
									text: question.answers.find((answer) => answer.id === selectedAnswer)!.text,
								},
							];
							this.setState({
								answers: newAnswers,
							});
							if (this.state.currentQuestion === this.state.questions.length - 1) {
								this.setState({ done: true });
								let points = 0;
								newAnswers.forEach((answer, i) => {
									if (answer.id === this.state.correctAnswers[i].id) {
										points += 1;
									}
								});
								submitScore(this.state.name, points, this.props.match.params.seed);
								localStorage.setItem(
									"olz-quiz_" + this.props.match.params.seed,
									JSON.stringify(this.state.answers)
								);
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
				seed={this.props.match.params.seed}
			/>
		);
	}
}

export default Play;
