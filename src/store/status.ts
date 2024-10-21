interface Status {
    SUCCEEDED: string;
    FAILED: string;
    LOADING: string;
    IDLE: string;
}
export const status: Status = {
    SUCCEEDED: 'succeeded',
    FAILED: 'failed',
    LOADING: 'loading',
    IDLE: 'idle',
}