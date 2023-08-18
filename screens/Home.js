import { Animated, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useRef } from 'react'
import Card from '../component/Card';

const Home = ({ navigation }) => {
    const translateY = useState(new Animated.Value(0))[0];
    const [isVisible, setIsVisible] = useState(true)
    const [direction, setDirection] = useState("");
    const [prevOffset, setPrevOffset] = useState(-1);

    const handleSwipeLeft = () => {
        navigation.navigate("Chat")


    };

    const handleSwipeRight = () => {
        navigation.navigate("Dial")
    };


    const scrollBegin = (e) => {

        const currentOffset = e.nativeEvent.contentOffset.y;

        // if (currentOffset > prevOffset) {
        // Scrolling downwards
        Animated.timing(translateY, {
            toValue: 10,
            duration: 300,
            useNativeDriver: false,
        }).start();

        // } else if (currentOffset < prevOffset) {
        //     // Scrolling upwards
        // }

        // Update the previous offset
        setPrevOffset(currentOffset);
    }



    const scrollEnd = (e) => {
        // const currentOffset = e.nativeEvent.contentOffset.y;
        // setPrevOffset(currentOffset)
        Animated.timing(translateY, {
            toValue: 0,
            duration: 300,
            useNativeDriver: false,
        }).start();
    };
    return (
        <View style={styles.container}>
            <FlatList
                data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
                renderItem={({ item }) => <Card onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />}
                // onScroll={handleScroll}
                onScrollBeginDrag={scrollBegin}
                onScrollEndDrag={scrollEnd}
            // onMomentumScrollEnd={() => {
            //     Animated.timing(translateY, {
            //         toValue: 0,
            //         duration: 300,
            //         useNativeDriver: false,
            //     }).start();
            // }}
            />
            <Animated.View
                style={
                    [
                        styles.hideItem,
                        { bottom: isVisible ? 20 : -100 },
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
        // bottom: 20,
        right: 20,
        backgroundColor: 'lightblue',
        borderRadius: 25,
        padding: 10,
    }
})


// import React, { useState } from 'react';
// import { Animated, FlatList, StyleSheet, View } from 'react-native';
// import Card from '../component/Card';

// const Home = () => {
//     const [isScrolling, setIsScrolling] = useState(false);
//     const translateY = useState(new Animated.Value(0))[0];

//     const handleSwipeLeft = () => {
//         // Handle swipe left action
//     };

//     const handleSwipeRight = () => {
//         // Handle swipe right action
//     };

//     const handleScrollBegin = () => {
//         setIsScrolling(true);
//         hideItem();
//     };

//     const handleScrollEnd = () => {
//         setIsScrolling(false);
//         showItem();
//     };

//     const hideItem = () => {
//         Animated.timing(translateY, {
//             toValue: 100,
//             duration: 300,
//             useNativeDriver: false,
//         }).start();
//     };

//     const showItem = () => {
//         Animated.timing(translateY, {
//             toValue: 0,
//             duration: 300,
//             useNativeDriver: false,
//         }).start();
//     };

//     const handleScroll = Animated.event(
//         [{ nativeEvent: { contentOffset: { y: translateY } } }],
//         { useNativeDriver: false },
//     );

//     return (
//         <View style={styles.container}>
//             <FlatList
//                 data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]}
//                 renderItem={({ item }) => <Card onSwipeLeft={handleSwipeLeft} onSwipeRight={handleSwipeRight} />}
//                 onScroll={handleScroll}
//                 onScrollBeginDrag={handleScrollBegin}
//                 onScrollEndDrag={handleScrollEnd}
//             />
//             <Animated.View
//                 style={[
//                     styles.hideItem,
//                     {
//                         transform: [
//                             {
//                                 translateY: translateY.interpolate({
//                                     inputRange: [0, 10],
//                                     outputRange: [0, 100],
//                                 }),
//                             },
//                         ],
//                     },
//                 ]}
//             ></Animated.View>
//         </View>
//     );
// };

// export default Home;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         borderWidth: 1,
//         borderColor: 'green',
//         position: 'relative',
//     },
//     hideItem: {
//         height: 50,
//         width: 50,
//         position: 'absolute',
//         bottom: 20,
//         right: 20,
//         backgroundColor: 'lightblue',
//         borderRadius: 25,
//         padding: 10,
//     },
// });
