import { View, Text, FlatList, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { supabase } from "@/src/lib/supabase";
import { useAuth, User } from "@/src/providers/AuthProvider";
import UserListItem from "@/src/components/UserListItem";
import axios from "axios";
import { baseUrl } from "@/src/constants/Env";
import { Colors } from "@/src/constants/Colors";
import { SafeAreaView } from "react-native-safe-area-context";

const Users = () => {
  const [users, setUsers] = useState<User[] | null>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const { data } = await axios.get(`${baseUrl}/auth/users`);
        setUsers(data?.data);
      } catch (error: any) {
        console.log(error.response.data);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return (
    <SafeAreaView style={{
      height: "100%",
      width: "100%"
    }}>
      <View
        style={{
          height: 50,
          borderWidth: 1,
          borderBottomColor: "#cfd2d4",
          paddingHorizontal: 16,
          width: "100%",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Text
          style={{
            color: Colors.light.text,
            fontSize: 24,
            fontWeight: "bold",
          }}
        >
         Friends
        </Text>
      </View>
      {loading && (
        <View
          style={{
            justifyContent: "center",
            alignItems: "center",
            flex: 1,
          }}
        >
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      )}
      {!loading && (
        <FlatList
          data={users}
          
          contentContainerStyle={{ gap: 10, marginTop: 15 }}
          renderItem={({ item, index }) => {
            return <UserListItem key={item._id} user={item} />;
          }}
        />
      )}
    </SafeAreaView>
  );
};

export default Users;
