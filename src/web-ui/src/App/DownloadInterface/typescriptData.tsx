export interface StepWidgetProps {
    values: ValueProps,
    nextStep: () => void,
    handleInput: inputHandler
}


interface inputHandler {
    (key: string, value: string): void, 
    (key: string): ((event: any) => void)
}


export interface ValueProps {
    youtubeId?: string,
    fileUid?: string,
    filename?: string,

    title?: string,
    artist?: string
}
