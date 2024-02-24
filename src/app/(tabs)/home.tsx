import { StyleSheet, FlatList } from 'react-native';
import { tracks } from '@/assets/data/tracks';
import { Text, View } from '@/src/components/Themed';
import TrackListItem from '@/src/components/trackListItem';
import Player from '@/src/components/player';

export default function HomeScreen() {
  return (
      <FlatList
      data={tracks}
      renderItem={({item})=><TrackListItem track={item}></TrackListItem>}
      showsVerticalScrollIndicator={false}
      />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
