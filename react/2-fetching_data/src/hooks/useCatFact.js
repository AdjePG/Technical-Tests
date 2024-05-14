import { useEffect, useState } from 'react'
import { getNewFact } from '../services/facts'

export function useCatFact () {
  const [fact, setFact] = useState()

  const getFact = () => {
    getNewFact().then(newFact => setFact(newFact))
  }

  useEffect(() => {
    getFact()
  }, [])

  return { fact, getFact }
}
