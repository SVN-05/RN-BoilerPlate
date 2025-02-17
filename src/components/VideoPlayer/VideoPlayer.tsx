import React from 'react';
import {StyleSheet, View, ViewStyle} from 'react-native';
import Video, {
  IgnoreSilentSwitchType,
  OnProgressData,
  PosterResizeModeType,
  ResizeMode,
} from 'react-native-video';

interface VideoPlayerProps {
  container?: ViewStyle;
  url: string;
  type: string;
  posterUrl?: string;
  ref?: string;
  resizeMode?: ResizeMode;
  posterResizeMode?: PosterResizeModeType;
  fullScreen?: boolean;
  ignoreSilentSwitch?: IgnoreSilentSwitchType;
}
const VideoPlayer = ({
  container,
  url,
  type = 'mp4',
  posterUrl,
  ref,
  resizeMode = ResizeMode.CONTAIN,
  posterResizeMode = PosterResizeModeType.CONTAIN,
  fullScreen = true,
  ignoreSilentSwitch = IgnoreSilentSwitchType.IGNORE,
}: VideoPlayerProps) => {
  const [paused, setPaused] = React.useState(true);
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const [videoProgress, setVideoProgress] = React.useState<OnProgressData>();

  const handleOnReady = () => {
    setIsVideoReady(false);
    if (!showThumbnail) {
      setAutoThumbnail(true);
    }
  };

  const handleProgress = (progress: OnProgressData) => {
    if (progress) {
      setVideoProgress(progress);
    }
  };

  const handleEnd = () => {};

  const playbackStarted = () => {
    setPaused(false);
  };

  return (
    <View style={[styles.container, container]}>
      <Video
        ref={ref}
        source={{
          uri: url,
          type: type,
        }}
        resizeMode={resizeMode}
        poster={posterUrl}
        posterResizeMode={posterResizeMode}
        fullscreen={fullScreen}
        ignoreSilentSwitch={ignoreSilentSwitch}
        style={styles.video}
        paused={paused}
        onReadyForDisplay={handleOnReady}
        onLoad={playbackStarted}
        onProgress={handleProgress}
        onEnd={handleEnd}
        onBuffer={({isBuffering}) => {
          setIsVideoReady(isBuffering);
        }}
      />
    </View>
  );
};

export default VideoPlayer;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
    overflow: 'hidden',
  },
});
