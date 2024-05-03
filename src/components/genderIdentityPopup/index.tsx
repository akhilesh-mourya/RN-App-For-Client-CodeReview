import React, {FC, useState} from 'react';
import {
  CrossIcon,
  GenderFlatList,
  HeaderLabel,
  MainContainer,
  ModalContainer,
  RowContainer,
  SearchIcon,
  SearchInput,
  SearchView,
  SeparatorView,
  TouchableOpacity,
  TransparentContainer,
  KeyboardAwareView,
} from './styles';
import GenderItem from '../molecule/genderItem';
import {t} from 'i18next';

interface GenderIdentityProps {
  isVisible: boolean;
  genderList: any;
  updateItem: any;
  hidePopup: any;
  searchData: any;
}

const renderSeperator = () => {
  return <SeparatorView />;
};

const GenderIdentityPopup: FC<GenderIdentityProps> = React.memo(props => {
  const {isVisible, genderList, updateItem, hidePopup, searchData} = props;
  const [searchFocus, setSearchFocus] = useState(false);
  const renderItem = ({item}) => {
    return <GenderItem item={item} onPress={updateItem} />;
  };

  return (
    <ModalContainer isVisible={isVisible} avoidKeyboard={false}>
      <TransparentContainer />
      <MainContainer>
        <RowContainer>
          <HeaderLabel>{t('Gender Identity')}</HeaderLabel>
          <TouchableOpacity onPress={() => hidePopup()}>
            <CrossIcon />
          </TouchableOpacity>
        </RowContainer>
        <SearchView isFocused={searchFocus}>
          <SearchIcon />
          <SearchInput
            onChangeText={searchData}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
          />
        </SearchView>
        <KeyboardAwareView>
          <GenderFlatList
            data={genderList}
            renderItem={renderItem}
            keyExtractor={item => item.id}
            ItemSeparatorComponent={renderSeperator}
          />
        </KeyboardAwareView>
      </MainContainer>
    </ModalContainer>
  );
});

export default GenderIdentityPopup;
