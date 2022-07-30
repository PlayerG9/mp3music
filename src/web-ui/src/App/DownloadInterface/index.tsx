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
            currentStep: 0
        }
        
        this.nextStep = this.nextStep.bind(this)
        this.handleInput = this.handleInput.bind(this)
    }

    render(){
        const Widget = STATE2WIDGET[this.state.currentStep]

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

    handleInput(keyWord: string, value?: string) {
        console.log("I got", value)
        const setState = this.setState.bind(this)

        return function(param: any){
            if(param.target?.value){
                setState({
                    [keyWord]: param.target.value
                })
            }else{
                setState({
                    [keyWord]: param
                })
            }
        }
    }
}
