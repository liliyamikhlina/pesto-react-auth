import React, { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onDeleteClick }) {
  const currentUser = useContext(CurrentUserContext);
  const isOwn = card.owner._id === currentUser._id;
  const isLiked = card.likes.some(i => i._id === currentUser._id);

  function handleClick() {
    onCardClick(card);
  }

  const handleDeleteClick = () => {
    onDeleteClick(card);
  };

  return (
    <div className="card" onClick={handleClick}>
      {isOwn && (
        <button
          className={`card__trash ${isOwn ? "card__trash_active" : ""}`}
          type="button"
          onClick={handleDeleteClick}
        ></button>
      )}
      <img className="card__image" src={card.link} alt={card.name}></img>
      <div className="card__box">
        <h2 className="card__title">{card.name}</h2>
        <div className="card__like-box">
          <button className={`card__like ${isLiked ? "card__like_active" : ""}`} type="button"></button>
          <p className="card__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </div>
  );
}

export default Card;
