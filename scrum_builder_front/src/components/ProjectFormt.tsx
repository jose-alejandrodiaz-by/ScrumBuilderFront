import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormComponentProps {
  onSubmit?: () => void;
}

const FormComponent: React.FC<FormComponentProps> = ({ onSubmit }) => {
  const [formState, setFormState] = useState({
    projectName: '',
    projectCode: '',
    projectTypeId: '',
    platformId: '',
    modules: [],
    environments: [],
  });

  const projectTypeOptions = [
    { id: 1, name: 'project 1' },
    { id: 2, name: 'project 2' },
    // Add more project type options as needed
  ];

  const platformTypeOptions = [
    { id: 1, name: 'platform 1' },
    { id: 2, name: 'platform 2' },
    // Add more platform type options as needed
  ];

  const moduleOptions = [
    { id: 1, name: 'Module 1' },
    { id: 2, name: 'Module 2' },
    // Add more module options as needed
  ];

  const environmentOptions = [
    { id: 1, name: 'environment1' },
    { id: 2, name: 'environment2' },
    // Add more environment options as needed
  ];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value =
      event.target.name === 'projectTypeId' || event.target.name === 'platformId'
        ? Number(event.target.value)
        : event.target.value;

    setFormState({
      ...formState,
      [event.target.name]: value,
    });
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked } = event.target;
    const newValue = { id: Number(value) };

    setFormState((prevState) => {
      if (checked) {
        return {
          ...prevState,
          [name]: [...prevState[name], newValue],
        };
      } else {
        return {
          ...prevState,
          [name]: prevState[name].filter((item) => item.id !== newValue.id),
        };
      }
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = JSON.stringify(formState);
    console.log(data);

    setFormState({
      projectName: '',
      projectCode: '',
      projectTypeId: '',
      platformId: '',
      modules: [],
      environments: [],
    });

    // service logic here
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <div className="flex flex-col p-9 bg-white shadow-md rounded-md">
      <form onSubmit={handleSubmit} className="flex flex-col p-8 bg-white shadow-md rounded-md">
        {/* ... (rest of your form code) ... */}
      </form>
    </div>
  );
};

export default FormComponent;
