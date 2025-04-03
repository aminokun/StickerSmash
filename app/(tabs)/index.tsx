import { useState, useRef } from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { captureRef } from "react-native-view-shot";

import { type ImageSource } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

import Button from "@/components/Button";
import ImageViewer from "@/components/ImageViewer";
import IconButton from "@/components/IconButton";
import CircleButton from "@/components/CircleButton";
import EmojiPicker from "@/components/EmojiPicker";
import EmojiList from "@/components/EmojiList";
import EmojiSticker from "@/components/EmojiSticker";

const PlaceholderImage = require("@/assets/images/background-image.png");

export default function Index() {
  const imageRef = useRef<View>(null);
  const [status, requestPermissions] = MediaLibrary.usePermissions();
  const [showAppOptions, setShowAppOptions] = useState<boolean>(false);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined
  );
  const [pickedEmoji, setPickedEmoji] = useState<ImageSource | undefined>(
    undefined
  );

  if (status === null) {
    requestPermissions();
  }

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      console.log(result, "🙈");
      setSelectedImage(result.assets[0].uri);
      setShowAppOptions(true);
    } else {
      console.log("You did not select any image. 😔");
    }
  };

  const onReset = () => {
    setShowAppOptions(false);
  };

  const onAddSticker = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = async () => {
    try {
      const localUri = await captureRef(imageRef, {
        height: 440,
        quality: 1,
      });

      await MediaLibrary.saveToLibraryAsync(localUri);
      if (localUri) {
        alert("Saved 🤪!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GestureHandlerRootView
      style={{ alignItems: "center", flex: 1, backgroundColor: "#25292e"}}
    >
      <View style={{ flex: 1 }}>
        <View ref={imageRef} collapsable={false}>
          <ImageViewer
            imgSource={PlaceholderImage}
            selectedImage={selectedImage}
          />
          {pickedEmoji && (
            <EmojiSticker imageSize={40} stickerSource={pickedEmoji} />
          )}
        </View>
        {showAppOptions ? (
          <View className="absolute bottom-20">
            <View className="items-center flex-row">
              <IconButton icon="refresh" label="Reset" onPress={onReset} />
              <CircleButton onPress={onAddSticker} />
              <IconButton
                icon="save-alt"
                label="Save"
                onPress={onSaveImageAsync}
              />
            </View>
          </View>
        ) : (
          <View className="flex-[0.333] items-center">
            <Button
              theme="primary"
              label="Choose a photo"
              onPress={pickImageAsync}
            />
            <Button
              label="Use this photo"
              onPress={() => setShowAppOptions(true)}
            />
          </View>
        )}
        <EmojiPicker isVisible={isModalVisible} onClose={onModalClose}>
          <EmojiList onSelect={setPickedEmoji} onCloseModal={onModalClose} />
        </EmojiPicker>
      </View>
    </GestureHandlerRootView>
  );
}
