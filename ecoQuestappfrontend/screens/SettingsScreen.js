import { useState } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  Switch, ScrollView,
} from 'react-native';

export default function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(true);
  const [notifications, setNotifications] = useState(true);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoSmall}>
          <Text style={styles.logoSmallIcon}>🌿</Text>
        </View>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Profile */}
        <View style={styles.profileCard}>
          <View style={styles.profileAvatar}>
            <Text style={styles.profileAvatarIcon}>🌿</Text>
          </View>
          <View>
            <Text style={styles.profileName}>Explorer</Text>
            <Text style={styles.profileSub}>EcoQuest Member</Text>
          </View>
        </View>

        {/* Appearance */}
        <Text style={styles.sectionLabel}>Appearance</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingIcon}>🌙</Text>
            <Text style={styles.settingText}>Dark Mode</Text>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#21262D', true: '#2E7D32' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Preferences */}
        <Text style={styles.sectionLabel}>Preferences</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingIcon}>🔔</Text>
            <Text style={styles.settingText}>Notifications</Text>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#21262D', true: '#2E7D32' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* About */}
        <Text style={styles.sectionLabel}>About</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingIcon}>ℹ️</Text>
            <Text style={styles.settingText}>App Version</Text>
            <Text style={styles.settingValue}>EcoQuest v1.0</Text>
          </View>
          <View style={styles.divider} />
          <TouchableOpacity style={styles.settingRow}>
            <Text style={styles.settingIcon}>❓</Text>
            <Text style={styles.settingText}>Help & Support</Text>
          </TouchableOpacity>
        </View>

        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 55, paddingHorizontal: 20, paddingBottom: 10,
  },
  logoSmall: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#2E7D32',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  logoSmallIcon: { fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  scroll: { paddingHorizontal: 20, paddingTop: 10 },
  profileCard: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: '#161B22', borderRadius: 16,
    padding: 16, marginBottom: 24, gap: 14,
  },
  profileAvatar: {
    width: 52, height: 52, borderRadius: 26,
    backgroundColor: '#2E7D32',
    alignItems: 'center', justifyContent: 'center',
  },
  profileAvatarIcon: { fontSize: 24 },
  profileName: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 2 },
  profileSub: { fontSize: 13, color: '#8B949E' },
  sectionLabel: {
    fontSize: 12, color: '#8B949E',
    textTransform: 'uppercase', letterSpacing: 1,
    marginBottom: 10, marginTop: 4,
  },
  settingCard: {
    backgroundColor: '#161B22', borderRadius: 16,
    paddingHorizontal: 16, marginBottom: 20,
  },
  settingRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingVertical: 14, gap: 12,
  },
  settingIcon: { fontSize: 20 },
  settingText: { flex: 1, fontSize: 15, color: '#FFFFFF' },
  settingValue: { fontSize: 13, color: '#8B949E' },
  divider: { height: 1, backgroundColor: '#21262D' },
});
