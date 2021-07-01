import AuthLayout from "../components/auth/AuthLayout";
import FormBox from "../components/auth/FormBox";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram } from "@fortawesome/free-brands-svg-icons";
import Input from "../components/auth/Input";
import Button from "../components/auth/Button";
import BottomBox from "../components/auth/BottomBox";
import routes from "./routes";
import styled from "styled-components";
import { FatLink } from "../components/shared";

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Subtitle = styled(FatLink)`
  font-size: 17px;
  text-align: center;
  margin-top: 10px;
`;

function SignUp() {
  return (
    <AuthLayout>
      <FormBox>
        <HeaderContainer>
          <FontAwesomeIcon icon={faInstagram} size="3x" />
          <Subtitle>친구들의 사진과 동영상을 보려면 가입하세요.</Subtitle>
        </HeaderContainer>
        <form>
          <Input type="text" placeholder="Email" required />
          <Input type="text" placeholder="Name" required />
          <Input type="text" placeholder="Username" required />
          <Input type="password" placeholder="Password" required />
          <Button type="submit" value="Sign up" />
        </form>
      </FormBox>
      <BottomBox cta="Have an account?" linkText="Log in" link={routes.home} />
    </AuthLayout>
  );
}

export default SignUp;
