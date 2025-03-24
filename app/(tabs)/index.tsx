// import { Link } from "expo-router";
import { Text, View } from "react-native";
import Onboarding from "../onboardingScreen";

export default function Index() {
  return (
    <View
      className="flex items-center justify-center h-full"
    >
      {/* <Onboarding /> */}
      <Text className="text-5xl text-primary-green">Welcome</Text>
      {/* <Link href="/onboarding">
        Onboarding
      </Link> */}
    </View>
  );
}
