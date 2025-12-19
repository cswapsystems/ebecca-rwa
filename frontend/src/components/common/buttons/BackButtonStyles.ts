import styled from "styled-components";

export const BackButtonContainer = styled.button`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colors.base950};
  background-color: ${({ theme }) => theme.colors.base50};
  border-radius: 8px;
  padding: 8px;
  gap: 8px;
`;

export const Text = styled.span`
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  white-space: nowrap;
`;

export const Arrow = styled.div`
  flex-shrink: 0;
  width: 20px;
  height: 20px;

  img {
    object-fit: cover;
  }
`;
