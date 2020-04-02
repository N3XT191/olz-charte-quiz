import { serverURL } from "./constants";

const getDataWithParam = async (route: string, value: string) => {
	const res = await fetch(serverURL + route + "/" + value, {});
	const data = await res.json();
	return data;
};

export const getQuestions = async (code: string) => await getDataWithParam("questions", code);
export const getAnswers = async (code: string) => await getDataWithParam("answers", code);
