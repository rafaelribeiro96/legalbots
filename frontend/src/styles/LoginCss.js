const primaria = '#484150';
const secundaria = '#8360C3';
const branco = '#FFF';
const borda = '#E8E8E8';
const backgroundButtonLogin = '#8360C3';
// const background = 'rgba(178, 203, 225, 0.3)', 'rgba(201, 187, 187, 0)';

export default{
  colors: {
    primaria: primaria,
    secundaria: secundaria,
    branco: branco,
    backgroundButtonLogin: backgroundButtonLogin,
    borda: borda,
  },
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 140,
    height: 26,
    marginTop: 100,
  },
  titles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: 'Poppins_600SemiBold',
    color: primaria,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
    fontFamily: 'Poppins_300Light',
    color: primaria,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 40,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_300Light',
  },
  input: {
    width: '100%',
    height: 56,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 10,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
    color: primaria,
    backgroundColor: branco,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_400Regular',
  },
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: secundaria,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Poppins_400Regular',
    textDecorationLine: 'underline',
  },
  button: {
    marginTop: 25,
    justifyContent: 'center',
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    height: 54,
  },
  // buttonEnabled: {
  //   backgroundColor: backgroundButtonLogin,
  // },
  // buttonDisabled: {
  //   backgroundColor: '#ccc',
  // },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Poppins_500Medium',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 40,
  },
  dividerLine: {
    width: 80,
    height: 1,
    backgroundColor: '#ccc',
  },
  dividerText: {
    paddingHorizontal: 10,
    color: '#ccc',
    fontSize: 12,
    lineHeight: 16,
    fontFamily: 'Poppins_400Regular',
  },
  googleLoginButton: {
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
  },
  logoGoogle: {
    width: 20,
    height: 20,
  },
  googleLoginText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: 'Poppins_500Medium',
    color: primaria,
    },
 };