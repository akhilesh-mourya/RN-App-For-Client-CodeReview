import React, {FC, useEffect, useState} from 'react';
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
  SearchClearIcon,
} from './styles';
import {t} from 'i18next';
import CitySelectionItem from '../molecule/citySelectionItem';
import AMButton from '../button/AMButton';

interface CitySelectionPopupProps {
  isVisible?: boolean;
  onCitySelected?: any;
  hidePopup?: any;
  citiesData: any;
  getCitiesForQuery: () => {};
  loadMore: () => {};
  meta: any;
}

const renderSeperator = () => {
  return <SeparatorView />;
};

const CitySelectionPopup: FC<CitySelectionPopupProps> = React.memo(props => {
  const {
    isVisible,
    onCitySelected,
    hidePopup,
    citiesData,
    getCitiesForQuery,
    loadMore,
    meta,
  } = props;
  const [citiesList, setCitiesList] = useState<any>([]);
  const [searchText, setSearchText] = useState('');
  const [searchFocus, setSearchFocus] = useState(false);

  useEffect(() => {
    setCitiesList(citiesData);
  }, [citiesData]);

  const onClosePress = () => {
    hidePopup();
  };

  const renderItem = ({item}) => {
    return (
      <CitySelectionItem item={item} onPress={() => onCitySelected(item)} />
    );
  };

  const onEndReached = () => {
    if (meta?.cursor) {
      loadMore(meta?.cursor);
    }
  };

  const onTextChange = text => {
    setSearchText(text);
    getCitiesForQuery(text);
  };

  const onClearSearchPress = () => {
    setSearchText('');
    getCitiesForQuery('');
  };

  return (
    <ModalContainer isVisible={isVisible} avoidKeyboard={false}>
      <TransparentContainer />
      <MainContainer>
        <RowContainer>
          <HeaderLabel>{t('Select_City')}</HeaderLabel>
          <TouchableOpacity onPress={() => onClosePress()}>
            <CrossIcon />
          </TouchableOpacity>
        </RowContainer>
        <SearchView isFocused={searchFocus}>
          <SearchIcon />
          <SearchInput
            onChangeText={onTextChange}
            onFocus={() => setSearchFocus(true)}
            onBlur={() => setSearchFocus(false)}
            value={searchText}
          />
          {!!searchText && (
            <AMButton onPress={onClearSearchPress}>
              <SearchClearIcon />
            </AMButton>
          )}
        </SearchView>
        <GenderFlatList
          data={citiesList}
          renderItem={renderItem}
          keyExtractor={(item, index) => item.id + ' ' + index}
          ItemSeparatorComponent={renderSeperator}
          onEndReached={onEndReached}
          onEndReachedThreshold={0.5}
        />
      </MainContainer>
    </ModalContainer>
  );
});

export default CitySelectionPopup;
