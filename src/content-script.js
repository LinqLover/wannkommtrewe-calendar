const trackingServer = 'https://wannkommt.rewe.de'

;(() => {
  const trackingLabel = chrome.i18n.getMessage('trackingLabel')

  // 1) Grab your order-ID:
  const orderElem = document.querySelector('.rs-qa-fass-orderId')
  if (!orderElem) return
  const orderNumber = orderElem.textContent.trim()
  const trackingUrl = `${trackingServer}/${orderNumber}`

  // 2) Observe for the calendar-links menu popping into the DOM:
  const observer = new MutationObserver(() => {
    document
      .querySelectorAll('ul.fass-calendar-links-menu.open')
      .forEach(menu => {
        menu.querySelectorAll('a').forEach(a => {
          // A) Google Calendar
          if (a.href.includes('calendar.google.com/calendar/render')) {
            const url = new URL(a.href)
            const existing = url.searchParams.get('details') || ''
            url.searchParams.set(
              'details',
              existing + `\n\n${trackingLabel} ${trackingUrl}`
            )
            a.href = url.toString()
          }

          // B) .ics links (Outlook & Apple)
          if (a.href.includes('/aftersales/calendarfile/')) {
            a.addEventListener('click', async e => {
              e.preventDefault()
              // Fetch the raw ICS
              const resp = await fetch(a.href, { credentials: 'include' })

              // Pull out content type and filename
              const contentType = resp.headers.get('content-type') || 'text/calendar'
              const contentDisp = resp.headers.get('content-disposition') || ''
              let filename = 'delivery.ics'
              const cdMatch = contentDisp.match(/filename\*?=(?:UTF-8'')?["']?([^;"']+)/i)
              if (cdMatch) {
                filename = decodeURIComponent(cdMatch[1])
              } else {
                // fallback: grab last path segment
                const urlPath = new URL(a.href, location.href).pathname
                const parts = urlPath.split('/')
                if (parts[parts.length - 1]) {
                  filename = parts[parts.length - 1]
                }
              }

              // Inject tracking line into description
              let ics = await resp.text()
              ics = ics.replace(
                /^DESCRIPTION:(.*)$/m,
                `$&\\n\\n${trackingLabel} ${trackingUrl}`
              )
              
              // Trigger download of modified ICS
              const blob = new Blob([ics], { type: contentType })
              const blobUrl = URL.createObjectURL(blob)
              const dl = document.createElement('a')
              dl.href = blobUrl
              dl.download = filename
              document.body.appendChild(dl)
              dl.click()
              dl.remove()
              URL.revokeObjectURL(blobUrl)
            })
          }
        })
      })
  })

  observer.observe(document.body, { childList: true, subtree: true })
})()
