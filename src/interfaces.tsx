export interface Answer {
	id: number;
	text: string;
}
export interface Question {
	img_url: string;
	answers: Answer[];
}

export interface Rank {
	name: string;
	points: number;
}
