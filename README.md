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
- 사용법
    ```javascript
        import {
            ApolloClient,
            InMemoryCache,
            ApolloProvider,
            useQuery,
            gql
        } from "@apollo/client";

        const client = new ApolloClient({
            // backend url
            uri: 'https://48p1r2roz4.sse.codesandbox.io',
            cache: new InMemoryCache()
        });
    ```
  [apllo.js]

  - ApolloPorovider로 감싸 줘야한다.
    ```javascript
        import { ApolloProvider } from "@apollo/client";
        import {client} from "./apollo.js";

        function App() {
        <ApolloProvider client={client}>
            ...
        </ApolloProvider>
        }
    ```
  - Apollo Client에 사용자 지정 링크 추가 (Http 요청 전 헤더 추가)
    ```javascript
        import { ApolloClient, HttpLink, ApolloLink, InMemoryCache, concat } from '@apollo/client';
        import { setContext } from "@apollo/client/link/context";   


        const httpLink = new HttpLink({ uri: 'https://48p1r2roz4.sse.codesandbox.io' });

        const authLink = setContext((_,{ headers = {} }) => {
            return {
                headers: {
                ...headers,
                authorization: localStorage.getItem('token') || null,
                }
            };
        });
        
        const client = new ApolloClient({
            link: authLink.concat(httpLink),
            cache: new InMemoryCache(),
        });    
    ```
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

    - react.js component 내부에서 사용할 시 ```useReactiveVar``` hook 사용
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

## Styled Components
- 사용법
    ```javascript
    import styled from "styled-components";

    const Container = styled.div`
        background-color: white;
        ...
    `;

    function App() {
        return (
            <Container>...</Container>
        )
    }
    ```  
  - ThemeProvider : 기본적으로 theme을 제공한다. ThemeProvider로 감싸면 하위 components들은 theme prop를 가진다.
  - GlobalStyle : 전체적으로 들어가야 할 style 적용
  - reset : css를 reset 시켜준다.
    ```javascript
    import styled,{ThemeProvider, createGlobalStyle} from "styled-components";
    import reset from "styled-reset";


    const Button = styled.div`
        color: ${props => props.theme.fontColor};
        ...
    `;

    const GlobalStyles = createGlobalStyle`
        ${rest}
        body {
            backgrodn-color : black;
            ...
        }
        form {
            ...
        }
        p {
            ...
        }
    `;

    const theme = {
        fontColor : "black",
    }

    function App() {
        return (
            <ThemeProvider theme={theme}>
                <GlobalStyles />
                <Button>...</Button>
            </ThemeProvider>
        )
    }
    ```

## React-Hook-Form
- 사용법
    ```javascript
    import { useForm } from "react-hook-form";

    export default function App() {
        const { register, handleSubmit, watch, formState: { errors } } = useForm({
             // "onChange | onBlur | onSubmit | onTouched | all = 'onSubmit'"
            mode:"onChange" 

            // 개별로 지정 할 수도 있고 한번에 지정 할 수도 있다. 
            defaultValues: {
                test:"test"
            },
            ...
        });
        const onSubmit = data => console.log(data)
        return (
            <form onSubmit={handleSubmit(onSubmit)}>
                <input  {...register("test"), {required:true}} />
                <input defaultValue="test2" {...register("test2"), {required:"test2 is required"}} />
                {{errors?.test2?.message}}
            </form>
        )

    }
    ```

## setup
-   [x] Router
-   [x] Authentication
-   [x] Arch.
-   [x] Styles
-   [x] Log In / Sign Up
