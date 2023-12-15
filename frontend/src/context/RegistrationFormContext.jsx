import React, { createContext, useContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

const FormContext = createContext();

export default function FormContextProvider({ children }) {
  const [formData, setFormData] = useState({
    pseudo: "",
    email: "",
    postal: "",
    city: "",
    password: "",
    confirmation: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const contextValue = useMemo(
    () => ({ formData, setFormData, handleChange }),
    [formData, setFormData]
  );

  return (
    <FormContext.Provider value={contextValue}>{children}</FormContext.Provider>
  );
}

FormContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useFormContext = () => useContext(FormContext);
