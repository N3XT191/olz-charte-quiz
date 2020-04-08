import React from "react";
import { css } from "glamor";
import { Button, H1, H5, H2 } from "@blueprintjs/core";

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
};
const Info = ({ unsetInfo }: { unsetInfo: () => void }) => {
	return (
		<div {...styles.container} {...styles.info}>
			<H1>OLZ Charte Quiz</H1>
			<H5>by Marc Bitterli</H5>
			<p>
				Jedi Rundi gsehsch du en chliine Usschnitt vu einere vu euse OL Charte und du musch errate
				vu wellere das er isch!
			</p>
			<p>
				Wähl dAnzahl Rundene wo du willsch spiele und dSchwierigkeitsstufe.Die bestimmt, wie de
				Usschnitt isch wo du gsehsch.Am Endi wirsch du e Übersicht gseh vu dine Antworte und was die
				richtig Lösig gsi isch.
			</p>
			<p>
				Wenn du gege dini Fründe willsch spiele, denn schick ihne de Link wo aazeigt wird (nachdem
				du dSchwirigkeit und dRundene gwählt hesch) und ihr werded die gliiche Frage becho. Am
				Schluss wirsch du e (automatisch aktuallisierti) Rangliste gseh vu allne wo i de letzte
				Stund die Frage beantwortet hend.
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
			<Button onClick={() => unsetInfo()}>zrugg...</Button>
		</div>
	);
};
export default Info;
