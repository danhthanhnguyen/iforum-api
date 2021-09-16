declare namespace NodeJS {
  export interface ProcessEnv {
    MONGO_HOSTNAME: string;
    MONGO_PORT: string;
    MONGO_DB: string;
    PORT: string;
  }
}
