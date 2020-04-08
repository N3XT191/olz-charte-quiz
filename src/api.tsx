import { serverURL } from "./constants";

const getDataWithParam = async (route: string, value: string) => {
	const res = await fetch(serverURL + route + "/" + value, {});
	const data = await res.json();
	return data;
};
const sendData = async (route: string, payload: object, method: string = "post") => {
	const res = await fetch(serverURL + route, {
		method,
		headers: {
			Accept: "application/json, text/plain, */*",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(payload),
	});
	return await res.json();
};

export const getQuestions = async (code: string) => await getDataWithParam("questions", code);
export const getAnswers = async (code: string) => await getDataWithParam("answers", code);
export const getRanking = async (code: string) => await getDataWithParam("ranking", code);

export const submitScore = (name: string, score: number, seed: string) =>
	sendData("score", { name, score, seed });
