import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, TextInput, Image, FlatList, Switch, useColorScheme, Modal, ActivityIndicator, SafeAreaView, Button, Alert, ToastAndroid } from "react-native";
import { Props } from "../navigation/props";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useId } from "react-id-generator";
import styles from "../styles/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLOURS } from "../database/databse";
import { ColorProperties } from "react-native-reanimated/lib/typescript/Colors";
import filter from "lodash.filter";

const JobsFinder: React.FC<Props> = ({ navigation }) => {

    const [jobData, setJobData] = useState<any>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [savedData, setSavedData] = useState([]);
    const [refreshing, setRefreshing] = useState(false);
    let ids = 1
    const url = "https://empllo.com/api/v1";
    const [isDark, setIsDark] = useState(false);
    const [passedID, setPassedID] = useState('')
    const [savedJobs, setSavedJobs] = useState([])

    const [searchQuery, setSearchQuery] = useState("");
    const [searchData, setSearchData] = useState([]);
    const [openModal, setOpenModal] = useState(false);

    function renderModal(id) {

        return (
            <Modal visible={openModal} animationType='slide' key={id} statusBarTranslucent>
                <View style={styles.application_container}>
                    <View style={styles.application_inner_container}>
                        {jobData.map((item) => {
                            if (item.id === id) {
                                return (
                                    <>
                                        <Text>{item.title}</Text>
                                        <Text>{item.id}</Text>

                                        <TouchableOpacity>
                                            <Text>Apply Job</Text>
                                        </TouchableOpacity>
                                    </>


                                )
                            }
                        })}
                        <TouchableOpacity onPress={() => setOpenModal(false)}>
                            <Text>Close</Text>
                        </TouchableOpacity>
                    </View>

                </View>

            </Modal>
        )
    }

    const addSavedJobs = async (id) => {

        let jobArray = await AsyncStorage.getItem('saved');
        jobArray = JSON.parse(jobArray)

        if (savedData.includes(id)) {
            ToastAndroid.show(
                "Job Already Saved", ToastAndroid.SHORT
            );
            return;
        }

        if (jobArray) {
            let array = jobArray
            array.push(id);

            try {
                await AsyncStorage.setItem('saved', JSON.stringify(array));
                ToastAndroid.show(
                    "Job Saved", ToastAndroid.SHORT
                );

                setOpenModal(false);
            } catch (error) {
                console.error(error);
                return;
            }

        } else {
            let array = []
            array.push(id);

            try {
                await AsyncStorage.setItem('saved', JSON.stringify(array));
                ToastAndroid.show(
                    "Job Saved", ToastAndroid.SHORT
                );

                setOpenModal(false);
            } catch (error) {
                console.error(error);
                return;
            }
        }
    }


    const fetchData = async () => {
        setIsLoading(true);

        try {

            const res = await axios.get(url);
            const data = res.data.jobs;
            if (data) {
                await AsyncStorage.removeItem('jobs')
                let filteredData = data.filter((job: any, idx: any) => idx === data.findIndex(elem => elem.title === job.title))
                let newData = filteredData.map((data: any, idx: any) => ({ ...data, id: ids++ }))
                setJobData(newData);
                setSearchData(newData);
                await AsyncStorage.setItem('jobs', JSON.stringify(newData))
            }

        } catch (error: any) {
            console.log(error)
        } finally {
            const data: any = await AsyncStorage.getItem('jobs');
            const saved = await AsyncStorage.getItem('saved');
            const jobs = JSON.parse(data)
            const saves = JSON.parse(saved);
            jobs.map((job) => {
                console.log(job.id, job.title)
            })
            setSavedData(saves);
            console.log(savedData)
            setIsLoading(false);
        }
    }

    useEffect(() => {

        fetchData()

    }, [])

    if (isLoading) {
        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLOURS.black} />
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    const item = ({ item }) => {
        return (
            <View key={item.id}>
                <TouchableOpacity style={styles.job_list} onPress={() => { setOpenModal(true); setPassedID(item.id) }}>
                    <View style={styles.job_list_inner}>
                        <View style={styles.job_list_inner_img_wrapper}>
                            <Image height={80} width={80} source={{ uri: item.companyLogo }} />
                            <View style={styles.job_list_inner_txt}>
                                <Text style={styles.job_list_inner_txt_title}>{item.title}</Text>
                                <Text>{item.companyName}</Text>
                                <Text style={styles.job_list_inner_txt_info}>{item.seniorityLevel} ● {item.workModel} ● {item.jobType}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.job_list_inner_txt_salary}>{item.minSalary && item.maxSalary ? (
                            <>
                                <Text>${item.minSalary} - ${item.maxSalary}</Text>

                            </>) : (

                            <Text>Unknown Salary</Text>
                        )}</Text>
                    </View>
                    <View style={{ alignItems: 'center', left: 10 }}>
                        <TouchableOpacity onPress={() => addSavedJobs(item.id)} disabled={savedData.includes(item.id) ? true : false}>
                            {savedData.includes(item.id) ? (<Text style={{
                                fontWeight: '800',
                                backgroundColor: COLOURS.backgroundMedium,
                                color: COLOURS.white,
                                width: '100%',
                                paddingHorizontal: 50,
                                paddingVertical: 10,
                                borderRadius: 10,
                                letterSpacing: 2
                            }} >
                                Saved
                            </Text>) : (
                                <Text style={{
                                    fontWeight: '800',
                                    backgroundColor: COLOURS.blue,
                                    color: COLOURS.white,
                                    width: '100%',
                                    paddingHorizontal: 50,
                                    paddingVertical: 10,
                                    borderRadius: 10,
                                    letterSpacing: 2
                                }} >
                                    Save Job
                                </Text>
                            )
                            }


                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>

        )
    }

    const handleSearch = (query) => {
        setSearchQuery(query);
        const formattedQuery = query.toLowerCase();
        const filteredData = filter(searchData, (item) => {
            return contains(item, formattedQuery);
        })

        setJobData(filteredData);
    }

    const handleRefresh = () => {
        setRefreshing(true)

        fetchData()
        setRefreshing(false)
    }

    const contains = ({ title }, query) => {

        if (title.toLowerCase()?.includes(query)) {
            return true;
        } else {
            return false;
        }
    }

    const toggleSwitch = (value) => {
        setIsDark(value);
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {/* <ScrollView> */}
                <View style={styles.home_header}>
                    <View>
                        <Text style={styles.home_header_title}>Job Finder</Text>
                    </View>
                    <View style={styles.home_header_left}>
                        <TouchableOpacity onPress={() => navigation.navigate('SavedJobs')}>
                            <Ionicons name="newspaper-outline" size={25}></Ionicons>
                        </TouchableOpacity>

                    </View>

                </View>
                <View style={styles.home_search_bar(isDark)}>
                    <View style={styles.home_search_bar_icon}>
                        <Ionicons name="search-outline" size={20} color={isDark === true ? 'white' : 'black'} />



                        <TextInput style={{ padding: 10, color: isDark === true ? 'white' : 'black', }} placeholder="Search jobs" placeholderTextColor={isDark === true ? 'white' : 'black'} value={searchQuery} onChangeText={(query) => handleSearch(query)}></TextInput>
                    </View>


                </View>
                <View>
                    <Switch onValueChange={toggleSwitch} value={isDark} />
                </View>
                <View>
                    <FlatList
                        data={jobData}
                        renderItem={item}
                        keyExtractor={(item, index) => index.toString()}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                </View>
                {renderModal(passedID)}
            </View >
        </SafeAreaView>
    )
}


export default JobsFinder;