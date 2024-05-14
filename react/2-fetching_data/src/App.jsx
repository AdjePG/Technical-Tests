import './App.css'
import { useCatFact } from './hooks/useCatFact'
import { useCatImage } from './hooks/useCatImage'

export function App () {
  const { fact, getFact } = useCatFact()
  const { imageUrl } = useCatImage({ fact })

  const handleNewFact = async () => {
    getFact()
  }

  return (
    <main>
      <h1>Cats gallery</h1>
      <button onClick={handleNewFact}>Get new Fact</button>
      <section>
        {fact && <p>{fact}</p>}
        {imageUrl && <img src={imageUrl} alt={`Image extracted from the first word of '${fact}'`} />}
      </section>
    </main>
  )
}
