import React from 'react';
import { Text, TextProps, StyleSheet } from 'react-native';
import { typography, colors } from '@/constants/theme';

interface AppTextProps extends TextProps {
  variant?: 'body' | 'bodyBold' | 'heading' | 'headingMedium' | 'title' | 'subtitle' | 'caption';
  color?: string;
  align?: 'auto' | 'left' | 'right' | 'center' | 'justify';
  children: React.ReactNode;
}

export default function AppText({
  variant = 'body',
  color = colors.neutral[800],
  align = 'left',
  style,
  children,
  ...props
}: AppTextProps) {
  return (
    <Text
      style={[
        styles.text,
        styles[variant],
        { color, textAlign: align },
        style,
      ]}
      {...props}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  text: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  body: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  bodyBold: {
    fontFamily: typography.fontFamily.bodyBold,
    fontSize: typography.fontSize.md,
    lineHeight: typography.fontSize.md * typography.lineHeight.normal,
  },
  heading: {
    fontFamily: typography.fontFamily.heading,
    fontSize: typography.fontSize['2xl'],
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  headingMedium: {
    fontFamily: typography.fontFamily.headingMedium,
    fontSize: typography.fontSize.xl,
    lineHeight: typography.fontSize.xl * typography.lineHeight.tight,
  },
  title: {
    fontFamily: typography.fontFamily.heading,
    fontSize: typography.fontSize['3xl'],
    lineHeight: typography.fontSize['3xl'] * typography.lineHeight.tight,
  },
  subtitle: {
    fontFamily: typography.fontFamily.headingMedium,
    fontSize: typography.fontSize.lg,
    lineHeight: typography.fontSize.lg * typography.lineHeight.normal,
  },
  caption: {
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.sm,
    lineHeight: typography.fontSize.sm * typography.lineHeight.normal,
    color: colors.neutral[500],
  },
});