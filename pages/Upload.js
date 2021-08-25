import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            files: {
                "0": {
                    img: null,
                    name: null,
                    run: null,
                    tank: null,
                },
            }
        }

        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleFileSelect(event, filenum) {
        event.preventDefault()
        const f = event.target.files[0]
        const idExists = typeof this.state.files[0] != "undefined";
        console.log(Object.keys(event.target.files))
        console.log(event.target.filenum)
        this.setState({
            files: {
                0: { //TODO: dynamic file number state updating
                    img: URL.createObjectURL(f),
                    name: f.name,
                    run: null,
                    tank: null,
                }
            }
        })
    }

    handleSubmit(event) {
    }

    render() {
        console.log(this.state)
        var rows = [<input type="file" key={0} fileNum="0" accept="image/*" onChange={this.handleFileSelect.bind(this)} className="flex flex-initial"/>]
        /*
        for (let i=1; i<this.state.filenames.length+1; i++) {
            rows.push(<input type="file" key={i} id="img" name="img" accept="imgage/*" onChange={this.handleFileSelect} className="flex flex-initial"/>)
        }
        */

        return (
          <div className="grid grid-cols-1 w-screen h-screen bg-green-300">
            <form onSubmit={this.handleSubmit} className="grid grid-cols-3 w-full h-full">
                <div className="flex flex-col flex-nowrap">
                </div>

                <div className="flex flex-col flex-nowrap gap-y-5">
                    <label className="flex flex-inital m-5 justify-center text-2xl">Select PCV image</label>
                    <div className="flex flex-col flex-grow gap-y-2">{rows}</div>
                    <img src={this.state.files[0].img}/>
                    <input type="submit" className="flex flex-inital"/>
                </div>

                <div className="flex flex-col flex-nowrap">
                </div>
            </form>
          </div>
        )}
}