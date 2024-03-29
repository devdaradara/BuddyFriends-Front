import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const PageContainer = styled.div`
  display: flex;
  background-color: #f8edeb;
  flex-direction: column;
  align-items: center;
  padding-left: 50px;
`;

const PowContainer = styled.div`
  display: flex;
  margin-top: 50px;
  width: 1200px;
  margin-left: 0px;
`;

const Paw = styled.img`
  width: 38px;
  height: 30px;
  margin-right: 20px;
  padding-top: 20px;
  margin-left: 0px;
`;

const Title = styled.h1`
  font-size: 32px;
  text-align: left;
`;

const Underline = styled.div`
  height: 2px;
  width: 1200px;
  background-color: black;
`;

const Box = styled.div`
  margin: 50px 0px 0px 150px;
  justify-content: center;
  align-items: center;
  justify-content: center;
  align-items: center;
`;

const InputWrapper = styled.div`
  margin-bottom: 50px;
  width: 1200px;
`;

const Input = styled.input`
  margin-bottom: 15px;
  padding: 15px;
  border: 3px solid #f6bd60;
  border-radius: 10px;
  width: 744px;
  font-size: 20px;
  font-family: "SCDream4";
`;

const DateSelect = styled.div`
  display: flex;
`;

const Inputa = styled.div`
  font-size: 20px;
  margin: 20px;
`;

const InputDate = styled.input`
  margin-bottom: 15px;
  padding: 15px;
  border: 3px solid #f6bd60;
  border-radius: 10px;
  font-size: 20px;
  font-family: "SCDream4";
  width: 370px;
`;

const Textarea = styled.textarea`
  margin-bottom: 15px;
  padding: 15px;
  border: 3px solid #f6bd60;
  border-radius: 20px;
  width: 925px;
  height: 625px;
  font-size: 20px;
  font-family: "SCDream4";
`;

const TextInput = styled.p`
  margin-bottom: 20px;
  font-size: 24px;
  font-family: "SCDream5";
  color: #010c26;
`;

const Button = styled.button`
  padding: 10px 20px;
  margin-top: 40px;
  margin-bottom: 100px;
  margin-left: 700px;
  width: 250px;
  height: 50px;
  border: none;
  border-radius: 10px;
  background-color: #f6bd60;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  font-family: "SCDream7";
  color: white;
  font-size: 26px;
  cursor: pointer;
`;

const GenderButton = styled.button`
  padding: 10px 20px;
  margin-right: 50px;
  border: 3px solid #f6bd60;
  border-radius: 10px;
  background-color: ${(props) => (props.isSelected ? "#F6BD60" : "#FFF")};
  color: ${(props) => (props.isSelected ? "white" : "#F6BD60")};
  font-family: "SCDream6";
  font-size: 16px;
  cursor: pointer;
  outline: none;
  width: 275px;
  &:last-child {
    margin-right: 0;
  }
`;

function CarePostPage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    periodsStart: "",
    periodEnd: "",
    petId: "",
    title: "",
    content: "",
  });

  const [selectedGender, setSelectedGender] = useState("");
  const [pets, setPets] = useState([]);
  const userId = JSON.parse(localStorage.getItem("userInfo")).userId;

  useEffect(() => {
    const fetchPets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/pet/list?userId=${userId}`
        );
        if (response.status === 200) {
          setPets(response.data);
          if (response.data.length === 1) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              petId: response.data[0].petId.toString(),
            }));
          }
        } else {
          console.error("Failed to fetch pets");
        }
      } catch (error) {
        console.error("Error fetching pets:", error);
      }
    };
  
    fetchPets();
  }, [userId]);
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
    setFormData({
      ...formData,
      gender: gender,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const helperSex =
      formData.gender === "male"
        ? "male"
        : formData.gender === "female"
        ? "female"
        : "all";

    const postPayload = {
      userId: userId,
      petId: parseInt(formData.petId, 10),
      title: formData.title,
      content: formData.content,
      periodStart: formData.periodsStart,
      periodEnd: formData.periodEnd,
      helperSex: helperSex,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/api/post/create",
        postPayload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        navigate("/");
      } else {
        console.error("Failed to create post", response);
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Error creating post");
    }
  };

  return (
    <PageContainer>
      <PowContainer>
        <Paw src="/images/paw.png" alt="paw" />
        <Title>돌봄글 기본정보</Title>
      </PowContainer>
      <Underline />
      <form onSubmit={handleSubmit} style={{ marginLeft: "150px" }}>
        <Box>
          <InputWrapper>
            <TextInput>돌봄 요청 기간</TextInput>
            <DateSelect>
              <InputDate
                type="date"
                name="periodsStart"
                value={formData.periodsStart}
                onChange={handleChange}
              />
              <Inputa>~</Inputa>
              <InputDate
                type="date"
                name="periodEnd"
                value={formData.periodEnd}
                onChange={handleChange}
              />
            </DateSelect>
          </InputWrapper>
          <InputWrapper>
            <TextInput>희망 이웃 성별</TextInput>
            <GenderButton
              isSelected={selectedGender === "all"}
              onClick={() => handleGenderSelect("all")}
              type="button"
            >
              모두 괜찮아요
            </GenderButton>
            <GenderButton
              isSelected={selectedGender === "male"}
              onClick={() => handleGenderSelect("male")}
              type="button"
            >
              남성만
            </GenderButton>
            <GenderButton
              isSelected={selectedGender === "female"}
              onClick={() => handleGenderSelect("female")}
              type="button"
            >
              여성만
            </GenderButton>
          </InputWrapper>
          <InputWrapper>
            <TextInput>반려 동물 선택</TextInput>
            <select
              name="petId"
              value={formData.petId}
              onChange={handleChange}
              style={{
                padding: "10px",
                border: "3px solid #f6bd60",
                borderRadius: "10px",
                width: "900px",
                fontSize: "20px",
                fontFamily: "SCDream4",
                marginBottom: "40px",
              }}
            >
              {pets.map((pet) => (
                <option key={pet.petId} value={pet.petId}>
                  {pet.petName}
                </option>
              ))}
            </select>
          </InputWrapper>
        </Box>
        <PowContainer>
          <Paw src="/images/paw.png" alt="paw" />
          <Title>돌봄글 내용작성</Title>
        </PowContainer>
        <Underline />
        <Box>
          <InputWrapper>
            <TextInput>돌봄글 제목</TextInput>
            <Input
              type="text"
              name="title"
              placeholder="제목을 입력해주세요."
              value={formData.title}
              onChange={handleChange}
            />
          </InputWrapper>
          <InputWrapper>
            <TextInput>돌봄글 내용</TextInput>
            <Textarea
              type="text"
              name="content"
              placeholder="내용을 입력해주세요."
              value={formData.content}
              onChange={handleChange}
            />
          </InputWrapper>
          <Button type="submit">글등록</Button>
        </Box>
      </form>
    </PageContainer>
  );
}

export default CarePostPage;
