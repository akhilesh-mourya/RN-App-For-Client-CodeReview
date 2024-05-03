import React from 'react';
import {Analytics} from './analytics';
import {AnalyticsContext} from './context';

export const AnalyticsProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const {current: analytics} = React.useRef(new Analytics());

  return (
    <AnalyticsContext.Provider value={analytics}>
      {children}
    </AnalyticsContext.Provider>
  );
};
