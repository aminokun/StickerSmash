import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: "Oops not found!" }} />
      <View className="flex-1 justify-center items-center bg-[#25292e]">
        <Link href="/" className="text-[20px] text-white underline">
          Go back to home screen
        </Link>
      </View>
    </>
  );
}
