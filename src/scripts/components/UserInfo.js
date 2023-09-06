export default class UserInfo {
  constructor({titleSelector, subtitleSelector}) {
    this._profileTitle = document.querySelector(titleSelector);
    this._profileSubtitle = document.querySelector(subtitleSelector);
  }

  getUserInfo() {
    return {
      title: this._profileTitle.textContent,
      subtitle: this._profileSubtitle.textContent
    }
  }

  setUserInfo(title, subtitle) {
    this._profileTitle.textContent = title;
    this._profileSubtitle.textContent = subtitle;
  }
}
