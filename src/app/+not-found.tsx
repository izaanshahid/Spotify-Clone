import { Link, Stack, useNavigation } from 'expo-router';
import { StyleSheet } from 'react-native';
import React, { useEffect } from 'react';
import { Redirect } from "expo-router";

import { Text, View } from '@/src/components/Themed';

export default function NotFoundScreen() {

  return (
    <>
      <Redirect href={'/(tabs)/home'} />
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
