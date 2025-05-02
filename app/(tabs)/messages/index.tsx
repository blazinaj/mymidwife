import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { Search, Plus } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import Screen from '@/components/common/Screen';
import AppText from '@/components/common/AppText';
import Card from '@/components/common/Card';
import { colors, spacing, shadows, typography, borders } from '@/constants/theme';

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  timestamp: Date;
  unreadCount: number;
  isOnline?: boolean;
}

// Mock data
const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: 'Lead Midwife',
    lastMessage: "Yes, that sounds good. I'll see you at your appointment next week.",
    timestamp: new Date(2025, 6, 10, 14, 35),
    unreadCount: 2,
    isOnline: true,
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Ultrasound Specialist',
    lastMessage: "Your scans look normal. We'll discuss more at your appointment.",
    timestamp: new Date(2025, 6, 9, 10, 15),
    unreadCount: 0,
  },
  {
    id: '3',
    name: 'Nurse Olivia Wilson',
    role: 'Prenatal Nurse',
    lastMessage: 'Remember to take your prenatal vitamins daily!',
    timestamp: new Date(2025, 6, 8, 16, 20),
    unreadCount: 0,
  },
  {
    id: '4',
    name: 'Dr. Emily Rodriguez',
    role: 'Nutrition Specialist',
    lastMessage: "I'm sending over some meal plan suggestions for the third trimester.",
    timestamp: new Date(2025, 6, 5, 11, 45),
    unreadCount: 0,
  },
];

export default function MessagesScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  
  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() && 
           date.getMonth() === today.getMonth() && 
           date.getFullYear() === today.getFullYear();
  };
  
  const formatDate = (date: Date) => {
    if (isToday(date)) {
      return formatTime(date);
    }
    
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.getDate() === yesterday.getDate() && 
        date.getMonth() === yesterday.getMonth() && 
        date.getFullYear() === yesterday.getFullYear()) {
      return 'Yesterday';
    }
    
    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
  };

  const filteredConversations = searchQuery
    ? conversations.filter(c => 
        c.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations;

  const handleNewMessage = () => {
    router.push('/messages/new');
  };

  const handleConversationPress = (id: string) => {
    router.push(`/messages/${id}`);
  };

  return (
    <Screen>
      <View style={styles.container}>
        <View style={styles.header}>
          <AppText variant="title">Messages</AppText>
          <TouchableOpacity 
            style={styles.newButton}
            onPress={handleNewMessage}
          >
            <Plus size={24} color={colors.primary[500]} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <Search size={20} color={colors.neutral[500]} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search conversations"
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor={colors.neutral[500]}
          />
        </View>

        {/* Conversation List */}
        <FlatList
          data={filteredConversations}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleConversationPress(item.id)}>
              <Card 
                variant="default" 
                padding="md" 
                style={[
                  styles.conversationCard,
                  item.unreadCount > 0 && styles.unreadCard
                ]}
              >
                <View style={styles.conversationContent}>
                  <View style={styles.avatarContainer}>
                    <View style={styles.avatar}>
                      <AppText variant="headingMedium" color={colors.primary[500]}>
                        {item.name.split(' ').map(n => n[0]).join('')}
                      </AppText>
                    </View>
                    {item.isOnline && <View style={styles.onlineIndicator} />}
                  </View>
                  
                  <View style={styles.messageContent}>
                    <View style={styles.messageHeader}>
                      <AppText variant="bodyBold">{item.name}</AppText>
                      <AppText variant="caption" color={colors.neutral[500]}>
                        {formatDate(item.timestamp)}
                      </AppText>
                    </View>
                    <AppText variant="caption" color={colors.neutral[500]} style={styles.role}>
                      {item.role}
                    </AppText>
                    <AppText 
                      variant={item.unreadCount > 0 ? "bodyBold" : "body"}
                      color={item.unreadCount > 0 ? colors.neutral[800] : colors.neutral[600]}
                      numberOfLines={1}
                      style={styles.lastMessage}
                    >
                      {item.lastMessage}
                    </AppText>
                  </View>
                </View>
                
                {item.unreadCount > 0 && (
                  <View style={styles.badge}>
                    <AppText 
                      variant="caption" 
                      color={colors.neutral.white}
                      style={styles.badgeText}
                    >
                      {item.unreadCount}
                    </AppText>
                  </View>
                )}
              </Card>
            </TouchableOpacity>
          )}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <AppText variant="body" color={colors.neutral[600]}>
                No conversations found
              </AppText>
            </View>
          }
        />
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
  newButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.neutral[100],
    borderRadius: borders.radius.md,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 44,
    color: colors.neutral[800],
    fontFamily: typography.fontFamily.body,
    fontSize: typography.fontSize.md,
  },
  conversationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  unreadCard: {
    backgroundColor: colors.primary[50],
  },
  conversationContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.primary[100],
    justifyContent: 'center',
    alignItems: 'center',
  },
  onlineIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.success[500],
    borderWidth: 2,
    borderColor: colors.neutral.white,
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  role: {
    marginBottom: spacing.xs,
  },
  lastMessage: {
    maxWidth: '90%',
  },
  badge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary[500],
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: spacing.xs,
  },
  badgeText: {
    fontSize: 12,
    fontFamily: typography.fontFamily.bodyBold,
  },
  separator: {
    height: 1,
    backgroundColor: colors.neutral[200],
    marginVertical: spacing.xs,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.xl,
  },
});