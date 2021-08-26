import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import { nonUnique } from '../lib/nonUnique.js'

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            run: "",
            files: {},
            bad_tanks: []
        }

        this.handleRunSelect = this.handleRunSelect.bind(this);
        this.handleTankSelect = this.handleTankSelect.bind(this)
        this.handleFileSelect = this.handleFileSelect.bind(this);
        this.setTankNumbers = this.setTankNumbers.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    setTankNumbers(e) {
        e.preventDefault()
        const file_keys = Object.keys(this.state.files)
        for (let i=0; i<file_keys.length; i++) {
            this.setState(prevState => ({
                ...prevState,
                files: {
                    ...prevState.files,
                    [file_keys[i]]: {
                        ...prevState.files[file_keys[i]],
                        tank: String(i+1)
                    }
                }
            }))
        }
    }

    handleTankSelect(event, filenumber) {
        event.preventDefault()

        var tanks= Object.keys(this.state.files)
        .map((file_key) => {
            if (file_key == filenumber) {
                let x = this.state.files[file_key]
                x.tank = event.target.value
                return x
            }
            return this.state.files[file_key]
        })
        .reduce((tank_numbers, file) => {
            if (typeof file.tank != "undefined") {
                tank_numbers.push(file.tank)
            }
            return tank_numbers
        }, [])
        var bad_tanks = nonUnique(tanks)

        this.setState(prevState => ({
            ...prevState,
            files: {
                ...prevState.files,
                [filenumber]: {
                    ...prevState.files[filenumber],
                    tank: event.target.value
                }
            },
            bad_tanks: bad_tanks
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
                [filenumber]: { 
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
            filerows.push(<input type="file" key={i} accept="image/*" onChange={(e) => this.handleFileSelect(e, i)} className="flex flex-initial h-10 "/>)
        }

        var tankrows = []
        for (let i=0; i<Object.keys(this.state.files).length; i++) {
            if (typeof this.state.files[i].tank != "undefined" && this.state.bad_tanks.includes(this.state.files[i].tank)) {
                var box_type = "flex flex-initial place-self-center w-10 h-7 bg-gray-200 border-2 border-red-600 rounded-md";
            } else {
                var box_type ="flex flex-initial place-self-center w-10 h-7 bg-gray-200 border-2 border-gray-100 rounded-md";
            }
            tankrows.push(
                <div key={i} className="flex flex-rows-1 h-10 place-content-center">
                    <label className="flex flex-initial place-items-center">Tank No. </label>
                    <input type="number" value={this.state.files[i].tank} onChange={(e) => this.handleTankSelect(e, i)} className={box_type}/>
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
                        <input type="text" id="run" value={this.state.run} onChange={(e) => this.handleRunSelect(e)} 
                            className="flex flex-initial w-20 bg-gray-200 border-2 border-gray-700 rounded-lg"/>
                    </div>
                    <div className="flex flex-col flex-grow gap-y-5 ">{tankrows}</div>
                    <button onClick={(e) => this.setTankNumbers(e)} className="flex flex-initial place-self-center bg-gray-100 m-3 p-6 rounded-t-md">Auto</button>
                </div>

                <div className="flex flex-col flex-nowrap gap-y-5">
                    <label className="flex flex-inital m-5 mt-8 place-self-center text-2xl">Select PCV image</label>
                    <div className="flex flex-col flex-grow gap-y-5 ">{filerows}</div>
                    <input type="submit" className="flex flex-initial place-self-center justify-center m-3 w-40 h-20 rounded-t-md bg-gray-100"/>
                </div>

                <div className="flex flex-col flex-nowrap gap-y-5">
                    <label className="flex flex-inital m-5 mt-8 place-self-center text-2xl">Results</label>
                </div>
            </form>
          </div>
        )}
}