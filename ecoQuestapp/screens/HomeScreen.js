import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoSmall}>
          <Text style={styles.logoSmallIcon}>🌿</Text>
        </View>
        <Text style={styles.headerTitle}>EcoQuest</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Welcome Card */}
        <View style={styles.welcomeCard}>
          <Text style={styles.welcomeTitle}>Hello, Explorer!</Text>
          <Text style={styles.welcomeSub}>Ready to save the planet today?</Text>
        </View>

        {/* Daily Quiz Card */}
        <TouchableOpacity
          style={styles.quizCard}
          onPress={() => navigation.navigate('Quiz')}
        >
          <Text style={styles.quizCardTitle}>Hey, it's time for your daily quiz</Text>
          <Text style={styles.quizCardSub}>Get it done now</Text>
          <View style={styles.quizBadges}>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>⭐ +10</Text>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>↑ +2</Text>
            </View>
          </View>
          <View style={styles.quizFooter}>
            <Text style={styles.quizPercent}>0 %</Text>
            <View style={styles.arrowBtn}>
              <Text style={styles.arrowText}>›</Text>
            </View>
          </View>
          <View style={styles.quizProgressBar}>
            <View style={styles.quizProgressFill} />
          </View>
        </TouchableOpacity>

        {/* Learn and Scores Cards */}
        <View style={styles.cardRow}>
          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => navigation.navigate('Learn')}
          >
            <Text style={styles.smallCardIcon}>📖</Text>
            <Text style={styles.smallCardTitle}>Learn</Text>
            <Text style={styles.smallCardSub}>Explore topics</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.smallCard}
            onPress={() => navigation.navigate('Scores')}
          >
            <Text style={styles.smallCardIcon}>🏆</Text>
            <Text style={styles.smallCardTitle}>Scores</Text>
            <Text style={styles.smallCardSub}>View progress</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117' },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 10,
  },
  logoSmall: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#2E7D32',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  logoSmallIcon: { fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  scroll: { paddingHorizontal: 20, paddingBottom: 20 },
  welcomeCard: {
    backgroundColor: '#161B22',
    borderRadius: 16, padding: 20,
    marginBottom: 16, minHeight: 100,
    justifyContent: 'flex-end',
  },
  welcomeTitle: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  welcomeSub: { fontSize: 13, color: '#8B949E' },
  quizCard: {
    backgroundColor: '#2E7D32',
    borderRadius: 16, padding: 20, marginBottom: 16,
  },
  quizCardTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  quizCardSub: { fontSize: 13, color: 'rgba(255,255,255,0.7)', marginBottom: 14 },
  quizBadges: { flexDirection: 'row', gap: 10, marginBottom: 14 },
  badge: {
    backgroundColor: 'rgba(0,0,0,0.2)',
    borderRadius: 20, paddingHorizontal: 12, paddingVertical: 6,
  },
  badgeText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  quizFooter: {
    flexDirection: 'row', justifyContent: 'space-between',
    alignItems: 'center', marginBottom: 8,
  },
  quizPercent: { color: '#FFFFFF', fontSize: 13 },
  arrowBtn: {
    width: 36, height: 36, borderRadius: 18,
    backgroundColor: '#0D1117',
    alignItems: 'center', justifyContent: 'center',
  },
  arrowText: { color: '#FFFFFF', fontSize: 22 },
  quizProgressBar: {
    height: 4, backgroundColor: 'rgba(255,255,255,0.3)', borderRadius: 2,
  },
  quizProgressFill: {
    height: 4, width: '30%', backgroundColor: '#FFFFFF', borderRadius: 2,
  },
  cardRow: { flexDirection: 'row', gap: 16 },
  smallCard: {
    flex: 1, backgroundColor: '#161B22',
    borderRadius: 16, padding: 20,
  },
  smallCardIcon: { fontSize: 28, marginBottom: 10 },
  smallCardTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  smallCardSub: { fontSize: 12, color: '#8B949E' },
});
