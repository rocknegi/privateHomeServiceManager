import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fafafa'
    },
    button: {
        backgroundColor: '#cfd8dc',
        alignSelf: 'center',
        padding: 10,
        paddingHorizontal: '8%',
        borderRadius: 6,
    },
    buttonText: {
        color: '#fafafa',
        fontSize: 17
    },
    text: {
        textAlign:'center'
    },
    form: {
        flex: 1,
        justifyContent: 'center'
    },
    inputContainer: {
        // flex:1,
        marginHorizontal: '10%',
        marginTop: '10%',
        justifyContent: 'center'
    },
    input: {
        backgroundColor: '#eee',
        borderRadius: 6,
        margin: 10,
        padding: 10
    },
    card: {
        elevation: 8,
        height:100,
        padding:15,
        margin:10,
        borderRadius:6,
        minWidth:150,
        backgroundColor:"#eee"
    }
})