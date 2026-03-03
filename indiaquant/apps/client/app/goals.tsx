import { useState } from "react";
import { ScrollView, View, Text, TouchableOpacity, TextInput, Modal, ActivityIndicator } from "react-native";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "~/lib/supabase";
import { useAuth } from "~/features/auth/model/use-auth";
import { formatINR } from "@indiaquant/finance-math";
import Decimal from "decimal.js";

/**
 * Goals screen — Phase 4.
 * Create, track, and manage financial goals with progress visualization.
 */
export default function GoalsScreen() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalDate, setNewGoalDate] = useState("");

  const { data: goals, isLoading } = useQuery({
    queryKey: ["goals", user?.id],
    queryFn: async () => {
      if (!user) return [];
      const { data, error } = await supabase
        .from("goals")
        .select("*")
        .eq("user_id", user.id)
        .order("target_date");
      if (error) throw error;
      return data ?? [];
    },
    enabled: !!user,
  });

  const addGoal = useMutation({
    mutationFn: async () => {
      if (!user) throw new Error("Not authenticated");
      const { error } = await supabase.from("goals").insert({
        user_id: user.id,
        name: newGoalName,
        target_amount: parseFloat(newGoalTarget),
        target_date: newGoalDate,
        current_value: 0,
      });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["goals"] });
      setShowAddModal(false);
      setNewGoalName("");
      setNewGoalTarget("");
      setNewGoalDate("");
    },
  });

  const deleteGoal = useMutation({
    mutationFn: async (goalId: string) => {
      const { error } = await supabase.from("goals").delete().eq("id", goalId);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["goals"] }),
  });

  const GOAL_ICONS = ["🏠", "🎓", "✈️", "🚗", "💍", "🏖️", "💰", "🏥"];

  return (
    <ScrollView className="flex-1 bg-gray-50 dark:bg-gray-950 pb-8">
      <View className="px-4 pt-14 pb-4 flex-row items-center justify-between">
        <View>
          <Text className="text-2xl font-bold text-gray-900 dark:text-white">Goals</Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Track your financial milestones
          </Text>
        </View>
        <TouchableOpacity
          className="bg-brand-500 rounded-full w-10 h-10 items-center justify-center"
          onPress={() => setShowAddModal(true)}
        >
          <Text className="text-white text-xl font-bold">+</Text>
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View className="items-center py-20">
          <ActivityIndicator size="large" color="#f97316" />
        </View>
      ) : !goals || goals.length === 0 ? (
        <View className="items-center py-20 px-8">
          <Text className="text-4xl mb-4">🎯</Text>
          <Text className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
            No goals yet
          </Text>
          <Text className="text-sm text-gray-500 dark:text-gray-400 text-center mb-6">
            Set financial goals and track your progress towards them.
          </Text>
          <TouchableOpacity
            className="bg-brand-500 rounded-card px-6 py-3"
            onPress={() => setShowAddModal(true)}
          >
            <Text className="text-white font-semibold">Add First Goal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="px-4 gap-4">
          {goals.map((goal: any, idx: number) => {
            const progress = goal.target_amount > 0
              ? Math.min(100, (parseFloat(goal.current_value) / parseFloat(goal.target_amount)) * 100)
              : 0;
            const daysLeft = Math.max(0, Math.ceil(
              (new Date(goal.target_date).getTime() - Date.now()) / (1000 * 60 * 60 * 24)
            ));
            const icon = GOAL_ICONS[idx % GOAL_ICONS.length];

            return (
              <View key={goal.id} className="bg-white dark:bg-gray-900 rounded-card p-5 shadow-sm">
                <View className="flex-row items-start justify-between mb-3">
                  <View className="flex-row items-center gap-3 flex-1">
                    <Text className="text-2xl">{icon}</Text>
                    <View className="flex-1">
                      <Text className="text-base font-semibold text-gray-900 dark:text-white">
                        {goal.name}
                      </Text>
                      <Text className="text-xs text-gray-500 dark:text-gray-400">
                        Target: {new Date(goal.target_date).toLocaleDateString("en-IN", {
                          month: "short", year: "numeric"
                        })} · {daysLeft} days left
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="p-1"
                    onPress={() => deleteGoal.mutate(goal.id)}
                  >
                    <Text className="text-gray-400 text-base">✕</Text>
                  </TouchableOpacity>
                </View>

                {/* Progress bar */}
                <View className="mb-2">
                  <View className="flex-row justify-between mb-1">
                    <Text className="text-sm font-semibold text-gray-900 dark:text-white">
                      {formatINR(new Decimal(goal.current_value))}
                    </Text>
                    <Text className="text-sm text-gray-500 dark:text-gray-400">
                      of {formatINR(new Decimal(goal.target_amount))}
                    </Text>
                  </View>
                  <View className="h-2.5 bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                    <View
                      className={`h-full rounded-full ${
                        progress >= 100 ? "bg-gain" : "bg-brand-500"
                      }`}
                      style={{ width: `${progress}%` }}
                    />
                  </View>
                  <Text className="text-xs text-gray-400 mt-1 text-right">
                    {progress.toFixed(1)}% complete
                  </Text>
                </View>

                {/* Remaining */}
                {progress < 100 && (
                  <Text className="text-xs text-gray-500 dark:text-gray-400">
                    Still need: {formatINR(new Decimal(
                      Math.max(0, parseFloat(goal.target_amount) - parseFloat(goal.current_value))
                    ))}
                  </Text>
                )}
                {progress >= 100 && (
                  <Text className="text-xs text-gain font-semibold">🎉 Goal achieved!</Text>
                )}
              </View>
            );
          })}
        </View>
      )}

      {/* Add Goal Modal */}
      <Modal
        visible={showAddModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowAddModal(false)}
      >
        <View className="flex-1 justify-end bg-black/50">
          <View className="bg-white dark:bg-gray-900 rounded-t-3xl p-6 gap-4">
            <Text className="text-lg font-bold text-gray-900 dark:text-white">New Goal</Text>

            <View className="gap-3">
              <View>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Goal Name</Text>
                <TextInput
                  className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white"
                  placeholder="e.g. Home Down Payment"
                  value={newGoalName}
                  onChangeText={setNewGoalName}
                />
              </View>
              <View>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Target Amount (₹)</Text>
                <TextInput
                  className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white"
                  placeholder="e.g. 5000000"
                  value={newGoalTarget}
                  onChangeText={setNewGoalTarget}
                  keyboardType="numeric"
                />
              </View>
              <View>
                <Text className="text-sm text-gray-600 dark:text-gray-400 mb-1">Target Date (YYYY-MM-DD)</Text>
                <TextInput
                  className="border border-gray-200 dark:border-gray-700 rounded-lg px-3 py-2.5 text-gray-900 dark:text-white"
                  placeholder="e.g. 2030-01-01"
                  value={newGoalDate}
                  onChangeText={setNewGoalDate}
                />
              </View>
            </View>

            <View className="flex-row gap-3">
              <TouchableOpacity
                className="flex-1 border border-gray-200 dark:border-gray-700 rounded-card py-3 items-center"
                onPress={() => setShowAddModal(false)}
              >
                <Text className="text-gray-700 dark:text-gray-300 font-semibold">Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className={`flex-1 rounded-card py-3 items-center ${
                  addGoal.isPending ? "bg-gray-300" : "bg-brand-500"
                }`}
                onPress={() => addGoal.mutate()}
                disabled={addGoal.isPending || !newGoalName || !newGoalTarget || !newGoalDate}
              >
                {addGoal.isPending ? (
                  <ActivityIndicator color="white" size="small" />
                ) : (
                  <Text className="text-white font-semibold">Save Goal</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}
