import { useState, useEffect } from 'react'
import Confetti from 'react-confetti'
import Board from './components/Board'

const shuffleArray = (array) => {
  // Fisher-Yates Shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

const generateCards = () => {
  // given constant card values, make pairs of A0, A2, B1, B2, ...
  const cardValues = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N']
  const cards = cardValues.flatMap(value => [
    { id: `${value}0`, value, isFlipped: false },
    { id: `${value}1`, value, isFlipped: false }
  ])

  return shuffleArray(cards)
}

export default function App () {
  // generate cards
  const [cards, setCards] = useState(generateCards())
  const [showingCards, setShowingCards] = useState(true)
  const [showConfetti, setShowConfetti] = useState(false)
  const [matchedCards, setMatchedCards] = useState([])

  // show confetti when someone wins
  useEffect(() => {
    // Check if all cards are matched
    if (cards.every(card => matchedCards.includes(card.id))) {
      setShowConfetti(true)
      // Hide confetti after 5 seconds
      const timer = setTimeout(() => {
        setShowConfetti(false)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [cards, matchedCards])

  const resetGame = () => {
    setCards(generateCards())
    setShowingCards(true)
    setShowConfetti(false)
    setMatchedCards([])
  }

  // title
  // board with cards
  // button to reset game which will generate cards
  return (
    <div className='app'>
      <h1>Memory Matching Game</h1>
      <Board
        cards={cards}
        showingCards={showingCards}
        setShowingCards={setShowingCards}
        matchedCards={matchedCards}
        setMatchedCards={setMatchedCards}
      />
      <button onClick={resetGame}>Reset Game</button>
      {showConfetti && <Confetti />}
    </div>
  )
}
