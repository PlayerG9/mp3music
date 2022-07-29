export interface StepWidgetProps {
    values: ValueProps,
    nextStep: () => void,
    handleInput: (key: string) => (valueOrEvent: any) => void
}


export interface ValueProps {
    youtubeId?: string,
    fileUid?: string,
    filename?: string
}
