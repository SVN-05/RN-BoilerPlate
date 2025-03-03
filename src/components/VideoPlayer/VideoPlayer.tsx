import React, {useLayoutEffect, useRef, useState} from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import Video, {
  IgnoreSilentSwitchType,
  OnProgressData,
  PosterResizeModeType,
  ResizeMode,
} from 'react-native-video';
import AppIcon, {iconFamily} from '../AppIcon/AppIcon';
import {colors} from '../../Styles/theme';
import AppText from '../AppText/AppText';
import {
  formatTime,
  getDoubleDigitTiming,
} from '../../utils/functions/functions';
import {fontSizes, windowHeight} from '../../constants/constants';
import Slider from '@react-native-community/slider';
import Orientation from 'react-native-orientation-locker';
import {goBack} from '../../utils/functions/navigation';

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
  const videoRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const [videoProgress, setVideoProgress] = useState({});
  const [isVideoReady, setIsVideoReady] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const seekInterval = 5;

  useLayoutEffect(() => {
    Orientation.lockToLandscape();
    return () => {
      if (videoRef?.current) {
        setIsPaused(true);
      }
      Orientation.unlockAllOrientations();
      Orientation.lockToPortrait();
    };
  }, []);

  const togglePlayback = () => {
    const currentVideo = videoRef.current;
    if (currentVideo) {
      if (isPaused) {
        currentVideo.resume();
      } else {
        currentVideo?.pause();
      }
      setIsPaused(!isPaused);
    }
  };

  const rewindVideo = () => {
    const currentVideo = videoRef.current;
    if (currentVideo) {
      const newTime = Math.max(0, currentTime - seekInterval);
      currentVideo?.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const forwardVideo = () => {
    const currentVideo = videoRef.current;
    if (currentVideo) {
      const newTime = Math.min(duration, currentTime + seekInterval);
      currentVideo?.seek(newTime);
      setCurrentTime(newTime);
    }
  };

  const toggleControls = () => {
    setShowControls(!showControls);
    if (!showControls) {
      setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  const handleModal = async () => {
    if (videoRef.current) {
      videoRef?.current?.pause();
      videoRef?.current?.dismissFullscreenPlayer();
    }
    setShowModal(false);
    goBack();
  };

  const handleOnReady = () => {
    setIsVideoReady(false);
  };

  const handleProgress = (progress: OnProgressData) => {
    if (progress) {
      setVideoProgress(progress);
    }
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
        paused={isPaused}
        onReadyForDisplay={handleOnReady}
        onProgress={handleProgress}
        onEnd={handleEnd}
        onBuffer={({isBuffering}) => {
          setIsVideoReady(isBuffering);
        }}
      />
      <Modal
        visible={showModal}
        supportedOrientations={['landscape']}
        transparent
        onRequestClose={e => {
          e.preventDefault();
          handleModal();
        }}
        style={{
          width: '100%',
          flex: 1,
        }}>
        <TouchableWithoutFeedback
          style={{width: '100%', flex: 1}}
          onPress={toggleControls}>
          <View style={{width: '100%', flex: 1}}>
            {showControls && (
              <View style={styles.overlay}>
                <View style={styles.headerRow}>
                  <TouchableOpacity onPress={handleModal}>
                    <AppIcon
                      name={'arrowleft'}
                      family={iconFamily.antDesign}
                      color={colors.white}
                      size={27}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.controlContainer}>
                  <View style={styles.controlRow}>
                    <TouchableOpacity onPress={rewindVideo}>
                      <AppIcon
                        name={'rewind-5'}
                        family={iconFamily.materialCommunityIcons}
                        color={colors.white}
                        size={25}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={togglePlayback}>
                      <AppIcon
                        name={isPaused ? 'play-outline' : 'pause'}
                        family={
                          isPaused ? iconFamily.ionicons : iconFamily.feather
                        }
                        color={colors.white}
                        size={25}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={forwardVideo}>
                      <AppIcon
                        name={'fast-forward-5'}
                        family={iconFamily.materialCommunityIcons}
                        color={colors.white}
                        size={25}
                      />
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={styles.durationContainer}>
                  <AppText
                    text={`/ ${getDoubleDigitTiming(
                      Math.floor(videoProgress.seekableDuration / 60),
                    )}:${getDoubleDigitTiming(
                      Math.ceil(
                        videoProgress.seekableDuration -
                          Math.floor(videoProgress.seekableDuration / 60) * 60,
                      ),
                    )} `}
                    fs={fontSizes.md}
                    textColor={colors.white}
                  />
                  <Slider
                    style={{
                      width: windowHeight,
                      marginLeft: -15,
                    }}
                    tapToSeek={true}
                    minimumValue={0}
                    maximumValue={100}
                    // When dragging, use sliderValue; otherwise, compute percentage from currentTime.
                    value={
                      videoProgress
                        ? (videoProgress?.currentTime /
                            videoProgress?.seekableDuration) *
                          100
                        : 0
                    }
                    onValueChange={value => {
                      const seekTime =
                        (value / 100) * videoProgress?.seekableDuration;
                      videoRef?.current?.seek(seekTime);
                    }}
                    onSlidingComplete={value => {
                      const seekTime = (value / 100) * duration;
                      videoRef?.current.seekTo(seekTime);
                      setCurrentTime(seekTime);
                    }}
                    minimumTrackTintColor={colors.primaryColor}
                    maximumTrackTintColor={colors.greyE6E6E6}
                    thumbTintColor={colors.white}
                  />
                </View>
              </View>
            )}
          </View>
        </TouchableWithoutFeedback>
      </Modal>
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
  overlay: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    flex: 1,
    width: '100%',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerRow: {
    flex: 3,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  controlContainer: {
    flex: 7,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  controlRow: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 25,
  },
  durationContainer: {
    width: '100%',
    marginBottom: 20,
    rowGap: 10,
  },
});
