import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            run: "",
            files: {}
        }

        this.handleRunSelect = this.handleRunSelect.bind(this);
        this.handleTankSelect = this.handleTankSelect.bind(this)
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleTankSelect(event, filenumber) {
        event.preventDefault()
        this.setState(prevState => ({
            ...prevState,
            files: {
                ...prevState.files,
                [filenumber]: {
                    ...prevState.files[filenumber],
                    tank: event.target.value
                }
            }
        }))
    }

    handleRunSelect(event) {
        event.preventDefault()
        this.setState(prevState => ({
            run: event.target.value 
        }))
    }

    handleFileSelect(event, filenumber) {
        event.preventDefault()
        const f = event.target.files[0]
        const idExists = typeof this.state.files[0] != "undefined";
        this.setState(prevState => ({
            ...prevState,
            files: {
                ...prevState.files,
                [filenumber]: { //TODO: dynamic file number state updating
                    ...prevState.files[filenumber],
                    img: URL.createObjectURL(f),
                    name: f.name,
                }
            }
        }))
    }

    handleSubmit(event) {
    }

    render() {
        console.log(this.state)

        var filerows = [];
        for (let i=0; i<Object.keys(this.state.files).length+1; i++) {
            filerows.push(<input type="file" key={i} accept="image/*" onChange={(e) => this.handleFileSelect(e, i)} className="flex flex-initial"/>)
        }

        var tankrows = []
        for (let i=0; i<Object.keys(this.state.files).length; i++) {
            tankrows.push(
                <div key={i} className="flex flex-rows-1 pt-1 pb-0.5 place-content-center">
                    <label className="flex flex-initial">Tank No. </label>
                    <input type="number" onChange={(e) => this.handleTankSelect(e, i)} className="flex flex-initial w-14"/>
                </div>
            )
        }

        let imgs = Object.keys(this.state.files).map((imgkey) => <img key={imgkey} src={this.state.files[imgkey].img} />)
        /* console.log(imgs) */

        return (
          <div className="grid grid-cols-1 w-screen h-screen bg-gray-200">
            <form onSubmit={this.handleSubmit} className="grid grid-cols-3 w-full h-full">
                <div className="flex flex-col flex-nowrap gap-y-5">
                    <div className="flex flex-rows-1 place-content-center m-5 mt-8">
                        <label className="flex flex-inital text-2xl pr-4">Enter Run</label>
                        <input type="text" id="run" value={this.state.run} onChange={(e) => this.handleRunSelect(e)} className="flex flex-initial w-20"/>
                    </div>
                    <div className="flex flex-col flex-grow gap-y-3 ">{tankrows}</div>
                </div>

                <div className="flex flex-col flex-nowrap gap-y-5">
                    <label className="flex flex-inital m-5 mt-8 place-self-center text-2xl">Select PCV image</label>
                    <div className="flex flex-col flex-grow gap-y-3">{filerows}</div>
                    <input type="submit" className="flex flex-initial place-self-center justify-center m-3 w-40 h-20 rounded-t-md"/>
                </div>

                <div className="flex flex-col flex-nowrap gap-y-5">
                    <label className="flex flex-inital m-5 mt-8 place-self-center text-2xl">Results</label>
                </div>
            </form>
          </div>
        )}
}