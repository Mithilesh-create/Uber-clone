import { StatusBar, StyleSheet, Text, View } from 'react-native'

const PriceArea = () => {
    return (
        <View style={styles.container}>
            <Text>Hello From PriceArea</Text>
        </View>
    )
}

export default PriceArea

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        marginTop: StatusBar.currentHeight,
    },

});
