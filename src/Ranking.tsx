import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";

import { H1, Callout, H3, Intent, Button, HTMLTable } from "@blueprintjs/core";

import { Answer, Rank } from "./interfaces";
import { css } from "glamor";
import { baseURL } from "./constants";
import { getRanking } from "./api";

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
	ranking: css({ marginBottom: "10px" }),
};

interface Props {
	answers: Answer[];
	correctAnswers: Answer[];
	answerThumbs: string[];
	seed: string;
}

interface State {
	ranking: Rank[];
}

class Ranking extends React.Component<Props, State> {
	private interval: any = null;
	public state = { ranking: [] as Rank[] };

	async componentDidMount() {
		const ranking = await getRanking(this.props.seed);
		this.setState({ ranking });
		this.interval = setInterval(async () => {
			const newRanking = await getRanking(this.props.seed);
			this.setState({ ranking: newRanking });
		}, 10000);
	}
	public render() {
		let points = 0;
		this.props.answers.forEach((answer, i) => {
			if (answer.id === this.props.correctAnswers[i].id) {
				points += 1;
			}
		});

		return (
			<div {...styles.container}>
				<H1 {...styles.title}>
					Resultat: {points}/{this.props.answers.length}
				</H1>
				<div {...styles.ranking}>
					<Callout>
						<HTMLTable striped={true} bordered={true} style={{ width: "100%" }}>
							<thead>
								<tr>
									<td>Rang</td>
									<td>Name</td>
									<td>Pünkt</td>
								</tr>
							</thead>
							<tbody>
								{this.state.ranking.map((rank, i) => (
									<tr>
										<td>{i + 1}</td>
										<td>{rank.name}</td>
										<td>{rank.score}</td>
									</tr>
								))}
							</tbody>
						</HTMLTable>
						<div>dRangliste wird automatisch aktualisiert.</div>
					</Callout>
				</div>
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
