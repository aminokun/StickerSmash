import React from "react";
import { Pressable, Text, View } from "react-native";

type Props = {
  label: string;
};

export default function Button({ label }: Props) {
  return (
    <View className="w-80 h-[68px] mx-5 items-center justify-center p-[3px]">
      <Pressable className="" onPress={() => alert("You pressed the button 😱")}>
        <Text>{label}</Text>
      </Pressable>
    </View>
  );
}
