import React from 'react';
import { View, StyleSheet } from 'react-native';
import { format } from 'date-fns';
import AppText from '@/components/common/AppText';
import { colors, spacing, borders } from '@/constants/theme';

export interface MessageProps {
  id: string;
  text: string;
  sender: 'user' | 'provider';
  timestamp: Date;
  read?: boolean;
  attachments?: Array<{ id: string; type: string; url: string; name: string }>;
}

export default function MessageBubble({
  text,
  sender,
  timestamp,
  read,
  attachments,
}: MessageProps) {
  const isUser = sender === 'user';
  
  return (
    <View style={[
      styles.container, 
      isUser ? styles.userContainer : styles.providerContainer
    ]}>
      <View style={[
        styles.bubble,
        isUser ? styles.userBubble : styles.providerBubble
      ]}>
        <AppText 
          color={isUser ? colors.neutral.white : colors.neutral[800]}
          style={styles.messageText}
        >
          {text}
        </AppText>
        
        {attachments && attachments.length > 0 && (
          <View style={styles.attachments}>
            {attachments.map(attachment => (
              <View 
                key={attachment.id} 
                style={styles.attachmentItem}
              >
                <AppText 
                  variant="caption" 
                  color={isUser ? colors.neutral[100] : colors.primary[500]}
                >
                  {attachment.name}
                </AppText>
              </View>
            ))}
          </View>
        )}
      </View>
      
      <View style={[
        styles.metaContainer,
        isUser ? styles.userMeta : styles.providerMeta
      ]}>
        <AppText 
          variant="caption" 
          color={colors.neutral[500]} 
          style={styles.timestamp}
        >
          {format(timestamp, 'h:mm a')}
        </AppText>
        
        {isUser && (
          <AppText 
            variant="caption" 
            color={read ? colors.success[500] : colors.neutral[400]}
          >
            {read ? 'Read' : 'Sent'}
          </AppText>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: spacing.xs,
    maxWidth: '80%',
  },
  userContainer: {
    alignSelf: 'flex-end',
  },
  providerContainer: {
    alignSelf: 'flex-start',
  },
  bubble: {
    padding: spacing.md,
    borderRadius: borders.radius.lg,
  },
  userBubble: {
    backgroundColor: colors.primary[500],
    borderBottomRightRadius: 4,
  },
  providerBubble: {
    backgroundColor: colors.neutral[100],
    borderBottomLeftRadius: 4,
  },
  messageText: {
    lineHeight: 20,
  },
  attachments: {
    marginTop: spacing.sm,
  },
  attachmentItem: {
    padding: spacing.xs,
    marginVertical: spacing.xs / 2,
    borderRadius: borders.radius.sm,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  metaContainer: {
    flexDirection: 'row',
    marginTop: spacing.xs / 2,
  },
  userMeta: {
    justifyContent: 'flex-end',
  },
  providerMeta: {
    justifyContent: 'flex-start',
  },
  timestamp: {
    marginRight: spacing.sm,
  },
});