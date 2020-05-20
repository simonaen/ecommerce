export interface ApiError {
  "status": string;
  "timestamp": Date;
  "message": string;
  "debugMessage": string;
  "subErrors": SubError[]
}

interface SubError {
  "field": string;
  "rejectedValue": string;
  "message": string;
}
