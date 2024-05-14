import { useEffect, useState } from 'react'

export function useCatImage ({ fact }) {
  const [imageUrl, setImageUrl] = useState()

  useEffect(() => {
    if (!fact) return

    const firstWordFact = fact.split(' ')[0]
    console.log(`https://cataas.com/cat/says/${firstWordFact}?json=true`)

    fetch(`https://cataas.com/cat/says/${firstWordFact}?json=true`)
      .then(res => res.json())
      .then(data => setImageUrl(`https://cataas.com/cat/${data._id}/says/${firstWordFact}?fontColor=red`))
  }, [fact])

  return { imageUrl }
}
