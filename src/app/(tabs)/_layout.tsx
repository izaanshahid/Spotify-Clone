import React from 'react';
import { StyleSheet} from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { Text,View } from '@/src/components/Themed';
import Colors from '@/src/constants/Colors';
import { useColorScheme } from '@/src/components/useColorScheme';
import { useClientOnlyValue } from '@/src/components/useClientOnlyValue';
import {BottomTabBar} from '@react-navigation/bottom-tabs'
import Player from '@/src/components/player';
import {BlurView} from "expo-blur"

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        // tabBarStyle:{
        //   position:'absolute',
        //   borderTopLeftRadius:20,
        //   borderTopRightRadius:20,
        // },
        // Disable the static render of the header on web
        // to prevent a hydration error in React Navigation v6.
        // tabBarBackground: () => (
        //   <BlurView
        //   intensity={80}
        //   style={{
        //     ...StyleSheet.absoluteFillObject,
        //     borderTopLeftRadius:20,
        //     borderTopRightRadius:20,
        //     overflow:'hidden',
        //     backgroundColor:'transparent'

        //   }}
        //   />

        // ),
        headerShown: useClientOnlyValue(false, true),
      }}
      tabBar={(props)=>(
        <View>
          <Player/>
      <BottomTabBar {...props}/>
      </View>
      )}
      >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable>
                {({ pressed }) => (
                  <FontAwesome
                    name="info-circle"
                    size={25}
                    color={Colors[colorScheme ?? 'light'].text}
                    style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
                  />
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          title: 'Search',
          headerShown:false,
          tabBarIcon: ({ color }) => <TabBarIcon name="search" color={color} />,
        }}
      />
      <Tabs.Screen
        name="favourites"
        options={{
          title: 'Favourites',
          tabBarIcon: ({ color }) => <TabBarIcon name="heart" color={color} />,
        }}
      />
    </Tabs>
  );
}
