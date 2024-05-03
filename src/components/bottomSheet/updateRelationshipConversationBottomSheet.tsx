import React, {FC} from 'react';
import {
  ModalContainer,
  SheetContainer,
  RowView,
  WhatsappIcon,
  MessagesIcon,
  OptionLabel,
  RightArrowIcon,
  RowFullFlexView,
  Seperator,
  TopBarUpdate,
  AnalysisSheetIcon,
} from './styles';
import {useTranslation} from 'react-i18next';

interface SheetProps {
  isVisible?: boolean;
  dismissModal?: Function;
  onWhatsAppPress?: Function;
  onNewAnalysisPress?: Function;
  setRef?: any;
  isImessageUpload?: boolean;
}

const UpdateRelationshipConversationBottomSheet: FC<SheetProps> = React.memo(
  props => {
    const {
      setRef,
      onWhatsAppPress,
      onNewAnalysisPress,
      isImessageUpload = false,
    } = props;
    const {t} = useTranslation();
    const optionItem = (
      index: number = 0,
      onItemPress: Function = () => {},
    ) => {
      const label =
        index === 1
          ? isImessageUpload
            ? t('Upload_Your_IMessage_Chat')
            : t('Upload_Your_WhatsApp_Chat')
          : t('New_Analysis');
      const Icon =
        index === 1
          ? isImessageUpload
            ? MessagesIcon
            : WhatsappIcon
          : AnalysisSheetIcon;
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
      <ModalContainer ref={setRef} CustomHeaderComponent={<TopBarUpdate />}>
        <SheetContainer height={150}>
          {optionItem(1, onWhatsAppPress)}
          <Seperator />
          {optionItem(2, onNewAnalysisPress)}
          <Seperator />
        </SheetContainer>
      </ModalContainer>
    );
  },
);

export default UpdateRelationshipConversationBottomSheet;
