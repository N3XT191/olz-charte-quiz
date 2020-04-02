import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";

import { H1, Callout, H3, Intent, Button } from "@blueprintjs/core";

import { Answer } from "./interfaces";
import { css } from "glamor";
import { baseURL } from "./constants";

const styles = {
	container: css({
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		"@media(max-width: 500px)": { paddingLeft: "20px", paddingRight: "20px" },
	}),
	title: css({ marginTop: "20px" }),
	newGame: css({}),
	card: css({
		marginTop: "20px",
		width: "500px",
		"@media(max-width: 500px)": { width: "100%" },
	}),

	callout: css({
		display: "flex",
		justifyContent: "space-between",
		alignItems: "center",
		"@media(max-width: 500px)": {
			flexDirection: "column",
		},
	}),
	thumbs: css({ flexShrink: 0 }),
	thumb: css({
		height: "100px",
		backgroundColor: "#fff",
		"@media(max-width: 500px)": { marginTop: "10px" },
	}),
};

interface Props {
	answers: Answer[];
	correctAnswers: Answer[];
	answerThumbs: string[];
}

class Ranking extends React.Component<Props, {}> {
	public render() {
		let points = 0;
		this.props.answers.forEach((answer, i) => {
			if (answer.id === this.props.correctAnswers[i].id) {
				points += 1;
			}
		});

		return (
			<div {...styles.container}>
				{/*<HTMLTable striped={true} bordered={true}>
					<thead>
						<tr>
							<td>Rank</td>
							<td>Name</td>
							<td>Points</td>
						</tr>
					</thead>
					<tbody>
						{this.state.ranking.map((rank, i) => (
							<tr>
								<td>{i}</td>
								<td>{rank.name}</td>
								<td>{rank.points}</td>
							</tr>
						))}
					</tbody>
						</HTMLTable>*/}
				<H1 {...styles.title}>
					Resultat: {points}/{this.props.answers.length}
				</H1>
				<a href={baseURL} {...styles.newGame}>
					<Button>Neus Spiel</Button>
				</a>
				{this.props.answers.map((answer, i) => (
					<div {...styles.card}>
						<Callout
							intent={
								answer.id === this.props.correctAnswers[i].id ? Intent.SUCCESS : Intent.DANGER
							}
							{...styles.callout}
						>
							<div>
								<H3>
									Dini Antwort: <br />
									{answer.text}
								</H3>
								<H3>
									{answer.id !== this.props.correctAnswers[i].id
										? "Richtigi Antwort: " + this.props.correctAnswers[i].text
										: ""}
								</H3>
							</div>

							<div {...styles.thumbs}>
								<img src={this.props.answerThumbs[i]} alt={"thumb"} {...styles.thumb} />
								<img
									src={"/maps/thumb/" + this.props.correctAnswers[i].id + ".png"}
									alt={"thumb"}
									{...styles.thumb}
								/>
							</div>
						</Callout>
					</div>
				))}
			</div>
		);
	}
}

export default Ranking;
