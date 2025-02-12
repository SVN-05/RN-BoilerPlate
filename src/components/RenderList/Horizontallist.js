import React from 'react';
import ScrollWrapper from '../AppWrappers/ScrollWrapper';
import NoData from '../microComponents/NoData';

const Horizontallist = ({
  list,
  Card,
  contentContainerStyle,
  paddingBottom = 0,
}) => {
  return list?.length > 0 ? (
    <ScrollWrapper
      horizontal
      paddingBotoom={paddingBottom}
      contentContainerStyle={contentContainerStyle}>
      {list?.map((item, index) => {
        return <Card item={item} index={index} />;
      })}
    </ScrollWrapper>
  ) : (
    <NoData horizontal textStyle={{textAlign: 'center'}} />
  );
};

export default Horizontallist;
