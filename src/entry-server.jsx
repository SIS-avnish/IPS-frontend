import React from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App.jsx'

export function render(url = '/', context = {}, prefetchData = null) {
  return renderToString(
    <StaticRouter location={url} context={context}>
      <App initialServerState={prefetchData} />
    </StaticRouter>
  )
}
