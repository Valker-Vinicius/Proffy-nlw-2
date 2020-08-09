import React from 'react';
import { View, ImageBackground, Text } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import giveClassesBgImage from '../../assets/images/give-classes-background.png';
 
import styles from './styles';

function GiveClasses() {
    const {goBack} = useNavigation();

    function handleNavigateBack() {
        goBack();
    }

    return (
        <View style={styles.container}> 
            <ImageBackground 
                source={giveClassesBgImage} 
                style={styles.content}
                resizeMode = "contain"
            >
                <Text style={styles.title}>Do you want to be a proffy?</Text>
                <Text style={styles.description}> 
                    So at first register yourself as teacher/professor in our web platform
                </Text>
            </ImageBackground>

            <RectButton onPress={handleNavigateBack} style={styles.okButton}>
                <Text style={styles.okButtonText}>I see, thanks</Text>
            </RectButton>
        </View>
    )
}

export default GiveClasses;