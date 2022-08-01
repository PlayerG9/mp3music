import './style.scss'
import React from 'react'
import { ValueProps } from './typescriptData'
import YoutubeIdInput from './steps/YoutubeIdInput'
import MetadataInput from './steps/MetadataInput'
import DownloadUpdates from './steps/DownloadingUpdates'
import AudioDownload from './steps/AudioDownload'


export const STATE2WIDGET = [
    YoutubeIdInput,
    MetadataInput,
    DownloadUpdates,
    AudioDownload
]


interface StepsProps extends ValueProps {
    currentStep: number
}


export default class DownloadInterface extends React.Component {
    state: StepsProps

    constructor(props: any){
        super(props)
        this.state = {
            currentStep: 0,
            messages: []
        }
        
        this.nextStep = this.nextStep.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    render(){
        const Widget = STATE2WIDGET[this.state.currentStep]

        if(Widget === undefined){
            return <div>
                Invalid step is displayed
            </div>
        }

        const values: ValueProps = this.state

        return <div className='download-interface'>
            <Widget values={values} handleInput={this.handleInput} nextStep={this.nextStep}/>
        </div>
    }

    nextStep(){
        this.setState({
            currentStep: this.state.currentStep + 1
        })
    }

    handleInput(keyWord: string, value?: string | ((prevState: ValueProps) => object)) {
        const setState = this.setState.bind(this)

        if(value){
            if(typeof value === 'function'){
                setState((prev: ValueProps) => ({
                    [keyWord]: value(prev)
                }))
            }else{
                setState({
                    [keyWord]: value
                })
            }
        }
        return function(event: any){
            if(event.target?.value){
                setState({
                    [keyWord]: event.target.value
                })
            }
        }
    }
}
