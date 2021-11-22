import React, { useState } from 'react'
import { Text, TouchableOpacity, View, Image, StyleSheet, Animated } from 'react-native';
import Constants from 'expo-constants'
import * as Yup from 'yup'

import colors from '../config/colors';
import AppText from './AppText';
import Icon from './Icon';
import { MaterialCommunityIconsSet } from './icon/types';
import AppTextInput from './form/AppTextInput';
import { AppFormFieldFormik, AppFormFormik } from './form/formik';

const HEADER_HEIGHT = 70;


type HeaderProps = {
    left_icon?: MaterialCommunityIconsSet,
    right_icon?: MaterialCommunityIconsSet,
    center_text?: string,
    leftIconClicked?: () => void,
    rightIconClicked?: () => void,
    animatedValue : Animated.Value
}

const validationSchema = Yup.object().shape({
    search: Yup.string().label("Search"),
})

function AppHeader({left_icon, right_icon, center_text, animatedValue ,leftIconClicked, rightIconClicked}:HeaderProps){

    const [search, setSearch ] = useState(false)

    const diffClamp = Animated.diffClamp(animatedValue, 0, HEADER_HEIGHT)
    const translateY = diffClamp.interpolate({
        inputRange:[0, HEADER_HEIGHT],
        outputRange: [0, -HEADER_HEIGHT],
        extrapolate: 'clamp'
    })

    const opacity = diffClamp.interpolate({
        inputRange:[0, HEADER_HEIGHT],
        outputRange: [1, 0],
        extrapolate: 'clamp'
    })

    return(

        <Animated.View 
            style={
                [
                    header_styles.container,
                    {
                        transform:[
                            {translateY: translateY}
                        ],
                        opacity: opacity
                    }
                    
                ]
            } 
        > 
            {   
                <TouchableOpacity
                    style={header_styles.container_left_image}
                    onPress={leftIconClicked}
                >
                    <Icon 
                        background_color={colors.primary}
                        name={left_icon}
                    />
                    {/*{SetImage.create(left_icon,"contain",30,30)}*/}
                </TouchableOpacity>
            }

            <View style={header_styles.center_container}>
                  
                <View
                    style={header_styles.center_container_style}
                >   
                    {
                        !search ?
                        <AppText text={center_text}/>:
                        <AppFormFormik
                            initialValues={{
                                search: ''
                            }}
                            onSubmit={(value, formicHelper)=>console.log(value)}
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
                    onPress={()=>search ? setSearch(!search): setSearch(!search)}
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
        </Animated.View>
        
    )
}


export default AppHeader;

const header_styles = StyleSheet.create({

    container : { 
        position: 'absolute',
        top: Constants.statusBarHeight,
        left: 0,
        right: 0,
        flexDirection: 'row', 
        height: HEADER_HEIGHT,
        backgroundColor: colors.white,
        zIndex: 100
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
        backgroundColor: colors.light_grey,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40//SIZES.radius
    }

})
