const API_FACT_ENDPOINT = 'https://catfact.ninja/fact'

export const getNewFact = async () => {
  const res = await fetch(API_FACT_ENDPOINT)
  const data = await res.json()
  return data.fact
}
