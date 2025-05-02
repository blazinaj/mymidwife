import React from 'react';
import { 
  View, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  StyleProp, 
  ViewStyle,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing } from '@/constants/theme';

interface ScreenProps {
  children: React.ReactNode;
  scroll?: boolean;
  safeArea?: boolean;
  statusBarColor?: string;
  backgroundStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardAvoiding?: boolean;
  edges?: Array<'top' | 'right' | 'bottom' | 'left'>;
}

export default function Screen({
  children,
  scroll = true,
  safeArea = true,
  statusBarColor = colors.neutral.white,
  backgroundStyle,
  contentContainerStyle,
  keyboardAvoiding = false,
  edges = ['top', 'right', 'bottom', 'left'],
}: ScreenProps) {
  // Base container style
  const containerStyle = [
    styles.container,
    backgroundStyle,
  ];

  // Create safe area component with specified edges
  const Container = safeArea ? SafeAreaView : View;

  const renderContent = () => {
    const content = (
      <>
        <StatusBar backgroundColor={statusBarColor} barStyle="dark-content" />
        {scroll ? (
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={[
              styles.scrollContent,
              contentContainerStyle,
            ]}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.contentContainer, contentContainerStyle]}>
            {children}
          </View>
        )}
      </>
    );

    if (keyboardAvoiding && Platform.OS === 'ios') {
      return (
        <KeyboardAvoidingView 
          style={styles.keyboardAvoiding} 
          behavior="padding"
        >
          {content}
        </KeyboardAvoidingView>
      );
    }

    return content;
  };

  return <Container style={containerStyle}>{renderContent()}</Container>;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  keyboardAvoiding: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: spacing.xl,
  },
  contentContainer: {
    flex: 1,
  },
});