import React, { useRef } from "react";
// import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets } from "@react-navigation/stack";

import WebviewContainer from "./src/components/WebViewContainer";

const Stack = createStackNavigator();

function App(): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          ...TransitionPresets.SlideFromRightIOS,
          headerShown: false,
        }}
      >
        <Stack.Screen
          options={{
            transitionSpec: {
              open: {
                animation: "spring",
                config: {
                  stiffness: 2000,
                  damping: 1000,
                },
              },
              close: {
                animation: "spring",
                config: {
                  stiffness: 1000,
                  damping: 500,
                },
              },
            },
          }}
          name="Home"
          component={WebviewContainer}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
