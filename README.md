## 프로젝트 목적

Web Client for Instaclone built with React, Apollo, Styled Components and more!

## 설치

<details>
<summary>styled-components 설치 </summary>
  
```Shell
npm i styled-components
```
</details>

<details>
<summary>React Hook Form 설치 </summary>
  
```Shell
npm i react-hook-form
```
</details>

<details>
<summary>React Router 설치 </summary>
  
```Shell
npm i react-router-dom
```
</details>

<details>
<summary>Apollo Client, graphql 설치 </summary>
  
```Shell
npm i @apollo/client graphql
```
</details>

<details>
<summary>react-helmet-async 설치 </summary>
  
```Shell
npm i react-helmet-async
```
</details>

<details>
<summary>react-fontawesomec 설치 </summary>
  
```Shell
npm i --save @fortawesome/fontawesome-svg-core
npm install --save @fortawesome/free-solid-svg-icons
npm install --save @fortawesome/react-fontawesome
npm install --save @fortawesome/free-brands-svg-icons
npm install --save @fortawesome/free-regular-svg-icons
```
</details>

<details>
<summary>styled-reset 설치 </summary>
  
```Shell
npm i styled-reset
```
</details>

## React Router
- url들을 가져와서, 각 url에 맞는 component를 연결 시켜줌.
- 사용법
```javascript
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

export default function App() {
  return (
    <Router>
        // Switch는 한번에 딱 하나의 route만 render 시킨다.
        // Switch를 쓰지 않으면 router는 많은 route를 동시에, 최대로 render한다.
        <Switch>
            // exact : url이 정확히 맞는지 확인
            // path="/"에 exact를 쓰지 않으면 path에 "/"이 포함된 모든 화면은 path="/"인 Home 화면을 출력한다.
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/users">
              <Users />
            </Route>
            // 지정되지 않은 path는 NotFound 페이지로 넘어간다.
            <Route>
              <NotFound />
            </Route>
        </Switch>
    </Router>
  )
}
```

## Apollo Client
- Reactive variables : Apollo Client 캐시 외부에 로컬 상태를 저장
  - 사용법
  ```javascript
    import {makeVar} from "@apollo/client";

    //makeVar(초기값);
    export const itemVar = makeVar(false);

    // output
    itemVar();
  ``` 
  [apllo.js]

    - react.js component 내부에서 사용할 시 **useReactiveVar** hook 사용
  ```js
    import {itemVar} from "./apllo.js";
    import {useReactiveVar} from "@apollo/client";

    function App() {
        // 호출
        const item = useReactiveVar(itemVar);
        // itemVar 수정
        itemVar(true);
    }

  ```

## setup
-   [x] Router
-   [x] Authentication
-   [x] Arch.
-   [x] Styles
-   [x] Log In / Sign Up
