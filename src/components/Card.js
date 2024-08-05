import React from 'react'

export default function Card ({ card, onClick }) {
  // ternary on class name to give flipped card different css, on click call on click
  //  card inner
  //    ternary on card flipped state to show value of card or nothing
  return (
    <div className={`card ${card.isFlipped ? 'flipped' : ''}`} onClick={() => onClick(card)}>
      <div className='card-inner'>
        <div className='card-front' />
        <div className='card-back'>
          {card.isFlipped ? card.value : ''}
        </div>
      </div>
    </div>
  )
}
