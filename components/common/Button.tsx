import React from 'react';
import { 
  TouchableOpacity, 
  StyleSheet, 
  ActivityIndicator, 
  StyleProp, 
  ViewStyle,
  TextStyle
} from 'react-native';
import { colors, borders, spacing, typography } from '@/constants/theme';
import AppText from './AppText';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  disabled?: boolean;
  loading?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export default function Button({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  disabled = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}: ButtonProps) {
  const buttonStyles = [
    styles.button,
    styles[variant],
    styles[`${size}Size`],
    fullWidth && styles.fullWidth,
    disabled && styles.disabled,
    style,
  ];

  const textColor = 
    variant === 'primary' || variant === 'secondary'
      ? colors.neutral.white
      : variant === 'outline'
      ? colors.primary[500]
      : colors.primary[500];

  return (
    <TouchableOpacity
      style={buttonStyles}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator 
          color={textColor} 
          size="small" 
        />
      ) : (
        <>
          {leftIcon && <span style={{ marginRight: spacing.sm }}>{leftIcon}</span>}
          <AppText
            variant={size === 'sm' ? 'body' : 'bodyBold'}
            color={textColor}
            style={textStyle}
          >
            {title}
          </AppText>
          {rightIcon && <span style={{ marginLeft: spacing.sm }}>{rightIcon}</span>}
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: borders.radius.md,
  },
  primary: {
    backgroundColor: colors.primary[500],
  },
  secondary: {
    backgroundColor: colors.secondary[500],
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: borders.width.normal,
    borderColor: colors.primary[500],
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  smSize: {
    paddingVertical: spacing.xs,
    paddingHorizontal: spacing.md,
  },
  mdSize: {
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
  },
  lgSize: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
  },
  fullWidth: {
    width: '100%',
  },
  disabled: {
    opacity: 0.5,
  },
});