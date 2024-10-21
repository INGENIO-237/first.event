
export type SetupInterests = {
    interests: Array<string>;
}

export type SelectedInterest = {
    interest: string;
    tags: Array<string>;
}

export type SetupInterestsData = {
    interests: Array<SelectedInterest>;
}