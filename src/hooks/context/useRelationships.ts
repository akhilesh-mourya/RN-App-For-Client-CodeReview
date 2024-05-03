import {useContext} from 'react';
import {
  RelationshipContext,
  RelationshipContextProps,
} from '../../context/relationshipContext';

const useRelationshipData = () => {
  const relatinshipsContextData =
    useContext<RelationshipContextProps>(RelationshipContext);
  return {...relatinshipsContextData};
};

export default useRelationshipData;
