import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "100vh",
    minWidth: "100vw",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "50% 50%",
  },
  pageBackground: {
    minHeight: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    width: "450px",
    maxWidth: "90%",
    marginBottom: "20px",
    textAlign: "center",
  },
  header: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    color: "#333",
    marginBottom: "1rem",
  },
  autocompleteTextfield: {
    "& input": {
      overflow: "visible",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  citySuggestions: {
    minWidth: "150px",
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
  },
  inputPlaceholder: {
    fontStyle: "italic",
    color: "#aaa",
  },
  weatherInfo: {
    animation: "$fadeIn 0.5s ease-in",
  },
  "@keyframes fadeIn": {
    from: {
      opacity: 0,
    },
    to: {
      opacity: 1,
    },
  },
}));

export default useStyles;
