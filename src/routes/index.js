import { createRouter } from '../core/heropy'
import Home from './Home'
import Movie from  './Movie'
import About from  './About'
import NotFound from './NotFound'

export default createRouter([
  { path: '#/', component: Home },
  { path: '#/movie', component: Movie},
  { path: '#/about', component: About},
  // .의 의미는 일치한다, 아래는 0개 이상 일치 한다는 뜻
  // 위의 3개 페이지가 다 안되면 NotFound를 보여줌
  { path: '.*', component: NotFound}
])