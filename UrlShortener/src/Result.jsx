import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CopyToClipboard from 'react-copy-to-clipboard';

const Result = ({ inputVal }) => {
  const [shortlink, setShortlink] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!inputVal) return;

    const fetchData = async () => {
      try {
        setLoading(true);

        // Trim whitespace from input
        const trimmedUrl = inputVal.trim();

        // Test Method 1: Using encodeURIComponent (if your URLs are raw user-entered)
        // const encodedUrl = encodeURIComponent(trimmedUrl);

        // CleanURI expects raw URL in POST form data (URL-encoded internally)
        const params = new URLSearchParams();
        params.append('url', trimmedUrl); // Don’t use encodedUrl unless API demands

        const res = await axios.post(
          'https://cleanuri.com/api/v1/shorten',
          params,
          { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }
        );

        setShortlink(res.data.result_url);
        setError(false);
      } catch (err) {
        console.error("Error shortening URL:", err);
        setError(true);
        setShortlink("");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [inputVal]);

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [copied]);

  return (
    <>
      {loading && <p>Loading...</p>}
      {error && (
        <p style={{ color: 'red' }}>
          Failed to shorten URL. Make sure it's a valid link like https://example.com
        </p>
      )}
      {shortlink && (
        <div className='result'>
          <p>{shortlink}</p>
          <CopyToClipboard text={shortlink} onCopy={() => setCopied(true)}>
            <button className={copied ? "copied" : ""}>
              {copied ? "Copied!" : "Copy to clipboard"}
            </button>
          </CopyToClipboard>
        </div>
      )}
    </>
  );
};

export default Result;
