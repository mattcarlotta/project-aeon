import FadeIn from "~components/Body/FadeIn";
import LoadingItem from "~components/Body/LoadingItem";
import UserContainer from "../UserContainer";

const LoadingUserCard = () => (
  <FadeIn>
    <UserContainer>
      <div css="display: flex;align-items: center;">
        <LoadingItem height="55px" margin="0 10px 0 0" width="55px" />
        <div css="display: flex;flex-direction: column;align-items: flex-start;">
          <LoadingItem height="20px" margin="0 0 5px 0" width="208px" />
          <LoadingItem height="15px" margin="0 0 5px 0" width="208px" />
          <LoadingItem height="10px" margin="0" width="208px" />
        </div>
      </div>
      <LoadingItem height="73px" margin="5px 0 0 0" width="273px" />
    </UserContainer>
  </FadeIn>
);

export default LoadingUserCard;
