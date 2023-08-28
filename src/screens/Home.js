import { Animated, FlatList, StyleSheet, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Card from '../components/Card';

const Home = ({ navigation }) => {
    const translateY = useState(new Animated.Value(0))[0];
    const [scrollY, setScrollY] = useState(0);
    const [scrollToDown, setScrollToDown] = useState(false)

    const handleSwipeLeft = () => {
        navigation.navigate("Chat")
    };

    const handleSwipeRight = () => {
        navigation.navigate("Dial")
    };

    useEffect(() => {
        if (scrollToDown) {
            Animated.timing(translateY, {
                toValue: 70,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [scrollToDown])

    return (
        <View style={styles.container}>
            <FlatList
                data={new Array(100)}
                renderItem={({ item }) => <Card onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />}
                onMomentumScrollEnd={() => {
                    Animated.timing(translateY, {
                        toValue: 0,
                        duration: 300,
                        useNativeDriver: true,
                    }).start();
                    setScrollToDown(false)
                }}
                onScroll={(e) => {
                    const currentScrollY = e.nativeEvent.contentOffset.y;

                    if (currentScrollY > scrollY) {
                        if (!scrollToDown) setScrollToDown(true)
                    } else {
                        // scrollEnd()
                    }

                    setScrollY(currentScrollY);
                }}
            />
            <Animated.View
                style={
                    [
                        styles.hideItem,
                        {
                            transform: [
                                {
                                    translateY: translateY
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

