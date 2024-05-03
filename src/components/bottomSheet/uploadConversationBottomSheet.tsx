import React, {FC} from 'react';
import {
  ModalContainer,
  SheetContainer,
  TopBar,
  HeaderLabel,
  RowView,
  WhatsappIcon,
  MessagesIcon,
  OptionLabel,
  RightArrowIcon,
  RowFullFlexView,
  Seperator,
} from './styles';
import {useTranslation} from 'react-i18next';

interface SheetProps {
  isVisible?: boolean;
  dismissModal?: Function;
  onWhatsAppPress?: Function;
  onIMessagePress?: Function;
  setRef?: any;
}

const UploadConversationBottomSheet: FC<SheetProps> = React.memo(props => {
  const {setRef, onWhatsAppPress, onIMessagePress} = props;
  const {t} = useTranslation();
  const optionItem = (index: number = 0, onItemPress: Function = () => {}) => {
    const label = index === 1 ? t('WhatsApp') : t('iMessage');
    const Icon = index === 1 ? WhatsappIcon : MessagesIcon;
    return (
      <RowView onPress={onItemPress}>
        <RowFullFlexView>
          <Icon />
          <OptionLabel>{label}</OptionLabel>
        </RowFullFlexView>
        <RightArrowIcon />
      </RowView>
    );
  };
  return (
    <ModalContainer ref={setRef} CustomHeaderComponent={<TopBar />}>
      <SheetContainer>
        <HeaderLabel>{t('Add_Relation_Header')}</HeaderLabel>
        {optionItem(1, onWhatsAppPress)}
        <Seperator />
        {optionItem(2, onIMessagePress)}
      </SheetContainer>
    </ModalContainer>
  );
});

export default UploadConversationBottomSheet;
