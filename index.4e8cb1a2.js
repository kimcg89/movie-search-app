class e{constructor(e={}){let{tagName:t="div",props:s={},state:a={}}=e;this.el=document.createElement(t),this.props=s,this.state=a,this.render()}render(){}}function t(e){location.hash||history.replaceState(null,"","/#/");let t=document.querySelector("router-view"),[s,a=""]=location.hash.split("?"),i=a.split("&").reduce((e,t)=>{let[s,a]=t.split("=");return e[s]=a,e},{});history.replaceState(i,"");let r=e.find(e=>RegExp(`${e.path}/?$`).test(s));t&&(t.innerHTML="",r&&t.append(new r.component().el)),window.scrollTo(0,0)}class s{constructor(e){for(let t in this.state={},this.observers={},e)Object.defineProperty(this.state,t,{get:()=>e[t],set:s=>{e[t]=s,Array.isArray(this.observers[t])&&this.observers[t].forEach(e=>e(s))}})}subscribe(e,t){Array.isArray(this.observers[e])?this.observers[e].push(t):this.observers[e]=[t]}}class a extends e{constructor(){super({tagName:"header",state:{menus:[{name:"Search",href:"#/"},{name:"Movie",href:"#/movie?id=tt4520988"},{name:"About",href:"#/about"}]}}),window.addEventListener("popstate",()=>{this.render()})}render(){this.el.innerHTML=`
      <a 
        href="#/" 
        class="logo">
        <span>OMDbAPI</span>.COM
      </a>
      <nav>
        <ul>
          ${this.state.menus.map(e=>{let t=e.href.split("?")[0],s=location.hash.split("?")[0];return`
              <li>
                <a 
                  class="${t===s?"active":""}"
                  href="${e.href}">
                  ${e.name}
                </a>
              </li>
            `}).join("")}
        </ul>
      </nav>
      <a href="#/about" class="user">
          <img src="https://heropy.blog/css/images/logo.png" alt="User" />
      </a>
    `}}var i,r=new s({photo:"https://heropy.blog/css/images/logo.png",name:"kimcg / kim chang gyu",email:"kimcg89@naver.com",blog:"https://www.mesa.kr/",github:"https://github.com/ParkYoungWoong",repository:"https://github.com/ParkYoungWoong/vanillajs-movie-app"});class n extends e{constructor(){super({tagName:"footer"})}render(){let{github:e,repository:t}=r.state;this.el.innerHTML=`
      <div>
        <a href="${t}">
          GitHub Repository
        </a>
        
      </div>
      <div>
        <a href="${e}">
          ${new Date().getFullYear()}
          Kimcg
        </a>
      </div>
    `}}class o extends e{render(){this.el.classList.add("headline"),this.el.innerHTML=`
      <h1>
        <span>OMDb API</span> <br />
        THE OPEN <br />
        MOVIE DATABASE
      </h1>
      <p>
        The OMDb API is a RESTful web service to obtain movie information,
        all content and images on the site are contributed and maintained by our users. <br />
        If you find this service useful, please consider making a one-time donation or become a patron.
      </p>
    `}}const l=new s({searchText:"",page:1,pageMax:1,movies:[],movie:{},loading:!1,message:"Search for the movie title!"}),d=async e=>{l.state.loading=!0,l.state.page=e,1===e&&(l.state.movies=[],l.state.message="");try{let t=await fetch("/api/movie",{method:"POST",body:JSON.stringify({title:l.state.searchText,page:e})}),{Search:s,totalResults:a,Response:i,Error:r}=await t.json();"True"===i?(l.state.movies=[...l.state.movies,...s],l.state.pageMax=Math.ceil(Number(a)/10)):(l.state.message=r,l.state.pageMax=1)}catch(e){console.log("searchMovies error:",e)}finally{l.state.loading=!1}},c=async e=>{try{let t=await fetch("/api/movie",{method:"POST",body:JSON.stringify({id:e})});l.state.movie=await t.json()}catch(e){console.log("getMovieDetails error:",e)}};class h extends e{render(){this.el.classList.add("search"),this.el.innerHTML=`
    <input 
    value="${l.state.searchText}"
    placeholder="Enter the movie title to search!" />
    <button class="btn btn-primary">
      Search!
    </button>
    `;let e=this.el.querySelector("input");e?.addEventListener("input",()=>{l.state.searchText=e.value}),e?.addEventListener("keydown",e=>{"Enter"===e.key&&l.state.searchText.trim()&&d(1)});let t=this.el.querySelector(".btn");t?.addEventListener("click",()=>{l.state.searchText.trim()&&d(1)})}}class p extends e{constructor(e){super({props:e,tagName:"a"})}render(){let{movie:e}=this.props;this.el.setAttribute("href",`#/movie?id=${e.imdbID}`),this.el.classList.add("movie"),this.el.style.backgroundImage=`url(${e.Poster})`,this.el.innerHTML=`
    <div class="info">
      <div class="year">
        ${e.Year}
      </div>
      <div class="title">
        ${e.Title}
      </div>
    </div>
    `}}class v extends e{constructor(){super(),l.subscribe("movies",()=>{this.render()}),l.subscribe("loading",()=>{this.render()}),l.subscribe("message",()=>{this.render()})}render(){this.el.classList.add("movie-list"),this.el.innerHTML=`
      ${l.state.message?`<div class="message">${l.state.message}</div>`:'<div class="movies"></div>'}
      <div class="the-loader hide"></div> 
    `;let e=this.el.querySelector(".movies");e?.append(...l.state.movies.map(e=>new p({movie:e}).el));let t=this.el.querySelector(".the-loader");l.state.loading?t?.classList.remove("hide"):t?.classList.add("hide")}}class m extends e{constructor(){super({tagName:"button"}),l.subscribe("pageMax",()=>{let{page:e,pageMax:t}=l.state;t>e?this.el.classList.remove("hide"):this.el.classList.add("hide")})}render(){this.el.classList.add("btn","view-more","hide"),this.el.textContent="View more..",this.el.addEventListener("click",async()=>{this.el.classList.add("hide"),await d(l.state.page+1)})}}var u=(i=[{path:"#/",component:class extends e{render(){let e=new o().el,t=new h().el,s=new v().el,a=new m().el;this.el.classList.add("container"),this.el.append(e,t,s,a)}}},{path:"#/movie",component:class extends e{async render(){this.el.classList.add("container","the-movie"),this.el.innerHTML=`
      <div class="poster skeleton"></div>
      <div class="specs">
        <div class="title skeleton"></div>
        <div class="labels skeleton"></div>
        <div class="plot skeleton"></div>
      </div>
    `,await c(history.state.id),console.log(l.state.movie);let{movie:e}=l.state,t=e.Poster.replace("SX300","SX700");this.el.innerHTML=`
      <div 
        style="background-image: url(${t})" 
        class="poster"></div>
      <div class="specs">
        <div class="title">
          ${e.Title}
        </div>
        <div class="labels">
          <span>${e.Released}</span>
          &nbsp;/&nbsp;  
          <span>${e.Runtime}</span>
          &nbsp;/&nbsp;  
          <span>${e.Country}</span>
        </div>
        <div class="plot">
          ${e.Plot}
        </div>
        <div>
          <h3>Ratings</h3>
          ${e.Ratings.map(e=>`<p>${e.Source} - ${e.Value}</p>`).join("")}
        </div>
        <div>
          <h3>Actors</h3>
          <p>${e.Director}</p>
        </div>
        <div>
          <h3>Production</h3>
          <p>${e.Production}</p>
        </div>
        <div>
          <h3></h3>
          <p></p>
        </div>
        <div>
          <h3>Genre</h3>
          <p>${e.Genre}</p>
        </div>
      </div>
    `}}},{path:"#/about",component:class extends e{render(){let{photo:e,name:t,email:s,github:a,blog:i}=r.state;this.el.classList.add("container","about"),this.el.innerHTML=`
      <div 
        style="background-image: url(${e})" 
        class="photo">
      </div>
      <p class="name">${t}</p>
      <p>
        <a 
          href="https://mail.google.com/mail/?view=cm&fs=1&to=${s}" target="_blank">
          ${s}
        </a>
      </p>
      <p><a href="${a}" target="_blank">GitHub</a></p>
      <p><a href="${i}" target="_blank">Blog</a></p>
    `}}},{path:".*",component:class extends e{render(){this.el.classList.add("container","not-found"),this.el.innerHTML=`
      <h1>
        Sorry, <br />
        Page Not Found
      </h1>
    `}}}],function(){window.addEventListener("popstate",()=>{t(i)}),t(i)});const g=document.querySelector("#root");g?.append(new class extends e{render(){let e=new a().el,t=new n().el,s=document.createElement("router-view");this.el.append(e,s,t)}}().el),u();
//# sourceMappingURL=index.4e8cb1a2.js.map
