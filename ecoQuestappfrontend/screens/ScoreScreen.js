import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ScrollView, ActivityIndicator,
} from 'react-native';

const API_URL = 'http://localhost:8080/api';

export default function ScoreScreen({ navigation }) {
  const [scores, setScores] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/scores`)
      .then((res) => res.json())
      .then((data) => {
        setScores(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <View style={styles.logoSmall}>
          <Text style={styles.logoSmallIcon}>🌿</Text>
        </View>
        <Text style={styles.headerTitle}>Scores</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Your Progress</Text>

        {loading ? (
          <ActivityIndicator size="large" color="#2E7D32" style={{ marginTop: 40 }} />
        ) : scores.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🌱</Text>
            <Text style={styles.emptyText}>No scores yet!</Text>
            <Text style={styles.emptySub}>Complete a quiz to see your scores here.</Text>
            <TouchableOpacity
              style={styles.startBtn}
              onPress={() => navigation.navigate('Quiz')}
            >
              <Text style={styles.startBtnText}>Start Quiz</Text>
            </TouchableOpacity>
          </View>
        ) : (
          scores.map((score, index) => (
            <View key={score.id} style={styles.scoreCard}>
              <View style={styles.scoreLeft}>
                <Text style={styles.scoreRank}>#{index + 1}</Text>
                <View>
                  <Text style={styles.scoreName}>{score.playerName}</Text>
                  <Text style={styles.scoreDetail}>
                    {score.totalScore} / {score.totalQuestions} correct
                  </Text>
                </View>
              </View>
              <View style={styles.scoreBadge}>
                <Text style={styles.scoreBadgeText}>
                  {Math.round((score.totalScore / score.totalQuestions) * 100)}%
                </Text>
              </View>
            </View>
          ))
        )}
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
  backBtn: { marginRight: 10 },
  backIcon: { fontSize: 32, color: '#FFFFFF', lineHeight: 34 },
  logoSmall: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#2E7D32',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  logoSmallIcon: { fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  scroll: { paddingHorizontal: 20 },
  sectionTitle: {
    fontSize: 22, fontWeight: 'bold', color: '#FFFFFF',
    marginBottom: 20, marginTop: 10,
  },
  emptyContainer: { alignItems: 'center', paddingTop: 60 },
  emptyEmoji: { fontSize: 50, marginBottom: 16 },
  emptyText: { fontSize: 20, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  emptySub: {
    fontSize: 13, color: '#8B949E',
    marginBottom: 30, textAlign: 'center',
  },
  startBtn: {
    backgroundColor: '#2E7D32', borderRadius: 30,
    paddingVertical: 14, paddingHorizontal: 40,
  },
  startBtnText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  scoreCard: {
    backgroundColor: '#161B22', borderRadius: 16,
    padding: 16, marginBottom: 12,
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
  },
  scoreLeft: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  scoreRank: { fontSize: 16, fontWeight: 'bold', color: '#2E7D32', minWidth: 30 },
  scoreName: { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 2 },
  scoreDetail: { fontSize: 12, color: '#8B949E' },
  scoreBadge: {
    backgroundColor: '#2E7D32', borderRadius: 20,
    paddingHorizontal: 12, paddingVertical: 6,
  },
  scoreBadgeText: { color: '#FFFFFF', fontSize: 13, fontWeight: 'bold' },
});
