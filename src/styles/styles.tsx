import { StatusBar, StyleSheet } from "react-native";
import { COLOURS } from "../database/databse";
const styles = StyleSheet.create({
    
    safeContainer: {
        flex: 1
    },


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 100
    },
    home_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 7,
    },
    home_header_title: {
        fontSize: 19
    },
    home_header_left: {
        padding: 10
    },
    home_search_bar_icon: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
        // justifyContent: 'center',
        // paddingLeft: 15
    },
    home_search_bar:(isDark)=> ({
        marginHorizontal: 30,
        backgroundColor: isDark === true ? 'black' : 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        
        
    }),

    job_list: {
        backgroundColor: COLOURS.white,
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        marginTop: 20
    },
    job_list_inner: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',

    },
    job_list_inner_img_wrapper: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    job_list_inner_txt: {
        marginLeft: 8,
    },
    job_list_inner_txt_title: {
        fontSize: 16,
        fontWeight: '600',
        width: 270,
        marginBottom: 0,

        
    },
    job_list_inner_txt_info: {
        fontSize: 12,
        fontWeight: '400'
    },
    job_list_inner_txt_salary: {
        fontSize: 16,
        fontWeight: '500'
    },


    // SAVED JOBS
    
    savedJobs_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    savedJobs: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 20,
        paddingHorizontal: 7,
    },


    // APPLICATION FORM
    application_container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'transparent'
    },
    application_inner_container: {
        backgroundColor: 'white', 
        padding: 15, 
        width: '90%', 
        height: 150, 
        borderRadius: 10,
        
    },



    // LOADING SCREEN
    loadingContainer: {
        flex: 1,
        backgroundColor: COLOURS.backgroundLight,
        padding: StatusBar.currentHeight,
        justifyContent: 'center',
        alignItems: 'center'
    },


    // DETAILS MODAL
    
})

export default styles;