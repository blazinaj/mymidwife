import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '@/components/common/Card';
import AppText from '@/components/common/AppText';
import { colors, spacing } from '@/constants/theme';

export interface MetricProps {
  id: string;
  title: string;
  value: number | string;
  unit?: string;
  trend?: 'up' | 'down' | 'stable';
  normalRange?: { min: number; max: number };
  date: Date;
  isAlert?: boolean;
}

export default function MetricCard({
  title,
  value,
  unit,
  trend,
  normalRange,
  date,
  isAlert = false,
}: MetricProps) {
  const getStatusColor = () => {
    if (isAlert) return colors.error[500];
    if (trend === 'up') return colors.warning[500];
    if (trend === 'down') return colors.accent[500];
    return colors.success[500];
  };

  const isWithinRange = () => {
    if (!normalRange || typeof value !== 'number') return true;
    return value >= normalRange.min && value <= normalRange.max;
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <Card 
      variant="elevated" 
      style={[
        styles.card,
        isAlert && styles.alertCard
      ]}
    >
      <View style={styles.header}>
        <AppText variant="bodyBold">{title}</AppText>
        <View style={[
          styles.statusIndicator, 
          { backgroundColor: getStatusColor() }
        ]} />
      </View>
      
      <View style={styles.valueContainer}>
        <AppText variant="title" style={styles.value}>
          {value}
        </AppText>
        {unit && (
          <AppText variant="body" color={colors.neutral[500]} style={styles.unit}>
            {unit}
          </AppText>
        )}
      </View>
      
      {normalRange && typeof value === 'number' && (
        <View style={styles.rangeContainer}>
          <AppText 
            variant="caption" 
            color={isWithinRange() ? colors.success[500] : colors.error[500]}
          >
            {isWithinRange() 
              ? 'Within normal range' 
              : value < normalRange.min 
                ? 'Below normal range'
                : 'Above normal range'
            }
          </AppText>
          <AppText variant="caption" color={colors.neutral[500]}>
            Normal: {normalRange.min} - {normalRange.max} {unit}
          </AppText>
        </View>
      )}
      
      <View style={styles.footer}>
        <AppText variant="caption" color={colors.neutral[500]}>
          Recorded on {formatDate(date)}
        </AppText>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
  },
  alertCard: {
    borderLeftWidth: 4,
    borderLeftColor: colors.error[500],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  valueContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginBottom: spacing.sm,
  },
  value: {
    fontSize: 36,
  },
  unit: {
    marginLeft: spacing.xs,
  },
  rangeContainer: {
    backgroundColor: colors.neutral[100],
    borderRadius: 8,
    padding: spacing.sm,
    marginBottom: spacing.sm,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    paddingTop: spacing.sm,
  },
});