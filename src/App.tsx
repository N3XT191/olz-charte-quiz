import React from "react";
import "@blueprintjs/core/lib/css/blueprint.css";

import { HashRouter, Route, Redirect, Switch } from "react-router-dom";
import Analytics from "react-router-ga";

import CreateGame from "./CreateGame";
import Play from "./Play";
import { css } from "glamor";

const styles = {
	container: css({ height: "100vh", width: "100vw" }),
};
class App extends React.Component {
	public render() {
		return (
			<div {...styles.container}>
				<HashRouter>
					<Analytics id="UA-159852486-2" debug={true}>
						<Switch>
							<Redirect exact={true} from="/" to="/create" />

							<Route exact={true} path="/" />
							<Route exact={true} path="/create" component={CreateGame} />
							<Route exact={true} path="/play/:seed" component={Play} />
						</Switch>
					</Analytics>
				</HashRouter>
			</div>
		);
	}
}

export default App;
