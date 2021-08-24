import Link from 'next/link'
import Head from 'next/head'

export default function Home() {
  return (
        <div className="grid grid-rows-2 h-screen w-screen bg-gray-300 place-items-center">
            <h1 className="font-sans font-semibold text-5xl">PCV VIEWER</h1>
            <div className="grid grid-cols-4 grid-rows-2 bg-gray-300 w-full h-full place-items-center">
                <span/>
                <Link href="/upload">
                    <button className="rounded-lg border-2 border-red-600 p-5 w-40 text-3xl"><p>Upload</p></button>
                </Link>
                <Link href="/view">
                    <button className="rounded-lg border-2 border-red-600 p-5 w-40 text-3xl"><p>View</p></button>
                </Link>
                <span/>
            </div>
        </div>
  )
}
