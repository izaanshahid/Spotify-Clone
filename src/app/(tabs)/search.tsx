import { StyleSheet, FlatList, Text,View, TextInput, SafeAreaView, ActivityIndicator } from 'react-native';
import TrackListItem from '@/src/components/trackListItem';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const query = gql `
query MyQuery($q: String!) {
  search(q: $q) {
    tracks {
      items {
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
}
`

export default function SearchScreen() {
  const [search, setSearch] = useState('')
  const {data,loading,error} = useQuery(query,{variables: {q: search}})
const tracks = data?.search?.tracks?.items || []
  
  return (
    <SafeAreaView>
      <View style={styles.header}>
        <FontAwesome name='search' size={16} color={"grey"}/>
        <TextInput 
        placeholder='Search' 
        style={styles.input}
        value={search}
        onChangeText={setSearch}
        />
        <Text onPress={()=>setSearch("")} style={{color:'white'}}>Cancel</Text>
      </View>

      {loading && <ActivityIndicator></ActivityIndicator>}
      {error && <Text>failed to fetch data</Text>}
      <FlatList
      data={tracks}
      renderItem={({item})=><TrackListItem track={item}></TrackListItem>}
      showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
      
  );
}

const styles = StyleSheet.create({
  header:{
    flexDirection:"row",
    alignItems:'center',
    padding:10
  },
  input:{
    flex:1,
    backgroundColor:'#121314',
    padding:8,
    marginHorizontal:10,
    borderRadius:5,
    color:'white'
  }
});
