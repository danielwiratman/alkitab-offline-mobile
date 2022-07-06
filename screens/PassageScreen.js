import {
    View,
    Text,
    BackHandler,
    FlatList,
    TouchableWithoutFeedback,
} from "react-native";
import React, { useState, useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import tw from "twrnc";
import Passages from "../assets/alkitab/Passages.json";

const PassageScreen = (props) => {
    const { route, navigation } = props;
    const { book, chapter } = route.params;

    const [data, setData] = useState([]);

    const [isSelected, setIsSelected] = useState({});

    // useEffect(() => {
    //     console.log(isSelected);
    // }, [isSelected]);

    useEffect(() => {
        let l1 = [];
        let count = 0;
        for (let verseNum in Passages[book][chapter]) {
            l1.push({
                id: count,
                verseNum: parseInt(verseNum),
                text: Passages[book][chapter][verseNum],
            });
            count++;
        }
        l1.sort((a, b) => {
            return a.verseNum > b.verseNum
                ? 1
                : a.verseNum < b.verseNum
                ? -1
                : 0;
        });
        setData(l1);

        const handleBack = () => {
            navigation.goBack();
        };

        const backHandler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBack
        );
        return () => {
            backHandler.remove();
        };
    }, []);

    return (
        <View style={tw`h-full bg-white`}>
            <SafeAreaView
                style={[tw`bg-black h-1/5 justify-center items-center`]}
            >
                <Text style={tw`text-white`}>
                    Book: {book} {chapter}
                </Text>
            </SafeAreaView>
            <View style={tw`h-4/5`}>
                <FlatList
                    data={data}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View
                            style={[
                                tw`px-4 py-1 ${
                                    isSelected[item.verseNum]
                                        ? "bg-gray-200"
                                        : ""
                                }`,
                                {
                                    borderBottomWidth: 1,
                                    borderColor: "lightgray",
                                },
                            ]}
                        >
                            <TouchableWithoutFeedback
                                onPress={() =>
                                    setIsSelected({
                                        ...isSelected,
                                        [item.verseNum]:
                                            !isSelected[item.verseNum],
                                    })
                                }
                            >
                                <Text style={tw`text-base`}>
                                    <Text style={tw`font-semibold`}>
                                        {item.verseNum}
                                    </Text>{' '}
                                    {item.text}
                                </Text>
                            </TouchableWithoutFeedback>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default PassageScreen;
