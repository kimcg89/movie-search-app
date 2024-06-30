import { Component } from "../core/heropy";

export default class MovieItem extends Component {
  constructor(props) {
    super({
      props,
      tagName:'a'
    })
  }
  render() {
    const { movie } = this.props //console에서 어떠한 데이터가 오는지 확인

    this.el.setAttribute('href', `#/movie?id=${movie.imdbID}`)
    this.el.classList.add('movie')
    this.el.style.backgroundImage = `url(${movie.Poster})` //image로 가져오면 크기가 달라 깨질수 있어서 backgroundImage로 가져옴
    this.el.innerHTML = /* html */`
    <div class="info">
      <div class="year">
        ${movie.year}
      </div>
      <div class="title">
        ${movie.Title}
      </div>
    </div>
    `
  }
}