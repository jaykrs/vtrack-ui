import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create({
  /*---------------------------------------------This Style is for Log In Image--------------------------------------------------------- */
  loginImage: {
    width: 200,
    height: 200,
    marginTop: 77,
    alignSelf: 'center'
  },

  /*---------------------------------------------This Style is for Blank Space at bottom of Page--------------------------------------------------------- */
  bottomSpace: {
    width: '100%',
    height: 50
  },

  /*---------------------------------------------This Style is for Text Input Box--------------------------------------------------------- */
  inputBoxContainer: {
    backgroundColor: "transparent",
    flexDirection: "row",
    paddingLeft: 2,
    borderColor: "#D9D5DC",
    borderBottomWidth: 1
  },

  inputBoxLabel: {
    color: "#000",
    alignSelf: "flex-start",
    opacity: 0.5,
    paddingTop: 16,
    paddingBottom: 8,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },

  inputBoxStyle: {
    flex: 1,
    color: "#000",
    alignSelf: "stretch",
    paddingTop: 14,
    paddingRight: 5,
    paddingBottom: 8,
    paddingLeft: 5,
    fontSize: 16,
    fontFamily: "roboto-regular",
    lineHeight: 16
  },

  /*---------------------------------------------This Style is for Button--------------------------------------------------------- */
  buttonContainer: {
    backgroundColor: "#3F51B5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingRight: 16,
    paddingLeft: 16,
    elevation: 2,
    minWidth: 88,
    borderRadius: 2,
    shadowOffset: {
      height: 1,
      width: 0
    },
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 5
  },
  buttonCaption: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "roboto-regular"
  },

  /*---------------------------------------------This Style is for Search Box-------------------------------------------------------------- */
menuButton: {
  width: '10%',
  justifyContent: 'center',
  alignItems: 'center'
},

  searchBox: {
  flexDirection: 'row',
  borderColor: 'rgba(2,15,20,0.05)',
  borderWidth: 1,
  borderRadius: 5,
  marginBottom: 5,
  marginLeft: 2,
  padding: -20,
  backgroundColor: '#ccc',
  height: 45,
  width: '75%'
},

searchIcon: {
  width: '10%',
  justifyContent: 'center',
  alignItems: 'center',
},

cancelIcon: {
   width: '10%', 
  justifyContent: 'center',
  alignItems: 'flex-end',
},

searchInput: {
  width: '78%',
  backgroundColor: '#ccc',
  borderRadius: 5
},

filterButton: {
  width: '15%',
  backgroundColor: 'rgba(2,15,20,0.001)',
  height: 50,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 4
}
})