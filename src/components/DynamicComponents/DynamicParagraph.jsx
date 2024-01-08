import React from 'react'

function DynamicParagraph({content, className}) {
  return (
    <div>
        <p className={className}  dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default DynamicParagraph
