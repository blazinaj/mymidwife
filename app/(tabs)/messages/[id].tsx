import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  KeyboardAvoidingView, 
  Platform,
  TouchableOpacity,
  Image,
  Keyboard,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, Send, Paperclip, Image as ImageIcon } from 'lucide-react-native';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import MessageBubble, { MessageProps } from '@/components/messaging/MessageBubble';
import { colors, spacing, borders, typography } from '@/constants/theme';

// Mock data - in a real app, this would come from your API
const mockMessages: MessageProps[] = [
  {
    id: '1',
    text: "Hi Emma, how are you feeling today? Any new symptoms we should discuss?",
    sender: 'provider',
    timestamp: new Date(2025, 6, 10, 14, 30),
    read: true,
  },
  {
    id: '2',
    text: "Hi Dr. Johnson! I've been experiencing some mild morning sickness, but it's manageable. I also have a question about my diet.",
    sender: 'user',
    timestamp: new Date(2025, 6, 10, 14, 32),
    read: true,
  },
  {
    id: '3',
    text: "I'm glad the morning sickness is manageable. What questions do you have about your diet?",
    sender: 'provider',
    timestamp: new Date(2025, 6, 10, 14, 33),
    read: true,
  },
  {
    id: '4',
    text: "I've been craving a lot of salty foods lately. Is it okay to give in to these cravings sometimes?",
    sender: 'user',
    timestamp: new Date(2025, 6, 10, 14, 35),
    read: true,
  },
  {
    id: '5',
    text: "Yes, it's perfectly normal to have cravings during pregnancy. Just try to maintain a balanced diet overall. I'm attaching some dietary guidelines that might help.",
    sender: 'provider',
    timestamp: new Date(2025, 6, 10, 14, 37),
    read: true,
    attachments: [
      {
        id: '1',
        type: 'pdf',
        url: 'https://example.com/diet-guidelines.pdf',
        name: 'Pregnancy Diet Guidelines.pdf',
      },
    ],
  },
];

const providerDetails = {
  name: 'Dr. Sarah Johnson',
  role: 'Lead Midwife',
  isOnline: true,
};

export default function ConversationScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState(mockMessages);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      (e) => setKeyboardHeight(e.endCoordinates.height)
    );
    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => setKeyboardHeight(0)
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handleSend = () => {
    if (!message.trim()) return;

    const newMessage: MessageProps = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: 'user',
      timestamp: new Date(),
      read: false,
    };

    setMessages(prev => [newMessage, ...prev]);
    setMessage('');
    
    // Ensure the list scrolls to show the new message
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
  };

  const handleAttachment = () => {
    // Implement attachment handling
    console.log('Add attachment');
  };

  return (
    <Screen>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <ChevronLeft size={24} color={colors.neutral[800]} />
          </TouchableOpacity>
          
          <View style={styles.providerInfo}>
            <View style={styles.providerDetails}>
              <AppText variant="bodyBold">{providerDetails.name}</AppText>
              <AppText variant="caption" color={colors.neutral[600]}>
                {providerDetails.role}
              </AppText>
            </View>
            {providerDetails.isOnline && (
              <View style={styles.onlineIndicator} />
            )}
          </View>
        </View>

        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <MessageBubble {...item} />
          )}
          inverted
          contentContainerStyle={[
            styles.messagesList,
            Platform.select({
              ios: {
                paddingBottom: keyboardHeight > 0 ? keyboardHeight - 60 : spacing.md,
              },
              android: {
                paddingBottom: spacing.md,
              },
              default: {
                paddingBottom: spacing.md,
              },
            }),
          ]}
          showsVerticalScrollIndicator={false}
          maintainVisibleContentPosition={{
            minIndexForVisible: 0,
            autoscrollToTopThreshold: 100,
          }}
        />

        {/* Input Area */}
        <View style={styles.inputContainer}>
          <TouchableOpacity 
            style={styles.attachButton}
            onPress={handleAttachment}
          >
            <Paperclip size={24} color={colors.neutral[600]} />
          </TouchableOpacity>
          
          <TextInput
            ref={inputRef}
            style={styles.input}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={colors.neutral[400]}
            multiline
            maxLength={1000}
            onSubmitEditing={handleSend}
          />
          
          <TouchableOpacity 
            style={[
              styles.sendButton,
              !message.trim() && styles.sendButtonDisabled
            ]}
            onPress={handleSend}
            disabled={!message.trim()}
          >
            <Send 
              size={20} 
              color={message.trim() ? colors.neutral.white : colors.neutral[400]} 
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.neutral.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.neutral[200],
    backgroundColor: colors.neutral.white,
    zIndex: 10,
  },
  backButton: {
    marginRight: spacing.md,
  },
  providerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  providerDetails: {
    flex: 1,
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success[500],
    borderWidth: 2,
    borderColor: colors.neutral.white,
    marginLeft: spacing.sm,
  },
  messagesList: {
    paddingHorizontal: spacing.md,
    flexGrow: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.select({
      ios: spacing.sm,
      android: spacing.md,
      default: spacing.md,
    }),
    borderTopWidth: 1,
    borderTopColor: colors.neutral[200],
    backgroundColor: colors.neutral.white,
    zIndex: 10,
  },
  attachButton: {
    padding: spacing.sm,
    marginRight: spacing.xs,
  },
  input: {
    flex: 1,
    minHeight: 40,
    maxHeight: 100,
    backgroundColor: colors.neutral[100],
    borderRadius: borders.radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: Platform.OS === 'ios' ? spacing.sm : spacing.xs,
    marginRight: spacing.sm,
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.md,
    color: colors.neutral[800],
  },
  sendButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: colors.neutral[200],
  },
});