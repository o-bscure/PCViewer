import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

export default class Upload extends React.Component {
    constructor(props) {
        super(props);
        this.state = {filenames: []};

        this.handleFileSelect = this.handleFileSelect.bind(this);
    }

    handleFileSelect(event) {
        this.setState(prevState => ({
            filenames: [...prevState.filenames, event.target.files[0].name]
        }))
    }

    render() {
        var rows = [<input type="file" key={-1} id="img" name="img" accept="imgage/*" onChange={this.handleFileSelect}/>]
        for (let i=0; i<this.state.filenames.length; i++) {
            rows.push(<input type="file" key={i} id="img" name="img" accept="imgage/*" onChange={this.handleFileSelect}/>)
        }

        return (
          <div className="grid grid-cols-1 w-screen h-screen bg-green-300 place-items-center">
            <div>
                <form>
                    <label>Select PCV image:</label>
                    {rows}
                    <input type="submit" />
                </form>
            </div>
          </div>
        )}
}