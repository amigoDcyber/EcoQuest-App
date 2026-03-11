import { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Animated } from 'react-native';

export default function SplashScreen({ navigation }) {
  const progress = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 2500,
      useNativeDriver: false,
    }).start();

    const timer = setTimeout(() => {
      navigation.replace('Main');
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const progressWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '70%'],
  });

  return (
    <View style={styles.container}>
      <View style={styles.logoCircle}>
        <Text style={styles.logoIcon}>🌿</Text>
      </View>
      <Text style={styles.appName}>EcoQuest</Text>
      <Text style={styles.tagline}>Learn. Act. Sustain.</Text>
      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <Animated.View style={[styles.progressFill, { width: progressWidth }]} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2E7D32',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: 'rgba(255,255,255,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logoIcon: { fontSize: 44 },
  appName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
    color: 'rgba(255,255,255,0.8)',
  },
  progressContainer: {
    position: 'absolute',
    bottom: 60,
    width: '70%',
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
  },
  progressFill: {
    height: 4,
    backgroundColor: '#FFFFFF',
    borderRadius: 2,
  },
});
