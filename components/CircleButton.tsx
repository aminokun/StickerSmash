import React from "react";
import { View, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

type Props = {
  onPress: () => void;
};

export default function CircleButton({ onPress }: Props) {
  return (
    <>
      <View className="w-[84px] h-[84px] mx-[60px] border-[4px] border-[#ffd33d] rounded-[42px] p-[3px]">
        <Pressable className="flex-1 justify-center items-center rounded-[42px] bg-white">
          <MaterialIcons name="add" size={38} color="#25292e" />
        </Pressable>
      </View>
    </>
  );
}
