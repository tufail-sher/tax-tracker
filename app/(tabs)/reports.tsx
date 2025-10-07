import { Text, View } from 'react-native';

export default function ReportsTab() {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-xl font-inter-bold">Reports</Text>
      <Text className="text-base font-inter mt-4 text-center mx-8">
        View your tax reports and summaries here. Generate reports by category, date range, and more.
      </Text>
    </View>
  );
}