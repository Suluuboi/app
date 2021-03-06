import React, { useState } from 'react'
import { TouchableOpacity, View, StyleSheet} from 'react-native';
import Constants from 'expo-constants'
import * as Yup from 'yup'

import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';
import { MaterialCommunityIconsSet } from './icon/types';
import { AppFormFieldFormik, AppFormFormik } from './form/formik';
import FilterModal  from '../screens/Listings/FilterModal'
import { Filter, FilterValues } from '../utility/types';

const HEADER_CHANGE = 50;


type HeaderProps = {
    left_icon           ?: MaterialCommunityIconsSet,
    right_icon          ?: MaterialCommunityIconsSet,
    center_text         ?: string,
    leftIconClicked     ?: () => void,
    rightIconClicked    ?: () => void,
    header_height       : number
    //changeHeader        ?: (number)=>void
    filter              ?: Filter
    changeSearchFilter  ?: (filter)=>void
}

const validationSchema = Yup.object().shape({
    search: Yup.string().label("Search"),
})

function AppHeader({left_icon, 
                    right_icon, 
                    center_text, 
                    leftIconClicked, 
                    rightIconClicked, 
                    filter,
                    changeSearchFilter,
                    header_height=50}:HeaderProps){

    const [search, setSearch ] = useState(false)
    const [showFilterModal, setShowFilterModal] = useState(false)
    
    //const [dynamicHeaderHeight, setDynamicHeaderHeight] = useState(header_height)

    return(
        <>
        <View 
            style={
                header_styles.container
            } 
        > 
            <View style={{flexDirection: 'column', flex: 1}}>
            <View style={{flexDirection: 'row', flex: 1}}>
                {   
                    <TouchableOpacity
                        style={header_styles.container_left_image}
                        onPress={()=>search ? setShowFilterModal(true): null}
                    >   
                        {   
                            search ? 
                            <Icon 
                                background_color={colors.white}
                                name={'filter'}
                                icon_color={colors.medium_grey}
                            />:
                            <Icon 
                            background_color={colors.primary}
                            name={left_icon}
                            />
                        }
                        
                    </TouchableOpacity>
                }

                <View style={header_styles.center_container}>
                    
                <View
                    style={header_styles.center_container_style}
                >   
                    {
                        !search ?

                        <AppText text={''/*center_text*/}/>:

                        <AppFormFormik
                            initialValues={{
                                search: ''
                            }}
                            onSubmit={(value, formicHelper)=>{
                                changeSearchFilter({...filter, ...value})
                            }}
                            validationSchema={validationSchema}
                        >

                        <AppFormFieldFormik  
                            maxLength={255} 
                            context_field_name={'search'} 
                            placeholder={'Search'}
                            post_icon_name={'close-box'}
                            autoSubmit={1500}
                        />
                        </AppFormFormik>            
                    }
                </View> 

            </View>

            {   
                <TouchableOpacity
                    style={header_styles.container_right_image}
                    onPress={()=>{
                        if(search){
                            setSearch(!search)
                            changeSearchFilter(undefined)
                        }else{
                            setSearch(!search) 
                        }
                    }}
                >
                    {   !search ?
                        <Icon 
                            name={'magnify'}
                            icon_color={colors.medium_grey}
                            background_color={colors.white}
                        /> :
                        <Icon 
                            name={'close'}
                            icon_color={colors.medium_grey}
                            background_color={colors.white}
                        />
                    }
                </TouchableOpacity>
            }
            </View>

            </View>
        </View>

        {
            showFilterModal &&
                <FilterModal
                    isVisible={showFilterModal}
                    onClose={() => setShowFilterModal(false)}
                    onFilter={(filter: FilterValues)=>{
                        
                        changeSearchFilter({filter :filter});

                        /*if(filter){
                            if(filter.category || filter.priceRange){ 
                                //changeHeader(15)
                            }else{

                            }
                        }*/
                    }}
                />}

        </>
    )
}


export default AppHeader;

const header_styles = StyleSheet.create({

    container : { 
        flex: 1
    },

    container_left_image: {
        width: 50,
        paddingLeft: 10,
        justifyContent: 'center'
    },

    container_right_image:{
        width: 50,
        paddingRight: 10,
        justifyContent: 'center'
    },

    center_container: { 
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center' 
    },

    center_container_style:{
        width: '90%',
        height: "100%",
        //backgroundColor: colors.light_grey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40//SIZES.radius
    }

})

