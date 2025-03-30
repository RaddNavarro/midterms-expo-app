import { StatusBar, StyleSheet } from "react-native";
import { COLOURS } from "../database/databse";
const styles = StyleSheet.create({
    
   


    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        top: 100,
        
    },
    safeContainer:(isDark)=> ({
        flex: 1,
        backgroundColor: isDark === true ? COLOURS.black : COLOURS.backgroundLight
        
        
        
    }),

    
    home_header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 60,
        paddingBottom: 20,
        paddingHorizontal: 7,
    },
    home_header_title:(isDark) => ({
        fontSize: 19,
        color: isDark === true ? COLOURS.white : COLOURS.black
    }),
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
        backgroundColor: isDark === true ? COLOURS.backgroundDark : 'white',
        flexDirection: 'row',
        alignItems: 'center',
        width: '80%',
        borderRadius: 20,
        padding: 5,
        paddingHorizontal: 10,
        
        
    }),

    job_list:(isDark)=> ({
        backgroundColor: isDark === true ? COLOURS.backgroundDark : 'white',
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        marginTop: 20
    }),
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
    job_list_inner_txt_title: (isDark)=> ({
        fontSize: 16,
        fontWeight: '600',
        width: 270,
        marginBottom: 0,
        color: isDark === true ? COLOURS.white : COLOURS.black

        
    }),
    job_list_inner_txt_info: (isDark)=> ({
        fontSize: 12,
        fontWeight: '400',
        color: isDark === true ? COLOURS.white : COLOURS.black
    }),
    job_list_inner_txt_companyName: (isDark)=> ({
        fontSize: 12,
        fontWeight: '400',
        color: isDark === true ? COLOURS.white : COLOURS.black
    }),
    job_list_inner_txt_salary: (isDark)=> ({
        fontSize: 16,
        fontWeight: '500',
        color: isDark === true ? COLOURS.white : COLOURS.black
    }),


    // SAVED JOBS
    
    safeContainer_saved: {
        flex: 1,
        backgroundColor: COLOURS.backgroundLight
    },
    saved_header_title: {
        fontSize: 19,
        color: COLOURS.black
    },
    savedJobs_container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
    },
    savedJobs: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 0,
        paddingBottom: 20,
        paddingHorizontal: 7,
    
    },
    saved_job_list: {
        backgroundColor: COLOURS.white,
        padding: 16,
        borderRadius: 16,
        marginBottom: 16,
        marginTop: 20
    },
    saved_job_list_inner: {
        // flexDirection: 'row',
        // justifyContent: 'space-between',
        // alignItems: 'center',

    },
    saved_job_list_inner_img_wrapper: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    saved_job_list_inner_txt: {
        marginLeft: 8,
    },
    saved_job_list_inner_txt_title: {
        fontSize: 16,
        fontWeight: '600',
        width: 270,
        marginBottom: 0,

        
    },
    saved_job_list_inner_txt_info: {
        fontSize: 12,
        fontWeight: '400'
    },
    saved_job_list_inner_txt_salary: {
        fontSize: 16,
        fontWeight: '500'
    },


    // APPLICATION FORM
    application_container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'rgba(0,0,0, .6)'
    },
    application_inner_container: {
        // backgroundColor: 'white', 
        // padding: 15, 
        // width: '90%', 
        // height: 150, 
        // borderRadius: 10,
        flex: 1,
        backgroundColor: 'white',
        borderRadius: 20,
        height: 10,
        marginVertical: 150,
        padding: 10,
        alignItems: 'center',

    },
    application_title: {
        marginBottom: 20,
        color: 'dodgerblue',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,

        
    },
    application_applyBtn: {
        flexDirection: 'row',
        marginVertical: 30,
        alignItems: 'center'
    },
    applyTxt: {
        fontWeight: '800',
        backgroundColor: COLOURS.blue,
        color: COLOURS.white,
        width: '100%',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 10,
        letterSpacing: 2
    },
    closeTxt: {
        fontWeight: '800',
        backgroundColor: COLOURS.red,
        color: COLOURS.white,
        width: '100%',
        paddingHorizontal: 50,
        paddingVertical: 10,
        borderRadius: 10,
        letterSpacing: 2
    },
    application_companyName: {
        fontSize: 18,
        fontWeight: '400'
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