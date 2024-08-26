import { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import { supabase } from "@/src/lib/supabase";
import TextButton from "@/src/components/TextButton";
import { SafeAreaView } from "react-native-safe-area-context";
import Avatar from "@/src/components/Avatar";
import { useAuth } from "@/src/providers/AuthProvider";
import { AntDesign } from "@expo/vector-icons";
import { Colors } from "@/src/constants/Colors";

export default function Profile() {
  const { user, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: 16,
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <View
        style={{
          width: "100%",
          elevation: 1,
          paddingVertical: 15,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <View />
        <Text
          style={{
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
          Profile
        </Text>

        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <AntDesign name="edit" color={Colors.light.primary} size={24} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          flex: 1,
        }}
      >
        <Avatar imageUrl={user?.avatar} />
        <View
          style={{
            marginBottom: 40,
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "700",
            }}
          >
            {user?.fullName}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
            }}
          >
            {user?.email}
          </Text>
        </View>
        <TouchableOpacity
          onPress={logout}
          style={{
            backgroundColor: "red",
            borderRadius: 10,
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "white",
              fontSize: 14,
              fontWeight: "700",
            }}
          >
            Sign Out
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
