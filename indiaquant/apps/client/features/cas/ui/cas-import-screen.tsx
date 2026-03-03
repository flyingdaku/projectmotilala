import { useState } from "react";
import { View, Text, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import * as DocumentPicker from "expo-document-picker";
import * as FileSystem from "expo-file-system";
import { useCASImport } from "../model/use-cas-import";

/**
 * CAS Import UI.
 * Step 1: Pick PDF → Step 2: Parse client-side → Step 3: Save to Supabase.
 *
 * Security: PDF never leaves device. Only structured JSON is uploaded.
 */
export function CASImportScreen() {
  const { importCAS, isImporting, progress, error, isSuccess, reset } = useCASImport();
  const [fileName, setFileName] = useState<string | null>(null);

  const handlePickPDF = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "application/pdf",
        copyToCacheDirectory: true,
      });

      if (result.canceled) return;

      const file = result.assets[0];
      setFileName(file.name);

      // Read file as base64
      const base64 = await FileSystem.readAsStringAsync(file.uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      importCAS(base64);
    } catch (err) {
      Alert.alert("Error", "Could not read the PDF file. Please try again.");
    }
  };

  if (isSuccess) {
    return (
      <View className="bg-white dark:bg-gray-900 rounded-card p-6 items-center gap-4">
        <Text className="text-4xl">✅</Text>
        <Text className="text-lg font-bold text-gray-900 dark:text-white text-center">
          Import Complete!
        </Text>
        <Text className="text-gray-500 dark:text-gray-400 text-center text-sm">
          Your portfolio has been updated with the latest CAS data.
        </Text>
        <TouchableOpacity
          className="bg-brand-500 rounded-card px-6 py-3"
          onPress={reset}
        >
          <Text className="text-white font-semibold">Import Another</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View className="bg-white dark:bg-gray-900 rounded-card p-6 gap-4">
      <Text className="text-base font-semibold text-gray-900 dark:text-white">
        Import CAS Statement
      </Text>

      <Text className="text-sm text-gray-500 dark:text-gray-400">
        Download your Consolidated Account Statement from CAMS or KFintech and import it here.
        Your PDF is parsed entirely on your device — it never leaves your phone.
      </Text>

      {/* Steps */}
      <View className="gap-2">
        {[
          { step: "1", text: "Download CAS from CAMS/KFintech website" },
          { step: "2", text: "Select the PDF below" },
          { step: "3", text: "We parse it on-device and sync your portfolio" },
        ].map((item) => (
          <View key={item.step} className="flex-row items-center gap-3">
            <View className="w-6 h-6 rounded-full bg-brand-100 dark:bg-brand-900 items-center justify-center">
              <Text className="text-brand-600 dark:text-brand-300 text-xs font-bold">
                {item.step}
              </Text>
            </View>
            <Text className="text-sm text-gray-600 dark:text-gray-400 flex-1">{item.text}</Text>
          </View>
        ))}
      </View>

      {/* File selected indicator */}
      {fileName && !isImporting && (
        <View className="bg-gray-50 dark:bg-gray-800 rounded-lg px-4 py-3 flex-row items-center gap-2">
          <Text className="text-lg">📄</Text>
          <Text className="text-sm text-gray-700 dark:text-gray-300 flex-1" numberOfLines={1}>
            {fileName}
          </Text>
        </View>
      )}

      {/* Progress */}
      {isImporting && (
        <View className="bg-brand-50 dark:bg-brand-950 rounded-lg px-4 py-3 flex-row items-center gap-3">
          <ActivityIndicator size="small" color="#f97316" />
          <Text className="text-sm text-brand-700 dark:text-brand-300 flex-1">
            {progress ?? "Processing..."}
          </Text>
        </View>
      )}

      {/* Error */}
      {error && (
        <View className="bg-red-50 dark:bg-red-950 rounded-lg px-4 py-3">
          <Text className="text-sm text-loss">
            {error instanceof Error ? error.message : "Import failed. Please try again."}
          </Text>
        </View>
      )}

      {/* CTA */}
      <TouchableOpacity
        className={`rounded-card py-3.5 items-center ${
          isImporting ? "bg-gray-200 dark:bg-gray-700" : "bg-brand-500"
        }`}
        onPress={handlePickPDF}
        disabled={isImporting}
      >
        {isImporting ? (
          <ActivityIndicator color="#f97316" />
        ) : (
          <Text className="text-white font-semibold">Select CAS PDF</Text>
        )}
      </TouchableOpacity>

      <Text className="text-xs text-gray-400 text-center">
        🔒 Your PDF is processed locally. Only transaction data is stored.
      </Text>
    </View>
  );
}
