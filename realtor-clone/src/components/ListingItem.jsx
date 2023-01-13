import React from 'react'

export default function ListingItem({id, listing}) {
  return (
    <div>
      {id}
      {listing.name}
    </div>
  )
}
