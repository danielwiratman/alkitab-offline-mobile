import {
    View,
    Text,
    TouchableOpacity,
    FlatList,
    BackHandler,
    Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import PercentageCircle from "react-native-percentage-circle";
import tw from "twrnc";
import { SafeAreaView } from "react-native-safe-area-context";
import Books from "../assets/alkitab/Books.json";

const HomeScreen = (props) => {
    const { navigation } = props;
    const [book, setBook] = useState("");
    const [chapter, setChapter] = useState(0);
    const [abb, setAbb] = useState("");

    useEffect(() => {
        if (book !== "" && chapter > 0) {
            navigation.navigate("Passage", { book: book, chapter: chapter });
            setTimeout(() => {
              setBook("")
              setChapter(0)
              setAbb("")
            }, 10)
        }
    }, [book, chapter, abb]);

    
    useEffect(() => {
      const handleBack = () => {
          setBook("");
          setChapter(0);
          setAbb("");
          return true
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
                style={[
                    tw`h-1/3 justify-center items-center px-3`,
                    { backgroundColor: "#000" },
                ]}
            >
                <PercentageCircle
                    radius={50}
                    percent={100}
                    color={"#fff"}
                    borderWidth={8}
                    bgcolor={"#000"}
                    innerColor={"#000"}
                    textStyle={{ color: "white", fontSize: 24 }}
                />
                <Text style={tw`mt-5 text-white text-lg leading-tight`}>
                    Hari ini kamu sudah membaca Alkitab selama{" "}
                    <Text style={tw`font-bold`}>5 jam 10 menit</Text>.
                </Text>
            </SafeAreaView>
            <View
                style={[
                    tw`h-2/3 p-3 justify-center items-center`,
                    { backgroundColor: "#fff" },
                ]}
            >
                {!book ? (
                    <FlatList
                        data={Books}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={tw`justify-center items-center`}
                        numColumns={4}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setBook(item.title);
                                    setAbb(item.abb);
                                }}
                                style={[
                                    tw`border-2 border-black p-2 m-2 justify-center items-center`,
                                    { width: 70 },
                                ]}
                            >
                                <Text>{item.abb}</Text>
                            </TouchableOpacity>
                        )}
                    />
                ) : (
                    <FlatList
                        data={[
                            ...Array(
                                Books[Books.map((e) => e.abb).indexOf(abb)]
                                    .total
                            ).keys(),
                        ].map((e) => e + 1)}
                        contentContainerStyle={tw`justify-center items-center`}
                        numColumns={4}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onPress={() => {
                                    setChapter(item);
                                }}
                                style={[
                                    tw`border-2 border-black p-2 m-2 justify-center items-center`,
                                    { width: 70 },
                                ]}
                            >
                                <Text>{item}</Text>
                            </TouchableOpacity>
                        )}
                    />
                )}
            </View>
        </View>
    );
};

export default HomeScreen;
