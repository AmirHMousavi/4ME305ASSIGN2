import { StyleSheet } from 'react-native';
import { Constants } from 'expo';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    justifyContent: 'center',
    marginTop: 10,
  },
  mb15: {
    marginBottom: 20,
  },
  mt15: {
    marginTop: 15,
  },
  mb20: {
    marginBottom: 20,
  },
  iconButton: {
    color: '#007aff',
  },
  margin: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFF',
  },
  mf: {
    flexGrow: 1,
    alignSelf: 'center',
    alignItems: 'center',
  },
});

export default styles;
