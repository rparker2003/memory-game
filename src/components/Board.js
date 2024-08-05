import React, { useState, useEffect } from 'react'
import Card from './Card'

export default function Board ({ cards, showingCards, setShowingCards, matchedCards, setMatchedCards }) {
  const [flippedCards, setFlippedCards] = useState([])

  // show the cards for 3 seconds at start
  // or when showingCards updated, aka reset game
  useEffect(() => {
    if (showingCards) {
      const timer = setTimeout(() => {
        setShowingCards(false)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [showingCards])

  // check matches found whenever flippedCards updated
  useEffect(() => {
    // if 2 cards have been flipped
    if (flippedCards.length === 2) {
      // maps the 2 cards in flipped array to vals
      const [firstCard, secondCard] = flippedCards

      // if the 2 cards have the same value
      if (firstCard.value === secondCard.value) {
        // update the matched cards list by appending new matched cards ids
        setMatchedCards((prev) => [...prev, firstCard.id, secondCard.id])
        // reset flipped cards
        setFlippedCards([])
      } else {
        // reset flipped cards after 1 sec delay as cards didn't match
        setTimeout(() => {
          setFlippedCards([])
        }, 1000)
      }
    }
  }, [flippedCards])

  const handleCardClick = (clickedCard) => {
    // less than 2 cards flipped
    // flipped cards doesn't already hold clicked card
    // card has not already been matched
    if (
      flippedCards.length < 2 &&
      !flippedCards.some((flippedCard) => flippedCard.id === clickedCard.id) &&
      !matchedCards.includes(clickedCard.id)
    ) {
      // append card id to prev flipped cards
      setFlippedCards((prev) => [...prev, clickedCard])
    }
  }

  return (
    <div className='board'>
      {cards.map((card) => (
        <Card
          key={card.id}
          card={{
            ...card,
            isFlipped:
              showingCards ||
              flippedCards.some((flippedCard) => flippedCard.id === card.id) ||
              matchedCards.includes(card.id)
          }}
          onClick={handleCardClick}
        />
      ))}
    </div>
  )
}
