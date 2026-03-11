import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';

const topics = [
  {
    id: 1,
    title: 'Recycling',
    desc: 'Reduce waste by sorting materials into the right bins.',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=100&q=80',
  },
  {
    id: 2,
    title: 'Save Energy',
    desc: 'Turn off lights and unplug devices when not in use.',
    image: 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=100&q=80',
  },
  {
    id: 3,
    title: 'Clean Water',
    desc: 'Conserve water and keep our rivers and oceans clean.',
    image: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=100&q=80',
  },
];

export default function LearnScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.logoSmall}>
          <Text style={styles.logoSmallIcon}>🌿</Text>
        </View>
        <Text style={styles.headerTitle}>Learn</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Topics to explore</Text>
        {topics.map((topic) => (
          <View key={topic.id} style={styles.topicCard}>
            <Image source={{ uri: topic.image }} style={styles.topicImage} />
            <View style={styles.topicText}>
              <Text style={styles.topicTitle}>{topic.title}</Text>
              <Text style={styles.topicDesc}>{topic.desc}</Text>
            </View>
          </View>
        ))}
        <View style={{ height: 20 }} />
      </ScrollView>

      <TouchableOpacity
        style={styles.watchBtn}
        onPress={() => navigation.navigate('Video')}
      >
        <Text style={styles.watchBtnText}>Watch Video</Text>
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
  logoSmall: {
    width: 34, height: 34, borderRadius: 17,
    backgroundColor: '#2E7D32',
    alignItems: 'center', justifyContent: 'center', marginRight: 10,
  },
  logoSmallIcon: { fontSize: 16 },
  headerTitle: { fontSize: 18, fontWeight: 'bold', color: '#FFFFFF' },
  scroll: { paddingHorizontal: 20, paddingBottom: 100 },
  sectionTitle: {
    fontSize: 22, fontWeight: 'bold', color: '#FFFFFF',
    marginBottom: 20, marginTop: 10,
  },
  topicCard: {
    flexDirection: 'row', backgroundColor: '#161B22',
    borderRadius: 16, padding: 14,
    marginBottom: 14, alignItems: 'center',
  },
  topicImage: {
    width: 70, height: 70, borderRadius: 10, marginRight: 14,
  },
  topicText: { flex: 1 },
  topicTitle: { fontSize: 16, fontWeight: 'bold', color: '#FFFFFF', marginBottom: 4 },
  topicDesc: { fontSize: 12, color: '#8B949E', lineHeight: 18 },
  watchBtn: {
    position: 'absolute',
    bottom: 16, left: 20, right: 20,
    backgroundColor: '#FFFFFF',
    borderRadius: 30, paddingVertical: 16, alignItems: 'center',
  },
  watchBtnText: { fontSize: 16, fontWeight: 'bold', color: '#0D1117' },
});
