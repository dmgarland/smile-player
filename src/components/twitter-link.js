import React from 'react'

const TwitterLink = ({ children, text, url, via }) => <a className="twitter-share-button" data-url={url} data-via={via} data-text={text} href="https://twitter.com/intent/tweet">{children}</a>

export default TwitterLink
