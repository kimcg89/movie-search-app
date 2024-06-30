import { Component } from "../core/heropy";

export default class TheHeader extends Component {
  constructor() {
    super({
      tagName: 'header',
      state: {
        menus: [
          {
            name: 'Search',
            href: '#/'
          },
          {
            name: 'Movie',
            href: '#/movie?id=tt4520988'
          },
          {
            name: 'About',
            href: '#/about'
          }
        ]
      }
    })
    // page가 바귈떄 마다 동작 popstate
    window.addEventListener('popstate', () => {
      this.render()
    })
  }
  render() {
    this.el.innerHTML = /* html */`
      <a 
        href="#/" 
        class="logo">
        <span>OMDbAPI</span>.COM
      </a>
      <nav>
        <ul>
          ${this.state.menus.map(menu => {
            // a 태그에 active class를 추가
            // 쿼리스트링을 제거해야함 split으로 0번째 내용만 보이게 함
            const href = menu.href.split('?')[0]
            const hash = location.hash.split('?')[0]
            const isActive = href === hash
            return /* html */ `
              <li>
                <a 
                  class="${isActive ? 'active' : ''}"
                  href="${menu.href}">
                  ${menu.name}
                </a>
              </li>
            `
          }).join('')}
        </ul>
      </nav>
      <a href="#/about" class="user">
          <img src="https://heropy.blog/css/images/logo.png" alt="User" />
      </a>
    `
  }
}