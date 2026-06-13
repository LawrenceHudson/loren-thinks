import { Fragment } from 'react'

/**
 * Renders a headline string where *asterisk-wrapped* words become amber italic
 * and "\n" line breaks become <br>. Used for the editable hero headline.
 */
export function Headline({ text }: { text: string }) {
  const lines = text.split('\n')
  return (
    <>
      {lines.map((line, li) => (
        <Fragment key={li}>
          {li > 0 && <br />}
          {renderEmphasis(line)}
        </Fragment>
      ))}
    </>
  )
}

function renderEmphasis(line: string) {
  // Split on *...* segments, keeping the delimiters out of the result.
  const parts = line.split(/(\*[^*]+\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
      return (
        <em className="amber-italic" key={i}>
          {part.slice(1, -1)}
        </em>
      )
    }
    return <Fragment key={i}>{part}</Fragment>
  })
}
