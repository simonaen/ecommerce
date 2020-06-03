export interface ApiError {
	id?: string;
	status: string;
	timestamp: Date;
	message: string;
	debugMessage: string;
	subErrors: SubError[]
}

interface SubError {
	field: string;
	"rejectedValue": string;
	message: string;
}
