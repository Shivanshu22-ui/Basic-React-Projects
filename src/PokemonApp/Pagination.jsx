import React from 'react'

export default function Pagination({nextPage,prevPage}) {
  return (
    <div>
       {prevPage && <button onClick={prevPage} >Previous</button>}
        <button onClick={nextPage}>Next</button>
    </div>
  )
}
