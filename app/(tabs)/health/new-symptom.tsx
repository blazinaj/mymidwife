import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ChevronLeft } from 'lucide-react-native';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import { colors, spacing, typography, borders } from '@/constants/theme';

type Severity = 'Mild' | 'Moderate' | 'Severe';
type Frequency = 'Rare' | 'Occasional' | 'Frequent' | 'Daily';

const severityOptions: Severity[] = ['Mild', 'Moderate', 'Severe'];
const frequencyOptions: Frequency[] = ['Rare', 'Occasional', 'Frequent', 'Daily'];

const commonSymptoms = [
  'Nausea',
  'Fatigue',
  'Headache',
  'Back Pain',
  'Swelling',
  'Heartburn',
  'Dizziness',
  'Insomnia',
];

export default function AddSymptomScreen() {
  const router = useRouter();
  const [symptomName, setSymptomName] = useState('');
  const [customSymptom, setCustomSymptom] = useState('');
  const [severity, setSeverity] = useState<Severity | null>(null);
  const [frequency, setFrequency] = useState<Frequency | null>(null);
  const [notes, setNotes] = useState('');

  const handleSubmit = () => {
    // Here you would typically save the symptom to your backend
    console.log({
      name: symptomName === 'custom' ? customSymptom : symptomName,
      severity,
      frequency,
      notes,
      timestamp: new Date(),
    });
    
    router.back();
  };

  const getSeverityColor = (level: Severity) => {
    switch (level) {
      case 'Mild': return colors.success[500];
      case 'Moderate': return colors.warning[500];
      case 'Severe': return colors.error[500];
    }
  };

  const isValid = () => {
    if (!symptomName) return false;
    if (symptomName === 'custom' && !customSymptom) return false;
    return severity !== null && frequency !== null;
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
          <AppText variant="title">Track New Symptom</AppText>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          <AppText variant="bodyBold" style={styles.sectionTitle}>
            Select Symptom
          </AppText>

          <View style={styles.symptomsGrid}>
            {commonSymptoms.map((name) => (
              <Card
                key={name}
                variant={symptomName === name ? 'elevated' : 'outlined'}
                style={[
                  styles.symptomCard,
                  symptomName === name && styles.selectedSymptomCard,
                ]}
                onPress={() => {
                  setSymptomName(name);
                  setCustomSymptom('');
                }}
              >
                <AppText variant="bodyBold">{name}</AppText>
              </Card>
            ))}
            <Card
              variant={symptomName === 'custom' ? 'elevated' : 'outlined'}
              style={[
                styles.symptomCard,
                symptomName === 'custom' && styles.selectedSymptomCard,
              ]}
              onPress={() => setSymptomName('custom')}
            >
              <AppText variant="bodyBold">Custom Symptom</AppText>
            </Card>
          </View>

          {symptomName === 'custom' && (
            <View style={styles.inputContainer}>
              <AppText variant="caption">Custom Symptom Name</AppText>
              <TextInput
                style={styles.input}
                value={customSymptom}
                onChangeText={setCustomSymptom}
                placeholder="Enter symptom name"
              />
            </View>
          )}

          <AppText variant="bodyBold" style={styles.sectionTitle}>
            Severity
          </AppText>
          <View style={styles.severityContainer}>
            {severityOptions.map((option) => (
              <Card
                key={option}
                variant={severity === option ? 'elevated' : 'outlined'}
                style={[
                  styles.severityCard,
                  severity === option && {
                    backgroundColor: getSeverityColor(option),
                  },
                ]}
                onPress={() => setSeverity(option)}
              >
                <AppText
                  variant="bodyBold"
                  color={severity === option ? colors.neutral.white : colors.neutral[800]}
                >
                  {option}
                </AppText>
              </Card>
            ))}
          </View>

          <AppText variant="bodyBold" style={styles.sectionTitle}>
            Frequency
          </AppText>
          <View style={styles.frequencyContainer}>
            {frequencyOptions.map((option) => (
              <Card
                key={option}
                variant={frequency === option ? 'elevated' : 'outlined'}
                style={[
                  styles.frequencyCard,
                  frequency === option && styles.selectedFrequencyCard,
                ]}
                onPress={() => setFrequency(option)}
              >
                <AppText
                  variant="bodyBold"
                  color={frequency === option ? colors.primary[500] : colors.neutral[800]}
                >
                  {option}
                </AppText>
              </Card>
            ))}
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
        </ScrollView>

        <View style={styles.footer}>
          <Button
            title="Save Symptom"
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
  symptomsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -spacing.xs,
    marginBottom: spacing.xl,
  },
  symptomCard: {
    width: `${100/2 - 4}%`,
    margin: spacing.xs,
    padding: spacing.md,
  },
  selectedSymptomCard: {
    borderColor: colors.primary[500],
    backgroundColor: colors.primary[50],
  },
  severityContainer: {
    flexDirection: 'row',
    marginBottom: spacing.xl,
  },
  severityCard: {
    flex: 1,
    marginHorizontal: spacing.xs,
    padding: spacing.md,
    alignItems: 'center',
  },
  frequencyContainer: {
    marginBottom: spacing.xl,
  },
  frequencyCard: {
    marginBottom: spacing.sm,
    padding: spacing.md,
    alignItems: 'center',
  },
  selectedFrequencyCard: {
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