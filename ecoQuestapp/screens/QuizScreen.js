import { useState, useEffect } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
  ActivityIndicator, ScrollView,
} from 'react-native';
import Constants from 'expo-constants';

const API_URL = Constants.expoConfig?.extra?.apiUrl || process.env.API_URL || 'http://localhost:8080/api';

export default function QuizScreen({ navigation }) {
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetch(`${API_URL}/questions`)
      .then((res) => res.json())
      .then((data) => {
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  }, []);

  const handleNext = () => {
    const isCorrect = selected === questions[current].correctAnswer;
    const newScore = isCorrect ? score + 1 : score;

    if (current + 1 >= questions.length) {
      submitScore(newScore);
      setScore(newScore);
      setFinished(true);
    } else {
      if (isCorrect) setScore(newScore);
      setCurrent((p) => p + 1);
      setSelected(null);
    }
  };

  const handlePrev = () => {
    if (current > 0) {
      setCurrent((p) => p - 1);
      setSelected(null);
    }
  };

  const submitScore = (finalScore) => {
    fetch(`${API_URL}/scores`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        playerName: 'Explorer',
        totalScore: finalScore,
        totalQuestions: questions.length,
      }),
    }).catch(console.error);
  };

  const handleRetry = () => {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setFinished(false);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2E7D32" />
        <Text style={styles.loadingText}>Loading questions...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorEmoji}>⚠️</Text>
        <Text style={styles.errorTitle}>Backend not reachable</Text>
        <Text style={styles.errorSub}>Make sure Spring Boot is running on port 8080.</Text>
        <TouchableOpacity style={styles.goHomeBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.goHomeBtnText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  if (finished) {
    return (
      <View style={styles.resultContainer}>
        <Text style={styles.resultEmoji}>🎉</Text>
        <Text style={styles.resultScore}>{score} / {questions.length}</Text>
        <Text style={styles.resultMsg}>
          {score >= 8 ? 'Amazing Explorer! 🌟' : score >= 5 ? 'Great job! 💪' : 'Keep learning! 🌱'}
        </Text>
        <TouchableOpacity style={styles.retryBtn} onPress={handleRetry}>
          <Text style={styles.retryText}>Retry Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.homeBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.homeBtnText}>Go Home</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const q = questions[current];
  const options = [
    { key: 'A', label: q.optionA },
    { key: 'B', label: q.optionB },
    { key: 'C', label: q.optionC },
    { key: 'D', label: q.optionD },
  ];
  const progress = ((current + 1) / questions.length) * 100;

  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.closeBtn} onPress={() => navigation.navigate('Home')}>
          <Text style={styles.closeText}>✕</Text>
        </TouchableOpacity>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressFill, { width: `${progress}%` }]} />
        </View>
        <Text style={styles.progressLabel}>{current + 1} / {questions.length}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Question */}
        <View style={styles.questionContainer}>
          <View style={styles.questionEmoji}>
            <Text style={styles.questionEmojiText}>🤔</Text>
          </View>
          <Text style={styles.questionText}>{q.questionText}</Text>
        </View>

        {/* Options */}
        <View style={styles.optionsContainer}>
          {options.map((opt) => (
            <TouchableOpacity
              key={opt.key}
              style={[styles.optionCard, selected === opt.key && styles.optionSelected]}
              onPress={() => setSelected(opt.key)}
            >
              <View style={[styles.optionKeyBadge, selected === opt.key && styles.optionKeyBadgeSelected]}>
                <Text style={[styles.optionKey, selected === opt.key && styles.optionKeySelected]}>
                  {opt.key}
                </Text>
              </View>
              <Text style={[styles.optionLabel, selected === opt.key && styles.optionLabelSelected]}>
                {opt.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Nav Buttons */}
        <View style={styles.navButtons}>
          <TouchableOpacity
            style={[styles.prevBtn, current === 0 && styles.btnDisabled]}
            onPress={handlePrev}
            disabled={current === 0}
          >
            <Text style={styles.prevText}>Previous</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.nextBtn, !selected && styles.nextBtnDisabled]}
            onPress={handleNext}
            disabled={!selected}
          >
            <Text style={styles.nextText}>
              {current + 1 === questions.length ? 'Finish' : 'Next'}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 30 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117' },
  centered: {
    flex: 1, backgroundColor: '#0D1117',
    alignItems: 'center', justifyContent: 'center', padding: 30,
  },
  loadingText: { color: '#FFFFFF', marginTop: 14, fontSize: 15 },
  errorEmoji: { fontSize: 40, marginBottom: 14 },
  errorTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 8 },
  errorSub: { fontSize: 13, color: '#8B949E', marginBottom: 24, textAlign: 'center' },
  goHomeBtn: {
    backgroundColor: '#2E7D32', borderRadius: 20,
    paddingVertical: 12, paddingHorizontal: 30,
  },
  goHomeBtnText: { color: '#FFFFFF', fontWeight: 'bold', fontSize: 15 },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 55, paddingHorizontal: 20, paddingBottom: 16, gap: 12,
  },
  closeBtn: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#161B22', alignItems: 'center', justifyContent: 'center',
  },
  closeText: { color: '#FFFFFF', fontSize: 14 },
  progressBarContainer: {
    flex: 1, height: 6, backgroundColor: '#21262D', borderRadius: 3,
  },
  progressFill: { height: 6, backgroundColor: '#2E7D32', borderRadius: 3 },
  progressLabel: { color: '#8B949E', fontSize: 13, minWidth: 42, textAlign: 'right' },
  scrollContent: { paddingHorizontal: 20 },
  questionContainer: { paddingTop: 10, paddingBottom: 24 },
  questionEmoji: {
    width: 46, height: 46, borderRadius: 12,
    backgroundColor: '#4B1C82',
    alignItems: 'center', justifyContent: 'center', marginBottom: 16,
  },
  questionEmojiText: { fontSize: 24 },
  questionText: { fontSize: 22, fontWeight: 'bold', color: '#FFFFFF', lineHeight: 32 },
  optionsContainer: { gap: 12 },
  optionCard: {
    backgroundColor: '#161B22', borderRadius: 14,
    padding: 16, borderWidth: 1, borderColor: '#21262D',
    flexDirection: 'row', alignItems: 'center', gap: 14,
  },
  optionSelected: { backgroundColor: '#2E7D32', borderColor: '#2E7D32' },
  optionKeyBadge: {
    width: 28, height: 28, borderRadius: 14,
    backgroundColor: '#21262D',
    alignItems: 'center', justifyContent: 'center',
  },
  optionKeyBadgeSelected: { backgroundColor: 'rgba(255,255,255,0.2)' },
  optionKey: { fontSize: 13, fontWeight: 'bold', color: '#8B949E' },
  optionKeySelected: { color: '#FFFFFF' },
  optionLabel: { fontSize: 15, fontWeight: 'bold', color: '#FFFFFF', flex: 1 },
  optionLabelSelected: { color: '#FFFFFF' },
  navButtons: { flexDirection: 'row', paddingTop: 24, gap: 14 },
  prevBtn: {
    flex: 1, backgroundColor: '#161B22', borderRadius: 30,
    paddingVertical: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#21262D',
  },
  btnDisabled: { opacity: 0.3 },
  prevText: { color: '#FFFFFF', fontSize: 15, fontWeight: 'bold' },
  nextBtn: {
    flex: 1, backgroundColor: '#FFFFFF',
    borderRadius: 30, paddingVertical: 16, alignItems: 'center',
  },
  nextBtnDisabled: { opacity: 0.4 },
  nextText: { color: '#0D1117', fontSize: 15, fontWeight: 'bold' },
  resultContainer: {
    flex: 1, backgroundColor: '#0D1117',
    alignItems: 'center', justifyContent: 'center', paddingHorizontal: 30,
  },
  resultEmoji: { fontSize: 64, marginBottom: 20 },
  resultScore: { fontSize: 56, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 10 },
  resultMsg: { fontSize: 18, color: '#8B949E', marginBottom: 40 },
  retryBtn: {
    width: '100%', borderWidth: 2, borderColor: '#2E7D32',
    borderRadius: 30, paddingVertical: 16,
    alignItems: 'center', marginBottom: 14,
  },
  retryText: { color: '#2E7D32', fontSize: 16, fontWeight: 'bold' },
  homeBtn: {
    width: '100%', backgroundColor: '#2E7D32',
    borderRadius: 30, paddingVertical: 16, alignItems: 'center',
  },
  homeBtnText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
});
