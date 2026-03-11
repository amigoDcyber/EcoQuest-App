import { View, Text, StyleSheet, TouchableOpacity, Linking } from 'react-native';

export default function VideoScreen({ navigation }) {
  const handlePlay = () => {
    Linking.openURL('https://www.youtube.com/watch?v=3iQ1DHxlnWI');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
          <Text style={styles.backIcon}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Video</Text>
      </View>

      <TouchableOpacity style={styles.videoContainer} onPress={handlePlay}>
        <View style={styles.videoThumb}>
          <Text style={styles.videoThumbEmoji}>🌍</Text>
        </View>
        <View style={styles.playBtn}>
          <Text style={styles.playIcon}>▶</Text>
        </View>
      </TouchableOpacity>

      <View style={styles.infoContainer}>
        <Text style={styles.videoTitle}>The Power of Small Actions</Text>
        <Text style={styles.videoDesc}>
          Discover how small actions can make a big impact on our planet's future.
          Watch this short documentary to see sustainability in action across the globe.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.backLearnBtn}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backLearnText}>Back to Learn</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D1117' },
  header: {
    flexDirection: 'row', alignItems: 'center',
    paddingTop: 55, paddingHorizontal: 20, paddingBottom: 10,
  },
  backBtn: { marginRight: 14 },
  backIcon: { fontSize: 32, color: '#FFFFFF', lineHeight: 34 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  videoContainer: {
    margin: 20, borderRadius: 16, overflow: 'hidden',
    height: 200, backgroundColor: '#1a3a2a',
    alignItems: 'center', justifyContent: 'center',
  },
  videoThumb: {
    width: '100%', height: '100%',
    alignItems: 'center', justifyContent: 'center',
  },
  videoThumbEmoji: { fontSize: 70 },
  playBtn: {
    position: 'absolute',
    width: 64, height: 64, borderRadius: 32,
    backgroundColor: 'rgba(255,255,255,0.92)',
    alignItems: 'center', justifyContent: 'center',
  },
  playIcon: { fontSize: 24, color: '#2E7D32', marginLeft: 4 },
  infoContainer: { paddingHorizontal: 20, paddingTop: 10 },
  videoTitle: {
    fontSize: 22, fontWeight: 'bold', color: '#FFFFFF',
    marginBottom: 14, lineHeight: 30,
  },
  videoDesc: { fontSize: 13, color: '#8B949E', lineHeight: 22 },
  backLearnBtn: {
    position: 'absolute', bottom: 50, left: 20, right: 20,
    backgroundColor: '#161B22', borderRadius: 30,
    paddingVertical: 16, alignItems: 'center',
    borderWidth: 1, borderColor: '#21262D',
  },
  backLearnText: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF' },
});
