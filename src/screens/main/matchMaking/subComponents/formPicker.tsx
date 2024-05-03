import React, {FC} from 'react';
import {
  Label,
  PickerContainer,
  MatchMakingIcon,
  PickerPlaceholder,
  ErrorLabel,
  Flag,
} from './styles';
import i18next from 'i18next';
import nodeEmoji from 'node-emoji';
import AMButton from '../../../../components/button/AMButton';

interface FormPickerProp {
  label: string;
  placeholder: string;
  onOpenPickerPress?: Function;
  value?: string;
  error?: string;
  showFlag?: boolean;
  emoji?: string;
  topMargin?: number;
}

const FormPicker: FC<FormPickerProp> = ({
  label = i18next.t('Birthday'),
  placeholder = 'MM / DD / YYYY',
  onOpenPickerPress = () => {},
  value = '',
  error = '',
  showFlag = false,
  emoji = nodeEmoji.get('flag-us'),
  topMargin = 40,
}: any) => {
  return (
    <>
      <Label topMargin={topMargin}>{label}</Label>
      <PickerContainer onPress={onOpenPickerPress} isFilled={value !== ''}>
        {showFlag && !!value && <Flag>{emoji}</Flag>}
        <PickerPlaceholder isFocused={value}>
          {value ? `${value}` : placeholder}
        </PickerPlaceholder>
        <AMButton onPress={onOpenPickerPress}>
          <MatchMakingIcon />
        </AMButton>
      </PickerContainer>
      {!!error && <ErrorLabel>{error}</ErrorLabel>}
    </>
  );
};

export default FormPicker;
