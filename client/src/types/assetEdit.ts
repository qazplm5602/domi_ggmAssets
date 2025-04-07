type ReactState<T> = [T, React.Dispatch<React.SetStateAction<T>>];

export interface AssetEditFieldStates {
    title: ReactState<string>,
    fileLink: ReactState<string>,
    storeLink: ReactState<string>,
    version: ReactState<string>,
    createAt: ReactState<string>,
    shortDesc: ReactState<string>,
    description: ReactState<string>,
}