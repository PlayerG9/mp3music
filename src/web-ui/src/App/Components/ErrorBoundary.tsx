import React from 'react'


interface ErrorBoundaryProps {
    children: any
}

interface ErrorBoundaryState {
    error?: Error
}


export default class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: {children: any}){
        super(props)
        this.state = {
            error: undefined
        }
    }

    // static getDerivedStateFromError(error: any) {
    //     console.log("getDerived", error)
    //     return { error: error };
    // }
    
    render() {
        if(this.state.error){
            return <div className='error-boundary'>
                <h1 className='text'>
                    Something fatal has happened
                </h1>
                <p className='error'>
                    <span>{this.state.error.name}:</span> {this.state.error.message}
                </p>
            </div>
        }else{
            return this.props.children
        }
    }

    componentDidCatch(error: any){
        this.setState({
            error: error
        })
    }
}
