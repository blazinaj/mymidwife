import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { colors, spacing, typography, borders } from '@/constants/theme';

type MetricType = 'blood_pressure' | 'weight' | 'blood_sugar' | 'fetal_heart_rate' | 'temperature' | 'custom';

interface MetricOption {
  id: MetricType;
  title: string;
  unit: string;
  normalRange?: { min: number; max: number };
  placeholder?: string;
}

const metricOptions: MetricOption[] = [
  {
    id: 'blood_pressure',
    title: 'Blood Pressure',
    unit: 'mmHg',
    normalRange: { min: 90, max: 140 },
    placeholder: '120/80',
  },
  {
    id: 'weight',
    title: 'Weight',
    unit: 'lbs',
    placeholder: '150.5',
  },
  {
    id: 'blood_sugar',
    title: 'Blood Sugar',
    unit: 'mg/dL',
    normalRange: { min: 70, max: 130 },
    placeholder: '100',
  },
  {
    id: 'fetal_heart_rate',
    title: 'Fetal Heart Rate',
    unit: 'bpm',
    normalRange: { min: 120, max: 160 },
    placeholder: '140',
  },
  {
    id: 'temperature',
    title: 'Temperature',
    unit: '°F',
    normalRange: { min: 97, max: 99 },
    placeholder: '98.6',
  },
  {
    id: 'custom',
    title: 'Custom Metric',
    unit: '',
    placeholder: 'Enter value',
  },
];

export default function AddHealthMetricScreen() {
  const router = useRouter();
  const [selectedMetric, setSelectedMetric] = useState<MetricType | null>(null);
  const [customMetricName, setCustomMetricName] = useState('');
  const [customMetricUnit, setCustomMetricUnit] = useState('');
  const [value, setValue] = useState('');
  const [notes, setNotes] = useState('');

  const selectedMetricDetails = metricOptions.find(m => m.id === selectedMetric);

  const handleSubmit = () => {
    // Here you would typically save the metric to your backend
    console.log({
      type: selectedMetric,
      customName: customMetricName,
      customUnit: customMetricUnit,
      value,
      notes,
      timestamp: new Date(),
    });
    
    router.back();
  };

  const isValid = () => {
    if (!selectedMetric) return false;
    if (selectedMetric === 'custom' && (!customMetricName || !customMetricUnit)) return false;
    return value.length > 0;
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <Button
            variant="ghost"
            leftIcon={<ChevronLeft size={24} color={colors.neutral[800]} />}
            title="Back"
            onPress={() => router.back()}
          />
          <AppText variant="title">Add Health Metric</AppText>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <AppText variant="bodyBold" style={styles.sectionTitle}>
            Select Metric Type
          </AppText>

          <View style={styles.metricsGrid}>
            {metricOptions.map((metric) => (
              <Card
                key={metric.id}
                variant={selectedMetric === metric.id ? 'elevated' : 'outlined'}
                style={[
                  styles.metricCard,
                  selectedMetric === metric.id && styles.selectedMetricCard,
                ]}
                onPress={() => setSelectedMetric(metric.id)}
              >
                <AppText variant="bodyBold">{metric.title}</AppText>
                {metric.id !== 'custom' && (
                  <AppText variant="caption" color={colors.neutral[600]}>
                    {metric.unit}
                  </AppText>
                )}
              </Card>
            ))}
          </View>

          {selectedMetric && (
            <>
              {selectedMetric === 'custom' ? (
                <>
                  <AppText variant="bodyBold" style={styles.sectionTitle}>
                    Custom Metric Details
                  </AppText>
                  <View style={styles.inputContainer}>
                    <AppText variant="caption">Metric Name</AppText>
                    <TextInput
                      style={styles.input}
                      value={customMetricName}
                      onChangeText={setCustomMetricName}
                      placeholder="e.g., Kick Count"
                    />
                  </View>
                  <View style={styles.inputContainer}>
                    <AppText variant="caption">Unit of Measurement</AppText>
                    <TextInput
                      style={styles.input}
                      value={customMetricUnit}
                      onChangeText={setCustomMetricUnit}
                      placeholder="e.g., kicks/hour"
                    />
                  </View>
                </>
              ) : null}

              <AppText variant="bodyBold" style={styles.sectionTitle}>
                Enter Value
              </AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  value={value}
                  onChangeText={setValue}
                  placeholder={selectedMetricDetails?.placeholder}
                  keyboardType="numeric"
                />
                {selectedMetricDetails?.normalRange && (
                  <AppText variant="caption" color={colors.neutral[600]}>
                    Normal range: {selectedMetricDetails.normalRange.min} - {selectedMetricDetails.normalRange.max} {selectedMetricDetails.unit}
                  </AppText>
                )}
              </View>

              <AppText variant="bodyBold" style={styles.sectionTitle}>
                Notes (Optional)
              </AppText>
              <View style={styles.inputContainer}>
                <TextInput
                  style={[styles.input, styles.notesInput]}
                  value={notes}
                  onChangeText={setNotes}
                  placeholder="Add any additional notes or observations"
                  multiline
                  numberOfLines={4}
                  textAlignVertical="top"
                />
              </View>
            </>
          )}
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Save Metric"
            onPress={handleSubmit}
            disabled={!isValid()}
            fullWidth
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
  },
  content: {
    flex: 1,
    padding: spacing.md,
  },
  sectionTitle: {
    marginBottom: spacing.sm,
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.xl,
  },
  metricCard: {
    width: `${100/2 - 4}%`,
    margin: spacing.xs,
    padding: spacing.md,
  },
  selectedMetricCard: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  inputContainer: {
    marginBottom: spacing.xl,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.neutral[300],
    borderRadius: borders.radius.md,
    padding: spacing.sm,
    fontSize: typography.fontSize.md,
    fontFamily: typography.fontFamily.body,
    color: colors.neutral[800],
  },
  notesInput: {
    height: 100,
    paddingTop: spacing.sm,
  },
  footer: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
  },
});