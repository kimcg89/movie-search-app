import { Store } from'../core/heropy'

const store = new Store({
  searchText: '',
  page:1,
  pageMax: 1,
  movies: [],
  movie: {}, //영화 상세 정보
  loading: false,
  message: 'Search for the movie title!'
})

export default store
export const searchMovies = async page => {
  //loading animation 시작
  store.state.loading = true
  store.state.page = page
  if (page ===1) { // 새로 검색 할 경우 1page로 이동
    store.state.movies = []
    store.state.message = ''
  }
  // 예외 처리 코드 추가
  try {
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&s=${store.state.searchText}&page=${page}`) //연습용 apiKey
    const { Search, totalResults, Response, Error } = await res.json()
    if (Response === 'True') {
      store.state.movies = [
        ...store.state.movies, //1page 정보
        ...Search //다음 page 정보
      ]
      // 올림 처리
      store.state.pageMax = Math.ceil(Number(totalResults) / 10)
    } else {
      store.state.message = Error
      store.state.pageMax = 1 //pageMax값이 2 이상일 때 목록을 가져오지 못하면 초기화
    }
  } catch (error) {
    console.log('searchMovies error:', error)
  } finally {
    // loading animation 종료
    store.state.loading = false
  }
}
export const getMovieDetails = async id => {
  try {
    // i parameter는 영화의 id의 정보, plot은 전체 줄거리
    const res = await fetch(`https://omdbapi.com?apikey=7035c60c&i=${id}&plot=full`)
    store.state.movie = await res.json()
  } catch (error) {
    console.log('getMovieDetails error:', error)
  }
}