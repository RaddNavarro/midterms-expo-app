import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import JobsFinder from "../screens/JobsFinder"
import SavedJobs from "../screens/SavedJobs";
import "react-native-gesture-handler"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Props } from "../navigation/props";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const AppNavigator = () => {

  return (
    <NavigationContainer>
         <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="JobsFinder" component={JobsFinder} />
          <Stack.Screen name="SavedJobs" component={SavedJobs}/>
        </Stack.Navigator>
    </NavigationContainer>

  )
}




export default AppNavigator;