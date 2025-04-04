import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Button, Modal, SafeAreaView, ActivityIndicator, Image, FlatList, ToastAndroid } from "react-native";
import { Props } from "../navigation/props";
import styles from "../styles/styles";
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { COLOURS } from "../database/databse";
import axios from "axios";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";


const SavedJobs: React.FC<Props> = ({ navigation }) => {

    const [openModal, setOpenModal] = useState(false);
    const [savedJobs, setSavedJobs] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [jobData, setJobData] = useState([]);
    const [refreshing, setRefreshing] = useState(false)
    const [passedID, setPassedID] = useState('')
    const [savedID, setSavedID] = useState([])

    const url = "https://empllo.com/api/v1";
    let ids = 1

    function currencyFormat(num) {
        return '₱' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    }
    // useEffect(() => {
    //     fetchData()
    //     getSavedData();
    // }, []);

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (jobData) {
            getSavedData();
        }
    }, [jobData]);


    const getSavedData = async () => {

        setIsLoading(true);
        try {
            let saved = await AsyncStorage.getItem('saved');
            saved = JSON.parse(saved)
            let savedData = [];
            if (saved && jobData) {
                jobData.forEach(data => {
                    if (saved.includes(data.id)) {
                        savedData.push(data)
                        return;
                    }
                })
                setSavedJobs(savedData);
            } else {
                setSavedJobs(null)
            }
        } catch (error) {
            console.error(error);
        }
        finally {
            console.log(savedJobs)
            setIsLoading(false);
        }
    }
    const fetchData = async () => {
        setIsLoading(true);

        try {

            const res = await axios.get(url);

            const data = res.data.jobs;

            if (data) {

                let filteredData = data.filter((job: any, idx: any) => idx === data.findIndex(elem => elem.title === job.title))
                let newData = filteredData.map((data: any, idx: any) => ({ ...data, id: ids++ }))
                setJobData(newData);

            }

        } catch (error: any) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }

    }


    const handleRefresh = () => {
        setRefreshing(true)

        fetchData()
        getSavedData()
        setRefreshing(false)
    }


    if (isLoading) {

        return (
            <SafeAreaView style={styles.loadingContainer}>
                <ActivityIndicator size="large" color={COLOURS.black} />
                <Text>Loading...</Text>
            </SafeAreaView>
        )
    }

    const removeSavedJob = async (id) => {

        console.log(id)
        try {
            let saved = await AsyncStorage.getItem('saved');
            saved = JSON.parse(saved)
            let savedData = [];
            let newSaved = [];
            if (saved && jobData) {
                jobData.forEach(data => {
                    if (saved.includes(data.id)) {
                        savedData.push(data.id)
                        return;
                    }
                })
            }

            let updateData = savedData.filter((save) => save !== id)
            let updateData2 = savedData.filter((save) => save !== id)
            let newData = []
            if (updateData2 && jobData) {
                jobData.forEach(data => {
                    if (updateData2.includes(data.id)) {
                        newSaved.push(data)
                        // newData.push(data)
                        return;
                    }
                })
            }
            console.log(newSaved, "bruh")
            setSavedJobs(newSaved)
            await AsyncStorage.setItem('saved', JSON.stringify(updateData))
            ToastAndroid.show(
                "Removed Saved Job", ToastAndroid.SHORT
            );
            console.log(updateData)
        } catch (error) {
            console.error(error);
        }
        // finally {
        //     handleRefresh()
        // }
    }

    const renderSavedJobs = ({ item }) => {
        return (
            <View key={item.id}>
                <View style={styles.saved_job_list}>
                    <View style={styles.saved_job_list_inner}>
                        <View style={styles.saved_job_list_inner_img_wrapper}>
                            <Image height={80} width={80} source={{ uri: item.companyLogo }} />
                            <View style={styles.saved_job_list_inner_txt}>
                                <Text style={styles.saved_job_list_inner_txt_title}>{item.title}</Text>
                                <Text>{item.companyName}</Text>
                                <Text style={styles.saved_job_list_inner_txt_info}>{item.seniorityLevel} ● {item.workModel} ● {item.jobType}</Text>
                            </View>
                        </View>

                    </View>
                    <View style={{ marginBottom: 10 }}>
                        <Text style={styles.saved_job_list_inner_txt_salary}>{item.minSalary && item.maxSalary ? (
                            <>
                                <Text>{currencyFormat(item.minSalary)} - {currencyFormat(item.maxSalary)}</Text>
                            </>) : (
                            <Text>Unknown Salary</Text>
                        )}</Text>
                    </View>
                    <View style={{ alignItems: 'center', left: 10 }}>
                        {/* <TouchableOpacity>
                                            <Ionicons name="bookmark-outline" size={24} color={COLOURS.black} />
                                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => { setOpenModal(true); setPassedID(item.id) }}>
                            <Text style={{ fontWeight: '800', backgroundColor: COLOURS.blue, color: COLOURS.white, width: '100%', paddingHorizontal: 50, paddingVertical: 10, borderRadius: 10, letterSpacing: 2 }}>Apply for Job</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => removeSavedJob(item.id)}>
                            <Text style={{ fontWeight: '800', backgroundColor: COLOURS.red, color: COLOURS.white, width: '100%', paddingHorizontal: 50, paddingVertical: 10, borderRadius: 10, letterSpacing: 2, margin: 10 }}>Remove from Saved Jobs</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>



        )
    }


    const handleSubmit = async (id) => {

        console.log(id)
        try {
            let saved = await AsyncStorage.getItem('saved');
            saved = JSON.parse(saved)
            let savedData = [];
            console.log(saved)
            if (saved && jobData) {
                jobData.forEach(data => {
                    if (saved.includes(data.id)) {
                        savedData.push(data.id)
                        return;
                    }
                })
            }
            setOpenModal(false)
            let updateData = savedData.filter((save) => save !== id)
            await AsyncStorage.setItem('saved', JSON.stringify(updateData))
            ToastAndroid.show(
                "Application Sent", ToastAndroid.SHORT
            );
            navigation.navigate('JobsFinder')
            console.log(updateData)
        } catch (error) {
            console.error(error);
        }
    }

    function renderModal(id) {
        return (
            <View>
                {jobData.map((item) => {
                    if (item.id === id) {
                        return (
                            <>
                                <Modal visible={openModal} animationType='fade' transparent={true} key={item.id}>
                                    <View style={styles.application_container} key={item.id}>
                                        <View style={styles.application_inner_container}>
                                            <Text>Applicaiton Form</Text>
                                            <View style={styles.application_applyBtn}>
                                                <TouchableOpacity onPress={() => handleSubmit(item.id)}>
                                                    <Text style={styles.applyTxt}>Apply Job</Text>
                                                </TouchableOpacity>
                                            </View>
                                            <TouchableOpacity onPress={() => setOpenModal(false)}>
                                                <Text style={styles.closeTxt}>Close</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>
                                </Modal>
                            </>
                        )
                    }
                })}
                {/* </Modal> */}
            </View>
        )
    }


    return (

        <SafeAreaView style={styles.savedJobs_container}>
            <View style={styles.savedJobs}>
                <Text style={styles.saved_header_title}>Saved Jobs</Text>
                <TouchableOpacity onPress={() => navigation.navigate('JobsFinder')} style={{ marginLeft: 10 }}>
                    <Ionicons name="home-outline" size={25}></Ionicons>
                </TouchableOpacity>
            </View>
            <View>
                {/* {savedJobs.length > 0 ? (<FlatList
                    data={savedJobs}
                    renderItem={renderSavedJobs}
                    keyExtractor={(renderSavedJobs, index) => index.toString()}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                /> ): 
                (
                    <Text>No saved jobs yet</Text>
                )  } */}
                <FlatList
                    data={savedJobs}
                    renderItem={renderSavedJobs}
                    keyExtractor={(renderSavedJobs, index) => index.toString()}
                    refreshing={refreshing}
                    onRefresh={handleRefresh}
                />
                
            </View>
            {renderModal(passedID)}
        </SafeAreaView>
    )
}


export default SavedJobs;