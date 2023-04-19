import fonts from './fonts';
import colors from './colors';

export default{
  colors: {
    primaria: colors.primaria,
    secundaria: colors.secundaria,
    backgroundInput: colors.backgroundInput,
    backgroundButtonLogin: colors.backgroundButtonLogin,
    bordaInput: colors.bordaInput,
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
    height: 27,
    marginTop: 100,
  },
  titles: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    lineHeight: 32,
    fontFamily: fonts.font_600,
    color: colors.primaria,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    marginBottom: 30,
    fontFamily: fonts.font_300,
    color: colors.primaria,
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
    marginBottom: 40,
  },
  inputLabel: {
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.font_500,
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
    fontFamily: fonts.font_400,
    color: colors.primaria,
    backgroundColor: colors.backgroundInput,
  },
  passwordInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  passwordInput: {
    flex: 1,
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.font_400,
  },
  forgotPasswordButton: {
    alignSelf: 'flex-start',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: colors.secundaria,
    fontSize: 12,
    lineHeight: 16,
    fontFamily: fonts.font_400,
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
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
    fontFamily: fonts.font_500,
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
    fontFamily: fonts.font_400,
  },
  googleLoginButton: {
    paddingVertical: 10,
    borderRadius: 5,
    marginTop: 30,
    flexDirection: 'row',
  },
  logoGoogle: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  googleLoginText: {
    fontSize: 14,
    lineHeight: 21,
    fontFamily: fonts.font_500,
    color: colors.primaria,
    },
 };