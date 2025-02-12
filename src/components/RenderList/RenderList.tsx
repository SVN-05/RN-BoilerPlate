/* eslint-disable react-native/no-inline-styles */
import React, {forwardRef, useEffect, useState} from 'react';
import {container, greyLine} from '../../styles/commonsStyles';
import {FlatList, View} from 'react-native';
import ListFooterComp from './ListFooterComp';
import {refreshLoaderComponent} from '../AppLoader/RefreshLoader';
import AppInput from '../AppForm/FormInputs/AppInput/AppInput';
import {colors} from '../../styles/theme';
import NoData from '../micro/NoData';

interface RenderListProps {
  endPointFunctionName?: (params: any) => {
    data: any;
    error: any;
    refetch: () => void;
    isLoading: boolean;
  };
  ListComponent?: React.ComponentType<any>;
  listLimit?: number;
  containerStyle?: object;
  horizontal?: boolean;
  customData?: any[];
  isDefaultSeperator?: boolean;
  itemSeperatorComponent?: React.ComponentType<any>;
  contentContainerStyle?: object;
  hasResultKey?: boolean;
  componentKeys?: object;
  paddingBottom?: number;
  enableRefresh?: boolean;
  enablePagination?: boolean;
  onEndReachedThreshold?: number;
  enableSearch?: boolean;
  searchPlaceholder?: string;
  customParams?: object;
  scrollEnabled?: boolean;
  customFlatList?: React.ComponentType<any>;
  searchValue?: string;
  additionalRefreshFunction?: () => void;
  horizontalGap?: number;
  show_count?: number;
  last_object?: any;
  numColumns?: number;
  is_full_screen?: boolean;
  columnWrapperStyle?: object;
}

const RenderList = forwardRef<FlatList, RenderListProps>(
  (
    {
      endPointFunctionName,
      ListComponent,
      listLimit = 25,
      containerStyle,
      horizontal = false,
      customData,
      isDefaultSeperator = false,
      itemSeperatorComponent,
      contentContainerStyle,
      hasResultKey = false,
      componentKeys,
      paddingBottom = 0,
      enableRefresh = false,
      enablePagination = true,
      onEndReachedThreshold = 0.1,
      enableSearch = false,
      searchPlaceholder = 'Search here',
      customParams = {},
      scrollEnabled = true,
      customFlatList,
      searchValue,
      additionalRefreshFunction,
      horizontalGap = 20,
      show_count,
      last_object,
      numColumns,
      is_full_screen = false,
      columnWrapperStyle,
    },
    ref,
  ) => {
    const FlatListComp = customFlatList || FlatList;
    const [currentPage, setCurrentPage] = useState(1);
    const [allData, setAllData] = useState([]);
    const [search, setSearch] = useState('');
    const [showText, setShowText] = useState(false);
    const [
      onEndReachedCalledDuringMomentum,
      setOnEndReachedCalledDuringMomentum,
    ] = useState(true);
    const {data, error, refetch, isLoading} = endPointFunctionName
      ? endPointFunctionName({
          page: currentPage,
          limit: listLimit,
          search: searchValue || search,
          ...customParams,
        })
      : {};
    const {totalPages} = data?.metadata || {};

    useEffect(() => {
      if ((data?.data && !error) || customData) {
        const firstData = hasResultKey ? data?.data?.results : data?.data;
        const finalData = customData ? customData : firstData;

        if (search || searchValue) {
          if (currentPage !== 1) {
            setCurrentPage(1);
          }
          setAllData(finalData);
        } else if (currentPage > 1 && allData?.length > 0) {
          setAllData(prev => [...prev, ...finalData]);
        } else {
          const apply_show_count = show_count
            ? finalData?.slice(0, show_count)
            : finalData;
          const final_data = last_object
            ? [...apply_show_count, last_object]
            : apply_show_count;
          setAllData(final_data);
        }
      }
    }, [
      data,
      customData,
      error,
      hasResultKey,
      search,
      searchValue,
      currentPage,
      allData?.length,
      show_count,
      last_object,
    ]);

    const onManualRefresh = async () => {
      await setCurrentPage(1);
      if (refetch) {
        await refetch();
      }
      if (additionalRefreshFunction) {
        await additionalRefreshFunction();
      }
    };

    const renderItem = ({
      item,
    }: {
      item: {item: object; index: number};
      index: number;
    }) => {
      return ListComponent ? (
        <ListComponent
          item={item?.item}
          index={item?.index}
          {...componentKeys}
        />
      ) : (
        <View key={item?.index} />
      );
    };

    return (
      <View
        style={{
          ...container,
          paddingHorizontal: 0,
          paddingBottom: 0,
          ...containerStyle,
        }}>
        {enableSearch && (
          <AppInput
            isSearch
            showRightIcon={search?.length === 0 ? false : true}
            placeholder={searchPlaceholder}
            height={40}
            borderRadius={8}
            inputBgColor={colors.white}
            disabled={error}
            value={search}
            onChangeText={(t: string) => {
              setSearch(t);
            }}
            inputContainer={{
              marginBottom: 20,
              width: '95%',
              marginHorizontal: 'auto',
            }}
            onRightIconClick={() => {
              setSearch('');
            }}
          />
        )}
        <FlatListComp
          ref={ref}
          columnWrapperStyle={columnWrapperStyle}
          numColumns={numColumns}
          keyboardShouldPersistTaps={'handled'}
          scrollEnabled={scrollEnabled}
          disableVirtualization={true}
          onEndReachedThreshold={onEndReachedThreshold}
          data={allData}
          refreshControl={
            enableRefresh && isLoading
              ? refreshLoaderComponent(isLoading, onManualRefresh)
              : undefined
          }
          contentContainerStyle={[
            horizontal
              ? {
                  columnGap: horizontalGap,
                  paddingVertical: 10,
                  paddingRight: 20,
                  ...(allData?.length > 0 ? {} : {width: '100%'}),
                }
              : {width: '100%', paddingBottom: paddingBottom},
            {...contentContainerStyle},
          ]}
          horizontal={horizontal}
          renderItem={renderItem}
          ListEmptyComponent={
            <NoData horizontal={horizontal} is_full_screen={is_full_screen} />
          }
          onEndReached={() => {
            if (!onEndReachedCalledDuringMomentum && enablePagination) {
              if (
                error === undefined &&
                (data?.data?.next || currentPage < totalPages)
              ) {
                const count = currentPage + 1;
                setCurrentPage(count);
              }
              setOnEndReachedCalledDuringMomentum(true);
            }
          }}
          onScrollBeginDrag={() => {
            if (enablePagination) {
              setShowText(true);
            }
          }}
          onMomentumScrollBegin={() => {
            setShowText(false);
            setOnEndReachedCalledDuringMomentum(false);
          }}
          ItemSeparatorComponent={
            horizontal ? undefined : isDefaultSeperator ? (
              <View style={[greyLine, {marginVertical: 5}]} />
            ) : itemSeperatorComponent ? (
              itemSeperatorComponent()
            ) : undefined
          }
          ListFooterComponent={
            <ListFooterComp
              loading={false}
              data={allData}
              showText={showText}
              horizontal={horizontal}
            />
          }
        />
      </View>
    );
  },
);

export default RenderList;
