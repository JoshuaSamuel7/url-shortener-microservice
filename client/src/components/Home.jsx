import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {
    const url=useSelector((state=>state.url))
    const handleSubmit=()=>{

    }
  return (
    <div className="shortener-form">
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter short url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button type="submit">Redirect</button>
      </form>
      {shortUrl && (
        <p>
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </p>
      )}
    </div>
  )
}
