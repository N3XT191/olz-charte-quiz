import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";

import { Button, Callout, ButtonGroup, Slider, H1, H5, H2 } from "@blueprintjs/core";
import { css } from "glamor";
import { Link } from "react-router-dom";
import { baseURL } from "./constants";

interface State {
	difficulty: number;
	roundNumber: number;
	random: number;
	info: boolean;
}

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
	setting: css({
		width: "100%",
		display: "flex",
		justifyContent: "space-between",
		marginBottom: "40px",
	}),
	label: css({ flexShrink: 0, paddingRight: "10px" }),
	invite: css({ width: "100%" }),
	inviteCallout: css({ width: "100%" }),
	inviteLink: css({
		fontSize: "16px",
		fontWeight: "700",
		"@media(max-width: 500px)": {
			fontSize: "10px",
		},
	}),
	startGame: css({
		display: "flex",
		justifyContent: "space-between",
		marginTop: "40px",
		width: "150px",
	}),
	green: (selected: boolean) =>
		css({
			backgroundColor: (!selected ? "#0A6640" : "#3DCC91") + " !important",
			color: selected ? "#F5F8FA ! important" : "",
		}),
	blue: (selected: boolean) =>
		css({
			backgroundColor: (!selected ? "#0E5A8A" : "#48AFF0") + " !important",
			color: selected ? "#F5F8FA ! important" : "",
		}),
	red: (selected: boolean) =>
		css({
			backgroundColor: (!selected ? "#A82A2A" : "#FF7373") + " !important",
			color: selected ? "#F5F8FA ! important" : "",
		}),
};

class CreateGame extends React.Component<{}, State> {
	public state = {
		difficulty: 1,
		roundNumber: 5,
		random: Math.floor(Math.random() * 1000000),
		info: false,
	};

	private getURL = () => {
		const string = this.state.random.toString() + this.state.difficulty + this.state.roundNumber;
		const number = parseInt(string) * 23 + 19654;
		const newString = number.toString();
		const obf = btoa(newString);
		return obf;
	};
	private getFullURL = () => {
		return baseURL + "play/" + this.getURL();
	};
	public render() {
		return this.state.info ? (
			<div {...styles.container} {...styles.info}>
				<H1>OLZ Charte Quiz</H1>
				<H5>by Marc Bitterli</H5>
				<p>
					Jedi Rundi gsehsch du en chliine Usschnitt vu einere vu euse OL Charte und du musch errate
					vu wellere das er isch!
				</p>
				<p>
					Wähl dAnzahl Rundene wo du willsch spiele und dSchwierigkeitsstufe. Die bestimmt, wie
					gross de Usschnitt isch wo du gsehsch. Am Endi wirsch du e Übersicht gseh vu dine Antworte
					und was die richtig Lösig gsi isch.
				</p>
				<p>
					Wenn du gege dini Fründe willsch spiele, denn schick ihne de Link wo aazeigt wird (nachdem
					du dSchwirigkeit und dRundene gwählt hesch) und ihr werded die gliiche Frage becho.
				</p>
				<p>
					<H2>To do:</H2>
					<ol>
						<li>Schwierigkeitsstufe 3 fertigstelle</li>
						<li>Ranking vu allne wo die gliiche Frage beantworted hend</li>
						<li>Mülibachtobel Charte hinzuefüege</li>
						<li>Präzise Usschnitt bi de Lösig aazeige</li>
					</ol>
				</p>
				<p>Bi Frage oder Feedback schriebet bitte an marc@bitter.li</p>
				<Button onClick={() => this.setState({ info: false })}>zrugg...</Button>
			</div>
		) : (
			<div {...styles.container}>
				<H1>OLZ Charte Quiz</H1>
				<H5>by Marc Bitterli</H5>
				<div {...styles.setting}>
					Schwierigkeit
					<ButtonGroup>
						<Button
							active={this.state.difficulty === 1}
							onClick={() => this.setState({ difficulty: 1 })}
							minimal={true}
							outlined={true}
							{...styles.green(this.state.difficulty === 1)}
						>
							1
						</Button>
						<Button
							active={this.state.difficulty === 2}
							onClick={() => this.setState({ difficulty: 2 })}
							minimal={true}
							outlined={true}
							{...styles.blue(this.state.difficulty === 2)}
						>
							2
						</Button>
						<Button
							active={this.state.difficulty === 3}
							onClick={() => this.setState({ difficulty: 3 })}
							minimal={true}
							outlined={true}
							{...styles.red(this.state.difficulty === 3)}
						>
							3
						</Button>
					</ButtonGroup>
				</div>
				<div {...styles.setting}>
					<div {...styles.label}>Aazahl Rundene: </div>
					<Slider
						initialValue={1}
						max={9}
						min={1}
						value={this.state.roundNumber}
						onChange={(value: number) => this.setState({ roundNumber: value })}
					/>
				</div>
				<div {...styles.invite}>
					Fründe iilade:
					<Callout {...styles.inviteCallout}>
						<div {...styles.inviteLink}> {this.getFullURL()}</div>
					</Callout>
				</div>
				<div {...styles.startGame}>
					<Button onClick={() => this.setState({ info: true })}>Infos</Button>
					<Link to={"play/" + this.getURL()}>
						<Button>Starte</Button>{" "}
					</Link>
				</div>
			</div>
		);
	}
}

export default CreateGame;
