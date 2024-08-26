import { AntDesign } from "@expo/vector-icons";
import { Image, Pressable, View } from "react-native";
import { Colors } from "../constants/Colors";

const Avatar = ({ imageUrl }: { imageUrl: string | undefined }) => {
  return (
    <View
      style={{
        borderRadius: 70,
        height: 140,
        backgroundColor: "#c9ced1",
        justifyContent: "center",
        alignItems: "center",
        width: 140,
      }}
    >
      {imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          style={{
            width: "100%",
            height: "100%",
          }}
        />
      ) : (
        <AntDesign name="user" size={70} color={Colors.light.icon} />
      )}
      <Pressable
        style={{
          position: "absolute",
          bottom: 5,
          right: 5,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AntDesign name="camera" size={30} color={Colors.light.primary} />
      </Pressable>
    </View>
  );
};

export default Avatar;
