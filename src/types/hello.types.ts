export interface HelloResponse {
  message: string;
  timestamp: Date;
  fromDatabase: boolean;
}

export interface CreateHelloRequest {
  message: string;
  userId?: string;
}
