import styled from "styled-components";
import { BaseBox } from "../shared";

// BaseBox css 상속
const Container = styled(BaseBox)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 35px 40px 25px 40px;
    margin-bottom: 10px;
    form {
        margin-top: 35px;
        width: 100%;
        display: flext;
        justify-content: center;
        flex-direction: center;
        align-items: center;
    }
`;

function FormBox({children}) {
    return <Container>{children}</Container>
}

export default FormBox