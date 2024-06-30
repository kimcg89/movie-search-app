import { Component } from "./core/heropy";
import TheHeader from "./components/TheHeader";
import TheFooter from "./components/TheFooter";

export default class App extends Component {
  render() {
    // Header는 항상 위에 있어야 하니 routerView와 별개로 먼저 뜨도록 설정
    const theHeader = new TheHeader().el;
    const theFooter = new TheFooter().el;
    const routerView = document.createElement("router-view");

    this.el.append(
      theHeader,
      routerView,
      theFooter
    );
  }
}
