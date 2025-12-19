import styled from "styled-components";

export const StyledKeywordButtonUnselected = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.colors.base100};
  border-radius: 16px;
  border: none;
  cursor: pointer;
`;

export const StyledKeywordButtonSelected = styled.button`
  padding: 6px 12px;
  background-color: ${({ theme }) => theme.colors.primary500};
  border-radius: 16px;
  border: none;
  cursor: pointer;
`;

export const StyledCheckmarkIconContainer = styled.div`
  position: relative;
  width: 14px;
  height: 10px;
`;

export const NextButtonContainer = styled.div`
  margin-top: 10px;
  align-self: flex-end;
`;
