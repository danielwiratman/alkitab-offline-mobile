import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./screens/HomeScreen";
import PassageScreen from "./screens/PassageScreen";

const App = () => {
    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <SafeAreaProvider>
                <Stack.Navigator>
                    <Stack.Screen
                        name="Home"
                        component={HomeScreen}
                        options={{ headerShown: false }}
                    />
                    <Stack.Screen
                        name="Passage"
                        component={PassageScreen}
                        options={{ headerShown: false }}
                    />
                </Stack.Navigator>
            </SafeAreaProvider>
        </NavigationContainer>
    );
};

export default App;
