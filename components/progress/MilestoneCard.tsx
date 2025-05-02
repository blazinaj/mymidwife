import React from 'react';
import { View, StyleSheet } from 'react-native';
import { CircleCheck as CheckCircle2 } from 'lucide-react-native';
import Card from '@/components/common/Card';
import AppText from '@/components/common/AppText';
import { colors, spacing, borders } from '@/constants/theme';

export interface MilestoneProps {
  id: string;
  title: string;
  description: string;
  week: number;
  isCompleted: boolean;
  isCurrent: boolean;
  date?: Date;
}

export default function MilestoneCard({
  title,
  description,
  week,
  isCompleted,
  isCurrent,
  date,
}: MilestoneProps) {
  return (
    <Card 
      variant={isCurrent ? "elevated" : "default"}
      style={[
        styles.card,
        isCurrent && styles.currentCard,
        isCompleted && styles.completedCard
      ]}
    >
      <View style={styles.header}>
        <View style={styles.weekContainer}>
          <View style={[
            styles.weekBadge,
            isCompleted && styles.completedWeekBadge,
            isCurrent && styles.currentWeekBadge
          ]}>
            <AppText 
              variant="bodyBold" 
              color={isCompleted || isCurrent ? colors.neutral.white : colors.primary[500]}
              align="center"
            >
              Week {week}
            </AppText>
          </View>
        </View>
        
        {isCompleted && (
          <CheckCircle2 color={colors.success[500]} size={24} />
        )}
      </View>
      
      <AppText variant="headingMedium" style={styles.title}>
        {title}
      </AppText>
      
      <AppText variant="body" color={colors.neutral[700]} style={styles.description}>
        {description}
      </AppText>
      
      {date && (
        <View style={styles.dateContainer}>
          <AppText variant="caption" color={colors.neutral[500]}>
            {date.toLocaleDateString()}
          </AppText>
        </View>
      )}
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: spacing.md,
    borderLeftWidth: 4,
    borderLeftColor: colors.neutral[300],
  },
  currentCard: {
    borderLeftColor: colors.primary[500],
  },
  completedCard: {
    borderLeftColor: colors.success[500],
    opacity: 0.8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  weekContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weekBadge: {
    backgroundColor: colors.neutral[200],
    borderRadius: borders.radius.sm,
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.sm,
    minWidth: 80,
  },
  completedWeekBadge: {
    backgroundColor: colors.success[500],
  },
  currentWeekBadge: {
    backgroundColor: colors.primary[500],
  },
  title: {
    marginBottom: spacing.xs,
  },
  description: {
    marginBottom: spacing.sm,
  },
  dateContainer: {
    padding: spacing.xs,
    backgroundColor: colors.neutral[100],
    borderRadius: borders.radius.sm,
    alignSelf: 'flex-start',
  },
});