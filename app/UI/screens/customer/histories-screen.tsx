import React, { useState } from 'react';
import { View } from 'react-native';
import { Text } from 'react-native-animatable';
import InputText from '../../components/google-place/PlaceInput';
export const HistoriesScreen = () => {
  const [selectedPlace, setSelectedPlace] = useState<any>(null);

  const handleSelectPlace = (place: any) => {
    setSelectedPlace(place);
  };

  return (
    <View style={{ flex: 1 }}>
      <InputText onSelectPlace={handleSelectPlace} />
      {selectedPlace && (
        <View style={{ padding: 10 }}>
          <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{selectedPlace.name}</Text>
          <Text>{selectedPlace.address}</Text>
          <Text>
            {selectedPlace.latitude}, {selectedPlace.longitude}
          </Text>
        </View>
      )}
    </View>
  );
};