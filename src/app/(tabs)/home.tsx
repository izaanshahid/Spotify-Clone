import { StyleSheet, FlatList, ActivityIndicator, Text } from 'react-native';
import TrackListItem from '@/src/components/trackListItem';
import { gql, useQuery } from '@apollo/client';

const query = gql`
query MyQuery($genres: String!) {
  recommendations(seed_genres: $genres) {
    tracks {
      id
      name
      preview_url
      artists {
        id
        name
      }
      album {
        id
        name
        images {
          height
          url
          width
        }
      }
    }
  }
}
`



export default function HomeScreen() {
const {data,loading,error} = useQuery(query,{variables: {genres: "rock"}})

if(loading){
  return<ActivityIndicator/>
}

if(error){
  return <Text style={{color:'white'}}>Failed to fetch data</Text>
}

const tracks = data?.recommendations?.tracks || []


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
