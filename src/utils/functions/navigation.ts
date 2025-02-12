export interface NavigationRef {
  goBack: () => void;
  navigate: (screenName: string, keys?: object) => void;
  replace: (screenName: string, keys?: object) => void;
}

export let navigationRef: NavigationRef | null = null;

export const setNavigationRef = (ref: any) => {
  navigationRef = ref;
};

export const goBack = () => {
  if (navigationRef) {
    navigationRef.goBack();
  }
};

export const goTo = (screeName: string, keys?: object) => {
  if (navigationRef) {
    navigationRef.navigate(screeName, keys);
  }
};

export const replace = (screeName: string, keys?: object) => {
  if (navigationRef) {
    navigationRef.replace(screeName, keys);
  }
};
