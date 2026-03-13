import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5EFE6',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  formContainer: {
    width: '100%',
    justifyContent: 'flex-start',
    paddingVertical: 24,
    paddingHorizontal: 12,
  },

  imageTitle: {
    width: 260,
    height: 90,
    marginBottom: 10,
  },
  imageStyle: {
    width: 180,
    height: 180,
    marginBottom: 18,
  },
  legendText: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 8,
    textAlign: 'center',
  },
  forgotPasswordText: {
    fontSize: 14,
    color: '#B9B1A8',
    textDecorationLine: 'underline',
    marginBottom: 16,
    textAlign: 'right',
  },
  label: {
    fontSize: 16,
    fontWeight: 'medium',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: 'rgba(138,135,130,0.2)',
    borderRadius: 8,
    padding: 8,
    marginBottom: 16,
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    backgroundColor: '#C76743',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16,
  },
  linkText: {
    color: '#C76743',
    textDecorationLine: 'underline',
    fontSize: 16,
    paddingLeft: 8,
  },
  signUpContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  placeholderTextColor: {
    color: 'rgba(0,0,0,0.25)',
  },
});
