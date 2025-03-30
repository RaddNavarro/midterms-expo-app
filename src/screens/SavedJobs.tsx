import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, ScrollView, Button, Modal, SafeAreaView, ActivityIndicator, Image, FlatList } from "react-native";
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
    const [savedID, setSavedID] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [jobData, setJobData] = useState([]);
    const isFocused = useIsFocused();
    const [refreshing, setRefreshing] = useState(false)

    // useEffect(() => {

    //     // const unsubscribe = navigation.addListener('focus', () => {
    //     //     fetchData();
    //     //     getSavedData();
    //     // });

    //     // return unsubscribe;
    // }, [navigation])
    function currencyFormat(num) {
        return '₱' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
     }
    useEffect(() => {
          fetchData() 
          getSavedData();
      }, []);

    
    const getSavedData = async () => {
       
        setIsLoading(true);
        try {
            let saved = await AsyncStorage.getItem('saved');
            saved = JSON.parse(saved)
            let savedData = [];
            if (saved) {
                jobData.forEach(data => {
                    if (saved.includes(data.id)) {
                        savedData.push(data)
                        console.log(saved)
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
            setIsLoading(false);
        }
    }

    const fetchData = async () => {
        setIsLoading(true);
        
        try {
           
            const data: any = await AsyncStorage.getItem('jobs')
            // let saved = await AsyncStorage.getItem('saved');
            // saved = JSON.parse(saved)
            // const jobs = JSON.parse(data)
            if (data) {
                
                // jobs.map((job) => {
                //     console.log(job.id, job.title)
                // } )
                setJobData(JSON.parse(data))
                


                
            }
            // getSavedData();

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


    const renderSavedJobs = ({ item }) => {
        return (
            <View key={item.id}>
                <TouchableOpacity style={styles.saved_job_list}>
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
                        <TouchableOpacity>
                            <Text style={{ fontWeight: '800', backgroundColor: COLOURS.blue, color: COLOURS.white, width: '100%', paddingHorizontal: 50, paddingVertical: 10, borderRadius: 10, letterSpacing: 2 }}>Apply for Job</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </View>

        )
    }

    return (

        <View style={styles.savedJobs_container}>
                <View style={styles.savedJobs}>
                    <Text style={styles.saved_header_title}>Saved Jobs</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('JobsFinder')} style={{ marginLeft: 10 }}>
                        <Ionicons name="home-outline" size={25}></Ionicons>
                    </TouchableOpacity>
                </View>
                <View>
                    {/* {savedJobs ? savedJobs.map(renderSavedJobs) : <Text>No jobs saved</Text>} */}
                    <FlatList
                        data={savedJobs}
                        renderItem={(item) => renderSavedJobs(item)}
                        keyExtractor={(renderSavedJobs, index) => index.toString()}
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                    />
                </View>
                {/* {savedJobs ? savedJobs.map((data) => {
                    return <Text>{data.id}   {data.title}</Text>
                }) : <Text>No saved jobs</Text>} */}

        </View>


    )
}


export default SavedJobs;