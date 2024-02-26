import { View, Text, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { tracks } from '../../assets/data/tracks';
import { usePlayerContext } from '../providers/PlayerProvider';
import { useEffect, useState } from 'react';
import {Audio} from 'expo-av';
import { Sound } from 'expo-av/build/Audio';

const Player = () => {
  const [sound, setSound] = useState<Sound>();
  const {track} = usePlayerContext();
  const [icon ,setIcon] = useState('pause')


  useEffect(()=>{
    console.log("in use effect:", track?.name)
if(track){
  playTrack();
}
  },[track]);

  useEffect(()=>{
    return sound?()=>{
      console.log("unloading sound")
      sound.unloadAsync();
    }
    : undefined;
  },[sound]);


  const playTrack = async ()=>{
    setIcon("pause")
if(sound){
  await sound.unloadAsync();
}
if(!track?.preview_url){
  return
}


    console.log("track playing:", track?.name)
    const {sound: newSound} = await Audio.Sound.createAsync({
      uri:track.preview_url
    })

    setSound(newSound)
    await newSound.playAsync();



  };

  const onPlayPause = async () =>{
    if(!sound){return}

   await sound.pauseAsync();
   setIcon("play")
  }

  if (!track) {
    return null;
  }

  const image = track.album.images?.[0];

  return (
    <View style={styles.container}>
      <View style={styles.player}>
        {image && <Image source={{ uri: image.url }} style={styles.image} />}

        <View style={{ flex: 1 }}>
          <Text style={styles.title}>{track.name}</Text>
          <Text style={styles.subtitle}>{track.artists[0]?.name}</Text>
        </View>

        <Ionicons
          name={'heart-outline'}
          size={20}
          color={'white'}
          style={{ marginHorizontal: 10 }}
        />
        <Ionicons
        onPress={onPlayPause}
          disabled={!track?.preview_url}
          name={icon}
          size={22}
          color={track?.preview_url ? 'white' : 'gray'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    top: -75,
    height: 75,
    padding: 10,
  },
  player: {
    backgroundColor: '#286660',
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
    padding: 3,
    paddingRight: 15,
  },
  title: {
    color: 'white',
  },
  subtitle: {
    color: 'lightgray',
    fontSize: 12,
  },
  image: {
    height: '100%',
    aspectRatio: 1,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default Player;