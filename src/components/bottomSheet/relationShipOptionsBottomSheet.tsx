import React, {FC} from 'react';
import {
  ModalContainerTransparent,
  SheetContainerTransparent,
  OptionConatiner,
  OptionLabelCenter,
  RelationshipTopView,
  OptionLRedabelCenter,
  Seprator,
} from './styles';
import {useTranslation} from 'react-i18next';
import {useAnalytics} from '../../services/analytics';

interface SheetProps {
  isVisible?: boolean;
  dismissModal?: Function;
  onEditPress?: Function;
  onDeletePress?: Function;
  onCancelPress?: Function;
  setRef?: any;
}

const RelationShipOptionsBottomSheet: FC<SheetProps> = React.memo(props => {
  const {setRef, onEditPress, onDeletePress} = props;
  const {t} = useTranslation();
  const analytic = useAnalytics();
  const onCancelPress = () => {
    props.onCancelPress?.();
    setRef?.current?.hide();
  };
  const optionItem = (
    label: string,
    onItemPress: Function = () => {},
    isErrorView = false,
  ) => {
    const TextContainer = isErrorView
      ? OptionLRedabelCenter
      : OptionLabelCenter;
    return (
      <OptionConatiner onPress={onItemPress}>
        <TextContainer>{label}</TextContainer>
      </OptionConatiner>
    );
  };
  const renderTopView = () => (
    <RelationshipTopView>
      {optionItem(t('Edit_Name'), onEditPress)}
      <Seprator />
      {optionItem(t('Delete_Relationship'), onDeletePress, true)}
    </RelationshipTopView>
  );
  const renderBottomView = () => (
    <RelationshipTopView>
      {optionItem(t('Cancel'), onCancelPress)}
    </RelationshipTopView>
  );
  return (
    <ModalContainerTransparent ref={setRef} CustomHeaderComponent={<></>}>
      <SheetContainerTransparent>
        {renderTopView()}
        {renderBottomView()}
      </SheetContainerTransparent>
    </ModalContainerTransparent>
  );
});

export default RelationShipOptionsBottomSheet;
