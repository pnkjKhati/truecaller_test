import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';

const Card = ({ onSwipeLeft, onSwipeRight }) => {
    const position = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            // onStartShouldSetPanResponder: () => true,
            onMoveShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                position.setValue({ x: gestureState.dx, y: 0 });
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > 10) {
                    onSwipeRight()
                    // Swipe right
                    Animated.timing(position, {
                        toValue: { x: 0, y: 0 },
                        duration: 300,
                        useNativeDriver: true,
                    }).start()
                } else if (gestureState.dx < -10) {
                    // Swipe left
                    onSwipeLeft();
                    Animated.timing(position, {
                        toValue: { x: 0, y: 0 },
                        duration: 300,
                        useNativeDriver: true,
                    }).start()
                } else {
                    // Reset position
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <>
            <View style={{ backgroundColor: 'green', height: 50, position: 'relative', marginBottom: 20 }}></View>
            <Animated.View
                {...panResponder.panHandlers}
                style={[
                    styles.card,
                    {
                        transform: position.getTranslateTransform(),
                    },
                ]}
            >
                <View style={styles.leftSection}>
                    <View style={styles.avatarContainer}>
                        {false ? null : <Text>S</Text>}
                    </View>
                    <View style={styles.detailSection}>
                        <Text style={{ color: "white" }}>Name</Text>
                        <Text style={{ color: "white" }}>Outgoing . 9:35 PM</Text>
                    </View>
                </View>
                <View><Text style={{ color: "white" }}>Image</Text></View>
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        height: 50,
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        backgroundColor: "black"
    },
    avatarContainer: {
        width: 45,
        height: 45,
        borderRadius: 22.5,
        backgroundColor: 'orange',
        alignItems: 'center',
        justifyContent: 'center'
    },
    leftSection: {
        flexDirection: 'row'
    },
    detailSection: {
        marginLeft: 5
    }
});

export default Card;
