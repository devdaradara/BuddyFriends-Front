import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";

const ModalWrapper = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #f9dcc4;
  padding: 20px;
  border-radius: 40px;
  z-index: 999;
  width: 1100px;
  height: 560px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 30px;
  right: 30px;
  cursor: pointer;
  background: none;
  border: none;
  font-size: 20px;
  font-family: "SCDream5";
`;

const Content = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  flex-direction: column;
  margin-left: 30px;
`;

const DateContainer = styled.div`
  display: flex;
  margin-bottom: 40px;
  margin-top: 10px;
`;

const SmallIcon = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 0px;
  margin-right: 10px;
`;

const ProfileText = styled.div`
  font-size: 24px;
  font-family: "SCDream4";
`;

const TitleContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
`;

const TitleContent = styled.div`
  font-size: 28px;
  font-family: "SCDream7";
`;

const Underline = styled.div`
  height: 1px;
  width: 1000px;
  background-color: black;
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const LeftContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 30px;
  margin-right: 50px;
  margin-top: 50px;
`;

const ProfileImage = styled.img`
  width: 250px;
  height: 250px;
  border-radius: 50%;
  margin-bottom: 20px;
`;

const Name = styled.div`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 10px;
`;

const RightContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-top: 50px;
  margin-left: 20px;
`;

const ContentTitle = styled.div`
  font-size: 24px;
  color: black;
  display: flex;
  flex-direction: row;
`;

const Orange = styled.div`
  color: #ff881a;
`;

const ContentContainer = styled.div`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
`;

const BuddyNameContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const BuddyRole = styled.div`
  display: flex;
  font-size: 24px;
  color: #ff881a;
  width: 120px;
`;

const BuddyName = styled.div`
  display: flex;
  font-size: 24px;
  font-family: "SCDream4";
`;

const PawImange = styled.img`
  width: 25px;
  height: 25px;
  margin-left: 0px;
  margin-right: 10px;
  padding-top: 5px;
`;

const RatingContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 150px;
  margin-top: 50px;
`;

const Stars = styled.div`
  display: flex;
  margin-bottom: 20px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  cursor: pointer;
  transition: color 0.3s;
  margin-right: 10px;
`;

const Button = styled.button`
  background-color: white;
  border: 3px solid #f6bd60;
  border-radius: 10px;
  cursor: pointer;
  font-size: 16px;
  width: 150px;
  height: 50px;
  font-weight: bold;
  box-shadow: inset 1px 1px 2px #000000;
`;

const RatingModal = ({
  postId,
  pickId,
  onClose,
  startDate,
  endDate,
  imageSrc,
  petName,
  pawlevel,
  helpername,
}) => {
  const [smell, setRating] = useState(0);
  console.log(postId);

  const rateStar = (star) => {
    setRating(star);
  };

  const getStarImage = (star) => {
    return star <= smell ? "/images/paw3.png" : "/images/paw2.png";
  };

  const saveRating = async () => {
    const apiUrl = `http://localhost:8080/api/user/smell?postId=${postId}&userId=${pickId}&smell=${smell}`;  

    try {
      const response = await axios.put(apiUrl, {
        smell: parseFloat(smell),
      });

      console.log(response.data);

      if (response.status === 200) {
        alert("꼬순내가 성공적으로 저장되었습니다!");
        onClose();
      } else {
        alert("꼬순내 저장에 실패했습니다.");
      }
    } catch (error) {
      console.error(
        "꼬순내 저장 중에 오류가 발생했습니다:",
        error.response.data
      );
      alert("꼬순내 저장 중에 오류가 발생했습니다.");
    }
  };

  return (
    <ModalWrapper>
      <CloseButton onClick={onClose}>X</CloseButton>
      <Content>
        <DateContainer>
          <SmallIcon src="/images/calendar_ic.png" alt="calendar" />
          <ProfileText>
            {startDate} ~ {endDate}
          </ProfileText>
        </DateContainer>
        <TitleContainer>
          <TitleContent>꼬순내 측정하기</TitleContent>
          <Underline />
        </TitleContainer>
        <Container>
          <LeftContainer>
            <ProfileImage src={imageSrc} alt="Profile" />
            <Name>{petName}</Name>
          </LeftContainer>
          <RightContent>
            <ContentTitle>
              <Orange>반려 버디</Orange>를 돌봐준&nbsp;
              <Orange>버디 헬퍼</Orange>의 꼬순내를 맡아주세요!
            </ContentTitle>
            <ContentContainer>
              <BuddyNameContainer>
                <BuddyRole>버디헬퍼</BuddyRole>
                <BuddyName>
                  {pawlevel === "비기너" && (
                    <PawImange src="/images/beginer_paw.png" />
                  )}
                  {pawlevel === "노말" && (
                    <PawImange src="/images/normal_paw.png" />
                  )}
                  {pawlevel === "마스터" && (
                    <PawImange src="/images/master_paw.png" />
                  )}
                  {helpername}
                </BuddyName>
              </BuddyNameContainer>
              <BuddyNameContainer>
                <BuddyRole>꼬순내</BuddyRole>
                <BuddyName>{`꼬순내 저장: ${smell}/5`}</BuddyName>
              </BuddyNameContainer>
            </ContentContainer>
            <RatingContainer>
              <Stars>
                {[1, 2, 3, 4, 5].map((star) => (
                  <Img
                    key={star}
                    className="star"
                    src={getStarImage(star)}
                    alt="Star"
                    onClick={() => rateStar(star)}
                  />
                ))}
              </Stars>
              <Button className="save-button" onClick={saveRating}>
                꼬순내 저장
              </Button>
            </RatingContainer>
          </RightContent>
        </Container>
      </Content>
    </ModalWrapper>
  );
};

export default RatingModal;
