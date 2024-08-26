import React, { useState } from "react";
import {
  Alert,
  StyleSheet,
  View,
  AppState,
  TextInput,
  Text,
  TouchableOpacity,
} from "react-native";
import { supabase } from "@/src/lib/supabase";
import TextButton from "@/src/components/TextButton";
import { Colors } from "@/src/constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import CustomInput from "@/src/components/CustomInput";
import { signUp } from "@/src/lib/auth";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullname] = useState("");
  const [loading, setLoading] = useState(false);

  const signUpUser = async () => {
    setLoading(true);
    await signUp(email, fullName, password)
      .then(() => router.push("/login")).catch((error) => {
        Alert.alert("Error", error.message)
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <View
      style={{
        width: "100%",
        borderRadius: 8,
        gap: 10,
      }}
    >
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <AntDesign name="wechat" size={40} color={Colors.light.primary} />
        <Text
          style={{
            color: Colors.light.tint,
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            padding: 5,
          }}
        >
          Chat
          <Text
            style={{
              color: Colors.light.primary,
            }}
          >
            Me
          </Text>
        </Text>
      </View>
      <CustomInput
        placeholder="Email"
        value={email}
        disabled={loading}
        keyboardType="email-address"
        onChangeText={setEmail}
      />
      <CustomInput
        placeholder="Full Name"
        disabled={loading}
        autoCapitalize="words"
        value={fullName}
        onChangeText={setFullname}
      />
      <TextInput
        placeholderTextColor={Colors.light.icon}
        style={{
          color: Colors.light.text,
          backgroundColor: Colors.light.secondaryBackground,
          borderColor: Colors.light.icon,
          borderWidth: 1,
          borderRadius: 8,
          padding: 8,
          marginBottom: 8,
        }}
        disableFullscreenUI={loading}
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />
      <View
        style={{
          paddingTop: 15,
        }}
      >
        <TextButton label="Sign Up" onPress={signUpUser} disabled={loading} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            marginTop: 10,
            gap: 5,
          }}
        >
          <Text
            style={{
              color: Colors.light.text,
              fontSize: 12,
            }}
          >
            Already have an account?
          </Text>
          <TouchableOpacity onPress={() => router.push("/login")}>
            <Text
              style={{
                color: Colors.light.primary,
                fontSize: 12,
              }}
            >
              Sign In
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
