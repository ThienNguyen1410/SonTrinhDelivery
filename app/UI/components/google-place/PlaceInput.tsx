import React from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {
    return (
        <GooglePlacesAutocomplete
            placeholder='Search'
            onPress={(data) => console.log(data)}
            query={{
                key: 'AIzaSyBNkZblbZA8hxxwOJMEs3xft9qUoJ_993A',
                language: 'vi',
            }}
        />
    );
};

export default GooglePlacesInput;