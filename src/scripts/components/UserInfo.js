export default class UserInfo {
  constructor({titleSelector, subtitleSelector, avatarSelector}) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileSubtitle = document.querySelector(subtitleSelector);
    this._profileAvatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return {
      'edit-title-input': this._profileTitle.textContent,
      'edit-subtitle-input': this._profileSubtitle.textContent
    }
  }

  setUserInfo({name, about, avatar}) {
    this._profileTitle.textContent = name;
    this._profileSubtitle.textContent = about;
    this._profileAvatar.src = avatar;
  }
}
