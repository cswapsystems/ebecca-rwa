import Image from 'next/image';
import styled from 'styled-components';

import BaseCard from './BaseCard';
import { colors } from "@/styles";

export const CardContainer = styled(BaseCard)`
  box-shadow: 0px 8px 16px hsla(240, 100%, 4.1%, 0.15);
  border-radius: 16px;
  overflow: hidden;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 16px;
  background-color: #ffffff;
  border: none;
  height: 100%;
  cursor: pointer;

  &:hover {
    box-shadow: 0px 8px 16px hsla(240, 100%, 4.1%, 0.3);
    transition: box-shadow 0.5s ease;
  }
`;

export const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 12px;
  overflow: hidden;
`;

export const StyledImage = styled(Image)`
  object-fit: cover;
`;

export const Title = styled.div`
  color: ${colors.base700};
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
`;

export const TagsRow = styled.div`
  display: flex;
  padding: 2px 4px;
  align-items: flex-start;
  gap: 8px;
  flex-wrap: wrap;
`;

export const Tag = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 22px;
  height: 22px;
  padding: 0;
  border-radius: 6px;
  border: 1px solid #dae4ff;
  background: #eff3ff;
`;

export const SquareIcon = styled.span`
  display: inline-block;
  width: 14px;
  height: 14px;
  background: ${colors.primary500};
`;

export const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1; /* push price to the bottom for consistent card height */
`;

export const Quantity = styled.div`
  color: ${colors.base700};
  font-size: 16px;
  font-weight: 600;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const Description = styled.div`
  color: ${colors.base500};
  font-size: 16px;
  line-height: 22px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const Price = styled.div`
  color: ${colors.base700};
  font-size: 18px;
  font-weight: 600;
  line-height: 28px;
`;
