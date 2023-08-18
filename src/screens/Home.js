import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Card from '../components/Card';

const Home = ({ navigation }) => {
    const translateY = useState(new Animated.Value(0))[0];
    const [isVisible, setIsVisible] = useState(true)

    const handleSwipeLeft = () => {
        navigation.navigate("Chat")
    };

    const handleSwipeRight = () => {
        navigation.navigate("Dial")
    };

    const scrollBegin = (e) => {
        Animated.timing(translateY, {
            toValue: 10,
            duration: 300,
            useNativeDriver: false,
        }).start();
    }

    const scrollEnd = (e) => {
        Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={new Array(100)}
                renderItem={({ item }) => <Card onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />}
                // onScroll={handleScroll}
                onScrollBeginDrag={scrollBegin}
                onScrollEndDrag={scrollEnd}
            />
            <Animated.View
                style={
                    [
                        styles.hideItem,
                        // { bottom: isVisible ? 20 : -100 },
                        {
                            transform: [
                                {
                                    translateY: translateY.interpolate({
                                        inputRange: [0, 10],
                                        outputRange: [0, 100],
                                    }),
                                },
                            ],
                        },
                    ]}
            ></Animated.View>

        </View >
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative"
    },
    hideItem: {
        height: 50,
        width: 50,
        position: 'absolute',
        right: 20,
        bottom: 20,
        backgroundColor: 'lightblue',
        borderRadius: 25,
        padding: 10,
    }
})

