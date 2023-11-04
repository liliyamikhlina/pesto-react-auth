import React, { useState, useEffect } from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import PopupWithForm from "./PopupWithForm";
import ImagePopup from "./ImagePopup";
import api from "../utils/api";
import CurrentUserContext from "../contexts/CurrentUserContext";

function App() {
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});

  const handleEditAvatarClick = () => {
    setIsEditAvatarPopupOpen(true);
  };

  const handleEditProfileClick = () => {
    setIsEditProfilePopupOpen(true);
  };

  const handleAddPlaceClick = () => {
    setIsAddPlacePopupOpen(true);
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleDeleteClick = () => {
    api.deleteCard(currentUser.id);
  };

  const closeAllPopups = () => {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setSelectedCard(null);
  };

  useEffect(() => {
    api
      .getUserInfo()
      .then((userInfo) => {
        setCurrentUser(userInfo);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="root">
        <div className="page">
          <Header />
          <Main
            onEditAvatar={handleEditAvatarClick}
            onEditProfile={handleEditProfileClick}
            onAddPlace={handleAddPlaceClick}
            handleCardClick={handleCardClick}
            handleDeleteClick={handleDeleteClick}
          />
          <Footer />

          <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            children={
              <>
                <input
                  className="popup__input"
                  id="input-name"
                  type="text"
                  name="name"
                  placeholder="Ваше имя"
                  minLength="2"
                  maxLength="40"
                  required
                ></input>
                <span className="popup__input-error input-name-error"></span>
                <input
                  className="popup__input"
                  id="input-job"
                  type="text"
                  name="job"
                  placeholder="О себе"
                  minLength="2"
                  maxLength="200"
                  required
                ></input>
                <span className="popup__input-error input-job-error"></span>{" "}
              </>
            }
            buttonLabel="Сохранить"
          />

          <PopupWithForm
            name="card"
            title="Новое Место"
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            children={
              <>
                <input
                  className="popup__input"
                  id="input-place"
                  type="text"
                  name="place"
                  placeholder="Название"
                  minLength="2"
                  maxLength="30"
                  required
                ></input>
                <span className="popup__input-error input-place-error"></span>
                <input
                  className="popup__input"
                  id="input-link"
                  type="url"
                  name="link"
                  placeholder="Ссылка на картинку"
                  required
                ></input>
                <span className="popup__input-error input-link-error"></span>{" "}
              </>
            }
            buttonLabel="Создать"
          />

          <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            children={
              <>
                <input
                  className="popup__input"
                  id="input-avatar"
                  type="url"
                  name="link"
                  placeholder="Ссылка на картинку"
                  required
                ></input>
                <span className="popup__input-error input-avatar-error"></span>
              </>
            }
            buttonLabel="Сохранить"
          />

          <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        </div>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
