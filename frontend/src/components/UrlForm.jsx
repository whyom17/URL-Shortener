import { useState } from 'react'
import { createShortUrl } from '../api/short_url.api'

const UrlForm = () => {
  const [url, setUrl] = useState('')
  const [shortUrl, setShortUrl] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)
  
  const shorten = async () => {
    const shortUrl = await createShortUrl(url);
    setShortUrl(shortUrl);
  }

  const handleCopy = async () => {
      if (!shortUrl) return
      try {
          await navigator.clipboard.writeText(shortUrl)
          setCopied(true)
          setTimeout(() => setCopied(false), 3000)
        } catch (err) {
            setError('Copy failed')
            throw err;
        }
    }

  return (
    <>
        <form className="space-y-4">
          <div>
            <label className="sr-only">URL</label>
            <input
              className="w-full rounded-md bg-[rgba(255,255,255,0.02)] border border-gray-800 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-600"
              placeholder="https://example.com/very/long/link"
              value={url}
              onInput={(e) => setUrl(e.target.value)}
              type="url"
              inputMode="url"
              />
            {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
          </div>

          <div className="flex gap-3">
            <button
              onClick={shorten}
              type="submit"
              className="flex-1 bg-purple-600 hover:bg-purple-700 active:bg-purple-800 text-white font-semibold rounded-md px-4 py-2 disabled:opacity-60"
              >
              Shorten
            </button>
            <button
              type="button"
              onClick={() => { setUrl(''); setShortUrl(''); setError('') }}
              className="bg-transparent border border-gray-700 text-gray-200 rounded-md px-4 py-2 hover:bg-[rgba(255,255,255,0.02)]"
              >
              Clear
            </button>
          </div>
        </form>

        <div className="mt-6">
          <h2 className="text-sm text-gray-400 mb-2">Result</h2>
          <div className="w-full bg-[rgba(0,0,0,0.25)] border border-gray-800 rounded-md p-3 flex items-center justify-between">
            <div className="truncate pr-4">
              {shortUrl ? (
                  <a className="text-blue-300 hover:underline" href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
                ) : (
                    <span className="text-gray-500">Your short URL will appear here.</span>
                )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopy}
                disabled={!shortUrl}
                className={`text-sm px-3 py-1 rounded-md border border-gray-700 hover:bg-[rgba(255,255,255,0.04)] ${copied ? 'bg-green-600 text-white cursor-default' : 'text-gray-300'}`}
                >
                {
                copied 
                ? 'Copied' 
                : 'Copy'
                }
              </button>
            </div>
          </div>
        </div> 
</>
)
}

export default UrlForm