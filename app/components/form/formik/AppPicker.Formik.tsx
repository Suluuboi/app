import {  useFormikContext } from 'formik'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Selection } from '../../../screens/InputPlaygroud.Screen'
import AppPicker from '../AppPicker'


import ErrorMessage from '../ErrorMessage'

/**a picker component that can be placed within a Formick form 
 * the select an option */

type AppPickerFormikProps = {
    placeholder: string,
    items: Selection[],
    //selectedItem: (st:any)=>any,
    name: string
    width?: string | undefined | number
    PickerItemComponent?: JSX.Element | undefined
}

export default function AppPickerFormik({placeholder, items,  name, width, PickerItemComponent}: AppPickerFormikProps) {
    
    const {setFieldValue, errors, touched, values} = useFormikContext<any>()

    return (
        <>
            <AppPicker
                items={items}
                placeholder={placeholder}
                onSelectItem={(selected)=>setFieldValue(name, selected)} 
                //selected_item={}
                width={width}
                PickerItemComponent={PickerItemComponent}
            />
            <ErrorMessage error={errors[name] as string} visable={touched[name] as boolean} />
        </>
    )
}

const styles = StyleSheet.create({})