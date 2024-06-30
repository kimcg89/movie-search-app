import { Component } from "../core/heropy";
import movieStore from '../store/movie'
import MovieItem from "./MovieItem";

export default class MovieList extends Component {
  constructor() {
    super()
    movieStore.subscribe('movies', () => {
      this.render()
    })
    movieStore.subscribe('loading', () => {
      this.render()
    })
    movieStore.subscribe('message', () => {
      this.render()
    })
  }
  render() {
    this.el.classList.add('movie-list')
    this.el.innerHTML = /* html */`
      ${movieStore.state.message 
        ? `<div class="message">${movieStore.state.message}</div>`
      : '<div class="movies"></div>'}
      <div class="the-loader hide"></div> 
    `

    const moviesEl = this.el.querySelector('.movies')
    moviesEl?.append( //옵셔널 체이닝 추가 : message의 movies class가가 null이 나올 수 있기 때문
      // 배열이므로 전개 연산자 ...을 앞에 두어야함
      ...movieStore.state.movies.map(movie => new MovieItem({
        movie
      }).el)
    )

    const loaderEl = this.el.querySelector('.the-loader')
    movieStore.state.loading 
    ? loaderEl.classList.remove('hide')
    : loaderEl.classList.add('hide')
  }
}