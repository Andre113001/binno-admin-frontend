import React from 'react'

function DynamicHeading({content, className}) {
  return (
    <div>
        <p className={className}  dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  )
}

export default DynamicHeading
