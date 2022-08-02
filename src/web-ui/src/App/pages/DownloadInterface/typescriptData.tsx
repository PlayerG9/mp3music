export interface StepWidgetProps {
    values: ValueProps,
    nextStep: () => void,
    handleInput: inputHandler
}


interface inputHandler {
    (key: string): ((event: any) => void),
    (key: string, value: string): void
    (key: string, callback: (prev: ValueProps) => object): void
}


export interface ValueProps {
    youtubeId?: string,
    fileUid?: string,
    filename?: string,

    title?: string,
    artist?: string,

    messages: DownloadProtocolMessage[]
}


export interface DownloadProtocolMessage {
    info?: string,
    warning?: string,
    error?: string,
    error_class?: string,
    progress?: {
      has: number,
      max: number
    },
    final?: {
      uid: string,
      filename: string
    }
}
