import { Colors } from "@/src/constants/Colors";
import { FontAwesome, FontAwesome5 } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabNavigator() {
  return (
    <Tabs screenOptions={{
        tabBarHideOnKeyboard:true,
        headerShown:false,
        tabBarActiveTintColor: Colors.light.primary
    }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Chats",
          tabBarIcon:({size, color})=>(
              <FontAwesome5 name="home" size={size} color={color} />
          ) 
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon:({size, color})=>(
              <FontAwesome name="user" size={size} color={color} />
          ) 
        }}
      />
    </Tabs>
  );
}
