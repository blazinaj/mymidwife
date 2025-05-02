import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Plus, Activity, ChevronRight } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Button from '@/components/common/Button';
import Card from '@/components/common/Card';
import MetricCard, { MetricProps } from '@/components/healthTracker/MetricCard';
import { colors, spacing, shadows } from '@/constants/theme';

// Mock data
const healthMetrics: MetricProps[] = [
  {
    id: '1',
    title: 'Blood Pressure',
    value: '118/78',
    unit: 'mmHg',
    trend: 'stable',
    normalRange: { min: 90, max: 140 },
    date: new Date(2025, 6, 10),
  },
  {
    id: '2',
    title: 'Weight',
    value: 152.5,
    unit: 'lbs',
    trend: 'up',
    date: new Date(2025, 6, 10),
  },
  {
    id: '3',
    title: 'Fetal Heart Rate',
    value: 145,
    unit: 'bpm',
    trend: 'stable',
    normalRange: { min: 120, max: 160 },
    date: new Date(2025, 6, 8),
  },
  {
    id: '4',
    title: 'Blood Sugar',
    value: 118,
    unit: 'mg/dL',
    trend: 'up',
    normalRange: { min: 70, max: 130 },
    date: new Date(2025, 6, 6),
    isAlert: true,
  },
];

const symptoms = [
  { id: '1', name: 'Nausea', frequency: 'Occasional', severity: 'Mild', lastRecorded: new Date(2025, 6, 8) },
  { id: '2', name: 'Fatigue', frequency: 'Daily', severity: 'Moderate', lastRecorded: new Date(2025, 6, 10) },
  { id: '3', name: 'Headache', frequency: 'Rare', severity: 'Mild', lastRecorded: new Date(2025, 6, 5) },
];

export default function HealthScreen() {
  const router = useRouter();
  const [selectedTab, setSelectedTab] = useState<'metrics' | 'symptoms'>('metrics');

  const handleAddMetric = () => {
    router.push('/health/new');
  };

  const handleAddSymptom = () => {
    router.push('/health/new-symptom');
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="title">Health Tracker</AppText>
          <TouchableOpacity 
            style={styles.addButton}
            onPress={selectedTab === 'metrics' ? handleAddMetric : handleAddSymptom}
          >
            <Plus size={24} color={colors.primary[500]} />
          </TouchableOpacity>
        </View>

        {/* Summary Card */}
        <Card variant="elevated" style={styles.summaryCard}>
          <View style={styles.summaryHeader}>
            <View style={styles.summaryIcon}>
              <Activity size={24} color={colors.primary[500]} />
            </View>
            <View style={styles.summaryContent}>
              <AppText variant="headingMedium">Weekly Health Summary</AppText>
              <AppText variant="body" color={colors.neutral[600]}>
                July 8 - July 14, 2025
              </AppText>
            </View>
          </View>
          
          <View style={styles.summaryStats}>
            <View style={styles.statItem}>
              <AppText variant="caption" color={colors.neutral[600]}>
                Metrics Logged
              </AppText>
              <AppText variant="headingMedium">8</AppText>
            </View>
            
            <View style={styles.statItem}>
              <AppText variant="caption" color={colors.neutral[600]}>
                Symptoms Tracked
              </AppText>
              <AppText variant="headingMedium">3</AppText>
            </View>
            
            <View style={styles.statItem}>
              <AppText variant="caption" color={colors.neutral[600]}>
                Alerts
              </AppText>
              <AppText variant="headingMedium" color={colors.error[500]}>1</AppText>
            </View>
          </View>
          
          <Button
            title="View Full Report"
            variant="outline"
            onPress={() => console.log('View full report')}
            rightIcon={<ChevronRight size={18} color={colors.primary[500]} />}
            style={styles.viewReportButton}
          />
        </Card>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'metrics' && styles.activeTab]}
            onPress={() => setSelectedTab('metrics')}
          >
            <AppText
              variant={selectedTab === 'metrics' ? 'bodyBold' : 'body'}
              color={selectedTab === 'metrics' ? colors.primary[500] : colors.neutral[600]}
            >
              Health Metrics
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, selectedTab === 'symptoms' && styles.activeTab]}
            onPress={() => setSelectedTab('symptoms')}
          >
            <AppText
              variant={selectedTab === 'symptoms' ? 'bodyBold' : 'body'}
              color={selectedTab === 'symptoms' ? colors.primary[500] : colors.neutral[600]}
            >
              Symptoms
            </AppText>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {selectedTab === 'metrics' ? (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.metricsContainer}>
              {healthMetrics.map(metric => (
                <MetricCard key={metric.id} {...metric} />
              ))}
              
              <Button
                title="Add New Metric"
                variant="outline"
                onPress={handleAddMetric}
                leftIcon={<Plus size={18} color={colors.primary[500]} />}
                style={styles.addMetricButton}
              />
            </View>
          </ScrollView>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.symptomsContainer}>
              {symptoms.map(symptom => (
                <Card key={symptom.id} variant="outlined" style={styles.symptomCard}>
                  <View style={styles.symptomHeader}>
                    <AppText variant="bodyBold">{symptom.name}</AppText>
                    <View style={[
                      styles.severityBadge,
                      symptom.severity === 'Mild' ? styles.mildBadge :
                      symptom.severity === 'Moderate' ? styles.moderateBadge :
                      styles.severeBadge
                    ]}>
                      <AppText 
                        variant="caption" 
                        color={colors.neutral.white}
                        style={styles.severityText}
                      >
                        {symptom.severity}
                      </AppText>
                    </View>
                  </View>
                  
                  <View style={styles.symptomDetails}>
                    <View style={styles.symptomDetail}>
                      <AppText variant="caption" color={colors.neutral[600]}>
                        Frequency
                      </AppText>
                      <AppText variant="body">{symptom.frequency}</AppText>
                    </View>
                    
                    <View style={styles.symptomDetail}>
                      <AppText variant="caption" color={colors.neutral[600]}>
                        Last Recorded
                      </AppText>
                      <AppText variant="body">
                        {symptom.lastRecorded.toLocaleDateString()}
                      </AppText>
                    </View>
                  </View>
                </Card>
              ))}
              
              <Button
                title="Add New Symptom"
                variant="outline"
                onPress={handleAddSymptom}
                leftIcon={<Plus size={18} color={colors.primary[500]} />}
                style={styles.addSymptomButton}
              />
            </View>
          </ScrollView>
        )}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.lg,
  },
  addButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  summaryCard: {
    marginBottom: spacing.lg,
  },
  summaryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  summaryIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  summaryContent: {
    flex: 1,
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: colors.neutral[100],
    borderRadius: 12,
    padding: spacing.md,
    marginBottom: spacing.md,
  },
  statItem: {
    alignItems: 'center',
  },
  viewReportButton: {
    alignSelf: 'flex-start',
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    marginBottom: spacing.md,
  },
  tab: {
    paddingVertical: spacing.sm,
    marginRight: spacing.lg,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary[500],
  },
  metricsContainer: {
    paddingBottom: spacing.xl,
  },
  addMetricButton: {
    marginTop: spacing.sm,
  },
  symptomsContainer: {
    paddingBottom: spacing.xl,
  },
  symptomCard: {
    marginBottom: spacing.md,
  },
  symptomHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  severityBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.xs / 2,
    borderRadius: 12,
  },
  mildBadge: {
    backgroundColor: colors.success[500],
  },
  moderateBadge: {
    backgroundColor: colors.warning[500],
  },
  severeBadge: {
    backgroundColor: colors.error[500],
  },
  severityText: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  symptomDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  symptomDetail: {
    flex: 1,
  },
  addSymptomButton: {
    marginTop: spacing.sm,
  },
});