/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import WebView from 'react-native-webview';
import {isAndroid} from '../../constants/constants';

const RenderWebView = ({
  cacheEnabled = true,
  style = {},
  startInLoadingState = true,
  url,
  onMessage,
}: {
  cacheEnabled?: boolean;
  style?: object;
  startInLoadingState?: boolean;
  url: string;
  onMessage: (event: any) => void;
}) => {
  const INJECTED_JAVASCRIPT = `(function() {
        const meta = document.createElement('meta'); 
        meta.setAttribute('content', 'width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no'); 
        meta.setAttribute('name', 'viewport'); 
        document.getElementsByTagName('head')[0].appendChild(meta);
      })();`;

  return (
    <WebView
      cacheEnabled={cacheEnabled}
      style={{width: '100%', flex: 1, ...style}}
      containerStyle={isAndroid ? {} : {paddingTop: 25}}
      startInLoadingState={startInLoadingState}
      javaScriptEnabled={true}
      injectedJavaScriptBeforeContentLoaded={INJECTED_JAVASCRIPT}
      source={{
        uri: url,
      }}
      onMessage={onMessage}
    />
  );
};

export default RenderWebView;
