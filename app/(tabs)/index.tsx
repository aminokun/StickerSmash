import { View } from "react-native";

import { Image } from "expo-image";
import ImageViewer from "@/components/ImageViewer";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  return (
    <View className="flex-1 bg-[#25292e] items-center">
      <View className="flex-1">
        <ImageViewer imgSource={PlaceholderImage} />
      </View>
    </View>
  );
}
