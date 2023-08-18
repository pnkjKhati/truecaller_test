import React, { useRef } from 'react';
import { View, StyleSheet, PanResponder, Animated, Text } from 'react-native';

const Card = ({ onSwipeLeft, onSwipeRight }) => {
    const position = useRef(new Animated.ValueXY()).current;

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                position.setValue({ x: gestureState.dx, y: 0 });
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dx > 10) {
                    // Swipe right
                    Animated.timing(position, {
                        toValue: { x: 40, y: 0 },
                        duration: 300,
                        useNativeDriver: false,
                    }).start(() => onSwipeRight());
                } else if (gestureState.dx < -10) {
                    // Swipe left
                    Animated.timing(position, {
                        toValue: { x: -40, y: 0 },
                        duration: 300,
                        useNativeDriver: false,
                    }).start(() => onSwipeLeft());
                } else {
                    // Reset position
                    Animated.spring(position, {
                        toValue: { x: 0, y: 0 },
                        useNativeDriver: false,
                    }).start();
                }
            },
        })
    ).current;

    return (
        <>
            <View style={{ backgroundColor: 'green', height: 42, position: 'relative', marginBottom: 10 }}></View>
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
                {/* </View> */}
            </Animated.View>
        </>
    );
};

const styles = StyleSheet.create({
    card: {
        width: '100%',
        // borderRadius: 10,
        height: 42,
        // elevation: 5,
        alignItems: 'center',
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 10,
        position: 'absolute',
        backgroundColor: "black"
    },
    avatarContainer: {
        width: 40,
        height: 40,
        borderRadius: 20,
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
