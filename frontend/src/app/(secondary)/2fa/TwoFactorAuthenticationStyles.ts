import { colors } from '@/styles';
import styled from 'styled-components';
import { breakpoints } from '@/constants';

export const PageWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 154px); // 154px is the combined height of the Header (84px) and the Footer (70px)
  padding: 0 16px;

  @media (max-width: ${breakpoints.xxs}px) {
    justify-content: flex-start;
    padding: 0 12px 24px;
  }
`;

export const CardBox = styled.div<{ $width?: number }>`
  width: 100%;
  max-width: ${({ $width }) => ($width ? `${$width}px` : '520px')};
  background: ${colors.white};
  border-radius: 16px;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 21, 0.15);
  margin: 0 auto;

  @media (max-width: ${breakpoints.xxs}px) {
    border-radius: 12px;
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 32px;
  font-family: var(--inter), sans-serif !important;

  @media (max-width: ${breakpoints.xxs}px) {
    padding: 20px;
    gap: 12px;
  }
`;

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const Options = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const OptionCard = styled.button<{ $selected?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 12px;
  border-radius: 12px;
  border: 1px solid ${({ $selected }) => ($selected ? colors.primary400 : colors.base100)};
  background: ${({ $selected }) => ($selected ? colors.primary100 : colors.white)};
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
`;

export const IconWrap = styled.div<{ $selected?: boolean }>`
  width: 44px;
  height: 44px;
  min-width: 44px;
  min-height: 44px;
  border-radius: 8px;
  background: ${({ $selected }) => ($selected ? colors.primary200 : colors.base50)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
`;

export const SvgIcon = styled.div<{
  $src: string;
  $selected?: boolean;
  $width?: number;
  $height?: number;
  $color?: string;
}>`
  min-width: ${({ $width }) => ($width ? `${$width}px` : '20px')};
  min-height: ${({ $height }) => ($height ? `${$height}px` : '21px')};
  width: ${({ $width }) => ($width ? `${$width}px` : '20px')};
  height: ${({ $height }) => ($height ? `${$height}px` : '21px')};
  background-color: ${({ $color, $selected }) => $color ?? ($selected ? colors.primary800 : colors.base800)};
  -webkit-mask-image: url(${({ $src }) => $src});
  mask-image: url(${({ $src }) => $src});
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
  -webkit-mask-position: center;
  mask-position: center;
  -webkit-mask-size: contain;
  mask-size: contain;
`;

export const OptionText = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const Description = styled.div``;

export const Actions = styled.div`
  margin-top: 8px;
`;

export const Note = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #475467;
  font-size: 12px;
  line-height: 18px;
  margin-top: 4px;
`;

export const Footer = styled.div`
  margin-top: 16px;
`;

export const CodeInputsWrap = styled.div`
  display: flex;
  margin-top: 8px;
  justify-content: space-between;
  --code-gap: 12px;

  @media (max-width: ${breakpoints.xxs}px) {
    --code-gap: 8px;
  }

  @media (max-width: ${breakpoints.xxxs}px) {
    --code-gap: 6px;
  }
`;

export const CodeInput = styled.input`
  flex: 0 0 calc((100% - (5 * var(--code-gap))) / 6);
  width: calc((100% - (5 * var(--code-gap))) / 6);
  aspect-ratio: 1 / 1;
  border-radius: 6px;
  background-color: ${colors.base50};
  border: 1px solid transparent; // keep layout stable
  text-align: center;
  font-size: 18px;
  outline: none;

  &:focus {
    border-color: ${colors.primary500};
  }

  @media (max-width: ${breakpoints.xxs}px) {
    font-size: 16px;
  }

  @media (max-width: ${breakpoints.xxxs}px) {
    border-radius: 4px;
    font-size: 14px;
  }
`;

export const TitleH3 = styled.h3`
  margin: 0;
  color: ${colors.base950};
  font-size: 20px;
  line-height: 28px;
  font-weight: 600;
  text-align: left;

  @media (max-width: ${breakpoints.xxs}px) {
    font-size: 18px;
    line-height: 24px;
  }
`;

export const Title = styled.h4`
  margin: 0;
  color: ${colors.base950};
  font-size: 28px;
  line-height: 34px;
  font-weight: 600;
  text-align: left;

  @media (max-width: ${breakpoints.xxs}px) {
    font-size: 20px;
    line-height: 26px;
  }
`;

export const BodyText = styled.span`
  margin: 0;
  color: ${colors.base600};
  font-size: 16px;
  line-height: 22px;

  @media (max-width: ${breakpoints.xxs}px) {
    font-size: 14px;
    line-height: 20px;
  }
`;

export const LabelText = styled.span`
  color: ${colors.base950};
  font-size: 16px;
  line-height: 22px;
  font-weight: 500;
`;

export const EmphasisText = styled.span`
  color: ${colors.primary500};
  vertical-align: baseline;
`;

export const InfoText = styled.span`
  color: ${colors.base600};
  font-size: 14px;
  line-height: 22px;
`;

export const LinkText = styled.span`
  color: ${colors.primary500};
  font-size: 14px;
  line-height: 22px;
  cursor: pointer;
`;

export const QRCodeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
`;

export const SecretCodeContainer = styled.div`
  width: 100%;
  padding: 12px;
  background-color: ${colors.base50};
  border-radius: 8px;
`;

export const SecretCodeLabel = styled(BodyText)`
  font-size: 12px;
  margin-bottom: 4px;
  color: ${colors.base700};
`;

export const SecretCodeText = styled(EmphasisText)`
  font-family: monospace;
  font-size: 14px;
  word-break: break-all;
`;

export const InfoTextWithMargin = styled(InfoText)<{ $marginTop?: number }>`
  margin-top: ${({ $marginTop }) => $marginTop ?? 0}px;
`;

export const LinkTextWithState = styled(LinkText)<{ $disabled?: boolean }>`
  cursor: ${({ $disabled }) => ($disabled ? 'not-allowed' : 'pointer')};
  opacity: ${({ $disabled }) => ($disabled ? 0.6 : 1)};
`;

export const InfoTextError = styled(InfoText)`
  margin-top: 8px;
  color: ${colors.negative500};
`;

export const FormFieldContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const BackButtonStyled = styled.div`
  background-color: ${colors.base50};
  border: none;
`;

export const BackButtonWrapper = styled.div`
  button {
    background-color: ${colors.base50} !important;
    border: none !important;
  }
`;

export const QRCodeCanvas = styled.canvas`
  display: block;
  margin: 0 auto;
`;

export const OptionTitle = styled.h6<{ $selected?: boolean }>`
  margin: 0;
  font-size: 16px;
  line-height: 24px;
  font-weight: 600;
  color: ${({ $selected }) => ($selected ? colors.primary950 : colors.base900)};
`;

export const OptionSubtitle = styled.span<{ $selected?: boolean }>`
  font-size: 14px;
  line-height: 22px;
  color: ${({ $selected }) => ($selected ? colors.primary950 : colors.base500)};
`;

export const NoteText = styled.span`
  color: ${colors.base500};
  font-size: 14px;
  line-height: 18px;
`;
