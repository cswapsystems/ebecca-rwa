import styled from "styled-components";

import { TextAreaInput } from "@/components/common";
import { Flex } from "@/components/primitives";

export const TextEditorWrapper = styled.div`
  border: ${({ theme }) => `1px solid ${theme.colors.base200}`};
  border-radius: 12px;
  padding: 12px;
  font-weight: 400;
  text-align: left;
  margin: 0px auto 20px auto;
  color: ${({ theme }) => theme.colors.black};
  width: 100%;
`;

export const TextEditorInner = styled.div`
  background: ${({ theme }) => theme.colors.white};
  position: relative;
`;

export const ToolbarButton = styled.button<{ $width: number; $height: number }>`
  position: relative;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  background: none;
  cursor: pointer;
  padding: 0;
  cursor: ${({ disabled }) => (disabled ? "not-allowed" : "pointer")};
  opacity: ${({ disabled }) => (disabled ? 0.2 : 1)};

  ${({ disabled }) =>
    !disabled &&
    `
      &:hover {
        background-color: #eeeeee;
      }
    `}
`;

export const ToolbarPluginWrapper = styled(Flex.Row)`
  margin-bottom: 1px;
  background: ${({ theme }) => theme.colors.white};
  padding: 4px;
  vertical-align: middle;
  width: 100%;
`;

export const EmojiPickerWrapper = styled.div`
  position: absolute;
  top: 120%;
  right: 0;
  z-index: 9999;
`;

export const CustomTextAreaInput = styled(TextAreaInput)`
  height: 206px;
`;
